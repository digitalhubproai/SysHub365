"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import {
  LuArrowUpRight, LuCode, LuBrainCog, LuShieldCheck, LuCloud, LuPalette,
  LuRocket, LuChevronDown, LuStar, LuCircleCheck, LuGlobe, LuUsers, LuTrendingUp,
  LuMail, LuUser, LuMessageSquare, LuSend, LuPhone,
  LuLayoutDashboard, LuHeartHandshake, LuKey,
  LuChevronLeft, LuChevronRight
} from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { Button } from "@/components/ui/Button";
import { PROJECTS } from "@/lib/data";

/* ── HELPERS & ANIMATIONS ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    let startTs: number | null = null;
    const duration = 2000;
    
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0 overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-bold text-white group-hover:text-electric-blue transition-colors pr-8">
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="text-white/40 group-hover:text-electric-blue">
          <LuChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-slate-400 leading-relaxed pb-6 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── DATA ── */
const SERVICES = [
  { icon: <LuCode size={28} />, title: "Web Development", desc: "High-performance, scalable web applications built with React, Next.js, and modern architectures." },
  { icon: <LuBrainCog size={28} />, title: "AI Integration", desc: "Embed intelligent automation, chatbots, and generative AI into your existing business workflows." },
  { icon: <LuPalette size={28} />, title: "UI/UX Design", desc: "Beautiful, intuitive interfaces designed to maximize user engagement and conversion rates." },
  { icon: <LuCloud size={28} />, title: "Cloud Solutions", desc: "Secure, highly-available infrastructure setup on AWS and GCP with full CI/CD automation." },
  { icon: <LuRocket size={28} />, title: "MVP Sprints", desc: "Rapid prototyping and development to get your core product to market in 4-6 weeks." },
  { icon: <LuShieldCheck size={28} />, title: "Cybersecurity", desc: "Enterprise-grade security audits and implementation to protect your digital assets." },
];

const SOLUTIONS = [
  {
    icon: <LuLayoutDashboard size={28} />,
    title: "ERP Solutions",
    desc: "Unify your entire business — finance, inventory, HR, and supply chain — into one powerful, real-time ERP platform built to scale with your growth.",
  },
  {
    icon: <LuHeartHandshake size={28} />,
    title: "CRM Solutions",
    desc: "Give your sales team a 360° view of every customer. AI-powered insights, automated pipelines, and omnichannel communication in one place.",
  },
  {
    icon: <LuKey size={28} />,
    title: "Software Licensing",
    desc: "Comprehensive licensing for all types of software — from enterprise operating systems to specialized SaaS tools. We handle procurement, renewals, and compliance.",
  },
];

const STATS = [
  { icon: <LuRocket size={24} />, label: "Projects Delivered", value: 150, suffix: "+" },
  { icon: <LuGlobe size={24} />,  label: "Countries Served",  value: 24,  suffix: "" },
  { icon: <LuUsers size={24} />, label: "Client Satisfaction", value: 98,  suffix: "%" },
  { icon: <LuTrendingUp size={24} />, label: "Years Experience", value: 8, suffix: "+" },
];



const TESTIMONIALS = [
  { quote: "SysHub365 delivered our complex web app ahead of schedule. The quality of the code and the attention to design was simply outstanding.", name: "Sarah Jenkins", role: "CEO, TechFlow", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { quote: "Their AI integration completely automated our customer support triage. We saved hundreds of hours within the first month.", name: "Marcus Thorne", role: "VP Operations, NeuralSync", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { quote: "Finding a development agency that truly understands both enterprise architecture and beautiful UI is rare. SysHub365 does both perfectly.", name: "Aisha Rahman", role: "Founder, OmniStore", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

const FAQS = [
  { q: "How long does a typical project take?", a: "Project timelines vary widely. A basic MVP can take 4-6 weeks, while a full-scale enterprise platform might take 3-6 months. We provide clear timeline estimates during our discovery phase." },
  { q: "Do you design the product as well as build it?", a: "Yes. We offer end-to-end services. Our UI/UX team will create high-fidelity prototypes in Figma for your approval before our engineering team writes a single line of code." },
  { q: "Who owns the code after the project is finished?", a: "You do. Once the project is completed and final payments are cleared, 100% of the intellectual property and source code is transferred to you." },
  { q: "Do you provide ongoing support after launch?", a: "Absolutely. We offer dedicated post-launch maintenance plans to handle updates, scaling, and the addition of new features as your business grows." },
];

const BLOGS = [
  { title: "Why Next.js is the Future of Enterprise Web Apps", category: "Engineering", img: "https://images.unsplash.com/photo-1555066931-4365d14431b9?auto=format&fit=crop&q=80&w=800", date: "Apr 12, 2026" },
  { title: "How to Integrate AI Workflows into SaaS Tools", category: "Artificial Intelligence", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800", date: "Apr 5, 2026" },
  { title: "Designing High-Converting E-Commerce Interfaces", category: "UI/UX Design", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", date: "Mar 28, 2026" },
];

/* ── MAIN PAGE COMPONENT ── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  const words = ["Growth.", "Innovation.", "Success.", "Scale."];
  const [wordIndex, setWordIndex] = useState(0);
  
  // Projects Slider Native Scroll
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

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden">
      <div className="noise-overlay" />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-electric-blue/15 rounded-full blur-[150px] animate-mesh-pulse" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-power-indigo/10 rounded-full blur-[180px]" />
        </motion.div>

        <div className="max-w-[80rem] mx-auto w-full relative z-10 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="show" variants={staggerContainer} className="flex flex-col items-center gap-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
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

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
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

        {/* Scroll Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1, y: [0, 10, 0] }}
           transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <LuChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. ABOUT US */}
      <section id="about" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10 overflow-hidden">
        {/* Background ambient glows */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-electric-blue/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden group border border-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="Our Team"
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            {/* Floating Experience Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute top-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px] shadow-2xl"
            >
              <span className="text-3xl font-black text-electric-blue">8+</span>
              <span className="text-xs font-bold text-white uppercase tracking-widest text-center mt-1">Years<br/>Experience</span>
            </motion.div>

            <div className="absolute bottom-8 left-8 right-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <p className="text-white font-bold text-lg leading-snug">"Quality is not an act, it is a habit."</p>
              <div className="w-12 h-1 bg-electric-blue mt-4 mb-2 rounded-full" />
              <p className="text-white/60 text-sm uppercase tracking-widest font-semibold">— The SysHub365 Ethos</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-electric-blue font-black tracking-[0.3em] uppercase text-sm">
                <span className="w-8 h-px bg-electric-blue"></span> About Us
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Your Dedicated <br/><span className="text-gradient">Technical Partners.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-5 text-slate-400 text-base leading-relaxed">
              <p>
                SysHub365 isn&apos;t just an outsourced vendor. We integrate deeply with your business to understand your goals, target audience, and market challenges before writing a single line of code.
              </p>
              <p>
                We consist of elite software engineers, UI/UX designers, and AI specialists who have delivered solutions across Fintech, Healthcare, E-Commerce, and SaaS. We believe in sheer transparency, rapid agile delivery, and uncompromising quality.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
                { icon: <LuCircleCheck size={18} className="text-white"/>, text: "Transparent Communication", desc: "No hidden costs or technical jargon." },
                { icon: <LuCircleCheck size={18} className="text-white"/>, text: "Top 1% Engineering Talent", desc: "Rigorous vetting for excellence." },
                { icon: <LuCircleCheck size={18} className="text-white"/>, text: "Strict Quality Assurance", desc: "Automated & manual testing protocols." },
                { icon: <LuCircleCheck size={18} className="text-white"/>, text: "On-Time Delivery Guarantee", desc: "Agile sprints that meet deadlines." },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex flex-col gap-1.5 bg-white/[0.02] hover:bg-electric-blue hover:scale-[1.02] p-3.5 rounded-xl border border-white/5 hover:border-electric-blue transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="text-electric-blue group-hover:text-white transition-colors flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-white font-bold text-xs group-hover:text-white transition-colors leading-tight">{item.text}</span>
                  </div>
                  <span className="text-slate-400 text-[11px] pl-7 group-hover:text-white/80 transition-colors leading-snug">{item.desc}</span>
                </motion.div>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* 3. STATS COUNTERS */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[var(--obsidian-deep)] relative z-10">
        <div className="max-w-[90rem] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 divide-x-0 lg:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="w-14 h-14 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-6">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES / WHAT WE DO */}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <PremiumCard className="p-10 gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:bg-electric-blue group-hover:text-white transition-all duration-500 shadow-xl">
                    {s.icon}
                  </div>
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

      {/* 5. SOLUTIONS */}
      <section id="solutions" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Our Solutions</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl">
                Powerful Solutions.
              </h2>
            </div>
            <p className="text-slate-400 max-w-md text-lg">
              From enterprise resource planning to CRM and software licensing — integrated solutions that drive real outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <PremiumCard className="p-10 gap-8 items-start">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:bg-electric-blue group-hover:text-white transition-all duration-500 shadow-xl">
                    {s.icon}
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all duration-500">{s.title}</h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                      {s.desc}
                    </p>
                  </div>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-electric-blue uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      Learn More <LuArrowUpRight />
                    </span>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SHOWCASE */}
      <section id="projects" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
            <div className="flex flex-col gap-4">
              <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Portfolio</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Featured Work.</h2>
            </div>
            
            {/* Native Slider Navigation */}
            <div className="flex items-center gap-4">
              <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white hover:bg-electric-blue hover:border-electric-blue transition-colors">
                <LuChevronLeft size={24} />
              </button>
              <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white hover:bg-electric-blue hover:border-electric-blue transition-colors">
                <LuChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Premium Native Slider Container */}
          <div className="relative">
            {/* Ambient background glow for the slider */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-power-indigo/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <div 
              ref={sliderRef}
              className="flex overflow-x-auto pb-16 pt-8 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 snap-x snap-mandatory gap-6 lg:gap-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth relative z-10"
            >
              {PROJECTS.map((proj, i) => (
                <Link
                  href={`/projects/${proj.title.toLowerCase().replace(/\s+/g, '-')}`}
                  key={proj.title}
                  className="group relative flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[28vw] snap-center block h-[420px]"
                >
                  <div className="rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-electric-blue/50 transition-all duration-700 h-full w-full flex flex-col justify-end relative shadow-2xl bg-black cursor-pointer">
                    <Image 
                      src={proj.img} 
                      alt={proj.title} 
                      fill 
                      className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out z-0"
                    />
                    
                    {/* Dynamic Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/80 transition-all duration-700 z-10" />
                    
                    {/* Content Container */}
                    <div className="relative z-20 p-6 w-full flex flex-col justify-end overflow-hidden">
                      <div className="transform translate-y-[85px] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col gap-4">
                        
                        {/* Always visible titles */}
                        <div className="flex flex-col gap-1">
                          <span className="text-electric-blue text-[10px] font-black uppercase tracking-[0.3em] drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]">{proj.category}</span>
                          <h3 className="text-[1.85rem] font-black text-white leading-tight tracking-tighter">{proj.title}</h3>
                        </div>
                        
                        {/* Hover details */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 flex flex-col gap-6 h-[85px]">
                          <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed font-medium">
                            {proj.desc || "Explore the cutting-edge architectural implementation and business logic behind this elite deployment."}
                          </p>
                          
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute -inset-1.5 bg-electric-blue/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="relative w-10 h-10 rounded-full bg-electric-blue text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300">
                                <LuArrowUpRight size={22} className="text-white" />
                              </div>
                            </div>
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">View Project</span>
                          </div>
                        </div>

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

      {/* 6. TESTIMONIALS */}
      <section className="section-padding bg-[var(--obsidian-deep)] relative z-10">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Client Success</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Don&apos;t Just Take Our Word For It.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <PremiumCard className="p-10 justify-between">
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-1 text-electric-blue/60 group-hover:text-electric-blue transition-colors">
                      {[1,2,3,4,5].map(star => <LuStar key={star} fill="currentColor" size={16} />)}
                    </div>
                    <p className="text-lg text-white font-medium leading-relaxed italic group-hover:text-white transition-colors">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-12 border-t border-white/10 pt-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 group-hover:border-electric-blue transition-colors duration-500">
                      <Image src={t.img} alt={t.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{t.name}</span>
                      <span className="text-xs text-slate-400 uppercase tracking-widest">{t.role}</span>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BLOG / INSIGHTS */}
      <section className="section-padding bg-[var(--obsidian-base)] border-y border-white/5 relative z-10">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Insights</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Latest Articles.</h2>
            </div>
            <Button href="/blog" variant="outline">View All News</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BLOGS.map((blog, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group cursor-pointer flex flex-col gap-6"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                  <Image src={blog.img} alt={blog.title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                </div>
                <div className="flex flex-col gap-3 px-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                    <span className="text-electric-blue">{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-electric-blue transition-colors leading-snug">
                    {blog.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="section-padding bg-[var(--obsidian-surface)] relative z-10">
        <div className="max-w-[60rem] mx-auto flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Knowledge Base</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight">Common Questions.</h2>
          </div>
          
          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. CONTACT FORM / INITIATE CTA */}
      <section id="contact" className="section-padding bg-[var(--obsidian-deep)] border-t border-white/5 relative z-10 overflow-hidden">
        {/* Background glow for form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[200px] pointer-events-none" />
        
        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Get in touch</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight">
                Let's Build Something <br/>
                <span className="text-gradient">Extraordinary.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-lg max-w-md">
              Ready to transform your idea into a production-ready system? Fill out the form, and our lead architect will be in touch within 24 hours.
            </p>
            
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 bg-white/[0.02]">
                  <LuMail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Email Us</span>
                  <a href="mailto:hello@syshub365.com" className="text-white hover:text-electric-blue transition-colors text-lg font-medium">hello@syshub365.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="obsidian-glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Form Glow Effect inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-[80px]" />
            
            <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Full Name</label>
                  <div className="relative">
                    <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="text" placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Phone Number</label>
                  <div className="relative">
                    <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Email Address</label>
                <div className="relative">
                  <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="email" placeholder="john@company.com" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Project Details</label>
                <div className="relative">
                  <LuMessageSquare className="absolute left-4 top-5 text-white/30" />
                  <textarea placeholder="Tell us about your goals, timeline, and budget..." rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20 resize-none"></textarea>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full !rounded-xl gap-3 mt-4">
                <span>Send Message</span>
                <LuSend size={16} />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
