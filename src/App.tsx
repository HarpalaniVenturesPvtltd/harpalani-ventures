import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import TeaserCanvas from "./components/TeaserCanvas";

export default function App() {
  const [time, setTime] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showSweep, setShowSweep] = useState(true);

  // --- Dynamic Live Clock ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Light Sweep Timer ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSweep(false);
    }, 4500); // matches the 4.5s CSS animation
    return () => clearTimeout(timer);
  }, []);

  // --- Mouse Position for Spotlight Interaction ---
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-white text-[#202020] font-sans flex flex-col justify-between p-8 sm:p-12 md:p-16 select-none"
    >
      {/* 1. CINEMATIC INTERACTIVE MOUSE SPOTLIGHT GLOW */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60 z-10"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 87, 34, 0.055), transparent 80%)`,
        }}
      />

      {/* 2. THREE.JS 3D BACKGROUND CAVALRY */}
      <div className="absolute inset-0 z-0">
        <TeaserCanvas />
      </div>

      {/* 3. PREMIUM NOISE TEXTURE LAYER (APPLE GLASS FEEL) */}
      <div className="noise-overlay" />

      {/* 4. CINEMATIC ON-LOAD ORANGE SWEEP GRADIENT */}
      <AnimatePresence>
        {showSweep && (
          <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
            <div
              className="absolute top-0 left-0 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-[#FF5722]/15 to-transparent blur-3xl animate-sweep"
              style={{ mixBlendMode: "screen" }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* --- HEADER ROW (LOGO & STATUS BADGE) --- */}
      <header className="relative z-20 w-full flex items-center justify-between pointer-events-none">
        {/* Modernist Logo Block */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-[#202020]/10 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="absolute inset-0 bg-[#FF5722]/5" />
            <span className="font-display font-semibold text-xs tracking-tight text-[#FF5722]">HV</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-xs tracking-[0.2em] text-[#202020]">
              HARPALANI
            </span>
            <span className="font-mono text-[8px] tracking-[0.15em] text-[#FF5722] font-semibold uppercase leading-none mt-0.5">
              VENTURES
            </span>
          </div>
        </motion.div>

        {/* Coming Soon Glass capsule Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF5722]"></span>
          </span>
          <span className="font-display text-[9px] tracking-[0.2em] text-[#FF5722] font-bold uppercase leading-none">
            COMING SOON
          </span>
        </motion.div>
      </header>

      {/* --- CENTRAL MAIN CONTENT (MAJESTIC TYPOGRAPHY) --- */}
      <main className="relative z-20 w-full max-w-4xl mx-auto flex flex-col justify-center items-start text-left flex-grow py-12 pointer-events-none">
        {/* Title masked animation layout */}
        <div className="space-y-1 sm:space-y-2 mb-6 sm:mb-8">
          {/* First word "HARPALANI" */}
          <div className="overflow-hidden h-fit py-1">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl font-thin tracking-[-0.03em] leading-none text-[#202020] opacity-90"
            >
              HARPALANI
            </motion.h1>
          </div>

          {/* Second word "VENTURES" */}
          <div className="overflow-hidden h-fit py-1">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-[-0.03em] leading-none text-[#202020]"
            >
              VENTURES
            </motion.h1>
          </div>
        </div>

        {/* Elegant Animated Subtitle */}
        <div className="overflow-hidden mb-8">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-lg sm:text-2xl font-light text-[#FF5722] tracking-wider italic flex items-center gap-3"
          >
            Private Limited
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]/30" />
          </motion.p>
        </div>

        {/* Separator / Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-[2px] bg-[#FF5722] mb-8 origin-left"
        />

        {/* Tagline Animation */}
        <div className="space-y-1.5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-base md:text-lg font-normal tracking-wide text-[#202020]/75 max-w-lg leading-relaxed"
          >
            Building Companies. Creating Long-Term Value.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-xs tracking-widest text-[#202020]/40 uppercase font-medium flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
            A new chapter begins.
          </motion.p>
        </div>
      </main>

      {/* --- FOOTER STATUS ROW (LIVE CLOCK, STATS & COPYRIGHT) --- */}
      <footer className="relative z-20 w-full flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-[#202020]/5 pt-6 sm:pt-8 pointer-events-none text-xs text-[#202020]/50 font-mono tracking-widest uppercase">
        {/* Left Side: Live clock ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 1.2 }}
          className="flex items-center gap-2 bg-white/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
        >
          <Clock className="w-3.5 h-3.5 text-[#FF5722] animate-pulse" />
          <span className="font-semibold text-[#202020]/70">{time || "00:00:00"}</span>
          <span className="text-[10px] text-[#202020]/40">LOCAL TIME</span>
        </motion.div>

        {/* Right Side: Tiny minimalist copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 1.2 }}
          className="text-right flex flex-col sm:items-end"
        >
          <span>© {currentYear} Harpalani Ventures Pvt. Ltd.</span>
          <span className="text-[9px] text-[#202020]/30 font-light mt-0.5 tracking-wider">
            All Rights Reserved.
          </span>
        </motion.div>
      </footer>
    </div>
  );
}
