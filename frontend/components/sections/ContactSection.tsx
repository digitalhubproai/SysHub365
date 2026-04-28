"use client";

import { motion } from "framer-motion";
import { LuMail, LuPhone, LuUser, LuMessageSquare } from "react-icons/lu";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-[var(--obsidian-deep)] border-t border-white/5 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }} />
      
      <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-electric-blue font-black tracking-[0.3em] uppercase text-sm">Get in touch</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Let's Build Something <br/>
              <span className="text-gradient">Extraordinary.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-lg max-w-md">
            Ready to transform your idea into a production-ready system? Fill out the form, and our lead architect will be in touch within 24 hours.
          </p>
          
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 bg-white/[0.02]">
                <LuMail size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Email Us</span>
                <a href="mailto:hello@syshub365.com" className="text-white hover:text-electric-blue transition-colors text-lg font-medium">hello@syshub365.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 bg-white/[0.02]">
                <LuPhone size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Call Us</span>
                <a href="tel:+923356660365" className="text-white hover:text-electric-blue transition-colors text-lg font-medium">+92 335 6660365</a>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="obsidian-glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)' }} />
          
          <form className="relative z-10 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Full Name</label>
                <div className="relative">
                  <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="text" placeholder="John Doe" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Phone Number</label>
                <div className="relative">
                  <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Email Address</label>
              <div className="relative">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input type="email" placeholder="john@company.com" className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest pl-2">Project Details</label>
              <div className="relative">
                <LuMessageSquare className="absolute left-4 top-5 text-white/30" />
                <textarea placeholder="Tell us about your goals, timeline, and budget..." rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-electric-blue transition-colors placeholder:text-white/20 resize-none"></textarea>
              </div>
            </div>

            <button type="submit" className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-[0.98]">
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
