"use client";

import React from "react";

export const GradientIcon = ({ icon, id, colors }: { icon: React.ReactNode, id: string, colors: string[] }) => (
  <div className="relative group/icon">
    <svg width="0" height="0" className="absolute">
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={colors[0]} />
        <stop offset="100%" stopColor={colors[1]} />
      </linearGradient>
    </svg>
    <div style={{ stroke: `url(#${id})`, color: `url(#${id})` }} className="relative z-10 transition-transform duration-500 group-hover/icon:scale-110">
      {React.cloneElement(icon as React.ReactElement<any>, { stroke: `url(#${id})` })}
    </div>
    <div className="absolute inset-0 blur-2xl opacity-20 group-hover/icon:opacity-40 transition-opacity duration-500" style={{ backgroundColor: colors[0] }} />
  </div>
);
