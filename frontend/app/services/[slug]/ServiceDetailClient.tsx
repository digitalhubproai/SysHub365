"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowLeft, LuCheck, LuArrowRight, LuLayers, LuCpu, LuShield } from "react-icons/lu";
import { Button } from "@/components/ui/Button";
import PremiumCard from "@/components/PremiumCard";
import { SERVICES } from "@/lib/services";
import { SERVICE_DETAILS } from "@/lib/serviceDetails";

export default function ServiceDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const service = SERVICE_DETAILS[slug];
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 6);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--obsidian-base)] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-slate-400 mb-8">The service you are looking for does not exist or has been removed.</p>
          <Link href="/services" className="text-electric-blue font-semibold hover:text-white transition-colors">
            &larr; Return to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-electric-blue selection:text-white overflow-x-hidden pt-32 pb-32 min-h-screen relative">
      <div className="noise-overlay" />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] rounded-full opacity-[0.1] blur-[120px] animate-mesh-pulse" style={{ background: `radial-gradient(circle, var(--color-electric-blue) 0%, transparent 70%)` }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full opacity-[0.1] blur-[120px]" style={{ background: `radial-gradient(circle, var(--color-vibrant-purple) 0%, transparent 70%)` }} />
      </div>

      <div className="max-w-[85rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all mb-16 font-medium group">
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to All Services
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md w-fit`}>
               <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} animate-pulse`} />
               <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} uppercase tracking-widest text-xs font-bold`}>
                 Specialized Capability
               </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[1.1]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2">
                {service.title.split(' ')[0]}
              </span>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                {service.title.substring(service.title.indexOf(' ') + 1)}
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mt-4 font-light border-l-2 border-white/10 pl-6">
              {service.longDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button href="/contact" variant="primary" size="lg">
                Consult With An Expert
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-tr ${service.gradient} opacity-30 blur-[100px] rounded-full animate-pulse`} style={{ animationDuration: '4s' }} />
            <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10 group hover:border-white/20 transition-colors duration-500">
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <LuLayers size={28} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-white">Core Features</h3>
              </div>
              <ul className="flex flex-col gap-6">
                {service.features.map((feature: string, idx: number) => (
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
                    key={idx} className="flex items-start gap-4 text-slate-300 group/item"
                  >
                    <div className={`mt-1 bg-gradient-to-br ${service.gradient} p-[1px] rounded-full shrink-0 shadow-lg`}>
                      <div className="bg-[#0f1115] p-1.5 rounded-full flex items-center justify-center group-hover/item:bg-transparent transition-colors duration-300">
                         <LuCheck className="text-white w-3 h-3" />
                      </div>
                    </div>
                    <span className="text-lg font-medium group-hover/item:text-white transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="text-center max-w-4xl mx-auto mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-electric-blue opacity-[0.03] blur-[100px] pointer-events-none" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Our Proven <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>Approach</span></h2>
            <p className="text-slate-400 text-xl font-light">A systematic, transparent methodology designed to deliver exceptional results with zero friction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.approach.map((step: any, idx: number) => (
              <PremiumCard key={idx} className="p-8 h-full relative group overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                
                <div className="text-7xl font-black text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.03)] absolute -top-2 -right-2 group-hover:scale-110 group-hover:[-webkit-text-stroke:2px_rgba(255,255,255,0.1)] transition-all duration-700 select-none">
                  {step.step}
                </div>
                
                <div className="relative z-10 flex flex-col gap-5 mt-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.02] text-white font-bold group-hover:border-white/30 transition-colors`}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">{step.desc}</p>
                  </div>
                </div>
              </PremiumCard>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 h-full"
          >
            <PremiumCard className="p-10 md:p-14 h-full relative overflow-hidden group">
              <div className={`absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t ${service.gradient} opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-700 pointer-events-none`} />
              
              <div className="flex items-center gap-5 mb-12 border-b border-white/5 pb-8 relative z-10">
                <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg`}>
                   <LuShield size={36} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tight">Why Choose Us</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                {service.benefits.map((benefit: any, idx: number) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                       <span className={`w-8 h-1 rounded-full bg-gradient-to-r ${service.gradient}`} />
                       <h4 className="text-2xl font-bold text-white">{benefit.title}</h4>
                    </div>
                    <p className="text-slate-400 text-lg leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </PremiumCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full"
          >
            <PremiumCard className="p-10 md:p-14 h-full flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay z-0" />
              <div className="flex items-center gap-5 mb-12 border-b border-white/5 pb-8 relative z-10">
                <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg`}>
                   <LuCpu size={36} className="text-white" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tight">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                {service.technologies.map((tech: string, idx: number) => (
                  <span key={idx} className="px-5 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-slate-300 font-semibold hover:border-white/30 hover:text-white hover:bg-white/[0.05] transition-all cursor-default shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <PremiumCard className="relative overflow-hidden border border-white/10 rounded-[2.5rem] p-10 md:p-14 lg:p-20">
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b ${service.gradient} opacity-10 blur-[100px] pointer-events-none`} />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr ${service.gradient} rounded-full blur-[150px] opacity-20 pointer-events-none`}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex flex-col items-start gap-6 max-w-3xl text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Ready to transform your business with our <span className={`text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>expertise?</span>
                </h2>

                <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
                  Get in touch with our specialists today to discuss your project requirements and receive a detailed consultation.
                </p>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <Button href="/contact" variant="primary" size="xl" className="w-full md:w-auto">
                  Start Your Project <LuArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </PremiumCard>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24 mb-8"
        >
          <div className="mb-10">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Keep Exploring</span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mt-3">More Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link href={`/services/${r.slug}`} key={r.slug} className="group">
                <PremiumCard className="p-8 h-full flex flex-col gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${r.gradient[0]}14, ${r.gradient[1]}14)` }} />
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center border border-white/10 shrink-0" style={{ background: `linear-gradient(135deg, ${r.gradient[0]}26, ${r.gradient[1]}26)` }}>
                      <r.icon size={20} className="text-white" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-slate-200 transition-colors leading-tight">{r.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                  <span className="relative z-10 mt-auto inline-flex items-center gap-2 text-sm font-bold text-electric-blue uppercase tracking-widest">
                    Explore <LuArrowRight size={16} />
                  </span>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
