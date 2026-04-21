"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuFolderSymlink } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const PROJECTS = [
  { 
    title: "Finnova Banking", category: "Fintech Platform", 
    desc: "A complete overhaul of a legacy banking platform into a blazing fast Next.js application, supporting over 2 million active users with sub-50ms latency.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    tags: ["Next.js", "React", "Node.js", "AWS"]
  },
  { 
    title: "NeuralSync Analytics", category: "AI Analytics", 
    desc: "An enterprise intelligence dashboard integrating custom LLMs to provide real-time market sentiment analysis.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200",
    tags: ["Python", "FastAPI", "React", "OpenAI"]
  },
  { 
    title: "OmniStore Global", category: "E-Commerce", 
    desc: "A headless e-commerce architecture supporting high-volume global sales and complex multi-currency checkouts.",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
    tags: ["Shopify Plus", "Next.js", "Tailwind"]
  },
  { 
    title: "HealthNet Secure", category: "Healthcare SaaS", 
    desc: "A fully HIPAA-compliant patient management system featuring end-to-end encrypted real-time video consultations.",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
    tags: ["React Native", "WebRTC", "PostgreSQL"]
  },
  { 
    title: "Apex Logistics", category: "Supply Chain", 
    desc: "An IoT-enabled dashboard tracking fleet telemetry across North America in real-time.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    tags: ["Vue.js", "Go", "Docker"]
  },
  { 
    title: "Studio Lumina", category: "Creative Portfolio", 
    desc: "A high-fidelity WebGL driven portfolio for an award-winning architectural firm.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    tags: ["Three.js", "GSAP", "React"]
  }
];

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
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1]">
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
        <div className="max-w-[90rem] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {PROJECTS.map((proj, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 40 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <PremiumCard className="p-8 gap-6">
                  <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                      src={proj.img} 
                      alt={proj.title} 
                      fill 
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1500ms] grayscale-[40%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                       {proj.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] uppercase tracking-widest font-bold">
                           {tag}
                         </span>
                       ))}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full bg-electric-blue text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                        <LuArrowUpRight size={28} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 px-2">
                    <div className="flex items-center justify-between">
                       <span className="text-electric-blue text-xs font-bold uppercase tracking-widest">{proj.category}</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white group-hover:text-gradient transition-all duration-500">{proj.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mt-2 group-hover:text-slate-200 transition-colors">{proj.desc}</p>
                  </div>
                </PremiumCard>
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
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Have a project in mind?
          </h2>
          <p className="text-slate-400 text-lg max-w-lg">Let's discuss your requirements and build the perfect technological solution for your business.</p>
          <Link href="/contact" className="btn-obsidian-primary">
            Initiate Project
          </Link>
        </div>
      </section>
    </main>
  );
}
