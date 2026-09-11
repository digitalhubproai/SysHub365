"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0 overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-bold text-white group-hover:text-electric-blue transition-colors pr-8">
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-white/40 group-hover:text-electric-blue">
          <LuChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 leading-relaxed pb-6 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FAQS = [
  { q: "How long does a typical project take?", a: "Project timelines vary widely. A basic MVP can take 4-6 weeks, while a full-scale enterprise platform might take 3-6 months. We provide clear timeline estimates during our discovery phase." },
  { q: "Do you design the product as well as build it?", a: "Yes. We offer end-to-end services. Our UI/UX team will create high-fidelity prototypes in Figma for your approval before our engineering team writes a single line of code." },
  { q: "Who owns the code after the project is finished?", a: "You do. Once the project is completed and final payments are cleared, 100% of the intellectual property and source code is transferred to you." },
  { q: "Do you provide ongoing support after launch?", a: "Absolutely. We offer dedicated post-launch maintenance plans to handle updates, scaling, and the addition of new features as your business grows." },
];

export function FAQSection() {
  return (
    <section className="section-padding bg-[var(--obsidian-surface)] relative z-10">
      <div className="max-w-[60rem] mx-auto flex flex-col gap-16">
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Knowledge Base</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Common Questions.</h2>
        </div>
        
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
