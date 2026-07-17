"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCookie, LuX } from "react-icons/lu";
import { Button } from "./ui/Button";

type ConsentStatus = "accepted" | "rejected" | null;

const STORAGE_KEY = "syshub_cookie_consent";

export function getConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY) as ConsentStatus;
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getConsent();
    if (stored) {
      setConsent(stored);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setConsent("rejected");
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[99999] p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-5 md:p-6 shadow-[0_0_80px_-20px_rgba(37,99,235,0.3)]">
              <div className="flex items-start gap-4">
                <div className="hidden md:flex w-10 h-10 rounded-full bg-electric-blue/10 items-center justify-center shrink-0 border border-white/10">
                  <LuCookie className="text-electric-blue" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Cookie Consent
                    </h3>
                    <button
                      onClick={handleReject}
                      className="text-white/30 hover:text-white/60 transition-colors p-1"
                      aria-label="Close"
                    >
                      <LuX size={16} />
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl">
                    This site uses cookies from Google Analytics, Google Ads, and Ahrefs to improve your experience
                    and analyze traffic. By clicking "Accept All", you consent to the use of all cookies.
                    You can manage your preferences or reject non-essential cookies.
                    <a href="/privacy" className="text-electric-blue hover:text-cyber-cyan underline ml-1 transition-colors">
                      Learn more
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  <Button variant="outline" size="sm" onClick={handleReject} className="!px-4 !py-2">
                    Reject All
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleAccept} className="!px-4 !py-2">
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
