"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LuRocket, LuGlobe, LuUsers, LuTrendingUp } from "react-icons/lu";

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

const STATS = [
  { icon: <LuRocket size={24} />, label: "Projects Delivered", value: 150, suffix: "+" },
  { icon: <LuGlobe size={24} />,  label: "Countries Served",  value: 24,  suffix: "" },
  { icon: <LuUsers size={24} />, label: "Client Satisfaction", value: 98,  suffix: "%" },
  { icon: <LuTrendingUp size={24} />, label: "Years Experience", value: 8, suffix: "+" },
];

export function StatsSection() {
  return (
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
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: i * 0.2 
              }}
              className="w-14 h-14 rounded-full bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-6 border border-electric-blue/20 shadow-[0_0_30px_rgba(37,99,235,0.2)]"
            >
              {stat.icon}
            </motion.div>
            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-2">
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
