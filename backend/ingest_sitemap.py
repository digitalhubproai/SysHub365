import requests
import xml.etree.ElementTree as ET
import re
import time
from urllib.parse import urlparse

API_URL = "https://syshub365-api-3f088fe0-71f2-4e0c-bcf1-ca591e93ba4b.fly.dev"
API_KEY = "594abff022e846edab7f21ff007bb6b7"
SITEMAP_URL = "https://www.syshub365.com/sitemap.xml"

def fetch_sitemap(url):
    r = requests.get(url, timeout=15)
    r.raise_for_status()
    root = ET.fromstring(r.content)
    ns = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text for loc in root.findall(".//ns:loc", ns)]
    print(f"Found {len(urls)} URLs in sitemap")
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
            chunk_text = " ".join(current)
            if len(chunk_text) > 50:
                chunks.append(chunk_text)
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
        chunk_text = " ".join(current)
        if len(chunk_text) > 50:
            chunks.append(chunk_text)
    return chunks

def ingest_chunks(chunks, source_url, batch_size=50):
    for i in range(0, len(chunks), batch_size):
        batch = chunks[i:i + batch_size]
        payload = {
            "texts": batch,
            "metadata": [{"source": source_url}] * len(batch)
        }
        try:
            r = requests.post(
                f"{API_URL}/api/knowledge/ingest",
                json=payload,
                headers={
                    "X-API-Key": API_KEY,
                    "Content-Type": "application/json"
                },
                timeout=30
            )
            if r.status_code == 200:
                print(f"  Ingested batch {i//batch_size + 1}/{(len(chunks)-1)//batch_size + 1}: {r.json()}")
            else:
                print(f"  Failed batch {i//batch_size + 1}: {r.status_code} {r.text}")
        except Exception as e:
            print(f"  Error ingesting batch: {e}")
        time.sleep(0.3)

urls = fetch_sitemap(SITEMAP_URL)
total_chunks = 0

for url in urls:
    print(f"\nScraping: {url}")
    title, text = scrape_page(url)
    if not text:
        continue
    chunks = chunk_text(text)
    print(f"  Title: {title[:80]}")
    print(f"  Text length: {len(text)} -> {len(chunks)} chunks")
    if chunks:
        ingest_chunks(chunks, url)
        total_chunks += len(chunks)
    time.sleep(0.5)

print(f"\nDone! Total chunks ingested: {total_chunks}")
