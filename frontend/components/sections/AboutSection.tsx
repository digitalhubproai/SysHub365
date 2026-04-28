"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LuCircleCheck } from "react-icons/lu";

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-24 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square sm:aspect-video lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden group border border-white/10"
        >
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="Our Team"
            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute top-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[120px] shadow-2xl"
          >
            <span className="text-3xl font-black text-electric-blue">8+</span>
            <span className="text-xs font-bold text-white uppercase tracking-widest text-center mt-1">Years<br/>Experience</span>
          </motion.div>

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 border border-white/10 rounded-xl sm:rounded-2xl bg-black/40 backdrop-blur-xl p-5 sm:p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <p className="text-white font-bold text-sm sm:text-lg leading-snug">"Quality is not an act, it is a habit."</p>
            <div className="w-10 h-1 bg-electric-blue mt-3 sm:mt-4 mb-2 rounded-full" />
            <p className="text-white/60 text-[10px] sm:text-sm uppercase tracking-widest font-semibold">— The SysHub365 Ethos</p>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {[
              { text: "Transparent Communication", desc: "No hidden costs or technical jargon." },
              { text: "Top 1% Engineering Talent", desc: "Rigorous vetting for excellence." },
              { text: "Strict Quality Assurance", desc: "Automated & manual testing protocols." },
              { text: "On-Time Delivery Guarantee", desc: "Agile sprints that meet deadlines." },
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
                    <LuCircleCheck size={18} />
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
  );
}
