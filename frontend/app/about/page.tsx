"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuTarget, LuShield, LuCpu, LuDna, LuGlobe, LuCircleCheck } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const VALUES = [
  { icon: <LuTarget size={28} />, title: "Precision", desc: "Rigorous standards applied to every architectural decision and line of code." },
  { icon: <LuShield size={28} />, title: "Integrity", desc: "Building long-term value through transparent partnerships and robust engineering." },
  { icon: <LuCpu size={28} />, title: "Innovation", desc: "Executing at the frontier of intelligence systems and digital ecosystems." },
  { icon: <LuDna size={28} />, title: "Scalability", desc: "Architecting for global impact with systems that grow seamlessly with your business." },
];

export default function About() {
  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-neon-accent selection:text-black overflow-x-hidden pt-32 pb-20">
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-electric-blue/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[180px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 lg:px-24 py-16 overflow-hidden flex flex-col justify-center">
        <div className="max-w-[75rem] mx-auto w-full relative z-10 text-center flex flex-col items-center gap-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
             <span className="text-xs font-bold uppercase tracking-widest text-white/80">Our Vision & Mission</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight"
          >
            Engineering The <br/>
            <span className="text-gradient">Next Standard.</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed"
          >
            SysHub365 is a premier software engineering house. We are digital architects building high-integrity systems for the next era of global infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-4">
              <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Who We Are</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Your Dedicated Technical Partners.
              </h2>
            </div>
            
            <div className="flex flex-col gap-8 text-slate-400 text-lg leading-relaxed">
              <p>
                SysHub365 isn&apos;t just an outsourced vendor. We integrate deeply with your business to understand your goals, target audience, and market challenges before writing a single line of code.
              </p>
              <p>
                We consist of elite software engineers, UI/UX designers, and AI specialists who have delivered solutions across Fintech, Healthcare, E-Commerce, and SaaS.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-4">
              {[
                { text: "Transparent Communication" },
                { text: "Top 1% Engineering Talent" },
                { text: "Strict Quality Assurance" },
                { text: "On-Time Delivery" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <LuCircleCheck size={20} className="text-electric-blue"/>
                  <span className="text-white font-semibold text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-square rounded-3xl overflow-hidden group border border-white/10"
          >
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Our Collaboration" fill className="object-cover opacity-80 transition-transform duration-[2000ms] group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-base)] to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Core Values - NOW USING HOMEPAGE CARD STYLE */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--obsidian-surface)] border-y border-white/5">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-6 items-center text-center">
             <span className="text-electric-blue font-black tracking-[0.4em] uppercase text-sm">Core Principles</span>
             <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Our Values & Culture.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1, duration: 0.8 }} viewport={{ once: true }} 
              >
                <PremiumCard className="p-10 gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:bg-electric-blue transition-colors duration-500 shadow-lg">
                    {v.icon}
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-gradient transition-all duration-500">{v.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{v.desc}</p>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[var(--obsidian-base)]">
        <div className="max-w-[90rem] mx-auto relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group">
           <Image src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2500" alt="Karachi Office" fill className="object-cover opacity-30 transition-transform duration-[3s] group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-r from-[var(--obsidian-base)] via-transparent to-transparent flex items-center px-10 md:px-24">
              <div className="max-w-2xl flex flex-col gap-8">
                 <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                   From Karachi <br/> to the Global Stage.
                 </h2>
                 <p className="text-xl text-slate-300 leading-relaxed">
                   Founded on the principles of speed and stability, we have grown from a local laboratory to a global powerhouse, serving clients with specialized digital solutions.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                       <LuGlobe size={20} className="text-electric-blue" />
                       <span className="text-xs font-bold uppercase tracking-widest text-white">Global Nodes</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-40 bg-[var(--obsidian-deep)] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)] animate-pulse" />
        <div className="max-w-[50rem] mx-auto text-center flex flex-col items-center gap-12 relative z-10 px-6">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build <br/> 
            <span className="text-gradient">Something Exceptional?</span>
          </h2>
          <Link href="/contact" className="btn-obsidian-primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
