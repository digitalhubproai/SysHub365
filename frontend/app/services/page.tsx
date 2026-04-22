"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { LuCode, LuBrainCog, LuPalette, LuCloud, LuShieldCheck, LuRocket, LuArrowUpRight } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const SERVICES_DETAILED = [
  {
    icon: <LuCode size={28} />,
    title: "Enterprise Web Systems",
    desc: "Architecting high-availability, low-latency web platforms that serve as the backbone of modern enterprise operations.",
  },
  {
    icon: <LuBrainCog size={28} />,
    title: "AI Integration",
    desc: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows for maximum efficiency.",
  },
  {
    icon: <LuPalette size={28} />,
    title: "UI/UX Product Design",
    desc: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates through scientific design.",
  },
  {
    icon: <LuCloud size={28} />,
    title: "Cloud Infrastructure",
    desc: "Secure, highly-available infrastructure setup on AWS and GCP with full CI/CD automation and global sync.",
  },
  {
    icon: <LuShieldCheck size={28} />,
    title: "Cybersecurity Defense",
    desc: "Enterprise-grade security audits and implementation to protect your digital assets and ensure compliance.",
  },
  {
    icon: <LuRocket size={28} />,
    title: "MVP Sprints",
    desc: "Rapid prototyping and development to get your core product to market in record time without compromising quality.",
  }
];

export default function Services() {
  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden pt-32 pb-20">
      <div className="noise-overlay" />
      
      {/* Background Glows matching Homepage */}
      <div className="absolute inset-0 pointer-events-none z-0">          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-electric-blue/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[180px]" />
      </div>

      {/* Hero Header */}
      <section className="relative px-6 md:px-12 lg:px-24 py-16 overflow-hidden flex flex-col justify-center">
        <div className="max-w-[75rem] mx-auto w-full relative z-10 flex flex-col items-center gap-8 text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
             <span className="text-xs font-bold uppercase tracking-widest text-white/80">Our Capabilities</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.1, duration: 1 }} 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight"
          >
            Our Specialist <br/>
            <span className="text-gradient">Services.</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.2, duration: 1 }} 
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
          >
            Providing end-to-end software development, from conceptual design and prototyping to enterprise-grade deployment and global scaling.
          </motion.p>
        </div>
      </section>

      {/* Service Grid - Standard 3-column to match Homepage */}
      <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DETAILED.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <PremiumCard className="p-10 gap-8 items-start">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:bg-electric-blue transition-colors duration-500 shadow-lg">
                  {s.icon}
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-500">{s.title}</h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-electric-blue uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Contact Specialist <LuArrowUpRight />
                  </Link>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 bg-[var(--obsidian-deep)] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)] animate-pulse" />
        <div className="max-w-[50rem] mx-auto text-center flex flex-col items-center gap-12 relative z-10 px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Accelerate <br/> 
            <span className="text-gradient">Your Growth?</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl">
             Join over 150+ international clients who have trusted SysHub365 with their most critical digital infrastructure.
          </p>
          <Link href="/contact" className="btn-obsidian-primary">
            Start Your Journey
          </Link>
        </div>
      </section>
    </main>
  );
}
