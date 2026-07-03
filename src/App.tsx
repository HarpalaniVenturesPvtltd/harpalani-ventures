import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  X, 
  Send, 
  CheckCircle2, 
  Cpu
} from "lucide-react";
import TeaserCanvas from "./components/TeaserCanvas";

// --- CINEMATIC REVEAL ANIMATIONS (STAGGERED) ---
const revealContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const revealHeaderVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1], // Premium easeOutExpo
    },
  },
};

const revealItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const revealTitleVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const revealLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const revealCardVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.65, // Enters as the left elements crescendo
    },
  },
};

export default function App() {
  const [rotationSpeed] = useState<number>(1.2);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showSweep, setShowSweep] = useState(true);
  const [utcTime, setUtcTime] = useState("");

  // Email Waitlist States
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  // Contact Us Form States
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // --- Live Dynamic UTC Clock ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getUTCHours()).padStart(2, "0");
      const mins = String(now.getUTCMinutes()).padStart(2, "0");
      const secs = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hrs}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Light Sweep Animation Timer ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSweep(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail) return;
    setWaitlistSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactModalOpen(false);
      setContactSubmitted(false);
      setContactData({ name: "", email: "", message: "" });
    }, 3500);
  };

  const scrollToWaitlist = () => {
    const el = document.getElementById("waitlist-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-y-auto bg-[#050508] text-white font-sans flex flex-col justify-between p-6 sm:p-10 select-none transition-colors duration-1000"
    >
      {/* 1. CINEMATIC CURSOR SPOTLIGHT */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-700 opacity-70 z-10"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 87, 34, 0.08), transparent 85%)`,
        }}
      />

      {/* 2. THREE.JS 3D BACKGROUND WORLD */}
      <div className="fixed inset-0 z-0">
        <TeaserCanvas selectedCity="auto" rotationSpeed={rotationSpeed} localHour={0} />
      </div>

      {/* 3. PREMIUM NOISE OVERLAY */}
      <div className="noise-overlay" />

      {/* 4. CINEMATIC INSTANT ON-LOAD SWEEP */}
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

      {/* --- HEADER ROW (ONLY LOGO RESIDING) --- */}
      <motion.header
        variants={revealHeaderVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="absolute inset-0 bg-[#FF5722]/10" />
            <span className="font-display font-semibold text-xs tracking-tight text-[#FF5722]">HV</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-xs tracking-[0.25em] leading-none text-white">
              HARPALANI
            </span>
            <span className="font-mono text-[8px] tracking-[0.15em] text-[#FF5722] font-semibold uppercase mt-1 leading-none">
              VENTURES
            </span>
          </div>
        </div>
      </motion.header>

      {/* --- CENTRAL HERO & STATUS GRID --- */}
      <main className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow py-12 pointer-events-auto">
        
        {/* LEFT COLUMN: HERO TITLING WITH BADGE */}
        <motion.div
          variants={revealContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center items-start text-left pointer-events-none"
        >
          {/* Glowing Coming Soon Badge */}
          <div className="overflow-hidden mb-4">
            <motion.div
              variants={revealItemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/20 text-[#FF5722] text-[10px] font-mono tracking-widest uppercase font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] animate-ping" />
              <span>● COMING SOON</span>
            </motion.div>
          </div>

          <div className="space-y-1 sm:space-y-2 mb-5 sm:mb-7">
            {/* Masked Title First Line */}
            <div className="overflow-hidden h-fit py-1">
              <motion.h1
                variants={revealTitleVariants}
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.03em] leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
              >
                HARPALANI
              </motion.h1>
            </div>

            {/* Masked Title Second Line */}
            <div className="overflow-hidden h-fit py-1">
              <motion.h1
                variants={revealTitleVariants}
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-[-0.03em] leading-none text-[#FF5722] drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
              >
                VENTURES
              </motion.h1>
            </div>
          </div>

          {/* Subheading */}
          <div className="overflow-hidden mb-6">
            <motion.p
              variants={revealItemVariants}
              className="font-display text-base sm:text-xl font-semibold tracking-wide text-white/90 italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              Building the Future of Intelligent Technology.
            </motion.p>
          </div>

          <motion.div
            variants={revealLineVariants}
            className="w-14 h-[2px] bg-[#FF5722] mb-6 origin-left"
          />

          {/* Description */}
          <div className="space-y-2 max-w-xl mb-8">
            <motion.p
              variants={revealItemVariants}
              className="font-sans text-xs sm:text-sm md:text-base font-normal tracking-wide leading-relaxed text-white/80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
              Harpalani Ventures Pvt. Ltd. is building next-generation AI software products designed to simplify business operations, automate workflows, and create exceptional digital experiences.
            </motion.p>
          </div>

          {/* Action CTAs */}
          <motion.div
            variants={revealItemVariants}
            className="flex flex-wrap items-center gap-4 pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToWaitlist}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5722] text-white text-[11px] font-display font-bold tracking-wider uppercase shadow-[0_6px_20px_rgba(255,87,34,0.15)] hover:bg-[#ff6230] transition-colors"
            >
              <span>Notify Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-display font-bold tracking-wider uppercase hover:bg-white/20 hover:text-white transition-all"
            >
              <span>Contact Us</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: PREMIUM STATUS CARD */}
        <div className="lg:col-span-5 flex flex-col justify-center pointer-events-auto">
          <motion.div
            variants={revealCardVariants}
            initial="hidden"
            animate="visible"
            className="w-full rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(255,87,34,0.03)] p-6 sm:p-8 flex flex-col gap-6 text-left"
          >
            {/* Status Card Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FF5722] animate-pulse" />
                <span className="font-display font-bold text-xs tracking-widest uppercase text-white/85">System Telemetry</span>
              </div>
              <span className="font-mono text-[9px] tracking-widest text-[#FF5722] font-extrabold bg-[#FF5722]/10 px-2 py-0.5 rounded-full">ACTIVE SEQUENCING</span>
            </div>

            {/* Status details */}
            <div className="space-y-5">
              <div>
                <span className="block font-mono text-[8.5px] tracking-widest text-white/40 font-bold uppercase mb-1.5">Status</span>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5722] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5722]" />
                  </span>
                  <span className="font-display text-base sm:text-lg font-bold text-white">Currently Under Development</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                  <span className="block font-mono text-[8px] tracking-widest text-white/40 font-bold uppercase mb-1">Launch Target</span>
                  <span className="font-display text-base font-bold text-[#FF5722] tracking-tight">Q4 2026</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                  <span className="block font-mono text-[8px] tracking-widest text-white/40 font-bold uppercase mb-1">Progress</span>
                  <span className="font-display text-base font-bold text-white tracking-tight">80%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-white/40 uppercase font-bold">
                  <span>Allocation Ledger Build</span>
                  <span>80% Completed</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "80%" }}
                    transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#FF5722] to-[#ff8a65] rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- EMAIL WAITLIST SECTION --- */}
      <section id="waitlist-section" className="relative z-20 w-full max-w-3xl mx-auto mt-12 mb-16 px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(255,87,34,0.03)] p-8 sm:p-10 text-center flex flex-col items-center gap-6"
        >
          <div className="w-10 h-10 rounded-full bg-[#FF5722]/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#FF5722]" />
          </div>

          <div className="space-y-2 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Be the First to Know
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
              Be among the first to receive updates about our official launch.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!waitlistSubmitted ? (
              <motion.form
                key="waitlist-form"
                onSubmit={handleWaitlistSubmit}
                className="w-full max-w-md flex flex-col sm:flex-row gap-3 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input
                  type="email"
                  required
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-grow px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-white placeholder-white/30 focus:border-[#FF5722]/40 focus:bg-black/60 text-sm outline-none transition-all shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FF5722] hover:bg-[#ff6230] text-white font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-[0_6px_20px_rgba(255,87,34,0.15)] whitespace-nowrap"
                >
                  Notify Me
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="waitlist-success"
                className="flex flex-col items-center gap-3 py-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#FF5722]/15 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#FF5722]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-white">TRANSMISSION SUCCESSFUL</h3>
                  <p className="font-sans text-xs text-white/60">
                    You have been added to our private ledger. We will contact you at <strong className="text-white">{waitlistEmail}</strong> when launch sequences commence.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- THREE PREMIUM INFORMATION CARDS --- */}
      <section className="relative z-20 w-full max-w-7xl mx-auto mb-16 px-4 pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Innovation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(255,87,34,0.02)] p-6 sm:p-8 flex flex-col gap-4 text-left group hover:border-[#FF5722]/40 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/5 border border-[#FF5722]/10 flex items-center justify-center group-hover:bg-[#FF5722]/10 transition-colors">
              <Sparkles className="w-5 h-5 text-[#FF5722]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-white tracking-tight">
                Innovation
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                Building AI-powered software for tomorrow.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Technology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(255,87,34,0.02)] p-6 sm:p-8 flex flex-col gap-4 text-left group hover:border-[#FF5722]/40 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/5 border border-[#FF5722]/10 flex items-center justify-center group-hover:bg-[#FF5722]/10 transition-colors">
              <Cpu className="w-5 h-5 text-[#FF5722]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-white tracking-tight">
                Technology
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                Modern products engineered for speed, simplicity and scale.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Launch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(255,87,34,0.02)] p-6 sm:p-8 flex flex-col gap-4 text-left group hover:border-[#FF5722]/40 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5722]/5 border border-[#FF5722]/10 flex items-center justify-center group-hover:bg-[#FF5722]/10 transition-colors">
              <Globe className="w-5 h-5 text-[#FF5722]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-lg text-white tracking-tight">
                Launch
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed">
                Official launch coming soon.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER STATUS ROW --- */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto border-t border-white/10 pt-6 pointer-events-auto text-[10px] font-mono tracking-widest uppercase flex flex-col sm:flex-row gap-4 items-center justify-between text-white/40 pb-2">
        <div className="flex items-center gap-1.5 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 bg-black/40 text-white/85 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF5722] animate-pulse" />
          <span className="font-semibold">{utcTime}</span>
          <span className="text-[9px] text-white/40">UTC TIME</span>
        </div>

        <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
          <span className="font-semibold text-white/60">© 2026 Harpalani Ventures Pvt. Ltd.</span>
          <span className="text-[9px] font-light mt-0.5 tracking-wider text-white/30 normal-case">
            Building the Future.
          </span>
        </div>
      </footer>

      {/* --- SLIDE-OUT PANEL: CONTACT US --- */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactModalOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Panel canvas container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="relative w-full max-w-lg h-full bg-[#0b0b0e]/95 backdrop-blur-2xl border-l border-white/10 shadow-[-10px_0_40px_rgba(0,0,0,0.3)] p-8 sm:p-10 flex flex-col justify-between overflow-y-auto text-white"
            >
              {/* Form header row */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5722]/10 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#FF5722]" />
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-base tracking-tight text-white">CONTACT US</h2>
                    <p className="font-mono text-[8.5px] tracking-widest text-white/40 uppercase mt-0.5">Get in touch with our team</p>
                  </div>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form body */}
              <div className="flex-grow py-6">
                <AnimatePresence mode="wait">
                  {!contactSubmitted ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleContactSubmit}
                      className="space-y-4 text-left"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] tracking-widest text-white/40 uppercase font-bold">
                          YOUR NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF5722]/40 focus:bg-[#121217] text-xs text-white placeholder-white/30 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] tracking-widest text-white/40 uppercase font-bold">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          placeholder="you@domain.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF5722]/40 focus:bg-[#121217] text-xs text-white placeholder-white/30 outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-[9px] tracking-widest text-white/40 uppercase font-bold">
                          MESSAGE
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                          placeholder="How can we assist you? Tell us about your organization or inquiry..."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#FF5722]/40 focus:bg-[#121217] text-xs text-white placeholder-white/30 outline-none resize-none transition-all"
                        />
                      </div>

                      <div className="pt-2">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          type="submit"
                          className="w-full py-3 rounded-xl bg-[#FF5722] hover:bg-[#ff6230] text-white font-display font-extrabold text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(255,87,34,0.18)]"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message</span>
                        </motion.button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="contact-success"
                      className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-[#FF5722]/15 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-9 h-9 text-[#FF5722]" />
                      </motion.div>
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-lg tracking-tight text-white">MESSAGE RECEIVED</h3>
                        <p className="font-sans text-xs text-white/60 max-w-sm leading-relaxed">
                          Thank you, <strong className="text-white">{contactData.name}</strong>. Your inquiry has been securely sent to Harpalani Ventures' administration. We will review and follow up shortly.
                        </p>
                      </div>
                      <div className="pt-4 flex items-center gap-2 text-[9px] font-mono tracking-widest text-[#FF5722] font-bold">
                        <Cpu className="w-4 h-4 animate-spin-slow" />
                        <span>PROCESSING PROTOCOL...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Panel Footer */}
              <div className="border-t border-white/10 pt-5 text-left text-[9px] font-mono tracking-widest text-white/30 uppercase">
                <span>SECURITY STANDARD: SECURE SYNDICATE ENCRYPTION</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
