import Link from "next/link";
import { LuHouse, LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  return (
    <main className="bg-[var(--obsidian-base)] min-h-screen flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-blue/5 rounded-full blur-[200px]" />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-lg">
        <div className="text-[180px] font-black text-white/5 select-none leading-none">
          404
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Orbit <span className="text-gradient">Lost.</span>
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on course.
        </p>
        <div className="flex items-center gap-4 pt-4">
          <Link
            href="/"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-obsidian-primary text-xs font-black uppercase tracking-[0.2em]"
          >
            <LuHouse size={16} />
            Back Home
          </Link>
          <Link
            href="/"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-obsidian text-xs font-black uppercase tracking-[0.2em]"
          >
            <LuArrowLeft size={16} />
            Go Back
          </Link>
        </div>
      </div>
    </main>
  );
}
