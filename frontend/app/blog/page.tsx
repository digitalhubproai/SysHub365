"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuSearch, LuMail, LuFilter } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { Button } from "@/components/ui/Button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const CATEGORIES = ["All", "Engineering", "Artificial Intelligence", "UI/UX Design", "Cloud Systems", "Business Strategy"];

const POSTS = [
  {
    title: "Why Next.js is the Future of Enterprise Web Apps",
    excerpt: "Exploring the technical advantages of SSR, SSG, and edge computing for complex, high-traffic applications.",
    date: "12 Apr 2026", category: "Engineering", readTime: "8 min",
    featured: true,
    img: "https://images.unsplash.com/photo-1555066931-4365d14431b9?auto=format&fit=crop&q=80&w=1200",
    author: "Sofia Chen"
  },
  {
    title: "How to Integrate AI Workflows into SaaS Tools",
    excerpt: "A practical guide to deploying custom LLMs and automated decision-making engines into existing platforms.",
    date: "05 Apr 2026", category: "Artificial Intelligence", readTime: "12 min",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=1200",
    author: "Lena Kovac"
  },
  {
    title: "Designing High-Converting E-Commerce Interfaces",
    excerpt: "Data-driven UI/UX strategies that reduce cart abandonment and increase lifetime user value.",
    date: "28 Mar 2026", category: "UI/UX Design", readTime: "6 min",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    author: "Daniel Osei"
  },
  {
    title: "Zero-Trust Engineering: Security at the Core",
    excerpt: "Implementing zero-trust architectures to protect sensitive data in cloud-native applications.",
    date: "15 Mar 2026", category: "Cloud Systems", readTime: "10 min",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    author: "Alex Carter"
  },
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const filtered = POSTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = active === "All" || p.category === active;
    return matchesSearch && matchesCat;
  });

  const featuredPost = POSTS.find(p => p.featured);

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-neon-accent selection:text-white overflow-x-hidden pt-32 pb-20">
      <div className="noise-overlay" />

      {/* Hero Header */}
      <section className="relative px-6 md:px-12 lg:px-24 py-16 overflow-hidden flex flex-col items-center text-center">
        <div className="max-w-[75rem] mx-auto flex flex-col gap-8">
           <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">Technical Archive</span>
           </motion.div>
           <motion.h1 
             initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight"
           >
             Our Blog & <span className="text-gradient">Insights.</span>
           </motion.h1>
           <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
             Sharing technical observations, architectural patterns, and strategic engineering updates from our lead experts.
           </motion.p>
        </div>
      </section>

      {/* Featured Section - Refined to match site style */}
      {featuredPost && (
        <section className="px-6 md:px-12 lg:px-24 pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
            className="max-w-[90rem] mx-auto relative h-[60vh] md:h-[70vh] rounded-[2.5rem] overflow-hidden group border border-white/10"
          >
            <Image src={featuredPost.img} alt={featuredPost.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-[3s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian-base)] via-transparent to-transparent flex flex-col justify-end p-8 md:p-16">
               <div className="flex flex-col gap-6 max-w-3xl">
                  <span className="text-xs font-bold text-electric-blue uppercase tracking-widest">Featured Insight</span>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 pt-4">
                      <Button href="#" variant="primary" className="!px-10 !py-4 text-sm">
                        Keep Reading
                      </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="px-6 md:px-12 lg:px-24 py-12 sticky top-20 z-40 bg-[var(--obsidian-base)]/80 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 whitespace-nowrap border ${
                    active === cat 
                      ? "text-black bg-white border-white" 
                      : "text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
           
           <div className="relative w-full md:w-80">
              <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..." 
                className="w-full bg-white/[0.03] border border-white/10 rounded-full py-4 pl-12 pr-6 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-slate-600 text-sm"
              />
           </div>
        </div>
      </section>

      {/* Article Grid - NOW MATCHING HOMEPAGE STYLE */}
      <section className="px-6 md:px-12 lg:px-24 py-24 relative z-10">
        <div className="max-w-[90rem] mx-auto">
          {filtered.length === 0 ? (
            <div className="h-80 flex flex-col items-center justify-center gap-4 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <LuSearch size={48} className="text-slate-700" />
              <p className="text-xl font-bold text-slate-500">No results matched your query.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                >
                  <PremiumCard className="p-6 gap-6">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-black">
                      <Image
                        src={post.img} fill alt={post.title}
                        className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>

                    <div className="flex flex-col gap-4 flex-grow">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <span className="text-electric-blue">{post.category}</span>
                        <span>{post.date}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-white leading-snug group-hover:text-electric-blue transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 font-medium leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="pt-6 mt-auto border-t border-white/5 flex items-center justify-between">
                         <span className="text-xs font-bold text-white/50 tracking-widest uppercase">By {post.author}</span>
                         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-electric-blue transition-all">
                            <LuArrowUpRight size={20} />
                         </div>
                      </div>
                    </div>
                  </PremiumCard>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Protocol */}
      <section className="py-32 bg-[var(--obsidian-deep)] relative overflow-hidden border-t border-white/5">
         <div className="max-w-[90rem] mx-auto flex flex-col items-center text-center gap-10 px-6">
            <div className="w-16 h-16 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue">
               <LuMail size={28} />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                 Subscribe for Technical Updates.
              </h2>
              <p className="text-lg text-slate-400 max-w-xl">
                 Get high-quality architectural research and insight reports delivered directly to your transmission feed.
              </p>
            </div>
            
            <div className="relative w-full max-w-lg mt-4 group">
               <input 
                 placeholder="Enter email address" 
                 className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-8 text-white focus:outline-none focus:border-electric-blue transition-all placeholder:text-slate-600" 
               />
                <Button variant="shimmer" className="absolute right-3 top-1/2 -translate-y-1/2 !px-8 !py-3 !rounded-xl">
                   Subscribe
                </Button>
            </div>
         </div>
      </section>
    </main>
  );
}
