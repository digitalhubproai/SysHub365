"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LuTarget, LuUsers, LuLightbulb, LuShield, LuMapPin, LuChevronRight, LuCircleCheck, LuArrowUpRight } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { GradientIcon } from "@/components/GradientIcon";
import { Button } from "@/components/ui/Button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

const VALUES = [
  { icon: <LuTarget size={28} />, title: "Precision", desc: "We aim for absolute technical accuracy in every line of code we ship.", gradient: ["#3b82f6", "#06b6d4"], id: "v-prec" },
  { icon: <LuUsers size={28} />, title: "Collaboration", desc: "Your goals are our goals. We work as an extension of your own team.", gradient: ["#8b5cf6", "#d946ef"], id: "v-coll" },
  { icon: <LuLightbulb size={28} />, title: "Innovation", desc: "Constantly exploring the boundaries of AI and cloud architecture.", gradient: ["#fb923c", "#f43f5e"], id: "v-inno" },
  { icon: <LuShield size={28} />, title: "Security", desc: "Protection of your data and reputation is our primary directive.", gradient: ["#ef4444", "#8b5cf6"], id: "v-sec" },
];

export default function About() {
  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-neon-accent selection:text-black overflow-x-hidden pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none z-0">          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-electric-blue/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-electric-blue/10 rounded-full blur-[180px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 lg:px-24 py-16 overflow-hidden flex flex-col justify-center">
        <div className="max-w-[75rem] mx-auto w-full relative z-10 text-center flex flex-col items-center gap-8">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
             <span className="text-xs font-bold uppercase tracking-widest text-white/80">Our Vision & Mission</span>
          </motion.div>
          
          <motion.h1 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-tight"
          >
            Engineering The <br/>
            <span className="text-gradient">Next Standard.</span>
          </motion.h1>
          
          <motion.p 
            initial="hidden" animate="show" variants={fadeUp} 
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }} 
            className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed"
          >
            SysHub365 is a premier software engineering house. We are digital architects building high-integrity systems for the next era of global infrastructure.
          </motion.p>
        </div>
      </section>

      {/* Mission & Purpose (Enhanced About Us) */}
      <section id="about" className="py-24 px-6 md:px-12 lg:px-24 relative z-10 overflow-hidden">
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
                <span className="w-8 h-px bg-electric-blue"></span> Who We Are
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

      {/* Core Values - NOW USING HOMEPAGE CARD STYLE */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-[var(--obsidian-surface)] border-y border-white/5">
        <div className="max-w-[90rem] mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-6 items-center text-center">
             <span className="text-electric-blue font-black tracking-[0.4em] uppercase text-sm">Core Principles</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">Our Values & Culture.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1, duration: 0.8 }} viewport={{ once: true }} 
              >
                <PremiumCard className="p-10 gap-8 items-start">
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 3, -3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut", 
                      delay: i * 0.1 
                    }}
                    className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)] group-hover:border-white/20"
                  >
                    <GradientIcon icon={v.icon} id={v.id} colors={v.gradient} />
                  </motion.div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-gradient transition-all duration-500">{v.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed group-hover:text-slate-200 transition-colors">{v.desc}</p>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Presence */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-[var(--obsidian-base)]">
        <div className="max-w-[90rem] mx-auto relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/10 group">
           <Image src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2500" alt="Karachi Office" fill className="object-cover opacity-30 transition-transform duration-[3s] group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-r from-[var(--obsidian-base)] via-transparent to-transparent flex items-center px-10 md:px-24">
              <div className="max-w-2xl flex flex-col gap-8">
                 <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                   From Karachi <br/> to the Global Stage.
                 </h2>
                 <p className="text-xl text-slate-300 leading-relaxed">
                   Founded on the principles of speed and stability, we have grown from a local laboratory to a global powerhouse, serving clients with specialized digital solutions.
                 </p>
                 <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                       <LuGlobe size={20} className="text-electric-blue" />
                       <span className="text-xs font-bold uppercase tracking-widest text-white">Global Nodes</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-40 bg-[var(--obsidian-deep)] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)] animate-pulse" />
        <div className="max-w-[50rem] mx-auto text-center flex flex-col items-center gap-12 relative z-10 px-6">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Build <br/> 
            <span className="text-gradient">Something Exceptional?</span>
          </h2>
          <Button href="/contact" variant="primary">
            Get in Touch
          </Button>
        </div>
      </section>
    </main>
  );
}
