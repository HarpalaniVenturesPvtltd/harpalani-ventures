import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

export const HeroAbstractVisual: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Venture labels connected in the visual
  const connectedNodes = [
    { label: "Retail Designer Store", x: 26, y: 32 },
    { label: "Bridal & Ethnic Wear", x: 74, y: 28 },
    { label: "Brand & Digital Studio", x: 28, y: 72 },
    { label: "AI SaaS Product", x: 76, y: 68 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[540px] mx-auto flex items-center justify-center p-4 select-none"
      aria-hidden="true"
    >
      {/* Ambient background soft glow (pure purple tones) */}
      <div className="absolute inset-0 bg-radial from-[#EDE5F7]/70 via-[#F8F6FB]/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Layered concentric luxury architectural rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="curveGrad1" x1="50" y1="100" x2="550" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#32106B" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#6F2DBD" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#EDE5F7" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="curveGrad2" x1="550" y1="100" x2="50" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6F2DBD" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4B168C" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#EDE5F7" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="ringGrad" x1="0" y1="0" x2="600" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6F2DBD" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#EDE5F7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#32106B" stopOpacity="0.04" />
          </linearGradient>

          <radialGradient id="centerOrbGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6F2DBD" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#32106B" stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Outer and Inner architectural guide circles */}
        <circle cx="300" cy="300" r="260" stroke="#32106B" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="300" cy="300" r="200" stroke="#6F2DBD" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="300" cy="300" r="140" stroke="url(#ringGrad)" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="80" fill="url(#centerOrbGrad)" />

        {/* Primary Flowing Ribbon A (inspired by the HV sweeping curve) */}
        <motion.path
          d="M 90 280 C 130 140, 240 110, 300 180 C 360 250, 480 200, 520 340 C 550 440, 420 510, 310 470 C 210 430, 160 480, 100 420"
          stroke="url(#curveGrad1)"
          strokeWidth="2.5"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Secondary Harmonious Wave (Ecosystem connection) */}
        <motion.path
          d="M 120 360 C 160 460, 260 490, 340 420 C 420 350, 360 210, 450 150 C 500 110, 540 220, 500 380"
          stroke="url(#curveGrad2)"
          strokeWidth="1.75"
          fill="none"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Third delicate filament */}
        <motion.path
          d="M 180 180 C 260 220, 320 290, 420 280 C 470 275, 480 370, 410 440"
          stroke="#EDE5F7"
          strokeOpacity="0.6"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          fill="none"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        />

        {/* Central Core HV Axis Lines */}
        <line x1="300" y1="120" x2="300" y2="480" stroke="#32106B" strokeOpacity="0.08" strokeWidth="1" />
        <line x1="120" y1="300" x2="480" y2="300" stroke="#32106B" strokeOpacity="0.08" strokeWidth="1" />
      </svg>

      {/* Floating Center Brand Sigil Element */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-2xl bg-white/95 border border-[#32106B]/15 shadow-[0_12px_32px_-8px_rgba(50,16,107,0.14)] backdrop-blur-md flex items-center justify-center p-4"
        initial={shouldReduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative flex flex-col items-center">
          <span className="font-serif-luxury font-bold text-2xl text-[#32106B] tracking-wider leading-none">
            HV
          </span>
          <span className="text-[8px] font-sans-clean font-semibold tracking-[0.25em] text-[#6F2DBD] uppercase mt-1">
            Venture
          </span>
        </div>
      </motion.div>

      {/* Connected venture orbit indicators */}
      {connectedNodes.map((node, index) => (
        <motion.div
          key={node.label}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2 bg-white/95 border border-[#32106B]/12 rounded-full px-3 py-1.5 shadow-[0_4px_16px_rgba(50,16,107,0.06)] backdrop-blur-sm"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD]" />
          <span className="text-[10px] font-sans-clean font-medium text-[#32106B] tracking-wide whitespace-nowrap">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroAbstractVisual;
