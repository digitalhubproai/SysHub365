import { LuLoader } from "react-icons/lu";

export default function Loading() {
  return (
    <div className="bg-[var(--obsidian-base)] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-white/5" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric-blue animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyber-cyan animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        </div>
        <p className="text-sm font-bold text-white/30 uppercase tracking-[0.3em] animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
