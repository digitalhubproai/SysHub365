import { LuShieldCheck, LuLock, LuEye, LuFileText } from "react-icons/lu";
import PremiumCard from "@/components/PremiumCard";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-6 text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-electric-blue/10 text-electric-blue border border-electric-blue/20 mx-auto mb-4">
            <LuShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Privacy <span className="text-electric-blue">Policy</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Your trust is our most valuable asset. Learn how we protect, manage, and secure your data with elite-level standards.
          </p>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-8">
          
          <PremiumCard>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white font-bold text-xl">
                <LuEye className="text-electric-blue" />
                Data Collection
              </div>
              <p className="text-slate-400 leading-relaxed">
                We collect information that you provide directly to us when you inquire about our services, subscribe to our newsletter, or interact with our platform. This may include your name, email address, company details, and any project-specific information shared during consultations.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white font-bold text-xl">
                <LuLock className="text-electric-blue" />
                Information Security
              </div>
              <p className="text-slate-400 leading-relaxed">
                We implement industry-standard encryption and security protocols to safeguard your personal and business data. Our infrastructure is designed to prevent unauthorized access, disclosure, or modification of your information.
              </p>
            </div>
          </PremiumCard>

          <PremiumCard>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-white font-bold text-xl">
                <LuFileText className="text-electric-blue" />
                Usage of Information
              </div>
              <p className="text-slate-400 leading-relaxed">
                SysHub365 uses collected data solely for providing and improving our digital services, communicating project updates, and personalizing your experience. We never sell or lease your data to third-party marketers.
              </p>
            </div>
          </PremiumCard>

          <div className="mt-12 p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl text-center">
            <h3 className="text-white font-bold text-xl mb-4 text-center">Questions about your privacy?</h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto text-center">
              Our legal team is available to discuss any concerns regarding data protection and your rights.
            </p>
            <a 
              href="/contact" 
              className="btn-obsidian inline-flex px-10 py-4"
            >
              Contact Legal Hub
            </a>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center text-slate-500 text-sm mt-12">
          Last Updated: April 2026 • © SysHub365 Global Operations
        </div>

      </div>
    </main>
  );
}
