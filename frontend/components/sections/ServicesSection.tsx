"use client";

import { motion } from "framer-motion";
import PremiumCard from "@/components/PremiumCard";
import { GradientIcon } from "@/components/GradientIcon";
import { LuArrowUpRight, LuCode, LuBrainCog, LuPalette, LuCloud, LuMegaphone, LuShieldCheck, LuKey, LuPenTool } from "react-icons/lu";

const SERVICES = [
  { icon: <LuCode size={28} />, title: "Web Development", desc: "High-performance, scalable web applications built with React, Next.js, and modern architectures.", gradient: ["#06b6d4", "#2563eb"], id: "grad-web" },
  { icon: <LuBrainCog size={28} />, title: "AI Integration", desc: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows.", gradient: ["#8b5cf6", "#d946ef"], id: "grad-ai" },
  { icon: <LuPalette size={28} />, title: "UI/UX Design", desc: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates.", gradient: ["#f43f5e", "#fb923c"], id: "grad-design" },
  { icon: <LuCloud size={28} />, title: "Cloud Solutions", desc: "Secure, highly-available infrastructure setup on AWS and GCP with full CI/CD automation.", gradient: ["#3b82f6", "#06b6d4"], id: "grad-cloud" },
  { icon: <LuMegaphone size={28} />, title: "Digital Marketing", desc: "Data-driven SEO, performance marketing, and targeted campaigns to drastically scale your online presence and revenue.", gradient: ["#10b981", "#3b82f6"], id: "grad-marketing" },
  { icon: <LuShieldCheck size={28} />, title: "Cybersecurity", desc: "Enterprise-grade security audits and implementation to protect your digital assets.", gradient: ["#ef4444", "#8b5cf6"], id: "grad-security" },
  { icon: <LuKey size={28} />, title: "Software Licensing", desc: "Comprehensive licensing for all types of software — from enterprise operating systems to specialized SaaS tools.", gradient: ["#fb923c", "#f43f5e"], id: "grad-license" },
  { icon: <LuPenTool size={28} />, title: "Graphic Design", desc: "Professional brand identity, modern logos, and custom marketing materials to elevate your visual presence.", gradient: ["#eab308", "#f97316"], id: "grad-graphic" },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-[var(--obsidian-base)] relative z-10 border-t border-white/5">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">What We Do</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl">
              Comprehensive Digital Solutions.
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-lg">
            We provide end-to-end software development, from conceptual design and prototyping to deployment and scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
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
                    rotate: [0, 3, -3, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: i * 0.1 
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
                    Explore Tech <LuArrowUpRight />
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
