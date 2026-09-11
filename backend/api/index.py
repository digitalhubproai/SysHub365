from main import app
from mangum import Mangum

# Vercel serverless entry point.
# lifespan="off" — Qdrant collection + embedder load lazily on first request
# (preloading the 90MB embedding model on every cold start would time out).
handler = Mangum(app, lifespan="off")

