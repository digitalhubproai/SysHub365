"use client";

import { useState, useRef, useEffect } from "react";
import { LuMessageSquare, LuX, LuSend, LuBot, LuUser } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hello! I'm the SysHub365 AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Stub integration for now until backend is fully hooked up
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content })
      });
      
      const data = await response.json();
      const botMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-40 p-4 bg-electric-blue text-white rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100 hover:scale-110"
        )}
        aria-label="Open Chat"
      >
        <LuMessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] h-[500px] flex flex-col bg-[var(--obsidian-deep)] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[var(--obsidian-surface)]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-electric-blue rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                  <LuBot size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">SysHub365 AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                    <p className="text-[10px] uppercase tracking-widest text-cyber-cyan font-bold">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <LuX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={clsx(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div
                    className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      msg.role === "user" ? "bg-white/10 text-white" : "bg-electric-blue/20 text-electric-blue border border-electric-blue/30"
                    )}
                  >
                    {msg.role === "user" ? <LuUser size={14} /> : <LuBot size={14} />}
                  </div>
                  <div
                    className={clsx(
                      "p-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-white/10 text-white rounded-2xl rounded-tr-sm"
                        : "bg-[var(--obsidian-surface)] text-slate-300 border border-white/5 rounded-2xl rounded-tl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/20 text-electric-blue border border-electric-blue/30 flex items-center justify-center shrink-0">
                    <LuBot size={14} />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-[var(--obsidian-surface)] border border-white/5 flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-electric-blue rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[var(--obsidian-deep)]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-[var(--obsidian-surface)] border border-white/10 text-sm text-white rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-electric-blue transition-colors placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 p-2 bg-electric-blue hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-electric-blue disabled:hover:text-white rounded-full text-white transition-colors"
                >
                  <LuSend size={16} className="ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
