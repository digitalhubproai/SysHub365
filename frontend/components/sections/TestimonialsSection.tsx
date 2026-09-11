"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuStar } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

const TESTIMONIALS = [
  { quote: "SysHub365 delivered our complex web app ahead of schedule. The quality of the code and the attention to design was simply outstanding.", name: "Sarah Jenkins", role: "CEO, TechFlow", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { quote: "Their AI integration completely automated our customer support triage. We saved hundreds of hours within the first month.", name: "Marcus Thorne", role: "VP Operations, NeuralSync", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { quote: "Finding a development agency that truly understands both enterprise architecture and beautiful UI is rare. SysHub365 does both perfectly.", name: "Aisha Rahman", role: "Founder, OmniStore", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-[var(--obsidian-deep)] relative z-10">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Client Success</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Don&apos;t Just Take Our Word For It.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <PremiumCard className="p-10 justify-between">
                <div className="flex flex-col gap-8">
                  <div className="flex items-center gap-1 text-electric-blue/60 group-hover:text-electric-blue transition-colors">
                    {[1,2,3,4,5].map(star => <LuStar key={star} fill="currentColor" size={16} />)}
                  </div>
                  <p className="text-lg text-white font-medium leading-relaxed italic group-hover:text-white transition-colors">
                    "{t.quote}"
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-12 border-t border-white/10 pt-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 group-hover:border-electric-blue transition-colors duration-500">
                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{t.name}</span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
