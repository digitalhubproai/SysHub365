"""Re-ingest the entire syshub365.com website into Qdrant.

Reads sitemap.xml, fetches every page, extracts main content text
(removing nav/footer/script/style boilerplate), chunks it, and upserts
fresh vectors into the QDRANT_COLLECTION. Drops old points first.

Usage:  python ingest_site.py
"""
import re
import time
import uuid
from html.parser import HTMLParser

import requests
from qdrant_client.http.models import PointStruct

from qdrant_store import (
    get_qdrant_client, get_embedder, ensure_collection, QDRANT_COLLECTION,
)

SITEMAP_URL = "https://www.syshub365.com/sitemap.xml"
CHUNK_WORDS = 120
SKIP_TAGS = {"script", "style", "noscript", "svg", "nav", "footer", "header"}
BLOCK_TAGS = {"p", "div", "section", "li", "h1", "h2", "h3", "h4", "h5", "h6", "br", "article"}


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self._skip_depth = 0
        self._title = ""
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        if tag in SKIP_TAGS:
            self._skip_depth += 1
        if tag == "title":
            self._in_title = True
        if tag in BLOCK_TAGS and self._skip_depth == 0:
            self.parts.append("\n")

    def handle_endtag(self, tag):
        if tag in SKIP_TAGS and self._skip_depth > 0:
            self._skip_depth -= 1
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self._title += data
            return
        if self._skip_depth == 0 and data.strip():
            self.parts.append(data)

    @property
    def text(self):
        raw = " ".join(self.parts)
        raw = re.sub(r"\s*\n\s*", "\n", raw)
        raw = re.sub(r"[ \t]{2,}", " ", raw)
        return raw.strip()


def fetch_sitemap_urls():
    r = requests.get(SITEMAP_URL, timeout=20)
    r.raise_for_status()
    return re.findall(r"<loc>(.*?)</loc>", r.text)


def extract_page(url):
    r = requests.get(url, timeout=20, headers={"User-Agent": "SysHub365-Ingest/1.0"})
    if r.status_code != 200:
        return None, None
    parser = TextExtractor()
    parser.feed(r.text)
    return parser._title.strip(), parser.text


def chunk_text(text):
    paragraphs = [p.strip() for p in text.split("\n") if p.strip()]
    chunks, current, count = [], [], 0
    for para in paragraphs:
        words = para.split()
        # Split oversized paragraphs on sentence boundaries
        sentences = re.split(r"(?<=[.!?])\s+", para)
        for sent in sentences:
            sw = len(sent.split())
            if sw > CHUNK_WORDS:
                if current:
                    chunks.append(" ".join(current))
                    current, count = [], 0
                chunks.append(sent)
                continue
            if count + sw > CHUNK_WORDS and current:
                chunks.append(" ".join(current))
                current, count = [], 0
            current.append(sent)
            count += sw
    if current:
        chunks.append(" ".join(current))
    return chunks


def main():
    client = get_qdrant_client()
    embedder = get_embedder()
    assert client and embedder, "Qdrant/embedder not available"
    ensure_collection()

    # Full clean rebuild: drop and recreate the collection
    client.delete_collection(QDRANT_COLLECTION)
    ensure_collection()
    print("Recreated empty collection.")

    urls = fetch_sitemap_urls()
    print(f"Found {len(urls)} URLs in sitemap")

    all_texts, all_meta = [], []
    for url in urls:
        try:
            title, text = extract_page(url)
            if not text or len(text) < 80:
                print(f"  SKIP (empty) {url}")
                continue
            page_label = re.sub(r"https://www\.syshub365\.com/?", "", url) or "home"
            chunks = chunk_text(text)
            for ch in chunks:
                if len(ch) < 40:
                    continue
                all_texts.append(ch)
                all_meta.append({"url": url, "page": page_label, "title": title or ""})
            print(f"  OK {page_label}: {len(chunks)} chunks, {len(text)} chars")
        except Exception as e:
            print(f"  FAIL {url}: {e}")
        time.sleep(0.2)

    print(f"\nTotal chunks to ingest: {len(all_texts)}")
    BATCH = 32
    for i in range(0, len(all_texts), BATCH):
        batch_texts = all_texts[i:i + BATCH]
        batch_meta = all_meta[i:i + BATCH]
        embeddings = list(embedder.embed(batch_texts))
        points = []
        for text, meta, emb in zip(batch_texts, batch_meta, embeddings):
            payload = {"text": text}
            payload.update(meta)
            points.append(PointStruct(
                id=str(uuid.uuid4()), vector=emb.tolist(), payload=payload))
        client.upsert(collection_name=QDRANT_COLLECTION, points=points)
        print(f"  upserted {min(i + BATCH, len(all_texts))}/{len(all_texts)}")

    info = client.get_collection(QDRANT_COLLECTION)
    print(f"\nDone. Collection '{QDRANT_COLLECTION}' now has {info.points_count} points.")


if __name__ == "__main__":
    main()
