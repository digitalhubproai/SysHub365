"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { LuMail, LuMapPin, LuPhone, LuSend, LuUser, LuMessageSquare, LuBuilding2, LuChevronRight, LuCheck, LuTriangleAlert } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";
import { Button } from "@/components/ui/Button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null, text: string }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, text: "" });

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus({ type: "success", text: "Message sent successfully! We'll get back to you soon." });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({ type: "error", text: "Something went wrong. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[var(--obsidian-base)] selection:bg-neon-accent selection:text-black overflow-x-hidden pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">         <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-electric-blue/10 rounded-full blur-[150px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-vibrant-purple/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 lg:px-24 py-16 overflow-hidden flex flex-col justify-center">
        <div className="max-w-[90rem] mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 flex flex-col gap-12 pt-8">
            <div className="flex flex-col gap-6">
              <motion.div initial="hidden" animate="show" variants={fadeUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md self-start">
                 <span className="text-xs font-bold uppercase tracking-widest text-white/80">Get in Touch</span>
              </motion.div>
              <motion.h1 
                initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight"
              >
                Let&apos;s Build <br/>
                <span className="text-gradient">Something Great.</span>
              </motion.h1>
              <motion.p 
                initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed"
              >
                Ready to start your next project? Whether you need a full development squad or a technical consultation, we are here to help.
              </motion.p>
            </div>

            <motion.div 
               initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.3 }}
               className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
            >
               <div className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue transition-transform group-hover:scale-105">
                     <LuMail size={24} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Us</span>
                     <a href="mailto:hello@syshub365.com" className="text-lg font-bold text-white hover:text-electric-blue transition-colors">hello@syshub365.com</a>
                  </div>
               </div>

               <div className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue transition-transform group-hover:scale-105">
                     <LuPhone size={24} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Call Us</span>
                     <a href="tel:+923000000000" className="text-lg font-bold text-white hover:text-electric-blue transition-colors">+92 300 0000000</a>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 w-full"
          >
            <PremiumCard className="p-8 md:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                  <LuBuilding2 size={100} className="text-white" />
              </div>
              
              <div className="flex flex-col gap-10 relative z-10">
                  <div className="flex flex-col gap-2 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Send a Message</h2>
                    <p className="text-sm text-slate-500">We will get back to you within 24 hours.</p>
                  </div>

                  <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    {/* Full Name & Phone Number */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest px-2">Full Name</label>
                        <div className="relative">
                          <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-white/60 uppercase tracking-widest px-2">Phone Number</label>
                        <div className="relative">
                          <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest px-2">Email Address</label>
                      <div className="relative">
                        <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-white/60 uppercase tracking-widest px-2">Project Details</label>
                      <div className="relative">
                        <LuMessageSquare className="absolute left-4 top-5 text-white/30" size={18} />
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project, timeline, and requirements..."
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20 resize-none"
                        />
                      </div>
                    </div>
                    {status.type && (
                      <div className={`flex items-center gap-3 p-4 rounded-xl border ${
                        status.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                      }`}>
                        {status.type === "success" ? <LuCheck size={18} /> : <LuTriangleAlert size={18} />}
                        <span className="text-sm font-medium">{status.text}</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary"
                      disabled={isSubmitting}
                      className="w-full !rounded-xl gap-3 mt-4"
                    >
                      <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <LuSend size={18} className={isSubmitting ? "animate-pulse" : "group-hover:translate-x-1 transition-transform"} />
                    </Button>
                  </form>
              </div>
            </PremiumCard>
          </motion.div>
        </div>
      </section>

      {/* Global Locations */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
         <div className="max-w-[90rem] mx-auto flex flex-col gap-16">
            <div className="flex flex-col gap-4 text-center md:text-left">
               <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Our Offices</span>
               <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">Global Presence.</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                {[
                  { city: "Karachi", loc: "Shahrah-e-Faisal HQ", status: "Operational Hub" },
                  { city: "Doha", loc: "Digital District", status: "Strategic Center" }
                ].map((node, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  >
                    <PremiumCard className="p-10 gap-10 flex flex-col">
                      <div className="flex justify-between items-start">
                          <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue transition-all group-hover:bg-electric-blue group-hover:text-white">
                            <LuMapPin size={24} />
                          </div>
                          <span className="text-xs font-bold text-electric-blue uppercase tracking-widest">{node.status}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                          <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-gradient transition-all duration-500">{node.city}</h3>
                          <p className="text-slate-500 font-medium text-lg group-hover:text-slate-300 transition-colors">{node.loc}</p>
                      </div>
                      <div className="flex items-center gap-2 text-electric-blue text-xs font-bold tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                          View Map <LuChevronRight size={14} />
                      </div>
                    </PremiumCard>
                  </motion.div>
                ))}
            </div>
         </div>
      </section>
    </main>
  );
}
