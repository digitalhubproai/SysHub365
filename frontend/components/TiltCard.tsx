"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const background = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xVal, yVal]) => `radial-gradient(600px circle at ${(Number(xVal) + 0.5) * 100}% ${(Number(yVal) + 0.5) * 100}%, rgba(37,99,235,0.2), transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-1000" 
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={`relative transition-shadow duration-500 ${className} ${isHovered ? "shadow-[0_50px_100px_rgba(0,0,0,0.5)]" : ""}`}
      >
        <div 
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="h-full w-full"
        >
          {children}
        </div>
        
        {/* Dynamic Glow Overlay */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none rounded-[2rem] overflow-hidden"
          style={{
            background,
            opacity: isHovered ? 1 : 0,
            transform: "translateZ(80px)",
          }}
        />
      </motion.div>
    </div>
  );
}
