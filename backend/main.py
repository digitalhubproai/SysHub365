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

# Setup CORS to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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
    history: list[ChatMessage] = []

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        # Stub response if no key is provided yet
        return {"response": "I am the SysHub365 Agentic AI. I am currently operating in offline stub mode until the OpenRouter API key is provided."}

    # OpenRouter API integration with fallback models
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "SysHub365 Website",
    }

    # Official SysHub365 Agentic System Prompt
    system_prompt = (
        "You are the official SysHub365 AI Representative. SysHub365 is an elite software studio. "
        "Services: Web Development (React, Next.js), AI Integration, UI/UX Design, Cloud Solutions (AWS/GCP), and MVP Sprints (4-6 weeks). "
        "Tone: Professional, elite, and extremely concise. Do NOT ramble. Answer directly. "
        "Goal: Help users understand our technical capabilities and guide them to 'Start a Project'. "
        "Constraint 1: Only discuss SysHub365 services. If asked about unrelated topics, politely redirect. "
        "Constraint 2: You do NOT handle billing, payments, or financial queries. Redirect such queries to hello@syshub365.com. "
        "Constraint 3: Maximum 2-3 sentences per response unless technical detail is requested. "
        "Action: If the user is interested, suggest visiting the /contact section to speak with our lead architect."
    )

    # Construct messages list with history
    messages = [{"role": "system", "content": system_prompt}]
    for msg in request.history:
        messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": request.message})

    # List of free models to try in order - Using actual working slugs from OpenRouter API
    free_models = [
        "liquid/lfm-2.5-1.2b-instruct:free",
        "google/gemma-3-4b-it:free",
        "google/gemma-3-12b-it:free",
        "meta-llama/llama-3.3-70b-instruct:free"
    ]

    async with httpx.AsyncClient() as client:
        last_error = None
        for model in free_models:
            data = {
                "model": model,
                "messages": messages,
                "max_tokens": 500
            }

            try:
                print(f"Attempting model: {model}")
                response = await client.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    json=data,
                    timeout=30.0
                )
                print(f"Response status: {response.status_code}")

                # Check for 402 before raising for status
                if response.status_code == 402:
                    last_error = f"Model {model} requires payment or has insufficient credits"
                    print(last_error)
                    continue

                if response.status_code != 200:
                    print(f"Error from OpenRouter: {response.text}")

                response.raise_for_status()
                result = response.json()
                reply = result["choices"][0]["message"]["content"]
                return {"response": reply, "model_used": model}
            except httpx.HTTPStatusError as e:
                print(f"HTTP Error: {e.response.status_code} - {e.response.text}")
                # Handle HTTP errors (like 402) that we want to retry on
                if e.response.status_code == 402:
                    last_error = f"Model {model} requires payment or has insufficient credits"
                    continue
                else:
                    # For other HTTP errors, don't retry - they're likely not fixable by switching models
                    last_error = f"HTTP {e.response.status_code}: {str(e)}"
                    break
            except Exception as e:
                print(f"Error with model {model}: {str(e)}")
                last_error = str(e)
                continue

    # If all models failed, provide a graceful fallback
    if last_error:
        error_str = str(last_error).lower()
        if any(keyword in error_str for keyword in ["402", "payment", "credits"]):
            return {
                "response": "I am the SysHub365 AI Agent. It seems my premium API tokens have reached their limit for this period. Please wait a while or contact our support team for specialized AI consulting.",
                "model_used": "fallback_payment"
            }
        elif any(keyword in error_str for keyword in ["401", "unauthorized", "invalid api key"]):
             return {
                "response": "Authentication failed. The SysHub365 AI Agent requires a valid API key to operate. Please ensure the OPENROUTER_API_KEY is correctly set in the environment configuration.",
                "model_used": "fallback_auth"
            }
        
        return {
            "response": f"I encountered an unexpected challenge while processing your request (Error: {last_error}). My systems are still active, but I might need a moment to recalibrate.",
            "model_used": "fallback_general"
        }
    
    raise HTTPException(status_code=500, detail="An unknown error occurred in the AI processing pipeline.")

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def handle_contact(request: ContactRequest, db: Session = Depends(get_db)):
    try:
        db_message = models.ContactMessage(
            name=request.name,
            email=request.email,
            message=request.message
        )
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        return {"status": "success", "message": "Message received and stored in database."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "SysHub365 Backend Running"}
