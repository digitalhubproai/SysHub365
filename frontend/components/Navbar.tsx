"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LuMenu, LuX, LuChevronDown, LuArrowUpRight } from "react-icons/lu";
import clsx from "clsx";
import { Button } from "./ui/Button";
import { SERVICES } from "@/lib/services";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isServicesActive = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); setServicesOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-6"
      >
        <div
          className={clsx(
            "flex items-center justify-between transition-all duration-500 pointer-events-auto rounded-full px-5 sm:px-8 py-3 w-full max-w-5xl border backdrop-blur-2xl shadow-xl",
            scrolled
              ? "bg-[#05070a]/80 border-white/[0.08]"
              : "bg-[#05070a]/40 border-white/[0.05]"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group" aria-label="SysHub365 Home">
             <Image
                src="/images/logo.png"
                alt="SysHub365 Logo"
                width={110}
                height={35}
                className="w-[100px] sm:w-[120px] h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                priority
             />
          </Link>

          <nav className="hidden lg:flex items-center gap-2" aria-label="Main Navigation">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={clsx(
                  "relative px-4 py-2 text-xs font-semibold transition-all duration-300 rounded-full overflow-hidden inline-flex items-center gap-1.5",
                  isServicesActive ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                <span className="relative z-10">Services</span>
                <LuChevronDown size={14} className={clsx("relative z-10 transition-transform duration-300", servicesOpen ? "rotate-180" : "")} />
                <div className={clsx("absolute inset-0 bg-white/10 rounded-full transition-opacity", isServicesActive ? "opacity-100" : "opacity-0")} />
                <div className="absolute inset-0 scale-0 bg-white/5 rounded-full transition-transform duration-300 group-hover:scale-100" />
              </Link>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[32rem] max-w-[calc(100vw-3rem)] rounded-2xl border border-white/10 bg-[#05070a]/95 backdrop-blur-xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-accent/70 to-transparent" />

                    <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Our Services</span>
                      <span className="text-[11px] font-semibold text-slate-500">{SERVICES.length}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1 px-1">
                      {SERVICES.map((s, i) => (
                        <motion.div
                          key={s.slug}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.02 * i + 0.02, duration: 0.18 }}
                        >
                          <Link
                            href={`/services/${s.slug}`}
                            className="group relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl overflow-hidden"
                          >
                            <span className="absolute inset-0 bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span
                              className="relative z-10 w-7 h-7 flex items-center justify-center rounded-lg shrink-0 border border-white/5 transition-all duration-300 group-hover:scale-110 group-hover:border-white/15"
                              style={{ background: `linear-gradient(135deg, ${s.gradient[0]}2e, ${s.gradient[1]}2e)` }}
                            >
                              <s.icon size={14} className="text-white/70 group-hover:text-white transition-colors" />
                            </span>
                            <span className="relative z-10 text-[12.5px] font-medium text-slate-300 group-hover:text-white leading-tight">{s.title}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <Link
                      href="/services"
                      className="mt-1.5 mx-1 flex items-center justify-center gap-1.5 border-t border-white/5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-electric-blue hover:text-neon-accent transition-colors"
                    >
                      View All Services <LuArrowUpRight size={13} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_LINKS.filter((l) => l.name !== "Services").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "relative px-4 py-2 text-xs font-semibold transition-all duration-300 rounded-full overflow-hidden",
                  pathname === link.href ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                <div className={clsx("absolute inset-0 bg-white/10 rounded-full transition-opacity", pathname === link.href ? "opacity-100" : "opacity-0")} />
                <div className="absolute inset-0 scale-0 bg-white/5 rounded-full transition-transform duration-300 group-hover:scale-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <Button href="/contact" variant="shimmer" size="sm" className="hidden sm:inline-flex">
                Contact Us
             </Button>
             <button
               className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               aria-expanded={mobileMenuOpen}
               aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
             >
               {mobileMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
             </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[49] bg-[#05070a] p-6 sm:p-10 flex flex-col overflow-y-auto">
          <div className="flex flex-col gap-8 my-auto">
            <Link
              href="/services"
              className="text-3xl sm:text-4xl font-bold text-white uppercase block hover:text-neon-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <div className="flex flex-col gap-2 pl-4 -mt-4 border-l border-white/10">
              {SERVICES.map((s) => (
                <div className="flex flex-col">
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="flex items-center gap-3 text-base text-slate-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <s.icon size={16} className="text-electric-blue" />
                    <span>{s.title}</span>
                  </Link>
                </div>
              ))}
            </div>
            {NAV_LINKS.filter((l) => l.name !== "Services").map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-3xl sm:text-4xl font-bold text-white uppercase block hover:text-neon-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              href="/contact"
              variant="shimmer"
              size="lg"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
