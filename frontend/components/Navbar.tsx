"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none p-6"
      >
        <div
          className={clsx(
            "flex items-center justify-between transition-all duration-500 pointer-events-auto rounded-full px-8 py-3 w-full max-w-5xl border backdrop-blur-2xl shadow-xl",
            scrolled
              ? "bg-[#05070a]/80 border-white/[0.08]"
              : "bg-[#05070a]/40 border-white/[0.05]"
          )}
        >
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform duration-500 group-hover:scale-105">
               <Image
                  src="/images/logo.png"
                  alt="SysHub365 Logo"
                  width={150}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                  priority
               />            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300",
                  pathname === link.href ? "text-white bg-white/10" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
             <Link href="/contact" className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-slate-200 transition-colors">
                Contact Us
             </Link>
             
             <button
               className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
             </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Interaction Layer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-[49] bg-[#05070a] p-10 flex flex-col justify-center"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-bold text-white uppercase block hover:text-neon-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-white text-black text-lg font-bold rounded-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
