"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuSearch, LuMail } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { Button } from "@/components/ui/Button";
import { BLOG_POSTS } from "@/lib/data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const CATEGORIES = ["All", "AI & Healthcare", "Watch SaaS", "Agentic Automation", "Print Design", "Branding", "Logo Design"];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("All");

  const filtered = BLOG_POSTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = active === "All" || p.category === active;
    return matchesSearch && matchesCat;
  });

  const featuredPost = BLOG_POSTS[0];

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden pt-32 pb-20">
      <div className="noise-overlay" />

      {/* Unified Elite Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-[90rem] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16 gap-4">
             <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">Technical Archive</span>
             </motion.div>
             <motion.h1 
               initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}
               className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
             >
               Blog & <span className="text-gradient">Insights.</span>
             </motion.h1>
             <motion.p initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }} className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
               Sharing technical observations, architectural patterns, and strategic engineering updates.
             </motion.p>
          </div>

          {/* Featured Post Card - Full Image with Glass Overlay */}
          {featuredPost && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[75vh] md:h-[80vh] rounded-[3rem] overflow-hidden group border border-white/10 shadow-2xl"
            >
              {/* Full Background Image */}
              <Image 
                src={featuredPost.img} 
                alt={featuredPost.title} 
                fill 
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[6s] ease-out" 
                priority
              />
              
              {/* Gradient Scrims for Readability - Enhanced for non-glass layout */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/90 via-[#05070a]/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent z-10" />

              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-6 md:p-16 lg:p-24">
                 <div className="max-w-2xl flex flex-col gap-5 lg:gap-6">
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-[10px] font-bold text-electric-blue uppercase tracking-[0.2em]">
                        Featured Insight
                      </span>
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                        {featuredPost.date} — {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
                      {featuredPost.title}
                    </h2>

                    <p className="text-base md:text-lg text-slate-400 leading-relaxed font-medium line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-6 pt-2">
                        <Button 
                          href={`/blog/${featuredPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} 
                          variant="primary" 
                          size="md"
                          className="!px-10"
                        >
                          Keep Reading
                        </Button>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

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

      {/* Article Grid */}
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
                  <Link href={`/blog/${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                    <PremiumCard className="p-6 gap-6 cursor-pointer group h-full">
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
                  </Link>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                 Subscribe for Technical Updates.
              </h2>
              <p className="text-lg text-slate-400 max-w-xl">
                 Get high-quality architectural research and insight reports delivered directly to your transmission feed.
              </p>
            </div>
            
            <div className="relative w-full max-w-lg mt-4 group">
               <input 
                 placeholder="Enter email address" 
                 className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-8 pr-40 text-white focus:outline-none focus:border-electric-blue transition-all placeholder:text-slate-600" 
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
