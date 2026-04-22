import { LuSignature, LuGavel, LuScale, LuBriefcase } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-electric-blue/10 text-electric-blue border border-electric-blue/20 mx-auto mb-4">
            <LuSignature size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Terms of <span className="text-electric-blue">Service</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our framework for collaboration. Understanding the elite standards and professional guidelines that govern SysHub365 engagements.
          </p>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-8">
          
          <PremiumCard>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white font-bold text-xl">
                <LuBriefcase className="text-electric-blue" />
                Service Engagement
              </div>
              <p className="text-slate-400 leading-relaxed">
                By engaging with SysHub365, you agree to our professional service standards. We provide custom software development, AI integration, and digital transformation consulting as outlined in individual project proposals and master service agreements.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white font-bold text-xl">
                <LuScale className="text-electric-blue" />
                Intellectual Property
              </div>
              <p className="text-slate-400 leading-relaxed">
                Unless otherwise specified in a signed agreement, all proprietary methodologies and base frameworks used by SysHub365 remain our property. Client-specific custom code and deliverables are transferred upon full project completion and payment.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white font-bold text-xl">
                <LuGavel className="text-electric-blue" />
                Liability & Governance
              </div>
              <p className="text-slate-400 leading-relaxed">
                SysHub365 operates with elite-level precision, yet we maintain standard liability limits common in enterprise software consulting. All engagements are governed by the laws of the respective jurisdiction specified in our active contracts.
              </p>
            </div>
          </PremiumCard>

          <div className="mt-12 p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl text-center">
            <h3 className="text-white font-bold text-xl mb-4 text-center">Need a custom MSA?</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-center">
              For enterprise clients requiring custom Master Service Agreements or specific SLA terms, please reach out to our corporate desk.
            </p>
            <a 
              href="/contact" 
              className="btn-obsidian inline-flex px-10 py-4"
            >
              Corporate Inquiries
            </a>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center text-slate-500 text-sm mt-12">
          Last Updated: April 2026 • © SysHub365 Professional Standards
        </div>

      </div>
    </main>
  );
}
