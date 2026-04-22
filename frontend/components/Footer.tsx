import Image from "next/image";
import Link from "next/link";
import { LuTwitter, LuLinkedin, LuFacebook, LuInstagram, LuZap } from "react-icons/lu";

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { name: "Services", href: "/services" },
      { name: "Projects", href: "/projects" },
      { name: "About Us", href: "/about" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Partner Program", href: "/contact" },
      { name: "Help Center", href: "/contact" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { name: "Karachi Office", href: "#" },
      { name: "Global Operations", href: "#" },
      { name: "Available 24/7", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <LuLinkedin size={20} />, href: "#" },
  { icon: <LuFacebook size={20} />, href: "#" },
  { icon: <LuTwitter size={20} />, href: "#" },
  { icon: <LuInstagram size={20} />, href: "#" },
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
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Link href="/" className="flex items-center group relative w-max">
              <div className="relative transition-all duration-500 hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="SysHub365 Logo"
                  width={150}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />              </div>
            </Link>

            <p className="text-base text-slate-400 leading-relaxed max-w-sm">
               We build scalable software, AI integrations, and enterprise systems that drive real business growth and digital transformation.
            </p>
            
            <div className="flex gap-4 pt-4">
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

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
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
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-slate-500">
               © {year} SysHub365. All rights reserved.
            </div>
            
            <div className="flex gap-8 items-center text-sm text-slate-500">
               <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
               <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
        </div>
      </div>
    </footer>
  );
}


