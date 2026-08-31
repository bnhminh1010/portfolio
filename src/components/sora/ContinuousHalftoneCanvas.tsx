"use client";

import React from "react";

export function ContinuousHalftoneCanvas() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    >
      {/* Dynamic Shifting Fluid Gradient Blobs */}
      <div 
        className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-40 mix-blend-screen"
        style={{
          background: `
            radial-gradient(ellipse 45% 40% at 20% 30%, rgba(45, 106, 79, 0.75) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 80% 25%, rgba(212, 163, 115, 0.7) 0%, transparent 55%),
            radial-gradient(ellipse 45% 45% at 50% 70%, rgba(181, 131, 141, 0.65) 0%, transparent 60%),
            radial-gradient(ellipse 35% 35% at 30% 80%, rgba(30, 60, 48, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse 30% 30% at 75% 75%, rgba(160, 110, 50, 0.6) 0%, transparent 50%)
          `,
          filter: "blur(60px) saturate(1.5)",
          animation: "sora-fluid-drift 28s ease-in-out infinite alternate",
        }}
      />

      {/* Signature SoraLabs Halftone Dot Matrix Pattern */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0, 0, 0, 0.92) 1.5px, transparent 1.5px)`,
          backgroundSize: "6px 6px",
          backgroundPosition: "0 0",
          mixBlendMode: "multiply",
        }}
      />

      {/* Subtle Noise / Grain Layer */}
      <div 
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "3px 3px",
        }}
      />

      {/* Vignette Overlay to preserve readability of dark surfaces */}
      <div className="absolute inset-0 bg-[#121212]/50" />
    </div>
  );
}
