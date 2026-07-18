"use client";

import React, { memo, useRef, useCallback } from "react";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
}

const PremiumCard = memo(function PremiumCard({ children, className = "" }: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group obsidian-card ${className}`}
    >
      <div className="obsidian-card-glow" />
      <div className="relative z-10 flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );
});

export default PremiumCard;
