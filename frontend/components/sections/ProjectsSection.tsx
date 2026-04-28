"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuChevronLeft, LuChevronRight, LuArrowUpRight } from "react-icons/lu";
import { PROJECTS } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function ProjectsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <div className="flex flex-col gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Featured Work.</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollLeft} 
              className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white hover:bg-electric-blue hover:border-electric-blue transition-colors"
              aria-label="Previous Projects"
            >
              <LuChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollRight} 
              className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white hover:bg-electric-blue hover:border-electric-blue transition-colors"
              aria-label="Next Projects"
            >
              <LuChevronRight size={24} />
            </button>
          </div>

        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }} />
          <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />

          <div 
            ref={sliderRef}
            className="flex overflow-x-auto pb-16 pt-8 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 snap-x snap-mandatory gap-8 lg:gap-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth relative z-10"
          >
            {PROJECTS.map((proj, i) => (
              <Link
                href={`/projects/${proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                key={proj.title}
                className="group relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[32vw] snap-center block h-auto"
              >
                <div className="flex flex-col gap-6">
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black cursor-pointer shadow-2xl group-hover:border-electric-blue/30 transition-all duration-500">
                    <Image 
                      src={proj.img} 
                      alt={proj.title} 
                      fill 
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  <div className="flex flex-col gap-3 px-2">
                    <div className="flex items-center justify-between">
                      <span className="text-electric-blue text-[10px] font-black uppercase tracking-[0.2em]">{proj.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-electric-blue transition-colors">{proj.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium">
                      {proj.desc}
                    </p>
                    <div className="flex items-center gap-2 pt-2 text-white/40 group-hover:text-electric-blue transition-colors text-[10px] font-black uppercase tracking-widest">
                       Explore Project <LuArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button href="/projects" variant="outline">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
