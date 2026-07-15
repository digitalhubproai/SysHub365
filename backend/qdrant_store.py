import os
import logging
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "syshub365_knowledge")

logger = logging.getLogger(__name__)

_client = None
_embedder = None

def get_qdrant_client():
    global _client
    if _client is not None:
        return _client
    if not QDRANT_URL or not QDRANT_API_KEY:
        logger.warning("Qdrant credentials not configured. Running without vector store.")
        return None
    try:
        from qdrant_client import QdrantClient
        _client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY, timeout=10)
        logger.info("Connected to Qdrant Cloud")
        return _client
    except Exception as e:
        logger.error(f"Failed to connect to Qdrant: {e}")
        return None

def get_embedder():
    global _embedder
    if _embedder is not None:
        return _embedder
    try:
        from sentence_transformers import SentenceTransformer
        _embedder = SentenceTransformer("all-MiniLM-L6-v2")
        return _embedder
    except Exception as e:
        logger.error(f"Failed to load embedding model: {e}")
        return None

def ensure_collection():
    client = get_qdrant_client()
    if not client:
        return False
    try:
        from qdrant_client.http.models import VectorParams, Distance
        collections = client.get_collections().collections
        if not any(c.name == QDRANT_COLLECTION for c in collections):
            client.create_collection(
                collection_name=QDRANT_COLLECTION,
                vectors_config=VectorParams(size=384, distance=Distance.COSINE),
            )
            logger.info(f"Created Qdrant collection: {QDRANT_COLLECTION}")
        return True
    except Exception as e:
        logger.error(f"Failed to ensure collection: {e}")
        return False

def ingest_texts(texts: list[str], metadata: Optional[list[dict]] = None) -> int:
    client = get_qdrant_client()
    embedder = get_embedder()
    if not client or not embedder:
        return 0
    if not ensure_collection():
        return 0
    try:
        from qdrant_client.http.models import PointStruct
        import uuid
        embeddings = embedder.encode(texts, convert_to_numpy=True)
        points = []
        for i, (text, emb) in enumerate(zip(texts, embeddings)):
            payload = {"text": text}
            if metadata and i < len(metadata):
                payload.update(metadata[i])
            points.append(PointStruct(id=str(uuid.uuid4()), vector=emb.tolist(), payload=payload))
        client.upsert(collection_name=QDRANT_COLLECTION, points=points)
        logger.info(f"Ingested {len(points)} texts into Qdrant")
        return len(points)
    except Exception as e:
        logger.error(f"Failed to ingest texts: {e}")
        return 0

def search_knowledge(query: str, limit: int = 3) -> list[str]:
    client = get_qdrant_client()
    embedder = get_embedder()
    if not client or not embedder:
        return []
    try:
        query_vector = embedder.encode(query, convert_to_numpy=True).tolist()
        results = client.query_points(
            collection_name=QDRANT_COLLECTION,
            query=query_vector,
            limit=limit,
        )
        return [r.payload.get("text", "") for r in results.points if r.payload]
    except Exception as e:
        logger.error(f"Qdrant search failed: {e}")
        return []
