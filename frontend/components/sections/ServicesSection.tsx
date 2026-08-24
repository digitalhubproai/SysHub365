"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumCard from "@/components/PremiumCard";
import { GradientIcon } from "@/components/GradientIcon";
import { LuArrowUpRight } from "react-icons/lu";
import { SERVICES } from "@/lib/services";

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-[var(--obsidian-base)] relative z-10 border-t border-white/5">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">What We Do</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl mt-4">
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
                  animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                  className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)] group-hover:border-white/20"
                >
                  <GradientIcon icon={<s.icon size={28} />} id={s.id} colors={s.gradient} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-500">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors mt-4">{s.desc}</p>
                </div>
                <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-electric-blue uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Explore Tech <LuArrowUpRight />
                </Link>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
