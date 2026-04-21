"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function PremiumCard({ children, className = "" }: PremiumCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -10, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        // @ts-ignore
        "--mouse-x": `${coords.x}px`,
        // @ts-ignore
        "--mouse-y": `${coords.y}px`,
      }}
      className={`group obsidian-card ${className}`}
    >
      <div className="obsidian-card-glow" />
      <div className="border-beam" />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
