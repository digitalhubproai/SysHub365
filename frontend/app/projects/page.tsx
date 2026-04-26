"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LuCode, LuBrainCog, LuPalette, LuCloud, LuShieldCheck, LuRocket, LuArrowUpRight } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { Button } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ProjectsPage() {
  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden pt-32 pb-20">
      <div className="noise-overlay" />
      
      {/* Hero Header */}
      <section className="relative px-6 md:px-12 lg:px-24 py-16 overflow-hidden flex flex-col justify-center text-center">
        <div className="max-w-[75rem] mx-auto w-full relative z-10 flex flex-col items-center gap-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
             <span className="text-xs font-bold uppercase tracking-widest text-white/80">Our Portfolio</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.1, duration: 1 }} 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight"
          >
            Engineering <br/>
            <span className="text-gradient">Excellence.</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.2, duration: 1 }} 
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
          >
            A curated showcase of our most complex deployments, from AI-driven healthcare platforms to high-performance fintech architectures.
          </motion.p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {PROJECTS.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={`/projects/${proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="group block">
                <div className="flex flex-col gap-6">
                  {/* Image Container */}
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl group-hover:border-electric-blue/40 transition-all duration-500">
                    <Image 
                      src={proj.img} 
                      alt={proj.title} 
                      fill 
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  {/* Content Below */}
                  <div className="flex flex-col gap-4 px-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-electric-blue text-xs font-black uppercase tracking-[0.2em]">{proj.category}</span>
                      <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-electric-blue transition-colors">{proj.title}</h3>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed line-clamp-3">
                      {proj.desc}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-white/40 group-hover:text-electric-blue transition-colors text-xs font-black uppercase tracking-widest">
                       Full Case Study <LuArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 bg-[var(--obsidian-deep)] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_70%)]" />
        <div className="max-w-[50rem] mx-auto text-center flex flex-col items-center gap-12 relative z-10 px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Have a Vision <br/> 
            <span className="text-gradient">For Your Next Project?</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl">
             Whether you need a full enterprise system or a rapid MVP, we have the engineering expertise to bring it to life.
          </p>
          <Button href="/contact" variant="primary">
            Get a Quote
          </Button>
        </div>
      </section>
    </main>
  );
}
