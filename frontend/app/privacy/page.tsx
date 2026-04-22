import { LuShieldCheck, LuLock, LuEye, LuFileText, LuArrowUpRight } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[70rem] mx-auto flex flex-col gap-20">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mx-auto">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Simple Privacy</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your trust is everything. Here is how we handle your data in plain, simple language.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <PremiumCard className="p-10">
            <div className="flex flex-col gap-6 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electric-blue">
                <LuEye size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">What We Collect</h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                We only ask for what we need to help you. This includes your name, email, and project details when you get in touch with us to start a conversation.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard className="p-10">
            <div className="flex flex-col gap-6 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electric-blue">
                <LuLock size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Keeping It Safe</h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                Your data is protected. We use standard security measures to make sure your personal and project information stays private and safe from unauthorized access.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard className="p-10">
            <div className="flex flex-col gap-6 h-full">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electric-blue">
                <LuFileText size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">No Selling Data</h3>
              <p className="text-slate-400 leading-relaxed flex-grow">
                We use your info only to serve you better, like sending project updates. We never sell, lease, or rent your data to anyone else. Period.
              </p>
            </div>
          </PremiumCard>
        </div>

        {/* Call to Action */}
        <div className="relative p-12 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/5 rounded-full blur-[100px]" />
          <h3 className="text-3xl font-bold text-white mb-6">Have concerns?</h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            If you have any questions about how your information is handled, we are happy to talk about it.
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
