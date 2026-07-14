from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

# Load environment variables from .env file in the same directory
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

import models
from database import engine, get_db
from sqlalchemy.orm import Session

app = FastAPI(title="SysHub365 API")

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

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

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

    # Official SysHub365 Human-Centric Strategic Prompt
    system_prompt = (
        "IDENTITY: You are a Senior Digital Strategist at SysHub365 — an elite software development and AI agency. Speak like a confident, knowledgeable consultant, not a robot. Do NOT say 'I am an AI', 'How can I help you today', or 'As an AI'. Be direct, human, and helpful. "
        
        "CONVERSATION FLOW: "
        "- Respond naturally to whatever the client asks. If they ask a direct question, answer it directly. Do NOT force a name introduction every time. "
        "- Only ask for their name if the conversation naturally leads there (e.g., after answering their question). "
        "- Use the client's name naturally if they provide it. "
        "- Be conversational — use short, human responses (3-5 sentences max). "

        "SERVICES WE OFFER (visit syshub365.com/services for details): "
        "- Enterprise Web Systems, AI Integration, UI/UX Product Design, Cloud Infrastructure, Cybersecurity Defense, Digital Marketing, Software Licensing, Graphic Design. "
        "- When a client asks about services, mention these and direct them to the services page. "

        "PRICING: "
        "- If asked about pricing, say: 'Pricing varies depending on your specific requirements. It's best to contact us directly via email at hello@syshub365.com or give us a call so we can understand your needs and provide an accurate quote.' "
        "- Do NOT give specific numbers unless you're very sure. Keep it generic."
        
        "STYLE: "
        "- Confident, direct, and helpful. "
        "- No bullet lists. No clichés. No robotic phrases. "
        "- If you don't know something specific, say so honestly and offer to connect them with the right person."
    )

    # Construct messages list with history
    messages = [{"role": "system", "content": system_prompt}]
    for msg in request.history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": request.message})

    # List of free models to try in order - Using the 'Free Router' for maximum stability
    free_models = [
        "openrouter/free", 
        "google/gemma-4-31b-it:free",
        "nvidia/nemotron-3-super-120b-a12b:free",
        "meta-llama/llama-3.1-8b-instruct:free"
    ]

    async with httpx.AsyncClient() as client:
        last_error = None
        for model in free_models:
            data = {"model": model, "messages": messages, "max_tokens": 500}
            try:
                response = await client.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data, timeout=10.0)
                if response.status_code in [402, 404, 429]:
                    last_error = f"Model {model} error: {response.status_code}"
                    continue
                response.raise_for_status()
                result = response.json()
                reply = result["choices"][0]["message"]["content"]
                
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
