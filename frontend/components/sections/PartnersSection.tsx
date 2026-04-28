"use client";

import Image from "next/image";

const PARTNER_LOGOS = [
  "adobe-2.svg",
  "cisco-2.svg",
  "ibm.svg",
  "logo-amazon.svg",
  "microsoft-6.svg",
];

export function PartnersSection() {
  return (
    <section className="py-16 relative z-10 overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .animate-marquee-track {
          animation: scroll-marquee 25s linear infinite;
        }
        .group-marquee:hover .animate-marquee-track {
          animation-play-state: paused;
        }
      `}} />

      <div className="flex flex-col items-center gap-10 max-w-[90rem] mx-auto relative z-10">
        <h2 className="text-sm md:text-base font-black text-slate-500 uppercase tracking-[0.3em] text-center px-6">
          Trusted By Industry Leaders
        </h2>

        
        <div className="w-full overflow-hidden relative group-marquee group/marquee mt-2">
          {/* Soft Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[var(--obsidian-base)] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[var(--obsidian-base)] to-transparent z-20 pointer-events-none" />
          
          <div className="flex items-center gap-16 md:gap-32 w-max px-8 py-8 animate-marquee-track">
            {[1, 2, 3].map((set) => (
              <div key={set} className="flex items-center gap-16 md:gap-32">
                {PARTNER_LOGOS.map((logo, i) => (
                  <div key={`${set}-${i}`} className="flex items-center gap-16 md:gap-32">
                    <div className="flex items-center justify-center brightness-0 invert opacity-40 group-hover/marquee:opacity-15 hover:!opacity-100 hover:scale-[1.15] hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-500 cursor-pointer">
                      <Image 
                        src={`/images/company logos/${logo}`} 
                        alt="Partner Logo" 
                        width={200} 
                        height={80} 
                        className="object-contain h-10 md:h-12 w-auto" 
                      />
                    </div>
                    {/* Futuristic Power-Up Separators */}
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/marquee:bg-electric-blue group-hover/marquee:shadow-[0_0_12px_rgba(37,99,235,1)] transition-all duration-700" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
