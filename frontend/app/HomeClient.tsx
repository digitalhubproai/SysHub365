"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LuArrowUpRight, LuChevronDown } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { LoaderIcon } from "@/components/ui/loader-icon";

const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(m => m.AboutSection), { ssr: true });
const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(m => m.StatsSection), { ssr: true });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(m => m.ServicesSection), { ssr: true });
const PartnersSection = dynamic(() => import("@/components/sections/PartnersSection").then(m => m.PartnersSection), { ssr: true });
const SolutionsSection = dynamic(() => import("@/components/sections/SolutionsSection").then(m => m.SolutionsSection), { ssr: true });
const ProcessSection = dynamic(() => import("@/components/sections/ProcessSection").then(m => m.ProcessSection), { ssr: true });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(m => m.ProjectsSection), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(m => m.TestimonialsSection), { ssr: true });
const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then(m => m.BlogSection), { ssr: true });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(m => m.FAQSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection), { ssr: true });

const words = ["Growth.", "Innovation.", "Success.", "Scale."];

function RotatingWord() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-grid sm:text-left text-center overflow-hidden h-[1.1em] relative">
      <span
        key={wordIndex}
        className="text-gradient animate-word-slide-in"
      >
        {words[wordIndex]}
      </span>
    </span>
  );
}

export default function HomeClient() {
  return (
    <main className="relative bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden">
      <div className="noise-overlay" />

      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full animate-mesh-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-[80rem] mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <LoaderIcon size={14} className="text-electric-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Premium Development Studio</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[5rem] font-extrabold text-white tracking-tight leading-[1.1]">
              We Build Software <br/>
              That Drives{" "}
              <RotatingWord />
            </h1>

            <p className="text-[17px] md:text-lg text-slate-400 max-w-2xl leading-relaxed">
              From fast-moving startups to established enterprises, we engineer scalable web applications, AI integrations, and digital platforms that deliver real business results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                Start a Project
              </Button>
              <Button href="#projects" variant="outline" className="w-full sm:w-auto gap-4">
                View Our Work 
                <LuArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 animate-bounce-soft">
          <LuChevronDown size={32} />
        </div>
      </section>

      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <PartnersSection />
      <SolutionsSection />
      <ProcessSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
