"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BLOG_POSTS } from "@/lib/data";
import { Button } from "@/components/ui/Button";

export function BlogSection() {
  const [randomBlogs, setRandomBlogs] = useState<typeof BLOG_POSTS>([]);
  
  useEffect(() => {
    const shuffled = [...BLOG_POSTS].sort(() => 0.5 - Math.random());
    setRandomBlogs(shuffled.slice(0, 3));
  }, []);

  return (
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
          {randomBlogs.map((blog, i) => (
            <Link
              href={`/blog/${blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
              key={i}
            >
              <motion.article
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
