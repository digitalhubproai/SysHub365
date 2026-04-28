"use client";

import { motion } from "framer-motion";
import PremiumCard from "@/components/PremiumCard";
import { GradientIcon } from "@/components/GradientIcon";
import { LuArrowUpRight, LuLayoutDashboard, LuHeartHandshake } from "react-icons/lu";

const SOLUTIONS = [
  {
    icon: <LuLayoutDashboard size={28} />,
    title: "ERP Solutions",
    desc: "Unify your entire business — finance, inventory, HR, and supply chain — into one powerful, real-time ERP platform built to scale with your growth.",
    gradient: ["#3b82f6", "#8b5cf6"], id: "grad-erp"
  },
  {
    icon: <LuHeartHandshake size={28} />,
    title: "CRM Solutions",
    desc: "Give your sales team a 360° view of every customer. AI-powered insights, automated pipelines, and omnichannel communication in one place.",
    gradient: ["#d946ef", "#f43f5e"], id: "grad-crm"
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Our Solutions</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl">
              Powerful Solutions.
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-lg">
            From enterprise resource planning to CRM platforms — integrated solutions that drive real business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <PremiumCard className="p-10 gap-8 items-start">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -3, 3, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: i * 0.15 
                  }}
                  className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)] group-hover:border-white/20"
                >
                  <GradientIcon icon={s.icon} id={s.id} colors={s.gradient} />
                </motion.div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-500">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-electric-blue uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Learn More <LuArrowUpRight />
                  </span>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
