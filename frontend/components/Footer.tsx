import Image from "next/image";
import Link from "next/link";
import { LuTwitter, LuLinkedin, LuFacebook, LuInstagram, LuZap } from "react-icons/lu";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { name: "Services", href: "/services" },
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Hub", href: "/contact" },
      { name: "Help Center", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <LuLinkedin size={20} />, href: "https://linkedin.com/company/syshub365" },
  { icon: <LuFacebook size={20} />, href: "https://facebook.com/syshub365" },
  { icon: <LuTwitter size={20} />, href: "https://twitter.com/syshub365" },
  { icon: <LuInstagram size={20} />, href: "https://instagram.com/syshub365" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--obsidian-deep)] py-20 lg:py-32 px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
         <div className="absolute top-0 right-[20%] w-[500px] h-[500px] bg-electric-blue/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10 flex flex-col gap-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center group relative w-max">
                <Image
                  src="/images/logo.png"
                  alt="SysHub365 Logo"
                  width={150}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
              </Link>
              <p className="text-base text-slate-400 leading-relaxed max-w-sm">
                Architecting the future of enterprise software and AI. We build elite digital systems that drive global transformation.
              </p>
              
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-xs uppercase tracking-widest">Headquarters</span>
                <span className="text-slate-500 text-sm">Karachi, Pakistan • Available 24/7</span>
              </div>
            </div>
            
            <div className="flex gap-4">
               {SOCIAL_LINKS.map((social, i) => (
                 <a 
                   key={i} 
                   href={social.href} 
                   className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-electric-blue hover:border-electric-blue transition-all duration-300 hover:-translate-y-1"
                 >
                    {social.icon}
                 </a>
               ))}
            </div>
          </div>

          {/* Links & Newsletter Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {FOOTER_LINKS.map((section) => (
                <div key={section.title} className="flex flex-col gap-6">
                   <h4 className="text-white font-bold text-sm tracking-wider uppercase">{section.title}</h4>
                   <ul className="flex flex-col gap-4">
                      {section.links.map((link) => (
                        <li key={link.name}>
                           <Link href={link.href} className="text-sm text-slate-400 hover:text-electric-blue transition-colors duration-300">
                              {link.name}
                           </Link>
                        </li>
                       ))}
                   </ul>
                </div>
              ))}

              {/* Newsletter Column */}
              <div className="flex flex-col gap-6">
                <h4 className="text-white font-bold text-sm tracking-wider uppercase">Newsletter</h4>
                <div className="flex flex-col gap-5">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Subscribe for elite AI insights and project updates.
                  </p>
                  <form className="flex flex-col gap-3">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-electric-blue transition-all placeholder:text-slate-700"
                      required
                    />
                    <button type="submit" className="btn-obsidian-primary w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-500">
               © {year} SysHub365. All rights reserved.
            </div>
            
            <div className="flex gap-8 items-center text-sm text-slate-500">
               <Link href="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</Link>
               <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}


