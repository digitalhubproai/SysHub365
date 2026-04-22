import { LuSignature, LuGavel, LuScale, LuBriefcase, LuArrowUpRight } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[70rem] mx-auto flex flex-col gap-20">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mx-auto">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Simple Terms</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We believe in transparency. Here is how we work with you in simple, easy-to-understand terms.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <PremiumCard className="p-10">
            <div className="flex flex-col gap-6 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electric-blue">
                <LuBriefcase size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">How We Work</h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                When you hire us, we agree to deliver custom software, design, or AI solutions. Everything is planned out in a project agreement so we are both on the same page from day one.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard className="p-10">
            <div className="flex flex-col gap-6 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electric-blue">
                <LuScale size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Your Ownership</h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                Once the project is finished and paid for, you own everything—the source code, the design files, and all final deliverables. It is 100% yours.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard className="p-10">
            <div className="flex flex-col gap-6 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electric-blue">
                <LuGavel size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Reliability</h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                We pride ourselves on doing great work. If any issues come up, we follow standard industry guidelines to resolve them quickly and fairly based on our contract.
              </p>
            </div>
          </PremiumCard>
        </div>

        {/* Call to Action */}
        <div className="relative p-12 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/5 rounded-full blur-[100px]" />
          <h3 className="text-3xl font-bold text-white mb-6">Have questions?</h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Need a formal contract or have specific questions about our process? We're here to talk.
          </p>
          <a 
            href="/contact" 
            className="btn-obsidian-primary inline-flex items-center gap-2 px-10 py-4"
          >
            Get in Touch <LuArrowUpRight />
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center text-slate-500 text-sm">
          Last Updated: April 2026 • © SysHub365
        </div>

      </div>
    </main>
  );
}
