import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Menu, 
  X, 
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle
} from "lucide-react";
import HarpalaniLogo, { HarpalaniSymbol } from "./components/HarpalaniLogo";
import HeroAbstractVisual from "./components/HeroAbstractVisual";

// Venture Portfolio Data (Editorial horizontal presentation)
const VENTURES_DATA = [
  {
    id: "01",
    name: "BEAUTIFUL THE BOUTIQUE",
    category: "Retail Designer Store",
    codeName: null,
    description: "A retail designer store offering curated designer collections, bespoke fashion, and an elevated shopping experience.",
    badge: null,
  },
  {
    id: "02",
    name: "CILAEE CADAEE",
    category: "Custom Stitching • Bridal & Ethnic Wear",
    codeName: null,
    description: "A custom stitching designer brand for women's bridal wear and ethnic wear, specializing in bespoke craftsmanship, couture tailoring, and modern traditional styling.",
    badge: null,
  },
  {
    id: "03",
    name: "BLAZE GRAPHICS",
    category: "Brand Identity & Digital Marketing",
    codeName: null,
    description: "A brand identity and digital marketing online studio delivering strategic visual direction, brand design, and high-impact digital marketing solutions.",
    badge: null,
  },
  {
    id: "04",
    name: "QUOTEFLOW AI",
    category: "SaaS Product",
    codeName: "(CODE NAME)",
    description: "An AI-powered quotation SaaS product (code name) engineered to simplify, automate, and elevate how businesses generate, manage, and deliver professional quotations.",
    badge: "LAUNCHING THIS YEAR",
  },
];

// The Building Process: 4-Stage Methodology
const BUILDING_STAGES = [
  {
    step: "01",
    title: "DISCOVER",
    description: "Identify opportunities worth pursuing.",
  },
  {
    step: "02",
    title: "BUILD",
    description: "Turn ideas into real businesses and products.",
  },
  {
    step: "03",
    title: "REFINE",
    description: "Improve through creativity, technology and execution.",
  },
  {
    step: "04",
    title: "GROW",
    description: "Build for sustainable long-term potential.",
  },
];

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVentureHover, setActiveVentureHover] = useState<string | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll listener for minimal luxury navigation elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  // Form Validation strictly using purple palette (NO RED)
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Please enter your name";
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) errors.company = "Please enter your company or organisation";
    if (!formData.message.trim()) errors.message = "Please write a brief message";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      setFormErrors({});
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#17131D] font-sans-clean selection:bg-[#32106B] selection:text-white flex flex-col antialiased">
      
      {/* ===================================================
          4. NAVIGATION (Extremely Refined, Minimal, Elegant)
      =================================================== */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-white/92 backdrop-blur-md border-b border-[#32106B]/08 py-3.5 shadow-[0_2px_20px_-10px_rgba(50,16,107,0.06)]"
            : "bg-white border-b border-[#32106B]/05 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo on Left */}
          <button
            id="nav-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
            aria-label="Harpalani Ventures Home"
          >
            <HarpalaniLogo variant="light" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 lg:gap-14" aria-label="Main Navigation">
            <button
              id="nav-link-ventures"
              onClick={() => scrollToSection("ventures")}
              className="text-xs font-semibold tracking-[0.25em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer"
            >
              VENTURES
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollToSection("about")}
              className="text-xs font-semibold tracking-[0.25em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer"
            >
              ABOUT
            </button>
            <button
              id="nav-link-contact"
              onClick={() => scrollToSection("contact")}
              className="text-xs font-semibold tracking-[0.25em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer"
            >
              CONTACT
            </button>
          </nav>

          {/* Right-Side EXPLORE CTA */}
          <div className="hidden md:flex items-center">
            <button
              id="nav-cta-btn"
              onClick={() => scrollToSection("ventures")}
              className="px-6 py-2.5 rounded-full bg-[#32106B] hover:bg-[#4B168C] text-white text-[11px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(50,16,107,0.18)] hover:shadow-[0_6px_22px_rgba(50,16,107,0.28)] hover:-translate-y-0.5 cursor-pointer"
            >
              EXPLORE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#32106B] hover:bg-[#EDE5F7]/50 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-[#32106B]/12 px-6 py-6 shadow-xl"
            >
              <nav className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection("ventures")}
                  className="text-left text-sm font-semibold tracking-[0.2em] text-[#17131D] hover:text-[#32106B] py-2 border-b border-[#EDE5F7]/80 uppercase"
                >
                  VENTURES
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-sm font-semibold tracking-[0.2em] text-[#17131D] hover:text-[#32106B] py-2 border-b border-[#EDE5F7]/80 uppercase"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-sm font-semibold tracking-[0.2em] text-[#17131D] hover:text-[#32106B] py-2 border-b border-[#EDE5F7]/80 uppercase"
                >
                  CONTACT
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection("ventures")}
                    className="w-full py-3 rounded-full bg-[#32106B] text-white text-xs font-semibold tracking-[0.25em] uppercase shadow-md"
                  >
                    EXPLORE
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pt-24 sm:pt-28">
        
        {/* ===================================================
            5. HERO — EDITORIAL LUXURY
        =================================================== */}
        <section
          id="hero"
          className="relative w-full bg-[#FFFFFF] overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36 border-b border-[#32106B]/06"
        >
          {/* Subtle Ambient Lavender Background Glows */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-[#EDE5F7]/60 via-[#F8F6FB]/30 to-transparent blur-3xl pointer-events-none -z-0" />
          <div className="absolute -bottom-24 -left-24 w-[35vw] h-[35vw] rounded-full bg-[#EDE5F7]/40 blur-3xl pointer-events-none -z-0" />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              
              {/* Left Column: Typography & CTAs */}
              <div className="lg:col-span-7 flex flex-col text-left">
                
                {/* Eyebrow Label */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 sm:mb-8"
                >
                  <span className="text-[11px] font-sans-clean font-bold tracking-[0.3em] uppercase text-[#32106B] inline-block">
                    HARPALANI VENTURES PVT. LTD.
                  </span>
                </motion.div>

                {/* Main Headline: Editorial Serif */}
                <motion.h1
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif-luxury font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.06] text-[#17131D] tracking-[-0.015em] mb-7 sm:mb-9"
                >
                  Building What<br className="hidden sm:inline" /> Comes Next.
                </motion.h1>

                {/* Supporting Copy */}
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans-clean text-base sm:text-lg lg:text-xl text-[#17131D]/75 leading-relaxed max-w-xl mb-10 sm:mb-12 font-light"
                >
                  We build businesses, brands, and technology products designed for a changing world.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
                >
                  <button
                    id="hero-cta-explore"
                    onClick={() => scrollToSection("ventures")}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#32106B] hover:bg-[#4B168C] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(50,16,107,0.22)] hover:shadow-[0_12px_32px_rgba(50,16,107,0.32)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Explore Our Ventures</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="hero-cta-story"
                    onClick={() => scrollToSection("about")}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white hover:bg-[#F8F6FB] text-[#32106B] border border-[#32106B]/25 hover:border-[#32106B] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span>Discover Our Story</span>
                  </button>
                </motion.div>

              </div>

              {/* Right Column: Abstract Geometric Visual inspired by HV Curves */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end mt-6 lg:mt-0">
                <HeroAbstractVisual />
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            6. INTRODUCTION — EDITORIAL STATEMENT
        =================================================== */}
        <section
          id="introduction"
          className="w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-36 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Small Label */}
            <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-6">
              ABOUT HARPALANI VENTURES
            </span>

            {/* Two-Column Editorial Composition */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-6">
                <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#17131D] leading-[1.12] tracking-tight">
                  Where ideas become ventures.
                </h2>
              </div>

              <div className="lg:col-span-6 lg:pt-2">
                <p className="font-sans-clean text-lg sm:text-xl lg:text-2xl text-[#17131D]/80 leading-relaxed font-light">
                  Harpalani Ventures Pvt. Ltd. brings together entrepreneurship, creativity and technology to build businesses with lasting potential.
                </p>
                <div className="mt-8 pt-8 border-t border-[#32106B]/10 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#32106B]">
                  <span>Parent Company</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD]" />
                  <span>Venture Ecosystem</span>
                </div>
              </div>
            </div>

            {/* Thin Purple Divider */}
            <div className="mt-16 sm:mt-24 w-full h-[1px] bg-gradient-to-r from-[#32106B]/20 via-[#6F2DBD]/30 to-transparent" />

          </div>
        </section>

        {/* ===================================================
            7. OUR VENTURES — SIGNATURE SECTION (EDITORIAL LIST)
        =================================================== */}
        <section
          id="ventures"
          className="w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-36 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Section Header */}
            <div className="max-w-3xl mb-16 sm:mb-24 text-left">
              <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                Portfolio
              </span>
              <h2 className="font-serif-luxury font-normal text-3xl sm:text-5xl lg:text-6xl text-[#17131D] tracking-tight mb-4">
                Our Ventures
              </h2>
              <p className="font-sans-clean text-base sm:text-lg text-[#17131D]/70 leading-relaxed font-light">
                A growing ecosystem of businesses, brands and technology products.
              </p>
            </div>

            {/* Large Horizontal Editorial List (NOT a generic card grid) */}
            <div className="divide-y divide-[#32106B]/12 border-t border-b border-[#32106B]/12">
              {VENTURES_DATA.map((venture) => (
                <div
                  key={venture.id}
                  onMouseEnter={() => setActiveVentureHover(venture.id)}
                  onMouseLeave={() => setActiveVentureHover(null)}
                  className="group py-12 sm:py-16 lg:py-20 transition-all duration-400 hover:bg-[#F8F6FB]/80 -mx-6 sm:-mx-8 lg:-mx-12 px-6 sm:px-8 lg:px-12 relative cursor-default"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                    
                    {/* Index Number */}
                    <div className="lg:col-span-2 flex items-baseline gap-3">
                      <span className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-[#32106B]/30 group-hover:text-[#32106B] transition-colors duration-400 font-light">
                        {venture.id}
                      </span>
                    </div>

                    {/* Venture Name & Category */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[11px] font-sans-clean font-bold tracking-[0.25em] text-[#6F2DBD] uppercase">
                          {venture.category}
                        </span>
                        {venture.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#32106B] text-white text-[9px] font-bold tracking-[0.2em] uppercase">
                            {venture.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#17131D] font-normal tracking-tight group-hover:text-[#32106B] transition-colors duration-300">
                          {venture.name}
                        </h3>
                        {venture.codeName && (
                          <span className="text-xs font-sans-clean tracking-[0.2em] uppercase text-[#6F2DBD] font-bold">
                            {venture.codeName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="lg:col-span-4">
                      <p className="font-sans-clean text-sm sm:text-base text-[#17131D]/70 leading-relaxed font-normal">
                        {venture.description}
                      </p>
                    </div>

                    {/* Subtle Architectural Indicator */}
                    <div className="lg:col-span-1 flex justify-end">
                      <div className="w-10 h-10 rounded-full border border-[#32106B]/15 group-hover:border-[#32106B] group-hover:bg-[#32106B] group-hover:text-white flex items-center justify-center transition-all duration-300 text-[#32106B]">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ===================================================
            8. QUOTEFLOW AI — LUXURY PRODUCT TEASER
        =================================================== */}
        <section
          id="quoteflow-teaser"
          className="relative w-full bg-[#17131D] text-white py-28 sm:py-36 lg:py-44 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #17131D 0%, #32106B 45%, #4B168C 100%)",
          }}
        >
          {/* Subtle Animated Ambient Purple Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#6F2DBD]/18 blur-[140px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-[#32106B]/50 blur-[120px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
            
            {/* Small Text: A NEW VENTURE • CODE NAME */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center justify-center gap-3 flex-wrap"
            >
              <span className="text-[11px] font-sans-clean font-bold tracking-[0.35em] text-[#EDE5F7] uppercase inline-block">
                A NEW VENTURE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EDE5F7]/40" />
              <span className="text-[11px] font-sans-clean font-bold tracking-[0.3em] text-white/70 uppercase inline-block">
                CODE NAME
              </span>
            </motion.div>

            {/* Main: QuoteFlow AI (NO LOGO, TYPOGRAPHY ONLY) */}
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-normal tracking-tight text-white mb-4 leading-none"
            >
              QuoteFlow AI
            </motion.h2>

            {/* SaaS Product Badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[#EDE5F7] text-[11px] font-semibold tracking-[0.25em] uppercase">
                AI SaaS PRODUCT
              </span>
            </motion.div>

            {/* Supporting Copy */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans-clean text-base sm:text-xl md:text-2xl text-white/85 font-light leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-16"
            >
              AI-powered quotation SaaS product designed to simplify the way businesses create, manage, and deliver professional quotations.
            </motion.p>

            {/* Dramatic Typographic Reveal */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.35 }}
              className="flex flex-col items-center gap-5"
            >
              {/* LAUNCHING THIS YEAR */}
              <div className="inline-block px-8 py-3 rounded-full bg-white text-[#32106B] font-sans-clean font-bold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                LAUNCHING THIS YEAR
              </div>

              {/* SOON... */}
              <div className="font-serif-luxury italic text-2xl sm:text-4xl text-[#EDE5F7] tracking-[0.25em] mt-2">
                SOON...
              </div>

              {/* by Harpalani Ventures Pvt. Ltd. */}
              <div className="mt-4 text-xs font-sans-clean tracking-[0.25em] uppercase text-white/60 flex items-center gap-2">
                <span>by</span>
                <span className="text-white font-medium">Harpalani Ventures Pvt. Ltd.</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ===================================================
            9. VENTURE PHILOSOPHY (MINIMALIST STATEMENT)
        =================================================== */}
        <section
          id="philosophy"
          className="w-full bg-[#FFFFFF] py-24 sm:py-36 lg:py-44 border-b border-[#32106B]/08"
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            
            {/* Large Purple Typography */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-3 sm:space-y-4 font-serif-luxury text-3xl sm:text-5xl md:text-6xl lg:text-[64px] text-[#32106B] font-normal leading-[1.15]"
            >
              <p>Build with purpose.</p>
              <p>Move with precision.</p>
              <p>Think beyond today.</p>
            </motion.div>

            {/* Supporting statement */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 sm:mt-16 font-sans-clean text-base sm:text-lg lg:text-xl text-[#17131D]/75 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Our ventures are built around ideas that have the potential to create meaningful value over time.
            </motion.p>

          </div>
        </section>

        {/* ===================================================
            10. THE BUILDING PROCESS (HORIZONTAL TIMELINE)
        =================================================== */}
        <section
          id="process"
          className="w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-36 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Header */}
            <div className="max-w-3xl mb-16 sm:mb-24 text-left">
              <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                Methodology
              </span>
              <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl md:text-5xl text-[#17131D] tracking-tight mb-4">
                The Building Process
              </h2>
            </div>

            {/* Refined 4-Stage Horizontal Timeline (Vertical on Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
              {BUILDING_STAGES.map((stage, idx) => (
                <div key={stage.step} className="flex flex-col relative">
                  
                  {/* Connecting Line (Desktop) */}
                  {idx < BUILDING_STAGES.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-12 right-0 h-[1px] bg-[#EDE5F7]" />
                  )}

                  {/* Stage Step Number */}
                  <div className="w-12 h-12 rounded-full border border-[#32106B]/20 bg-[#F8F6FB] flex items-center justify-center font-serif-luxury text-lg text-[#32106B] font-medium mb-6 relative z-10">
                    {stage.step}
                  </div>

                  {/* Stage Title */}
                  <h3 className="font-sans-clean font-bold text-lg sm:text-xl text-[#17131D] tracking-wider uppercase mb-3">
                    {stage.title}
                  </h3>

                  {/* Stage Description */}
                  <p className="font-sans-clean text-sm sm:text-base text-[#17131D]/70 leading-relaxed font-normal">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ===================================================
            11. BRAND MOMENT (DRAMATIC FULL-WIDTH DEEP PURPLE)
        =================================================== */}
        <section
          id="brand-moment"
          className="relative w-full bg-[#32106B] text-white py-28 sm:py-36 lg:py-44 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #17131D 0%, #32106B 60%, #4B168C 100%)",
          }}
        >
          {/* Subtle Ambient Purple Glow Behind Typography */}
          <div className="absolute inset-0 bg-radial from-[#6F2DBD]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans-clean font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white mb-6 leading-tight"
            >
              WE ARE NOT BUILDING FOR TODAY.
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif-luxury italic text-xl sm:text-3xl md:text-4xl text-[#EDE5F7] tracking-wide"
            >
              We are building for what comes next.
            </motion.p>
          </div>
        </section>

        {/* ===================================================
            12. ABOUT (PREMIUM EDITORIAL ABOUT)
        =================================================== */}
        <section
          id="about"
          className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-36 border-b border-[#32106B]/08 overflow-hidden"
        >
          {/* Large Typographic "HV" Decorative Element in Background */}
          <div 
            className="absolute -right-12 top-1/2 -translate-y-1/2 font-serif-luxury text-[320px] sm:text-[450px] font-bold text-[#32106B]/[0.03] select-none pointer-events-none leading-none z-0"
            aria-hidden="true"
          >
            HV
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="max-w-3xl text-left">
              
              <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-4">
                ABOUT
              </span>

              <h2 className="font-serif-luxury font-normal text-3xl sm:text-5xl lg:text-6xl text-[#17131D] tracking-tight mb-8 leading-[1.12]">
                Built from an entrepreneurial mindset.
              </h2>

              <div className="space-y-6 text-base sm:text-lg lg:text-xl text-[#17131D]/80 leading-relaxed font-sans-clean font-light">
                <p>
                  Harpalani Ventures Pvt. Ltd. is a diversified venture company focused on building businesses, brands and technology products with long-term potential.
                </p>
                <p>
                  We combine entrepreneurship, creativity, technology and disciplined execution to transform ideas into meaningful ventures.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            13. UPCOMING (SUBTLE UPCOMING STRIP)
        =================================================== */}
        <section
          id="upcoming"
          className="w-full bg-[#F8F6FB] py-10 sm:py-12 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#32106B]">
                  COMING NEXT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD]" />
                <span className="font-serif-luxury text-lg sm:text-xl text-[#17131D] font-medium">
                  QuoteFlow AI
                </span>
                <span className="text-xs font-sans-clean font-semibold tracking-[0.18em] uppercase text-[#6F2DBD]">
                  (CODE NAME)
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#32106B]/08 text-[#32106B] text-[10px] font-bold tracking-[0.18em] uppercase">
                  SaaS Product
                </span>
              </div>
              <div>
                <span className="text-xs font-sans-clean font-semibold tracking-[0.25em] uppercase text-[#6F2DBD]">
                  Launching This Year
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            14. CONTACT (LUXURY CONTACT EXPERIENCE)
        =================================================== */}
        <section
          id="contact"
          className="w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-36"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Context & Direct Contact Channels */}
              <div className="lg:col-span-5 flex flex-col text-left">
                <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                  CONNECT
                </span>

                <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl md:text-5xl text-[#17131D] tracking-tight mb-6">
                  Let's Build Something Meaningful.
                </h2>

                <p className="font-sans-clean text-base sm:text-lg text-[#17131D]/70 leading-relaxed mb-8 font-light">
                  For business enquiries, partnerships, collaborations, or general enquiries, connect with Harpalani Ventures.
                </p>

                {/* Primary WhatsApp Card for All Queries */}
                <div className="p-6 rounded-2xl bg-[#F8F6FB] border border-[#32106B]/15 hover:border-[#6F2DBD] transition-all duration-300 mb-8">
                  <div className="flex items-center gap-2 mb-2 text-[#6F2DBD]">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[11px] font-sans-clean font-bold tracking-[0.25em] uppercase">
                      FOR ALL QUERIES
                    </span>
                  </div>
                  <p className="font-serif-luxury text-xl sm:text-2xl text-[#17131D] font-normal mb-1">
                    Connect on WhatsApp
                  </p>
                  <p className="font-sans-clean text-sm text-[#17131D]/70 mb-4 font-light leading-relaxed">
                    For all enquiries, proposals, and immediate responses, please connect directly via our official WhatsApp number.
                  </p>
                  <a
                    href="https://wa.me/919549595496"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#32106B] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#4B168C] transition-colors shadow-sm"
                  >
                    <span>+91 95495 95496</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Direct Communications Grid */}
                <div className="pt-6 border-t border-[#32106B]/10 space-y-4">
                  {/* Email */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6F2DBD] block mb-1">
                      Direct Email
                    </span>
                    <a
                      href="mailto:projectquote14@gmail.com"
                      className="text-base font-sans-clean text-[#17131D] hover:text-[#6F2DBD] transition-colors flex items-center gap-2 font-medium"
                    >
                      <Mail className="w-4 h-4 text-[#32106B]" />
                      <span>projectquote14@gmail.com</span>
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6F2DBD] block mb-1">
                      Direct Phone
                    </span>
                    <a
                      href="tel:+919549595496"
                      className="text-base font-sans-clean text-[#17131D] hover:text-[#6F2DBD] transition-colors flex items-center gap-2 font-medium"
                    >
                      <Phone className="w-4 h-4 text-[#32106B]" />
                      <span>+91 95495 95496</span>
                    </a>
                  </div>

                  {/* Corporate Domain */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#32106B]/70 block mb-0.5">
                      Corporate Domain
                    </span>
                    <p className="text-sm font-sans-clean text-[#17131D]/80">
                      harpalaniventures.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Large Form with Minimal Borders */}
              <div className="lg:col-span-7">
                {formSubmitted ? (
                  <div className="p-8 sm:p-12 border border-[#32106B]/15 bg-[#F8F6FB] rounded-xl text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#EDE5F7] border border-[#32106B]/20 flex items-center justify-center mx-auto text-[#32106B]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif-luxury text-2xl font-normal text-[#17131D]">
                      Message Received
                    </h3>
                    <p className="font-sans-clean text-sm text-[#17131D]/70 max-w-md mx-auto">
                      Thank you for connecting with Harpalani Ventures Pvt. Ltd. Our team will review your enquiry promptly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-full border border-[#32106B]/25 text-xs font-semibold uppercase tracking-[0.2em] text-[#32106B] hover:bg-[#EDE5F7] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-8 text-left" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                          NAME
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pb-3 pt-1 border-b border-[#32106B]/20 bg-transparent text-base text-[#17131D] placeholder:text-[#17131D]/30 focus:border-[#32106B] transition-colors focus:outline-none"
                        />
                        {formErrors.name && (
                          <span className="text-[11px] text-[#6F2DBD] mt-1.5 block font-medium">
                            {formErrors.name}
                          </span>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                          EMAIL
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="your.email@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pb-3 pt-1 border-b border-[#32106B]/20 bg-transparent text-base text-[#17131D] placeholder:text-[#17131D]/30 focus:border-[#32106B] transition-colors focus:outline-none"
                        />
                        {formErrors.email && (
                          <span className="text-[11px] text-[#6F2DBD] mt-1.5 block font-medium">
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Company Field */}
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                        COMPANY
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        placeholder="Organization or Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pb-3 pt-1 border-b border-[#32106B]/20 bg-transparent text-base text-[#17131D] placeholder:text-[#17131D]/30 focus:border-[#32106B] transition-colors focus:outline-none"
                      />
                      {formErrors.company && (
                        <span className="text-[11px] text-[#6F2DBD] mt-1.5 block font-medium">
                          {formErrors.company}
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                        MESSAGE
                      </label>
                      <textarea
                        id="contact-message"
                        rows={3}
                        placeholder="Tell us about your enquiry or proposal..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pb-3 pt-1 border-b border-[#32106B]/20 bg-transparent text-base text-[#17131D] placeholder:text-[#17131D]/30 focus:border-[#32106B] transition-colors focus:outline-none resize-none"
                      />
                      {formErrors.message && (
                        <span className="text-[11px] text-[#6F2DBD] mt-1.5 block font-medium">
                          {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* CTA: START A CONVERSATION */}
                    <div className="pt-2">
                      <button
                        id="contact-submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-4 rounded-full bg-[#32106B] hover:bg-[#4B168C] text-white text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(50,16,107,0.18)] disabled:opacity-60 cursor-pointer inline-flex items-center gap-3"
                      >
                        {isSubmitting ? (
                          <span>CONNECTING...</span>
                        ) : (
                          <>
                            <span>START A CONVERSATION</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-xs font-sans-clean text-[#17131D]/60 mt-4 leading-relaxed">
                        For all urgent or direct queries, message us on WhatsApp at{" "}
                        <a
                          href="https://wa.me/919549595496"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#32106B] font-semibold underline underline-offset-4 hover:text-[#6F2DBD] transition-colors"
                        >
                          +91 95495 95496
                        </a>{" "}
                        or email{" "}
                        <a
                          href="mailto:projectquote14@gmail.com"
                          className="text-[#32106B] font-semibold underline underline-offset-4 hover:text-[#6F2DBD] transition-colors"
                        >
                          projectquote14@gmail.com
                        </a>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ===================================================
          15. FOOTER (DEEP ROYAL PURPLE)
      =================================================== */}
      <footer
        id="footer"
        className="w-full bg-[#32106B] text-white py-16 sm:py-24 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-white/10">
            
            {/* Left: Large Harpalani Ventures Logo & Mission */}
            <div className="md:col-span-6 flex flex-col items-start text-left">
              <HarpalaniLogo variant="dark" size="lg" layout="horizontal" />
              <p className="font-serif-luxury italic text-base sm:text-lg text-[#EDE5F7] mt-4">
                Building what comes next.
              </p>

              {/* Direct Footer Contact Details */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs font-sans-clean text-white/80">
                <p className="flex items-center gap-2">
                  <span className="text-white/50 tracking-wider uppercase text-[10px]">Email:</span>
                  <a
                    href="mailto:projectquote14@gmail.com"
                    className="hover:text-white transition-colors underline underline-offset-2"
                  >
                    projectquote14@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-white/50 tracking-wider uppercase text-[10px]">Phone / WhatsApp:</span>
                  <a
                    href="tel:+919549595496"
                    className="hover:text-white transition-colors"
                  >
                    +91 95495 95496
                  </a>
                </p>
                <p className="text-[11px] text-[#D8B4FE] tracking-wide pt-1">
                  For all queries, connect via WhatsApp at +91 95495 95496
                </p>
              </div>
            </div>

            {/* Links & WhatsApp CTA */}
            <div className="md:col-span-6 flex flex-col md:items-end items-start gap-6">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <button
                  onClick={() => scrollToSection("ventures")}
                  className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  VENTURES
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  CONTACT
                </button>
              </div>

              {/* Instant WhatsApp Action Pill */}
              <a
                href="https://wa.me/919549595496"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#D8B4FE]" />
                <span>WhatsApp: +91 95495 95496</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/60" />
              </a>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-clean text-white/50 tracking-wider">
            <div>
              <span>© 2026 Harpalani Ventures Pvt. Ltd.</span>
            </div>
            <div>
              <span className="text-white/40">harpalaniventures.com</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
