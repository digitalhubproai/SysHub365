from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="SysHub365 API")

# Setup CORS to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    if not OPENROUTER_API_KEY:
        # Stub response if no key is provided yet
        return {"response": "I am the SysHub365 assistant. I am currently operating in offline stub mode until the OpenRouter API key is provided."}

    # OpenRouter API integration
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "SysHub365 Website",
    }
    
    # System prompt provides context to the chatbot
    system_prompt = (
        "You are the SysHub365 AI assistant. SysHub365 is a premium software house specializing in "
        "Web Development, AI Solutions, Digital Marketing, Cloud Solutions, and Mobile App Development. "
        "Maintain a professional, elite, and helpful tone."
    )

    data = {
        "model": "meta-llama/llama-3-8b-instruct",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ]
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                json=data,
                timeout=30.0
            )
            response.raise_for_status()
            result = response.json()
            reply = result["choices"][0]["message"]["content"]
            return {"response": reply}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def handle_contact(request: ContactRequest):
    # Stub contact handler: in the future this will write to the Neon Database
    return {"status": "success", "message": "Message received via SysHub365 API."}

@app.get("/")
def read_root():
    return {"message": "SysHub365 Backend Running"}
