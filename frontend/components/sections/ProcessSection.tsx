"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/services";
import { SERVICE_DETAILS, type ServiceDetail } from "@/lib/serviceDetails";

type Phase = {
  phase: string;
  duration: string;
  title: string;
  desc: string;
  deliverables: string[];
};

const CARD_DURATIONS = ["1 Week", "1–2 Weeks", "2–6 Weeks", "Ongoing"];

const FEATURED_SERVICE_SLUGS = ["web-development", "ai-integration", "ui-ux-design", "digital-marketing"];
const FEATURED_SERVICES = SERVICES.filter((s) => FEATURED_SERVICE_SLUGS.includes(s.slug));

function buildPhases(detail: ServiceDetail): Phase[] {
  const pool = [...detail.features, ...detail.technologies];
  const pick = (k: number) => pool[k % pool.length];
  return detail.approach.map((a, i) => ({
    phase: a.step,
    duration: CARD_DURATIONS[i] ?? "Ongoing",
    title: a.title,
    desc: a.desc,
    deliverables: [pick(i * 3), pick(i * 3 + 1), pick(i * 3 + 2)],
  }));
}

type Wire = { id: number; x1: number; y1: number; x2: number; y2: number };

function wireD(w: Wire) {
  const dir = Math.sign(w.x1 - w.x2) || 1;
  const k = Math.min(Math.abs(w.x1 - w.x2) * 0.4, 140);
  return `M ${w.x2} ${w.y2} C ${w.x2 + dir * k} ${w.y2}, ${w.x1 - dir * k} ${w.y1}, ${w.x1} ${w.y1}`;
}

function PhaseCard({ p, index }: { p: Phase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className="group relative"
    >
      <div
        data-card
        className="relative flex flex-col gap-2.5 p-4 sm:gap-3 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-electric-blue/40 transition-colors duration-500 w-full overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(59,130,246,0.14), transparent 70%)" }}
        />
        <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-electric-blue via-sky-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
        <span className="pointer-events-none absolute right-4 top-2 select-none font-extrabold text-[64px] leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-electric-blue/[0.09]">
          0{index + 1}
        </span>

        <div className="flex items-center justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold text-white/10 leading-none">0{index + 1}</span>
          <span className="px-2.5 py-0.5 rounded-full border border-electric-blue/30 bg-electric-blue/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-electric-blue">
            {p.duration}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-[9px] sm:text-[10px]">Phase {p.phase}</span>
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight transition-colors duration-300 group-hover:text-electric-blue/90">{p.title}</h3>
          <p className="text-[12px] sm:text-[13px] text-slate-400 leading-relaxed">{p.desc}</p>
        </div>

        <ul className="flex flex-col gap-2 pt-3 border-t border-white/5">
          {p.deliverables.map((d, idx) => (
            <motion.li
              key={d}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + idx * 0.1, duration: 0.4 }}
              className="flex items-center gap-2 text-[12px] sm:text-[13px] text-slate-300 transition-transform duration-300 group-hover:translate-x-1"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-md border border-white/10 text-[9px] sm:text-[10px] font-bold text-electric-blue transition-colors duration-300 group-hover:border-electric-blue/40 group-hover:bg-electric-blue/10">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {d}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const [active, setActive] = useState(FEATURED_SERVICES[0].slug);
  const service = FEATURED_SERVICES.find((s) => s.slug === active) ?? FEATURED_SERVICES[0];
  const phases = buildPhases(SERVICE_DETAILS[service.slug] ?? SERVICE_DETAILS[FEATURED_SERVICE_SLUGS[0]]);

  const diagramRef = useRef<HTMLDivElement>(null);
  const [wires, setWires] = useState<Wire[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    const d = diagram.getBoundingClientRect();

    const hubEl = Array.from(diagram.querySelectorAll<HTMLElement>("[data-hub]")).find((el) => el.offsetWidth > 0);
    if (!hubEl) return;
    const h = hubEl.getBoundingClientRect();

    const hubX = h.left + h.width / 2 - d.left;
    const hubY = h.top + h.height / 2 - d.top;

    const cards = Array.from(diagram.querySelectorAll<HTMLElement>("[data-card]")).filter((el) => el.offsetWidth > 0);
    const next: Wire[] = cards.map((card, i) => {
      const c = card.getBoundingClientRect();
      const isLeft = c.left + c.width / 2 < h.left + h.width / 2;
      return {
        id: i,
        x1: hubX,
        y1: hubY,
        x2: (isLeft ? c.right : c.left) - d.left,
        y2: c.top - d.top + c.height / 2,
      };
    });
    setWires(next);
    setSize({ width: d.width, height: d.height });
  }, []);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(diagram);
    return () => ro.disconnect();
  }, [measure]);

  useLayoutEffect(() => {
    measure();
  }, [service.slug, measure]);

  return (
    <section id="process" className="section-padding bg-[var(--obsidian-surface)] border-y border-white/5 relative z-10">
      <div className="max-w-[90rem] mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Process & Methodology</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-2xl">
              How We Execute Every Build.
            </h2>
          </div>
          <p className="text-slate-400 max-w-md text-lg">
            Pick a service to see the exact phases we run — from discovery to launch.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {FEATURED_SERVICES.map((s) => {
            const isActive = s.slug === active;
            const Icon = s.icon;
            return (
              <button
                key={s.slug}
                onClick={() => setActive(s.slug)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white"
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${s.gradient[0]}22, ${s.gradient[1]}22)`,
                        borderColor: `${s.gradient[0]}66`,
                        boxShadow: `0 0 24px ${s.gradient[0]}40`,
                      }
                    : undefined
                }
              >
                <Icon className="text-lg" style={isActive ? { color: s.gradient[0] } : undefined} />
                {s.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center text-center">
          <p className="max-w-2xl text-slate-400">{service.desc}</p>
        </div>

        <div className="relative" ref={diagramRef}>
          {size.width > 0 && (
            <svg
              className="absolute inset-0 z-10 pointer-events-none"
              width={size.width}
              height={size.height}
              viewBox={`0 0 ${size.width} ${size.height}`}
              fill="none"
            >
              <defs>
                <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="cometGlow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="sharp" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="mid" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="34" result="ambient" />
                  <feMerge>
                    <feMergeNode in="ambient" />
                    <feMergeNode in="mid" />
                    <feMergeNode in="sharp" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {wires.map((w) => (
                  <linearGradient
                    key={`wg-${w.id}`}
                    id={`wireGrad-${w.id}`}
                    gradientUnits="userSpaceOnUse"
                    x1={w.x1}
                    y1={w.y1}
                    x2={w.x2}
                    y2={w.y2}
                  >
                    <stop offset="0%" stopColor={service.gradient[0]} />
                    <stop offset="55%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor={service.gradient[1]} />
                  </linearGradient>
                ))}
              </defs>

              {wires.map((w) => {
                const d = wireD(w);
                return (
                  <g key={w.id}>
                    <motion.path
                      id={`wirePath-${w.id}`}
                      d={d}
                      stroke={`url(#wireGrad-${w.id})`}
                      strokeWidth={10}
                      opacity={0.06}
                      strokeLinecap="round"
                      filter="url(#cometGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                    />
                    <motion.path
                      d={d}
                      stroke={`url(#wireGrad-${w.id})`}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                    />
                    <motion.path
                      d={d}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth={0.75}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                    />

                    <g>
                      <path d={d} pathLength={1000} stroke={`url(#wireGrad-${w.id})`} strokeWidth={5} opacity={0.4} strokeDasharray="150 850" strokeLinecap="round" fill="none" filter="url(#cometGlow)">
                        <animate attributeName="stroke-dashoffset" from="0" to="-1000" dur="2.2s" begin={String(w.id * 0.35)} repeatCount="indefinite" />
                      </path>
                      <path d={d} pathLength={1000} stroke="#e0f2fe" strokeWidth={2.2} strokeDasharray="60 940" strokeLinecap="round" fill="none">
                        <animate attributeName="stroke-dashoffset" from="0" to="-1000" dur="1.8s" begin={String(w.id * 0.35)} repeatCount="indefinite" />
                      </path>
                    </g>

                    {[0, 1].map((pIdx) => (
                      <circle key={pIdx} r={pIdx === 1 ? 2 : 1.6} fill={pIdx === 1 ? "#ffffff" : service.gradient[0]} filter="url(#dotGlow)">
                        <animateMotion dur={String(2.2 + pIdx * 0.45)} begin={`-${(w.id * 0.4 + pIdx * 0.6).toFixed(2)}s`} repeatCount="indefinite">
                          <mpath href={`#wirePath-${w.id}`} />
                        </animateMotion>
                      </circle>
                    ))}

                    <g transform={`translate(${w.x2}, ${w.y2})`}>
                      <circle r={16} fill="none" stroke={service.gradient[0]} strokeWidth={1.2} opacity={0.3}>
                        <animate attributeName="r" values="6;22;6" dur="2.4s" begin={String(w.id * 0.4)} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" begin={String(w.id * 0.4)} repeatCount="indefinite" />
                      </circle>
                      <circle r={9} fill="none" stroke="#60a5fa" strokeWidth={1.4} opacity={0.5}>
                        <animate attributeName="r" values="4;14;4" dur="1.8s" begin={String(w.id * 0.4)} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.8s" begin={String(w.id * 0.4)} repeatCount="indefinite" />
                      </circle>
                      <circle r={4} fill={service.gradient[0]} filter="url(#dotGlow)" />
                      <circle r={1.5} fill="#ffffff" />
                    </g>
                  </g>
                );
              })}

            </svg>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              onAnimationComplete={() => measure()}
              className="relative z-20"
            >
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:items-stretch">
                <div className="flex flex-col gap-6 col-span-4">
                  {phases.slice(0, 2).map((p, i) => (
                    <PhaseCard key={p.phase} p={p} index={i} />
                  ))}
                </div>

                <div className="col-span-4 flex items-center justify-center">
                  <div
                    data-hub
                    className="relative z-20 w-auto h-auto flex items-center justify-center"
                  >
                    <img src="/images/logo.png" alt="SysHub365" className="w-40 h-auto object-contain mix-blend-screen drop-shadow-[0_0_20px_rgba(59,130,246,0.35)]" />
                  </div>
                </div>

                <div className="flex flex-col gap-6 col-span-4">
                  {phases.slice(2, 4).map((p, i) => (
                    <PhaseCard key={p.phase} p={p} index={i + 2} />
                  ))}
                </div>
              </div>

              <div className="lg:hidden grid grid-cols-2 gap-4 items-stretch">
                {phases.slice(0, 2).map((p, i) => (
                  <PhaseCard key={p.phase} p={p} index={i} />
                ))}
              </div>

              <div className="lg:hidden flex justify-center py-4">
                <div data-hub className="relative flex items-center justify-center">
                  <img src="/images/logo.png" alt="SysHub365" className="w-32 h-auto object-contain mix-blend-screen" />
                </div>
              </div>

              <div className="lg:hidden grid grid-cols-2 gap-4 items-stretch">
                {phases.slice(2, 4).map((p, i) => (
                  <PhaseCard key={p.phase} p={p} index={i + 2} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
