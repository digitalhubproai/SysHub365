import requests
import xml.etree.ElementTree as ET
import re
import time
import uuid
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
from sentence_transformers import SentenceTransformer

QDRANT_URL = "https://20ae6f5e-ded6-4702-b0ef-f8159be36f83.eu-west-2-0.aws.cloud.qdrant.io"
QDRANT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIiwic3ViamVjdCI6ImFwaS1rZXk6MTk2NDY4ZDQtNjUyMi00Njk2LThlMmYtYWE2OTU0NzBjZjA2In0.a1LxAUcrCUSsw9DuXAtcpi-BGX_DJFTXDVnBVmeRmy4"
QDRANT_COLLECTION = "syshub365_knowledge"
SITEMAP_URL = "https://www.syshub365.com/sitemap.xml"

print("Connecting to Qdrant...")
client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, timeout=30)
collections = client.get_collections()
if not any(c.name == QDRANT_COLLECTION for c in collections.collections):
    client.create_collection(
        collection_name=QDRANT_COLLECTION,
        vectors_config=VectorParams(size=384, distance=Distance.COSINE),
    )
    print(f"Created collection {QDRANT_COLLECTION}")
else:
    print(f"Collection {QDRANT_COLLECTION} exists")

print("Loading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")
print("Model loaded")

def fetch_sitemap(url):
    r = requests.get(url, timeout=15)
    r.raise_for_status()
    root = ET.fromstring(r.content)
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text for loc in root.findall(".//ns:loc", ns)]
    print(f"Found {len(urls)} URLs")
    return urls

def scrape_page(url):
    try:
        r = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
        r.raise_for_status()
        html = r.text
        title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
        title = title_m.group(1).strip() if title_m else url
        text = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL | re.IGNORECASE)
        text = re.sub(r'<[^>]+>', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return title, text
    except Exception as e:
        print(f"  Failed: {url} - {e}")
        return None, None

def chunk_text(text, max_chars=800, overlap=50):
    sentences = re.split(r'(?<=[.!?])\s+', text)
    chunks = []
    current = []
    current_len = 0
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        if current_len + len(s) > max_chars and current:
            chunk_text_str = " ".join(current)
            if len(chunk_text_str) > 50:
                chunks.append(chunk_text_str)
            overlap_sentences = []
            ol = 0
            for os_ in reversed(current):
                if ol + len(os_) >= overlap:
                    break
                overlap_sentences.insert(0, os_)
                ol += len(os_)
            current = overlap_sentences
            current_len = ol
        current.append(s)
        current_len += len(s)
    if current:
        chunk_text_str = " ".join(current)
        if len(chunk_text_str) > 50:
            chunks.append(chunk_text_str)
    return chunks

all_chunks = []
all_metadata = []

urls = fetch_sitemap(SITEMAP_URL)
for url in urls:
    print(f"\nScraping: {url}")
    title, text = scrape_page(url)
    if not text:
        continue
    chunks = chunk_text(text)
    print(f"  {title[:80]} -> {len(chunks)} chunks")
    for c in chunks:
        all_chunks.append(c)
        all_metadata.append({"source": url, "title": title})
    time.sleep(0.3)

print(f"\nTotal chunks to ingest: {len(all_chunks)}")

BATCH_SIZE = 50
total = 0
for i in range(0, len(all_chunks), BATCH_SIZE):
    batch_texts = all_chunks[i:i + BATCH_SIZE]
    batch_meta = all_metadata[i:i + BATCH_SIZE]
    print(f"Embedding batch {i // BATCH_SIZE + 1}/{(len(all_chunks) - 1) // BATCH_SIZE + 1} ({len(batch_texts)} texts)...")
    embeddings = model.encode(batch_texts, convert_to_numpy=True)
    points = []
    for j, (text, emb) in enumerate(zip(batch_texts, embeddings)):
        payload = {"text": text}
        if j < len(batch_meta):
            payload.update(batch_meta[j])
        points.append(PointStruct(id=str(uuid.uuid4()), vector=emb.tolist(), payload=payload))
    client.upsert(collection_name=QDRANT_COLLECTION, points=points)
    total += len(points)
    print(f"  -> {len(points)} points upserted (total: {total})")

cnt = client.count(collection_name=QDRANT_COLLECTION)
print(f"\nDone! Final Qdrant count: {cnt}")
