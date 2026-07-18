"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LuX, LuSend, LuBot, LuUser, LuTrash2, LuSparkles } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Button } from "./ui/Button";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type LeadCaptureState = "idle" | "form" | "submitting" | "done";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadState, setLeadState] = useState<LeadCaptureState>("idle");
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize or retrieve session ID
    let sId = localStorage.getItem("syshub_chat_session");
    if (!sId) {
      sId = crypto.randomUUID();
      localStorage.setItem("syshub_chat_session", sId);
    }
    setSessionId(sId);

    // Fetch history from backend
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/history/${sId}`);
        if (response.ok) {
          const history = await response.json();
          if (history.length > 0) {
            setMessages(history.map((m: any, i: number) => ({ id: `h-${i}`, role: m.role, content: m.content })));
          } else {
            setMessages([
              { id: "1", role: "assistant", content: "Welcome to **SysHub365**. How may I strategically support your digital objectives today?" }
            ]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
        setMessages([
          { id: "1", role: "assistant", content: "Welcome to **SysHub365**. How may I strategically support your digital objectives today?" }
        ]);
      }
    };

    fetchHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleClear = async () => {
    if (!sessionId) return;
    if (!confirm("Are you sure you want to clear your chat history?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat/history/${sessionId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMessages([
          { id: "1", role: "assistant", content: "Welcome to **SysHub365**. How may I strategically support your digital objectives today?" }
        ]);
        setLeadState("idle");
        setLeadForm({ name: "", email: "", phone: "" });
      }
    } catch (error) {
      console.error("Failed to clear chat history:", error);
    }
  };

  const submitLead = async () => {
    if (!leadForm.name.trim() || leadState !== "form") return;
    setLeadState("submitting");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          source: "chatbot",
          session_id: sessionId
        })
      });
      if (response.ok) {
        setLeadState("done");
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: `Excellent **${leadForm.name}**! I've shared your details with our team. Someone will reach out within 24 hours. Is there anything else I can help with?` }]);
      } else {
        setLeadState("form");
      }
    } catch {
      setLeadState("form");
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage.content,
          session_id: sessionId,
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

  const isSubmitting = leadState === "submitting";

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[9999]">
        <button
          onClick={() => setIsOpen(true)}
          className={clsx(
            "relative group w-20 h-20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen ? "scale-0 opacity-0 rotate-[180deg]" : "scale-100 opacity-100 hover:scale-110"
          )}
          aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
        >

          <div className="absolute inset-0 bg-electric-blue/10 rounded-full blur-[30px] group-hover:bg-electric-blue/30 group-hover:blur-[40px] transition-all duration-1000" />
          <div className="absolute inset-0 rounded-full overflow-hidden p-[1.5px] bg-white/5">
            <div className="absolute inset-[-100%] bg-[conic-gradient(from_var(--beam-angle,0deg),transparent_70%,#2563eb_80%,#38bdf8_90%,transparent_100%)] animate-[beam-rotate_8s_linear_infinite]" />
            <div className="absolute inset-[1.5px] bg-[#030509]/95 backdrop-blur-3xl rounded-full flex items-center justify-center overflow-hidden border border-white/10">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#2563eb,transparent_70%)]" />
              <Image src="/images/favicon.svg" alt="SysHub365" width={32} height={32} className="relative z-10 transition-all duration-700 group-hover:scale-110 group-hover:brightness-125" />
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
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="!p-2 hover:bg-white/10 text-slate-400 hover:text-red-400" 
                  onClick={handleClear}
                  aria-label="Clear Chat"
                  title="Clear Chat"
                >
                  <LuTrash2 size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="!p-2 hover:bg-white/10" 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Chat"
                >
                  <LuX size={14} />
                </Button>
              </div>
            </div>


            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} className={clsx("flex gap-4", msg.role === "user" ? "justify-end" : "justify-start")}>
                  {msg.role !== "user" && (
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Image src="/images/favicon.svg" alt="SysHub365" width={16} height={16} />
                    </div>
                  )}
                  <div className={clsx("px-5 py-3 text-sm rounded-[1.5rem] shadow-xl max-w-[80%] prose prose-invert prose-sm", msg.role === "user" ? "bg-gradient-to-r from-electric-blue to-vibrant-purple text-white rounded-br-none" : "bg-white/[0.03] text-slate-200 border border-white/5 rounded-bl-none")}>
                    <ReactMarkdown 
                      components={{
                        p: ({children}) => <p className="mb-2 last:mb-0 leading-relaxed text-slate-300">{children}</p>,
                        strong: ({children}) => <strong className="text-electric-blue font-bold">{children}</strong>,
                        ul: ({children}) => <ul className="list-disc ml-4 my-2 text-slate-300">{children}</ul>,
                        li: ({children}) => <li className="mb-1">{children}</li>,
                        h1: ({children}) => <h1 className="text-lg font-black text-white uppercase tracking-wider mb-2 mt-4 first:mt-0 border-l-2 border-electric-blue pl-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-md font-bold text-white uppercase tracking-wide mb-2 mt-3 first:mt-0">{children}</h2>,
                        h3: ({children}) => <h3 className="text-sm font-bold text-cyber-cyan uppercase mb-1 mt-2 first:mt-0">{children}</h3>
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
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
              {(messages.filter(m => m.role === "user").length >= 2 && leadState === "idle") && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
                  <button
                    onClick={() => setLeadState("form")}
                    className="flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-cyber-cyan bg-white/[0.03] border border-cyber-cyan/20 rounded-full hover:bg-cyber-cyan/10 hover:border-cyber-cyan/40 transition-all"
                  >
                    <LuSparkles size={14} />
                    Discuss Your Project
                  </button>
                </motion.div>
              )}

              {leadState === "form" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyber-cyan text-center">Share your details</p>
                  <input type="text" placeholder="Your Name *" value={leadForm.name} onChange={e => setLeadForm(p => ({...p, name: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan/50 transition-colors" />
                  <input type="email" placeholder="Email Address" value={leadForm.email} onChange={e => setLeadForm(p => ({...p, email: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan/50 transition-colors" />
                  <input type="tel" placeholder="Phone Number" value={leadForm.phone} onChange={e => setLeadForm(p => ({...p, phone: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-cyan/50 transition-colors" />
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="!py-2.5 !px-4 text-xs" onClick={() => setLeadState("idle")}>Cancel</Button>
                    <Button variant="primary" size="sm" className="!py-2.5 !px-6 text-xs flex-1" disabled={!leadForm.name.trim() || isSubmitting} onClick={submitLead}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </motion.div>
              )}

              {leadState === "done" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-electric-blue/10 to-vibrant-purple/10 border border-electric-blue/20 rounded-2xl p-5 text-center">
                  <p className="text-sm font-semibold text-white">Thank You!</p>
                  <p className="text-xs text-slate-400 mt-1">Our team will reach out to you shortly.</p>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
              <form onSubmit={handleSend} className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full p-2 focus-within:border-cyber-cyan/50 transition-colors">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Query system..." className="w-full bg-transparent text-sm text-white px-4 py-2 focus:outline-none placeholder:text-white/20" />
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="sm" 
                  className="!p-3" 
                  disabled={!input.trim() || isLoading}
                >
                  <LuSend size={14} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
