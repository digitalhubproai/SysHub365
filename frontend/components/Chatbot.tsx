"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LuX, LuSend, LuBot, LuUser } from "react-icons/lu";
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
    { id: "1", role: "assistant", content: "Hello! I'm the SysHub365 AI Agent. How can I strategically support your goals today?" }
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
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.content,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      
      if (!response.ok) throw new Error("Backend error");

      const data = await response.json();
      const botMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "I'm experiencing a temporary connectivity issue. Please reach out via hello@syshub365.com if this persists." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[9999]">
        <button
          onClick={() => setIsOpen(true)}
          className={clsx(
            "relative group w-20 h-20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen ? "scale-0 opacity-0 rotate-[180deg]" : "scale-100 opacity-100 hover:scale-110"
          )}
          aria-label="Open Chat"
        >
          <div className="absolute inset-0 bg-electric-blue/30 rounded-[2rem] blur-[30px] group-hover:bg-electric-blue/50 group-hover:blur-[40px] transition-all duration-700 animate-pulse" />
          <div className="absolute inset-0 rounded-[1.8rem] overflow-hidden p-[1.5px] bg-white/5">
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_var(--beam-angle,0deg),transparent_70%,#2563eb_80%,#38bdf8_90%,transparent_100%)] animate-[beam-rotate_4s_linear_infinite]" />
            <div className="absolute inset-[1.5px] bg-[#030509]/90 backdrop-blur-2xl rounded-[1.7rem] flex items-center justify-center overflow-hidden border border-white/5">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#2563eb,transparent_70%)]" />
              <Image src="/images/favicon.svg" alt="SysHub365" width={32} height={32} className="relative z-10 transition-all duration-500 group-hover:scale-110" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#030509] border border-white/10 flex items-center justify-center p-[2px]">
            <div className="w-full h-full rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_10px_#06b6d4]" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-28 right-4 md:right-8 z-[9999] w-[calc(100vw-32px)] md:w-[380px] h-[70vh] md:h-[480px] max-h-[80vh] flex flex-col bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_-20px_rgba(37,99,235,0.3)] overflow-hidden"
          >
            <div className="relative flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-cyber-cyan p-[2px] shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                   <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <Image src="/images/favicon.svg" alt="SysHub365" width={20} height={20} />
                   </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase">SysHub365</h3>
                  <p className="text-[10px] text-cyber-cyan font-medium uppercase tracking-[0.2em]">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white bg-white/5 rounded-full hover:bg-white/10 transition-all">
                <LuX size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={clsx("flex gap-4", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Image src="/images/favicon.svg" alt="SysHub365" width={16} height={16} />
                    </div>
                  )}
                  <div className={clsx("px-5 py-3 text-sm rounded-[1.5rem] shadow-xl max-w-[80%]", msg.role === "user" ? "bg-gradient-to-r from-electric-blue to-vibrant-purple text-white rounded-br-none" : "bg-white/[0.03] text-slate-200 border border-white/5 rounded-bl-none")}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 animate-pulse">
                    <Image src="/images/favicon.svg" alt="Thinking" width={16} height={16} />
                  </div>
                  <div className="flex gap-2 p-4 bg-white/[0.03] rounded-[1.5rem] border border-white/5">
                    <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
              <form onSubmit={handleSend} className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full p-2 focus-within:border-cyber-cyan/50 transition-colors">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Query system..." className="w-full bg-transparent text-sm text-white px-4 py-2 focus:outline-none placeholder:text-white/20" />
                <button type="submit" disabled={!input.trim() || isLoading} className="p-3 bg-gradient-to-br from-electric-blue to-cyber-cyan rounded-full text-white hover:brightness-110 disabled:opacity-50 transition-all">
                  <LuSend size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
