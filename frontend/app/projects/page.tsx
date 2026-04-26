"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuFolderSymlink } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { Button } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};


export default function Projects() {
  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-neon-accent selection:text-black overflow-x-hidden pt-32 pb-20">
      <div className="noise-overlay" />

      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-24 py-20 lg:py-32 overflow-hidden flex flex-col justify-center text-center">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-[20%] right-[20%] w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[150px] pointer-events-none" />
        </div>
        
        <div className="max-w-[70rem] mx-auto w-full relative z-10 flex flex-col items-center gap-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
             <span className="text-xs font-bold uppercase tracking-widest text-white/80">Case Studies</span>
          </motion.div>
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1]">
            Our Recent <br/>
            <span className="text-gradient">Deployments.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            Explore our portfolio of scalable web platforms, custom AI integrations, and enterprise systems that have redefined digital operations for our clients.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-24 relative z-10">
        <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-0 w-[400px] h-[400px] bg-power-indigo/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[95rem] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {PROJECTS.map((proj, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <Link href={`/projects/${proj.title.toLowerCase().replace(/\s+/g, '-')}`} className="block group cursor-pointer h-[450px]">
                  <div className="rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:border-electric-blue/50 transition-all duration-700 h-full w-full flex flex-col justify-end relative shadow-2xl bg-black">
                    <Image 
                      src={proj.img} 
                      alt={proj.title} 
                      fill 
                      className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out z-0"
                    />
                    
                    {/* Dynamic Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent group-hover:via-black/90 group-hover:from-black transition-all duration-700 z-10" />
                    
                    {/* Content Container */}
                    <div className="relative z-20 p-10 w-full flex flex-col justify-end overflow-hidden">
                      <div className="transform translate-y-[100px] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-5">
                        
                        {/* Title Section (Stays partially visible) */}
                        <div className="flex flex-col gap-2">
                          <motion.span 
                            initial={{ opacity: 0.8 }}
                            className="text-electric-blue text-[11px] font-black uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                          >
                            {proj.category}
                          </motion.span>
                          <h3 className="text-[1.85rem] font-black text-white leading-tight tracking-tighter group-hover:text-gradient transition-all duration-500">{proj.title}</h3>
                        </div>
                        
                        {/* Hidden Details (Slide and Fade In) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 flex flex-col gap-8 h-[100px]">
                          <p className="text-slate-300 text-base line-clamp-2 leading-relaxed font-medium">
                            {proj.desc || "Experience the architectural brilliance and engineering precision behind this enterprise deployment."}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <div className="relative flex items-center justify-center">
                               <div className="absolute inset-0 bg-electric-blue/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
                               <div className="relative w-12 h-12 rounded-full bg-electric-blue text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                                 <LuArrowUpRight size={24} />
                               </div>
                            </div>
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">View Project</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Subtle Scanline Overlay for Texture */}
                    <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-15" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-[var(--obsidian-deep)] relative overflow-hidden border-t border-white/5 mt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/10 rounded-full blur-[200px] pointer-events-none" />
        <div className="max-w-[50rem] mx-auto text-center flex flex-col items-center gap-12 relative z-10 px-6">
          <LuFolderSymlink size={48} className="text-electric-blue" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Have a project in mind?
          </h2>
          <p className="text-slate-400 text-lg max-w-lg">Let's discuss your requirements and build the perfect technological solution for your business.</p>
          <Button href="/contact" variant="primary">
            Initiate Project
          </Button>
        </div>
      </section>
    </main>
  );
}
