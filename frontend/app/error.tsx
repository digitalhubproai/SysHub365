"use client";

import { LuRefreshCw, LuHouse } from "react-icons/lu";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="bg-[var(--obsidian-base)] min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[200px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-lg">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <span className="text-4xl">!</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          System <span className="text-red-400">Error.</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Something went wrong on our end. Our team has been notified.
          Please try again.
        </p>
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-obsidian-primary text-xs font-black uppercase tracking-[0.2em]"
          >
            <LuRefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-obsidian text-xs font-black uppercase tracking-[0.2em]"
          >
            <LuHouse size={16} />
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
