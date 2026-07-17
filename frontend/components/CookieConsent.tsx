"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuCookie, LuX, LuChevronDown, LuChevronUp } from "react-icons/lu";
import { Button } from "./ui/Button";

type CookieCategories = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "syshub_cookie_preferences";

const defaultPreferences: CookieCategories = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function getPreferences(): CookieCategories | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as CookieCategories;
  } catch {
    return null;
  }
}

export function setPreferences(prefs: CookieCategories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function CookieConsent() {
  const [preferences, setPreferencesState] = useState<CookieCategories | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draftPrefs, setDraftPrefs] = useState<CookieCategories>(defaultPreferences);

  useEffect(() => {
    setMounted(true);
    const stored = getPreferences();
    if (stored) {
      setPreferencesState(stored);
    }
  }, []);

  const handleAcceptAll = () => {
    const all: CookieCategories = { essential: true, analytics: true, marketing: true };
    setPreferences(all);
    setPreferencesState(all);
  };

  const handleRejectAll = () => {
    setPreferences(defaultPreferences);
    setPreferencesState(defaultPreferences);
  };

  const openSettings = () => {
    setDraftPrefs(preferences ?? defaultPreferences);
    setShowSettings(true);
  };

  const handleSaveSettings = () => {
    setPreferences(draftPrefs);
    setPreferencesState(draftPrefs);
    setShowSettings(false);
  };

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {preferences === null && !showSettings && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[99999] p-4 md:p-6"
          >
            <div className="mx-auto max-w-7xl">
              <div className="relative overflow-hidden bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-5 md:p-6 shadow-[0_0_80px_-20px_rgba(37,99,235,0.3)]">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="hidden md:flex w-10 h-10 rounded-full bg-electric-blue/10 items-center justify-center shrink-0 border border-white/10">
                    <LuCookie className="text-electric-blue" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Cookie Consent
                      </h3>
                      <button
                        onClick={handleRejectAll}
                        className="text-white/30 hover:text-white/60 transition-colors p-1"
                        aria-label="Close"
                      >
                        <LuX size={16} />
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl">
                      This site uses cookies to improve your experience and analyze traffic.
                      Choose which cookies you allow or{" "}
                      <a href="/privacy" className="text-electric-blue hover:text-cyber-cyan underline transition-colors">
                        learn more
                      </a>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <Button variant="outline" size="sm" onClick={openSettings} className="!px-4 !py-2">
                      Customize
                    </Button>
                    <Button variant="obsidian" size="sm" onClick={handleRejectAll} className="!px-4 !py-2">
                      Reject All
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleAcceptAll} className="!px-4 !py-2">
                      Accept All
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSettings(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-6 shadow-[0_0_100px_-20px_rgba(37,99,235,0.3)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cookie Settings</h3>
                <button onClick={() => setShowSettings(false)} className="text-white/30 hover:text-white/60 transition-colors p-1">
                  <LuX size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <CookieToggle
                  title="Essential"
                  description="Required for basic site functionality. Always active."
                  checked={draftPrefs.essential}
                  disabled
                />
                <CookieToggle
                  title="Analytics"
                  description="Helps us understand how visitors interact with the site (Google Analytics, Ahrefs)."
                  checked={draftPrefs.analytics}
                  onChange={(v) => setDraftPrefs(prev => ({ ...prev, analytics: v }))}
                />
                <CookieToggle
                  title="Marketing"
                  description="Used for advertising and tracking (Google Ads, Google Tag Manager)."
                  checked={draftPrefs.marketing}
                  onChange={(v) => setDraftPrefs(prev => ({ ...prev, marketing: v }))}
                />
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
                <Button variant="outline" size="sm" onClick={handleRejectAll} className="!px-4 !py-2">
                  Reject All
                </Button>
                <Button variant="primary" size="sm" onClick={handleSaveSettings} className="!px-4 !py-2 ml-auto">
                  Save Preferences
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CookieToggle({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            {disabled && (
              <span className="text-[10px] uppercase tracking-wider text-cyber-cyan border border-cyber-cyan/20 rounded-full px-2 py-0.5">
                Always Active
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white/30 hover:text-white/60 transition-colors p-1"
          aria-label="Toggle description"
        >
          {isOpen ? <LuChevronUp size={14} /> : <LuChevronDown size={14} />}
        </button>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-electric-blue peer-disabled:opacity-50 peer-disabled:cursor-not-allowed after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-xs text-slate-500 mt-3 overflow-hidden"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
