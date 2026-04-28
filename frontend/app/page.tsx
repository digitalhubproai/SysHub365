"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { LuArrowUpRight, LuChevronDown } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { LoaderIcon } from "@/components/ui/loader-icon";

// Dynamically import sections below the fold to reduce initial DOM size and JS execution
const AboutSection = dynamic(() => import("@/components/sections/AboutSection").then(m => m.AboutSection), { ssr: true });
const StatsSection = dynamic(() => import("@/components/sections/StatsSection").then(m => m.StatsSection), { ssr: true });
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection").then(m => m.ServicesSection), { ssr: true });
const PartnersSection = dynamic(() => import("@/components/sections/PartnersSection").then(m => m.PartnersSection), { ssr: true });
const SolutionsSection = dynamic(() => import("@/components/sections/SolutionsSection").then(m => m.SolutionsSection), { ssr: true });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(m => m.ProjectsSection), { ssr: true });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection").then(m => m.TestimonialsSection), { ssr: true });
const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then(m => m.BlogSection), { ssr: true });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection").then(m => m.FAQSection), { ssr: true });
const ContactSection = dynamic(() => import("@/components/sections/ContactSection").then(m => m.ContactSection), { ssr: true });

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  const words = ["Growth.", "Innovation.", "Success.", "Scale."];
  const [wordIndex, setWordIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden">
      <div className="noise-overlay" />

      {/* 1. HERO SECTION (Critical for LCP) */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, willChange: "transform, opacity" }} className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full animate-mesh-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }} />
        </motion.div>

        <div className="max-w-[80rem] mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="flex flex-col items-center gap-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <LoaderIcon size={14} className="text-electric-blue" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Premium Development Studio</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-[4rem] lg:text-[5rem] font-extrabold text-white tracking-tight leading-[1.1]">
              We Build Software <br/>
              That Drives{" "}
              <span className="inline-grid sm:text-left text-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={words[wordIndex]}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-gradient"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[17px] md:text-lg text-slate-400 max-w-2xl leading-relaxed">
              From fast-moving startups to established enterprises, we engineer scalable web applications, AI integrations, and digital platforms that deliver real business results.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              <Button href="#contact" variant="primary" className="w-full sm:w-auto">
                Start a Project
              </Button>
              <Button href="#projects" variant="outline" className="w-full sm:w-auto gap-4">
                View Our Work 
                <LuArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1, y: [0, 15, 0] }}
           transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <LuChevronDown size={32} />
        </motion.div>
      </section>

      {/* Sections below the fold are dynamically imported */}
      <AboutSection />
      <StatsSection />
      <ServicesSection />
      <PartnersSection />
      <SolutionsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
