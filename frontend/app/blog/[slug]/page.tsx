"use client";

import { BLOG_POSTS } from "@/lib/data";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import { LuArrowLeft, LuUser, LuCalendar, LuShare2, LuBookmark } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function BlogDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const post = BLOG_POSTS.find(p => p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!post) {
    return null; // Next.js handle 404 in layout or via notFound()
  }

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white min-h-screen pt-32 pb-20 overflow-x-hidden">
      <div className="noise-overlay" />
      
      {/* Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-electric-blue origin-left z-[100]" style={{ scaleX }} />

      {/* Background Aesthetic Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[150px] animate-mesh-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-power-indigo/10 rounded-full blur-[180px]" />
      </div>

      <div className="max-w-[70rem] mx-auto px-6 relative z-10">
        {/* Navigation & Actions */}
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="flex items-center justify-between mb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-electric-blue group-hover:bg-electric-blue/10 transition-all">
                <LuArrowLeft size={18} />
             </div>
             <span className="font-bold uppercase tracking-widest text-xs">Back to Archive</span>
          </Link>

          <div className="flex items-center gap-4">
             <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all">
                <LuBookmark size={18} />
             </button>
             <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-all">
                <LuShare2 size={18} />
             </button>
          </div>
        </motion.div>
        
        {/* Article Header */}
        <div className="max-w-[55rem] mx-auto text-center mb-16">
          <motion.div 
            initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="px-4 py-1.5 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-electric-blue text-[10px] font-black uppercase tracking-[0.2em]">
              {post.category}
            </span>
            <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              {post.readTime} Read
            </span>
          </motion.div>

          <motion.h1 
            initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-10"
          >
            {post.title}
          </motion.h1>

          <motion.div 
            initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-8 pt-8 border-t border-white/5"
          >
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center text-electric-blue font-bold text-xs">
                  {post.author.charAt(0)}
                </div>
                <div className="flex flex-col items-start">
                   <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Author</span>
                   <span className="text-white font-bold">{post.author}</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
                  <LuCalendar size={18} />
                </div>
                <div className="flex flex-col items-start">
                   <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Published</span>
                   <span className="text-white font-bold">{post.date}</span>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[16/8] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl mb-24 bg-[var(--obsidian-deep)] group"
        >
          <Image 
            src={post.img}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-[5s] group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-base)]/50 to-transparent" />
        </motion.div>
        
        {/* Article Content */}
        <div className="max-w-[50rem] mx-auto">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="prose prose-invert prose-lg max-w-none"
          >
             <p className="text-2xl md:text-3xl text-white font-bold leading-tight mb-12 border-l-4 border-electric-blue pl-8 italic">
                {post.excerpt}
             </p>
             <div className="text-slate-300 leading-relaxed text-lg space-y-10 font-medium">
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:text-electric-blue first-letter:mr-3 first-letter:float-left">
                    {para}
                  </p>
                ))}
             </div>
          </motion.div>

          {/* Newsletter / CTA Section */}
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
            className="mt-32 pt-16 border-t border-white/10"
          >
             <div className="obsidian-glass rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center gap-8 relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-power-indigo/10 rounded-full blur-[60px]" />
                
                <div className="w-16 h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-2">
                   <LuShare2 size={28} />
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight relative z-10">
                  Join the Technical <br/><span className="text-gradient">Transmission.</span>
                </h3>
                <p className="text-slate-400 max-w-md text-lg relative z-10 font-medium">
                  Stay updated with our latest architectural research and engineering breakthroughs.
                </p>
                
                <form className="relative w-full max-w-lg mt-4 z-10 group" onSubmit={(e) => e.preventDefault()}>
                   <input 
                     placeholder="Enter your email" 
                     className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-8 pr-40 text-white focus:outline-none focus:border-electric-blue transition-all placeholder:text-slate-600 font-bold" 
                   />
                   <Button variant="primary" className="absolute right-3 top-1/2 -translate-y-1/2 !px-8 !py-3 !rounded-xl">
                     Subscribe
                   </Button>
                </form>
             </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
