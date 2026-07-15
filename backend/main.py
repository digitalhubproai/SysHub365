from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

# Load environment variables from .env file in the same directory
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

import models
from database import engine, get_db
from sqlalchemy.orm import Session

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        get_embedder()
    except Exception as e:
        print(f"Embedder init failed (will lazy-load): {e}")
    try:
        ensure_collection()
    except Exception as e:
        print(f"Collection init failed: {e}")
    yield

app = FastAPI(title="SysHub365 API", lifespan=lifespan)

# Initialize database tables
models.Base.metadata.create_all(bind=engine)

# Setup CORS to allow requests from frontends
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: str
    history: list[ChatMessage] = []

class ContactRequest(BaseModel):
    name: str
    email: str
    phone: str = ""
    message: str

class NewsletterRequest(BaseModel):
    email: str

class KnowledgeIngestRequest(BaseModel):
    texts: list[str]
    metadata: list[dict] = []

class KnowledgeSearchRequest(BaseModel):
    query: str
    limit: int = 3

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from qdrant_store import search_knowledge, ingest_texts, ensure_collection, get_embedder

# Email Configuration
SMTP_SERVER = "smtp.office365.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER") # Your full microsoft email
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD") # Your app password

def notify_admin(subject: str, content: str):
    print(f"PREPARING NOTIFICATION TO hello@syshub365.com")
    
    if not SMTP_USER or not SMTP_PASSWORD:
        print("SMTP Credentials missing. Printing to terminal instead:")
        print(f"Subject: {subject}\nContent: {content}")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_USER
        msg['To'] = "hello@syshub365.com"
        msg['Subject'] = subject
        msg.attach(MIMEText(content, 'plain'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        print("Email notification sent successfully via Microsoft SMTP.")
    except Exception as e:
        print(f"Failed to send email notification: {e}")

@app.post("/api/chat")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    if not OPENROUTER_API_KEY:
        return {"response": "I am the SysHub365 Agentic AI. I am currently operating in offline stub mode until the OpenRouter API key is provided."}

    # Session persistence logic
    chat_session = db.query(models.ChatSession).filter(models.ChatSession.id == request.session_id).first()
    if not chat_session:
        chat_session = models.ChatSession(id=request.session_id)
        db.add(chat_session)
        db.commit()
    
    # Save user message
    user_msg_store = models.ChatMessageStore(
        session_id=request.session_id,
        role="user",
        content=request.message
    )
    db.add(user_msg_store)
    db.commit()

    # OpenRouter API integration with fallback models
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": os.getenv("SITE_URL", "http://localhost:3000"),
        "X-Title": "SysHub365 Website",
    }

    system_prompt = (
        "You are a Senior Digital Strategist at SysHub365. Be direct, confident, helpful. Max 3 sentences. "
        "Never say you are AI or 'How can I help you'. Use the client's name if provided. "
        "Refer to syshub365.com/services and syshub365.com/projects for details.\n\n"
        "=== COMPANY INFO ===\n"
        "SysHub365 is a premium software engineering studio based in Karachi, Pakistan. "
        "Founded by Sarfraz Ahmad. Headquarters: A-407, Maymar Tower, Sector X-2, Gulshan-e-Maymar, Karachi. "
        "8+ years experience, 150+ projects delivered, 20+ countries served, 98% client satisfaction. "
        "Email: hello@syshub365.com | Phone: +92 335 6660365 | LinkedIn, Facebook, X, Instagram: @syshub365\n\n"
        "=== SERVICES ===\n"
        "1. Enterprise Web Systems - High-availability, low-latency web platforms (React, Next.js). Websites from $250.\n"
        "2. AI Integration - Chatbots, generative AI, intelligent automation for business workflows.\n"
        "3. UI/UX Product Design - Intuitive interfaces maximizing engagement and conversion.\n"
        "4. Cloud Infrastructure - AWS/GCP setup with CI/CD automation and global sync.\n"
        "5. Cybersecurity Defense - Enterprise-grade security audits and implementation.\n"
        "6. Digital Marketing - Data-driven SEO, performance marketing, targeted campaigns.\n"
        "7. Software Licensing - Licensing for enterprise OS to specialized SaaS tools.\n"
        "8. Graphic Design - Brand identity, logos, marketing materials.\n"
        "Also: ERP Solutions (centralized finance/ops/people) and CRM Solutions (custom workflows).\n"
        "Pricing: Websites from $250; other services custom quote via hello@syshub365.com.\n\n"
        "=== PROJECTS ===\n"
        "1. InsTranz - Luxury logistics platform with supersonic air cargo, AI ocean navigation, robotic fulfillment, quantum telemetry. Tech: Logistics, AI, Robotics, IoT, Aerospace, Cold-Chain. https://ins-tranz.vercel.app\n"
        "2. VRlogic - Enterprise VR command interface with neural engineering, spatial computing, biometric security, AI analytics. Tech: VR/AR, Spatial Computing, Neural Engineering, Three.js. https://v-rlogic.vercel.app\n"
        "3. NexusAI - AI orchestration platform with multi-agent swarms, 200B+ param models, sub-2ms response, SOC 2 Type II, AES-256. Tech: Autonomous Agents, LLM, Multi-Agent Systems, Neural Networks. https://nexus-ai-iota-ashy.vercel.app\n"
        "4. Obvis AI Medical Intelligence - AI-powered medical intelligence platform for healthcare data analysis, clinical decision support, AES-256 encryption. Tech: Next.js, Python, AI, Healthcare. https://obvis-yyes.vercel.app\n"
        "5. Passion & Profit - B2B consulting platform for freelancers with lead gen funnels, coaching, automated marketing. https://www.passion-profit.com\n"
        "6. Adresta - Swiss blockchain-backed SaaS for luxury watch industry (digital twins, NFTs). Founded by ETH Zurich alumna Leonie Fluckiger. Partners: Swisscom Blockchain, Microsoft. https://adresta.ch\n"
        "7. GreenLight Consulting - Enterprise Agentic Orchestration platform. AI agents + human expertise + legacy systems. Reduced cycle times from 55h to 10h. Partners: Microsoft, UiPath, Automation Anywhere. https://greenlightconsulting.com\n"
        "8. AlgoTrader - Book cover design for algorithmic trading book. Fintech aesthetic.\n"
        "9. ExImport Hub - Logo/brand identity for UK medical supply chain company.\n"
        "10. Cretronix - Modern logo for computer software company.\n"
        "11. Wagtails - 5-star licensed pet care platform in Essex with trainer-led daycare, secure dog parks, digital booking. https://www.wagtails.co.uk\n"
        "12. Punjabi Touch - Restaurant menu design for Indian restaurant.\n"
        "13. Swiss Beauty Salon - Premium logo for high-end beauty/wellness center.\n\n"
        "=== BLOG POSTS ===\n"
        "1. Architecting the Future: Building High-Availability Web Systems (26 Apr 2026)\n"
        "2. The Generative Enterprise: How AI is Reshaping Workflows (24 Apr 2026)\n"
        "3. The Science of Engagement: UI/UX Principles for Modern Apps (22 Apr 2026)\n"
        "4. Scaling Globally: Best Practices in Cloud CI/CD (20 Apr 2026)\n"
        "5. Zero Trust Architecture: Protecting Digital Assets (18 Apr 2026)\n"
        "6. Speed to Market: How MVP Sprints Accelerate Launches (15 Apr 2026)\n\n"
        "=== FAQ ===\n"
        "- Typical project timeline: depends on scope, MVP sprints available for rapid launches.\n"
        "- Yes, we design AND build the product (UI/UX + development).\n"
        "- You own all code after project completion.\n"
        "- Yes, we provide ongoing support and maintenance after launch.\n"
        "- Contact: hello@syshub365.com or +92 335 6660365. Lead architect responds within 24 hours.\n"
        "- Headquarters: A-407, Maymar Tower, Sector X-2, Gulshan-e-Maymar, Karachi.\n"
        "- Social: LinkedIn, Facebook, X, Instagram @syshub365\n"
        "- 8+ years experience, 150+ projects, 20+ countries, 98% client satisfaction.\n"
        "- Trusted by: Adobe, Azure, Cisco, IBM, Amazon, Microsoft, Oracle.\n"
        "- Clients: Fintech, Healthcare, E-Commerce, SaaS across 20+ countries.\n"
        "- Testimonials: Sarah Jenkins (CEO, TechFlow), Marcus Thorne (VP Ops, NeuralSync), Aisha Rahman (Founder, OmniStore)."
    )

    # RAG: retrieve relevant knowledge from Qdrant
    rag_context = search_knowledge(request.message, limit=3)
    if rag_context:
        knowledge_section = "\n\nRELEVANT KNOWLEDGE BASE CONTEXT:\n" + "\n---\n".join(rag_context)
        system_prompt += knowledge_section

    # Construct messages list with history
    messages = [{"role": "system", "content": system_prompt}]
    for msg in request.history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": request.message})

    # List of free models to try in order - faster models first
    free_models = [
        "google/gemma-4-26b-a4b-it:free",
        "nvidia/nemotron-3-super-120b-a12b:free",
        "nvidia/nemotron-3-nano-30b-a3b:free"
    ]

    async with httpx.AsyncClient() as client:
        last_error = None
        for model in free_models:
            data = {"model": model, "messages": messages, "max_tokens": 300}
            try:
                response = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data, timeout=30.0)
                if response.status_code in [402, 404, 429]:
                    last_error = f"Model {model} error: {response.status_code}"
                    continue
                response.raise_for_status()
                result = response.json()
                reply = result["choices"][0]["message"]["content"]
                if not reply:
                    continue
                
                # Save assistant response to DB
                assistant_msg_store = models.ChatMessageStore(session_id=request.session_id, role="assistant", content=reply)
                db.add(assistant_msg_store)
                db.commit()
                return {"response": reply, "model_used": model}
            except httpx.HTTPStatusError as e:
                if e.response.status_code in [402, 404, 429]:
                    last_error = f"Model {model} error: {e.response.status_code}"
                    continue
                else:
                    last_error = f"HTTP {e.response.status_code}: {str(e)}"
                    break
            except Exception as e:
                last_error = str(e)
                continue

    if last_error:
        error_str = str(last_error).lower()
        if any(keyword in error_str for keyword in ["402", "payment", "credits"]):
            return {"response": "Premium API tokens reached limit.", "model_used": "fallback_payment"}
        return {"response": f"Unexpected challenge (Error: {last_error}).", "model_used": "fallback_general"}
    raise HTTPException(status_code=500, detail="Unknown error")

@app.get("/api/chat/history/{session_id}")
async def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    messages = db.query(models.ChatMessageStore).filter(models.ChatMessageStore.session_id == session_id).order_by(models.ChatMessageStore.created_at.asc()).all()
    return [{"role": m.role, "content": m.content} for m in messages]

@app.delete("/api/chat/history/{session_id}")
async def clear_chat_history(session_id: str, db: Session = Depends(get_db)):
    db.query(models.ChatMessageStore).filter(models.ChatMessageStore.session_id == session_id).delete()
    db.commit()
    return {"status": "success", "message": "Chat history cleared."}

@app.post("/api/knowledge/ingest")
async def ingest_knowledge(request: KnowledgeIngestRequest):
    if not ensure_collection():
        raise HTTPException(status_code=500, detail="Qdrant not available")
    count = ingest_texts(request.texts, request.metadata if request.metadata else None)
    return {"status": "success", "ingested": count}

@app.post("/api/knowledge/search")
async def search_knowledge_endpoint(request: KnowledgeSearchRequest):
    results = search_knowledge(request.query, request.limit)
    return {"results": results}

@app.post("/api/contact")
async def handle_contact(request: ContactRequest, db: Session = Depends(get_db)):
    try:
        db_message = models.ContactMessage(name=request.name, email=request.email, message=request.message)
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        notify_admin(subject=f"New Contact Inquiry from {request.name}", content=f"Name: {request.name}\nEmail: {request.email}\nPhone: {request.phone}\nMessage: {request.message}")
        return {"status": "success", "message": "Message received and stored."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/newsletter")
async def handle_newsletter(request: NewsletterRequest):
    notify_admin(subject="New Newsletter Subscription", content=f"Email: {request.email}")
    return {"status": "success", "message": "Subscribed successfully."}

@app.get("/")
def read_root():
    return {"message": "SysHub365 Backend Running"}
