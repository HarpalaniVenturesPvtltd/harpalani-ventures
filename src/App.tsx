import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { 
  ArrowRight, 
  ArrowUpRight, 
  Menu, 
  X, 
  CheckCircle2,
  Mail, 
  Phone, 
  MessageCircle,
  Globe,
  Compass,
  Layers,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building2,
  ChevronRight
} from "lucide-react";
import HarpalaniLogo from "./components/HarpalaniLogo";
import HeroThreeNetwork from "./components/HeroThreeNetwork";
import CinematicIntro from "./components/CinematicIntro";

// Verified Venture Portfolio Data
const VENTURES_DATA = [
  {
    id: "01",
    name: "Beautiful The Boutique",
    category: "Retail Designer Store",
    industry: "Fashion Retail",
    badge: null,
    status: "Operational",
    description: "A retail designer store offering curated designer collections, bespoke fashion, and an elevated shopping experience tailored to discerning clientele.",
    highlights: ["Curated Designer Collections", "Bespoke Fashion Consultation", "Elevated In-Store Experience"],
    actionText: "Visit Store Details",
    actionLink: "#contact",
  },
  {
    id: "02",
    name: "Cilaee Cadaee",
    category: "Custom Stitching • Bridal & Ethnic Wear",
    industry: "Apparel Couture",
    badge: null,
    status: "Operational Brand",
    description: "A custom stitching designer brand for women's bridal wear and ethnic wear, specializing in bespoke craftsmanship, couture tailoring, and modern traditional styling.",
    highlights: ["Couture Bridal Ensembles", "Artisanal Handcrafted Stitching", "Modern Ethnic Aesthetics"],
    actionText: "Enquire for Couture",
    actionLink: "#contact",
  },
  {
    id: "03",
    name: "Blaze Graphics",
    category: "Brand Identity & Digital Marketing",
    industry: "Digital Services",
    badge: null,
    status: "Active Studio",
    description: "A brand identity and digital marketing online studio delivering strategic visual direction, brand design, and high-impact digital marketing solutions for emerging and established enterprises.",
    highlights: ["Visual Identity Systems", "Strategic Digital Campaigns", "Performance Marketing Direction"],
    actionText: "Engage Studio",
    actionLink: "#contact",
  },
  {
    id: "04",
    name: "QuoteFlow AI",
    category: "SaaS Product (Code Name)",
    industry: "Enterprise AI Software",
    badge: "LAUNCHING IN 2027",
    status: "In Active Development",
    description: "An AI-powered quotation SaaS product engineered to simplify, automate, and elevate how businesses generate, manage, and deliver professional commercial quotations.",
    highlights: ["Intelligent Quote Automation", "Structured Pipeline Governance", "Next-Gen Commercial Workflows"],
    actionText: "Register Early Interest",
    actionLink: "#contact",
  },
];

// Strategic Pillars & Capabilities
const STRATEGIC_CAPABILITIES = [
  {
    icon: Compass,
    title: "Venture Development",
    category: "Strategic Incubation",
    description: "Identifying real commercial demand and translating high-conviction ideas into operationally sound, self-sustaining business entities.",
  },
  {
    icon: Layers,
    title: "Brand Building",
    category: "Identity & Positioning",
    description: "Creating distinctive brand architectures, premium aesthetic standards, and compelling narratives that build long-term consumer trust.",
  },
  {
    icon: Sparkles,
    title: "Digital Products & Technology",
    category: "Software & Innovation",
    description: "Developing modern digital platforms and software solutions designed to automate workflows and solve real operational bottlenecks.",
  },
  {
    icon: TrendingUp,
    title: "Disciplined Execution",
    category: "Governance & Operations",
    description: "Balancing creative vision with rigorous business fundamentals, operational governance, and sustainable long-term value creation.",
  },
];

// The Building Methodology: 4-Stage Lifecycle
const BUILDING_METHODOLOGY = [
  {
    step: "01",
    phase: "DISCOVER",
    title: "Market Insight & Opportunity",
    description: "Evaluating market needs, industry friction, and consumer demand to identify opportunities that justify focused venture development.",
  },
  {
    step: "02",
    phase: "BUILD",
    title: "Foundations & Prototyping",
    description: "Architecting the business model, brand identity, operational structure, or software platform with unyielding attention to quality.",
  },
  {
    step: "03",
    phase: "REFINE",
    title: "Execution & Optimization",
    description: "Iterating through design, customer experience, technology workflows, and feedback to ensure high operational standards.",
  },
  {
    step: "04",
    phase: "GROW",
    title: "Sustainable Expansion",
    description: "Scaling with strategic discipline, ensuring each venture compounds value responsibly within the broader portfolio ecosystem.",
  },
];

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVenture, setActiveVenture] = useState<string>("01");
  const [ventureFilter, setVentureFilter] = useState<string>("all");

  // Scroll Progress Tracking for the entire landing page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Subtle Parallax offsets for background glows and decorative watermarks
  const heroGlowY = useTransform(scrollYProgress, [0, 0.4], [0, 45]);
  const heroGlowYReverse = useTransform(scrollYProgress, [0, 0.4], [0, -35]);
  const hvWatermarkY = useTransform(scrollYProgress, [0.5, 0.9], [-25, 25]);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    ventureInterest: "General Group Enquiry",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedQuery, setSubmittedQuery] = useState(false);

  // Check if user redirected back from FormSubmit after successful submission
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("submitted") === "true") {
        setSubmittedQuery(true);
      }
    }
  }, []);

  // Scroll listener for minimal luxury navigation elevation
  useEffect(() => {
    const handleScroll = () => {
      // Reveal the sticky navbar as the user scrolls into the main website
      const threshold = window.innerHeight * 0.45;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 78;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: "smooth",
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Please enter your name";
    if (!formData.email.trim()) {
      errors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) errors.company = "Please enter your organization";
    if (!formData.message.trim()) errors.message = "Please write a brief message";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
    // Form validation passed — browser performs standard POST to FormSubmit
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#17131D] font-sans-clean selection:bg-[#32106B] selection:text-white flex flex-col antialiased">
      
      {/* ===================================================
          1. TOP VIEWPORT SCROLL PROGRESS BAR
      =================================================== */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-transparent"
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-[#32106B] via-[#6F2DBD] to-[#A855F7] shadow-[0_0_12px_rgba(111,45,189,0.5)]"
          style={{ scaleX: shouldReduceMotion ? scrollYProgress : scaleX }}
        />
      </div>

      {/* ===================================================
          1. CINEMATIC ANIMATED OPENING SCREEN (Exact Logo Image)
      =================================================== */}
      <CinematicIntro 
        onExploreClick={() => {
          const mainEl = document.getElementById("main-content");
          if (mainEl) {
            mainEl.scrollIntoView({ behavior: "smooth" });
          }
        }} 
      />

      {/* ===================================================
          2. ENTERPRISE HEADER & NAVIGATION
      =================================================== */}
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "translate-y-0 opacity-100 pointer-events-auto bg-white/94 backdrop-blur-md border-b border-[#32106B]/10 py-3.5 shadow-[0_2px_24px_-8px_rgba(50,16,107,0.08)]"
            : "-translate-y-full opacity-0 pointer-events-none py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo on Left */}
          <button
            id="nav-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center text-left focus:outline-none group cursor-pointer shrink-0"
            aria-label="Harpalani Ventures Home"
          >
            <HarpalaniLogo variant="light" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-11" aria-label="Main Corporate Navigation">
            <button
              id="nav-link-ventures"
              onClick={() => scrollToSection("ventures")}
              className="text-xs font-semibold tracking-[0.22em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer py-1"
            >
              VENTURES
            </button>
            <button
              id="nav-link-about"
              onClick={() => scrollToSection("about")}
              className="text-xs font-semibold tracking-[0.22em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer py-1"
            >
              ABOUT GROUP
            </button>
            <button
              id="nav-link-strategy"
              onClick={() => scrollToSection("strategy")}
              className="text-xs font-semibold tracking-[0.22em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer py-1"
            >
              CAPABILITIES
            </button>
            <button
              id="nav-link-methodology"
              onClick={() => scrollToSection("methodology")}
              className="text-xs font-semibold tracking-[0.22em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer py-1"
            >
              METHODOLOGY
            </button>
            <button
              id="nav-link-contact"
              onClick={() => scrollToSection("contact")}
              className="text-xs font-semibold tracking-[0.22em] text-[#17131D]/80 hover:text-[#32106B] transition-colors uppercase cursor-pointer py-1"
            >
              CONTACT
            </button>
          </nav>

          {/* Right-Side Primary Action Button */}
          <div className="hidden md:flex items-center justify-end shrink-0">
            <button
              id="nav-cta-btn"
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 rounded-full bg-[#32106B] hover:bg-[#4B168C] text-white text-[11px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(50,16,107,0.18)] hover:shadow-[0_6px_22px_rgba(50,16,107,0.28)] hover:-translate-y-0.5 cursor-pointer flex items-center justify-center leading-none"
            >
              GET IN TOUCH
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#32106B] hover:bg-[#EDE5F7]/50 transition-colors"
            aria-label="Toggle Navigation Menu"
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
                  ABOUT GROUP
                </button>
                <button
                  onClick={() => scrollToSection("strategy")}
                  className="text-left text-sm font-semibold tracking-[0.2em] text-[#17131D] hover:text-[#32106B] py-2 border-b border-[#EDE5F7]/80 uppercase"
                >
                  CAPABILITIES
                </button>
                <button
                  onClick={() => scrollToSection("methodology")}
                  className="text-left text-sm font-semibold tracking-[0.2em] text-[#17131D] hover:text-[#32106B] py-2 border-b border-[#EDE5F7]/80 uppercase"
                >
                  METHODOLOGY
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-sm font-semibold tracking-[0.2em] text-[#17131D] hover:text-[#32106B] py-2 border-b border-[#EDE5F7]/80 uppercase"
                >
                  CONTACT
                </button>
                <div className="pt-2">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="w-full py-3 rounded-full bg-[#32106B] text-white text-xs font-semibold tracking-[0.22em] uppercase shadow-md"
                  >
                    GET IN TOUCH
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Container */}
      <main id="main-content" className="flex-1 pt-20 sm:pt-24">
        
        {/* ===================================================
            3. HERO SECTION — EDITORIAL EXCELLENCE & 3D NETWORK
        =================================================== */}
        <section
          id="hero"
          className="relative w-full bg-[#FFFFFF] overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 border-b border-[#32106B]/06"
        >
          {/* Architectural Ambient Glow with Subtle Parallax Depth */}
          <motion.div 
            style={{ y: shouldReduceMotion ? 0 : heroGlowY }}
            className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-[#EDE5F7]/70 via-[#F8F6FB]/40 to-transparent blur-3xl pointer-events-none -z-0" 
          />
          <motion.div 
            style={{ y: shouldReduceMotion ? 0 : heroGlowYReverse }}
            className="absolute -bottom-24 -left-20 w-[35vw] h-[35vw] rounded-full bg-[#EDE5F7]/35 blur-3xl pointer-events-none -z-0" 
          />

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
              
              {/* Left Column: Corporate Brand Statement */}
              <div className="lg:col-span-7 flex flex-col text-left">
                
                {/* Corporate Header Eyebrow */}
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-[#32106B]" />
                  <span className="text-[11px] font-sans-clean font-bold tracking-[0.28em] uppercase text-[#32106B]">
                    HARPALANI VENTURES PVT. LTD.
                  </span>
                </motion.div>

                {/* Main Headline: Large Editorial Serif */}
                <motion.h1
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif-luxury font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] text-[#17131D] tracking-[-0.015em] mb-7 sm:mb-9"
                >
                  Building What<br className="hidden sm:inline" /> Comes Next.
                </motion.h1>

                {/* Clear, Confident Corporate Supporting Copy */}
                <motion.p
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans-clean text-base sm:text-lg lg:text-xl text-[#17131D]/80 leading-relaxed max-w-xl mb-10 sm:mb-12 font-light"
                >
                  A diversified business group developing enduring ventures across retail, apparel couture, brand strategy, digital marketing, and enterprise software.
                </motion.p>

                {/* Direct Action CTAs */}
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
                    id="hero-cta-contact"
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white hover:bg-[#F8F6FB] text-[#32106B] border border-[#32106B]/25 hover:border-[#32106B] text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer"
                  >
                    <span>Get in Touch</span>
                  </button>
                </motion.div>

                {/* Subtle Credibility Badges */}
                <div className="mt-12 pt-8 border-t border-[#32106B]/08 flex flex-wrap items-center gap-6 text-xs text-[#17131D]/70 font-sans-clean">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6F2DBD]" />
                    <span>Parent Group Entity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#6F2DBD]" />
                    <span>Multi-Disciplinary Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#6F2DBD]" />
                    <span>harpalaniventures.com</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Three.js Interactive Dimensional Venture Network */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
                <HeroThreeNetwork />
              </div>

            </div>
          </div>
        </section>

        {/* ===================================================
            4. CORPORATE IDENTITY & STRATEGIC STATEMENT
        =================================================== */}
        <section
          id="identity"
          className="w-full bg-[#F8F6FB] py-20 sm:py-28 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <span className="text-xs font-bold tracking-[0.28em] text-[#6F2DBD] uppercase font-sans-clean block mb-4">
                  GROUP OVERVIEW
                </span>
                <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl lg:text-5xl text-[#17131D] leading-[1.14] tracking-tight">
                  Where strategic vision meets focused execution.
                </h2>
              </motion.div>

              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6 text-base sm:text-lg lg:text-xl text-[#17131D]/80 leading-relaxed font-light font-sans-clean"
              >
                <p>
                  Harpalani Ventures Pvt. Ltd. operates as a parent venture group stewarding a curated portfolio of businesses. We combine entrepreneurial conviction with rigorous operating discipline to build sustainable value across physical retail, artisanal craftsmanship, creative digital agency services, and modern software products.
                </p>
                <p>
                  Every initiative within our group is developed with long-term resilience at its core—prioritizing enduring customer relationships, brand integrity, and thoughtful innovation over ephemeral market trends.
                </p>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ===================================================
            5. VENTURE PORTFOLIO — THE CORE ECOSYSTEM
        =================================================== */}
        <section
          id="ventures"
          className="w-full bg-[#FFFFFF] py-24 sm:py-32 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            {/* Portfolio Header */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20"
            >
              <div className="max-w-2xl text-left">
                <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                  VENTURE ECOSYSTEM
                </span>
                <h2 className="font-serif-luxury font-normal text-3xl sm:text-5xl lg:text-6xl text-[#17131D] tracking-tight mb-4">
                  Our Ventures
                </h2>
                <p className="font-sans-clean text-base sm:text-lg text-[#17131D]/70 leading-relaxed font-light">
                  A disciplined portfolio of established operations and forward-looking technology initiatives.
                </p>
              </div>

              {/* Status Indicator Bar */}
              <div className="mt-6 md:mt-0 flex items-center gap-3 px-4 py-2 rounded-full bg-[#F8F6FB] border border-[#32106B]/10 text-xs font-sans-clean text-[#32106B]">
                <span className="w-2 h-2 rounded-full bg-[#6F2DBD] animate-pulse" />
                <span className="font-semibold tracking-wider uppercase text-[10px]">
                  4 Verified Group Ventures
                </span>
              </div>
            </motion.div>

            {/* Interactive Category Filter Pills */}
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10 pb-4 border-b border-[#32106B]/08"
            >
              <span className="text-[10px] font-sans-clean font-bold tracking-[0.22em] uppercase text-[#6F2DBD] mr-2">
                FILTER ECOSYSTEM:
              </span>
              {[
                { id: "all", label: "ALL VENTURES" },
                { id: "Retail Designer Store", label: "RETAIL" },
                { id: "Custom Stitching • Bridal & Ethnic Wear", label: "COUTURE" },
                { id: "Brand Identity & Digital Marketing", label: "DIGITAL STUDIO" },
                { id: "SaaS Product (Code Name)", label: "AI SOFTWARE" },
              ].map((filter) => {
                const isFilterActive = ventureFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setVentureFilter(filter.id)}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-sans-clean font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                      isFilterActive
                        ? "bg-[#32106B] text-white shadow-[0_4px_14px_rgba(50,16,107,0.25)] scale-105"
                        : "bg-[#F8F6FB] text-[#17131D]/75 hover:bg-[#EDE5F7] hover:text-[#32106B]"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </motion.div>

            {/* Editorial Venture Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {VENTURES_DATA
                .filter((v) => ventureFilter === "all" || v.category === ventureFilter)
                .map((venture, idx) => {
                const isSelected = activeVenture === venture.id;
                return (
                  <motion.div
                    key={venture.id}
                    layout
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setActiveVenture(venture.id)}
                    className={`p-8 sm:p-10 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#F8F6FB] border-[#32106B]/25 shadow-[0_16px_36px_-12px_rgba(50,16,107,0.12)] -translate-y-1"
                        : "bg-white border-[#32106B]/12 hover:border-[#32106B]/20 hover:bg-[#F8F6FB]/50"
                    }`}
                  >
                    <div>
                      {/* Top Meta: Index, Category & Status Badge */}
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                          <span className="font-serif-luxury text-2xl text-[#32106B]/40 font-light">
                            {venture.id}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6F2DBD]" />
                          <span className="text-[11px] font-sans-clean font-bold tracking-[0.22em] text-[#6F2DBD] uppercase">
                            {venture.industry}
                          </span>
                        </div>

                        {venture.badge ? (
                          <span className="px-3 py-1 rounded-full bg-[#32106B] text-white text-[9.5px] font-bold tracking-[0.2em] uppercase shadow-sm">
                            {venture.badge}
                          </span>
                        ) : (
                          <span className="text-[10px] font-sans-clean font-medium tracking-[0.18em] uppercase text-[#17131D]/60 bg-white px-2.5 py-0.5 rounded-full border border-[#32106B]/10">
                            {venture.status}
                          </span>
                        )}
                      </div>

                      {/* Venture Title */}
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#17131D] font-normal tracking-tight mb-3">
                        {venture.name}
                      </h3>

                      {/* Category Label */}
                      <p className="text-xs font-sans-clean font-semibold tracking-[0.16em] uppercase text-[#32106B]/80 mb-4">
                        {venture.category}
                      </p>

                      {/* Description */}
                      <p className="font-sans-clean text-sm sm:text-base text-[#17131D]/75 leading-relaxed font-normal mb-6">
                        {venture.description}
                      </p>

                      {/* Highlights Pill List */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {venture.highlights.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center text-[11px] font-sans-clean text-[#17131D]/80 bg-white border border-[#32106B]/10 rounded-md px-2.5 py-1"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#6F2DBD] mr-1.5" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-6 border-t border-[#32106B]/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, ventureInterest: venture.name }));
                          scrollToSection("contact");
                        }}
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#32106B] hover:text-[#6F2DBD] transition-colors cursor-pointer group"
                      >
                        <span>{venture.actionText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <div className="w-8 h-8 rounded-full border border-[#32106B]/15 flex items-center justify-center text-[#32106B]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ===================================================
            6. FEATURED INITIATIVE: QUOTEFLOW AI TEASER
        =================================================== */}
        <section
          id="quoteflow-teaser"
          className="relative w-full bg-[#17131D] text-white py-28 sm:py-36 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #17131D 0%, #32106B 50%, #4B168C 100%)",
          }}
        >
          {/* Ambient Lighting Depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full bg-[#6F2DBD]/22 blur-[150px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
            
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 flex items-center justify-center gap-3 flex-wrap"
            >
              <span className="text-[11px] font-sans-clean font-bold tracking-[0.35em] text-[#EDE5F7] uppercase">
                STRATEGIC TECHNOLOGY INITIATIVE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#EDE5F7]/40" />
              <span className="text-[11px] font-sans-clean font-bold tracking-[0.3em] text-white/70 uppercase">
                CODE NAME
              </span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-normal tracking-tight text-white mb-4 leading-none"
            >
              QuoteFlow AI
            </motion.h2>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-block px-5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#EDE5F7] text-[11px] font-semibold tracking-[0.25em] uppercase">
                ENTERPRISE QUOTATION AUTOMATION
              </span>
            </motion.div>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans-clean text-base sm:text-xl text-white/85 font-light leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-16"
            >
              An intelligent quotation engine designed to simplify how modern businesses generate, manage, and deliver professional commercial quotations.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.35 }}
              className="flex flex-col items-center gap-5"
            >
              <div className="inline-block px-8 py-3 rounded-full bg-white text-[#32106B] font-sans-clean font-bold text-xs sm:text-sm tracking-[0.25em] uppercase shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                LAUNCHING IN 2027
              </div>

              <div className="font-serif-luxury italic text-2xl sm:text-3xl text-[#EDE5F7] tracking-[0.25em] mt-2">
                SOON...
              </div>

              <div className="mt-4 text-xs font-sans-clean tracking-[0.25em] uppercase text-white/60 flex items-center gap-2">
                <span>A Venture by</span>
                <span className="text-white font-medium">Harpalani Ventures Pvt. Ltd.</span>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ===================================================
            7. STRATEGY & CAPABILITIES
        =================================================== */}
        <section
          id="strategy"
          className="w-full bg-[#FFFFFF] py-24 sm:py-32 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mb-16 sm:mb-24 text-left"
            >
              <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                STRATEGIC FOCUS
              </span>
              <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl md:text-5xl text-[#17131D] tracking-tight mb-4">
                Capabilities & Focus Areas
              </h2>
              <p className="font-sans-clean text-base sm:text-lg text-[#17131D]/70 leading-relaxed font-light">
                How our group approaches venture creation, commercial development, and long-term operations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {STRATEGIC_CAPABILITIES.map((cap, idx) => {
                const Icon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 rounded-xl bg-[#F8F6FB]/80 border border-[#32106B]/10 hover:border-[#32106B]/25 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#32106B]/15 flex items-center justify-center text-[#32106B] mb-6 shadow-sm">
                        <Icon className="w-6 h-6 text-[#6F2DBD]" />
                      </div>
                      <span className="text-[10px] font-sans-clean font-bold tracking-[0.25em] text-[#6F2DBD] uppercase block mb-2">
                        {cap.category}
                      </span>
                      <h3 className="font-serif-luxury text-xl text-[#17131D] font-normal mb-3">
                        {cap.title}
                      </h3>
                      <p className="font-sans-clean text-sm text-[#17131D]/70 leading-relaxed font-normal">
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ===================================================
            8. THE BUILDING METHODOLOGY
        =================================================== */}
        <section
          id="methodology"
          className="w-full bg-[#FFFFFF] py-24 sm:py-32 border-b border-[#32106B]/08"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl mb-16 sm:mb-24 text-left"
            >
              <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                METHODOLOGY
              </span>
              <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl md:text-5xl text-[#17131D] tracking-tight mb-4">
                The Building Process
              </h2>
              <p className="font-sans-clean text-base sm:text-lg text-[#17131D]/70 leading-relaxed font-light">
                A structured four-stage discipline guiding each idea from conception to execution.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative">
              {BUILDING_METHODOLOGY.map((stage, idx) => (
                <motion.div 
                  key={stage.step}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col relative text-left"
                >
                  
                  {/* Connecting Line (Desktop) */}
                  {idx < BUILDING_METHODOLOGY.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-12 right-0 h-[1px] bg-[#EDE5F7]" />
                  )}

                  {/* Stage Step Number */}
                  <div className="w-12 h-12 rounded-full border border-[#32106B]/20 bg-[#F8F6FB] flex items-center justify-center font-serif-luxury text-lg text-[#32106B] font-medium mb-6 relative z-10 shadow-xs">
                    {stage.step}
                  </div>

                  <span className="text-[11px] font-sans-clean font-bold tracking-[0.25em] text-[#6F2DBD] uppercase mb-1">
                    {stage.phase}
                  </span>

                  <h3 className="font-serif-luxury text-xl text-[#17131D] font-normal mb-3">
                    {stage.title}
                  </h3>

                  <p className="font-sans-clean text-sm text-[#17131D]/70 leading-relaxed font-normal">
                    {stage.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ===================================================
            9. CORPORATE STATEMENT: BRAND MOMENT
        =================================================== */}
        <section
          id="brand-statement"
          className="relative w-full bg-[#32106B] text-white py-24 sm:py-32 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #17131D 0%, #32106B 60%, #4B168C 100%)",
          }}
        >
          <div className="absolute inset-0 bg-radial from-[#6F2DBD]/20 via-transparent to-transparent blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-sans-clean font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.18em] sm:tracking-[0.24em] uppercase text-white mb-6 leading-tight"
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
            10. ABOUT THE GROUP (CORPORATE PHILOSOPHY)
        =================================================== */}
        <section
          id="about"
          className="relative w-full bg-[#FFFFFF] py-24 sm:py-32 border-b border-[#32106B]/08 overflow-hidden"
        >
          <motion.div 
            style={{ y: shouldReduceMotion ? 0 : hvWatermarkY }}
            className="absolute -right-16 top-1/2 -translate-y-1/2 font-serif-luxury text-[360px] font-bold text-[#32106B]/[0.025] select-none pointer-events-none leading-none z-0"
            aria-hidden="true"
          >
            HV
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <motion.div 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl text-left"
            >
              
              <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-4">
                ABOUT HARPALANI VENTURES
              </span>

              <h2 className="font-serif-luxury font-normal text-3xl sm:text-5xl lg:text-6xl text-[#17131D] tracking-tight mb-8 leading-[1.12]">
                An entrepreneurial mindset with corporate discipline.
              </h2>

              <div className="space-y-6 text-base sm:text-lg lg:text-xl text-[#17131D]/80 leading-relaxed font-sans-clean font-light">
                <p>
                  Harpalani Ventures Pvt. Ltd. was established to incubate, operate, and scale business models that offer genuine differentiation.
                </p>
                <p>
                  Rather than pursuing high-velocity, speculative ventures, we invest our energy in businesses that build authentic customer loyalty, celebrate craftsmanship, and utilize technology to elevate everyday enterprise processes.
                </p>
              </div>

              {/* Group Core Values */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#32106B]/10">
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h4 className="font-serif-luxury text-lg text-[#17131D] mb-1 font-medium">Authenticity</h4>
                  <p className="text-xs font-sans-clean text-[#17131D]/70 leading-relaxed">
                    Upholding genuine craftsmanship and transparency in every customer touchpoint.
                  </p>
                </motion.div>
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h4 className="font-serif-luxury text-lg text-[#17131D] mb-1 font-medium">Precision</h4>
                  <p className="text-xs font-sans-clean text-[#17131D]/70 leading-relaxed">
                    Disciplined execution from bespoke physical couture to software architectures.
                  </p>
                </motion.div>
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h4 className="font-serif-luxury text-lg text-[#17131D] mb-1 font-medium">Long-Term Value</h4>
                  <p className="text-xs font-sans-clean text-[#17131D]/70 leading-relaxed">
                    Building businesses engineered to stand the test of time and market evolutions.
                  </p>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* ===================================================
            11. CORPORATE TRUST & CONTACT SECTION
        =================================================== */}
        <section
          id="contact"
          className="w-full bg-[#FFFFFF] py-24 sm:py-32"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Direct Corporate Contacts */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex flex-col text-left"
              >
                <span className="text-xs font-bold tracking-[0.3em] text-[#6F2DBD] uppercase font-sans-clean block mb-3">
                  CONNECT WITH THE GROUP
                </span>

                <h2 className="font-serif-luxury font-normal text-3xl sm:text-4xl md:text-5xl text-[#17131D] tracking-tight mb-6">
                  Let's Discuss Business Opportunities.
                </h2>

                <p className="font-sans-clean text-base sm:text-lg text-[#17131D]/70 leading-relaxed mb-8 font-light">
                  For institutional enquiries, venture collaborations, partnerships, or general corporate dialogue, connect directly with our leadership team.
                </p>

                {/* Primary WhatsApp Card for All Queries */}
                <div className="p-6 rounded-2xl bg-[#F8F6FB] border border-[#32106B]/15 hover:border-[#6F2DBD] transition-all duration-300 mb-8 shadow-xs">
                  <div className="flex items-center gap-2 mb-2 text-[#6F2DBD]">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[11px] font-sans-clean font-bold tracking-[0.25em] uppercase">
                      PRIMARY ENQUIRY CHANNEL
                    </span>
                  </div>
                  <p className="font-serif-luxury text-xl sm:text-2xl text-[#17131D] font-normal mb-1">
                    Connect on WhatsApp
                  </p>
                  <p className="font-sans-clean text-sm text-[#17131D]/70 mb-4 font-light leading-relaxed">
                    For all business enquiries, venture collaborations, and prompt communication, connect directly via our official WhatsApp number.
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
                      Direct Telephone
                    </span>
                    <a
                      href="tel:+919549595496"
                      className="text-base font-sans-clean text-[#17131D] hover:text-[#6F2DBD] transition-colors flex items-center gap-2 font-medium"
                    >
                      <Phone className="w-4 h-4 text-[#32106B]" />
                      <span>+91 95495 95496</span>
                    </a>
                  </div>

                  {/* Official Corporate Domain */}
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#32106B]/70 block mb-0.5">
                      Corporate Domain
                    </span>
                    <p className="text-sm font-sans-clean text-[#17131D]/80">
                      harpalaniventures.com
                    </p>
                  </div>
                </div>

              </motion.div>

              {/* Right Column: Corporate Dialogue Form */}
              <motion.div 
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7"
              >
                {submittedQuery ? (
                  <div className="p-8 sm:p-12 border border-[#32106B]/20 bg-[#F8F6FB] rounded-2xl text-center space-y-4 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-[#EDE5F7] border border-[#32106B]/20 flex items-center justify-center mx-auto text-[#32106B]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif-luxury text-2xl font-normal text-[#17131D]">
                      Enquiry Received
                    </h3>
                    <p className="font-sans-clean text-sm text-[#17131D]/75 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Harpalani Ventures Pvt. Ltd. Your enquiry has been delivered to projectquote14@gmail.com, and our group leadership will review it promptly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmittedQuery(false);
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full border border-[#32106B]/25 text-xs font-semibold uppercase tracking-[0.2em] text-[#32106B] hover:bg-[#EDE5F7] transition-colors cursor-pointer"
                    >
                      Submit Another Message
                    </button>
                  </div>
                ) : (
                  <form 
                    action="https://formsubmit.co/projectquote14@gmail.com" 
                    method="POST" 
                    onSubmit={handleContactSubmit} 
                    className="space-y-8 text-left" 
                    noValidate
                  >
                    {/* FormSubmit Configuration Fields */}
                    <input type="hidden" name="_subject" value="New Website Enquiry - Harpalani Ventures" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input 
                      type="hidden" 
                      name="_next" 
                      value={typeof window !== "undefined" ? `${window.location.origin}/?submitted=true#contact` : "https://www.harpalaniventures.com/?submitted=true#contact"} 
                    />
                    {/* Honeypot Spam Prevention */}
                    <input type="text" name="_honey" style={{ display: "none" }} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                          FULL NAME *
                        </label>
                        <input
                          id="contact-name"
                          name="Full Name"
                          type="text"
                          required
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

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                          CORPORATE EMAIL *
                        </label>
                        <input
                          id="contact-email"
                          name="Corporate Email"
                          type="email"
                          required
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Organization */}
                      <div>
                        <label htmlFor="contact-company" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                          ORGANIZATION / COMPANY *
                        </label>
                        <input
                          id="contact-company"
                          name="Organization / Company"
                          type="text"
                          required
                          placeholder="Company Name"
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

                      {/* Venture of Interest */}
                      <div>
                        <label htmlFor="contact-venture" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                          VENTURE FOCUS
                        </label>
                        <select
                          id="contact-venture"
                          name="Venture Focus"
                          value={formData.ventureInterest}
                          onChange={(e) => setFormData({ ...formData, ventureInterest: e.target.value })}
                          className="w-full pb-3 pt-1 border-b border-[#32106B]/20 bg-transparent text-base text-[#17131D] focus:border-[#32106B] transition-colors focus:outline-none cursor-pointer"
                        >
                          <option value="General Group Enquiry">General Group Enquiry</option>
                          <option value="Beautiful The Boutique">Beautiful The Boutique</option>
                          <option value="Cilaee Cadaee">Cilaee Cadaee</option>
                          <option value="Blaze Graphics">Blaze Graphics</option>
                          <option value="QuoteFlow AI">QuoteFlow AI (SaaS 2027)</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-bold text-[#17131D] uppercase tracking-[0.2em] mb-2">
                        MESSAGE *
                      </label>
                      <textarea
                        id="contact-message"
                        name="Message"
                        rows={3}
                        required
                        placeholder="Please describe your proposal, partnership, or enquiry..."
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

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        id="contact-submit-btn"
                        type="submit"
                        className="px-8 py-4 rounded-full bg-[#32106B] hover:bg-[#4B168C] text-white text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(50,16,107,0.18)] hover:shadow-[0_8px_26px_rgba(50,16,107,0.28)] hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-3"
                      >
                        <span>SUBMIT ENQUIRY</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <p className="text-xs font-sans-clean text-[#17131D]/60 mt-4 leading-relaxed">
                        For all urgent queries, connect directly via WhatsApp at{" "}
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
              </motion.div>

            </div>
          </div>
        </section>

      </main>

      {/* ===================================================
          12. ENTERPRISE FOOTER (DEEP ROYAL PURPLE)
      =================================================== */}
      <footer
        id="footer"
        className="w-full bg-[#32106B] text-white py-16 sm:py-24 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between pb-12 border-b border-white/10">
            
            {/* Left: Brand Identity & Vision */}
            <div className="md:col-span-6 flex flex-col items-start text-left">
              <HarpalaniLogo variant="dark" size="lg" layout="horizontal" />
              <p className="font-serif-luxury italic text-base sm:text-lg text-[#EDE5F7] mt-4">
                Building what comes next.
              </p>
              <p className="font-sans-clean text-xs text-white/60 mt-3 max-w-md font-light leading-relaxed">
                A diversified business group stewarding ventures across retail, apparel couture, brand strategy, digital marketing, and enterprise software.
              </p>
            </div>

            {/* Right: Quick Navigation Links */}
            <div className="md:col-span-6 flex flex-col md:items-end items-start justify-center gap-6 pt-4 md:pt-0">
              <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                <button
                  onClick={() => scrollToSection("ventures")}
                  className="text-xs font-semibold tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  VENTURES
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-xs font-semibold tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  ABOUT
                </button>
                <button
                  onClick={() => scrollToSection("strategy")}
                  className="text-xs font-semibold tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  CAPABILITIES
                </button>
                <button
                  onClick={() => scrollToSection("methodology")}
                  className="text-xs font-semibold tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  METHODOLOGY
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-xs font-semibold tracking-[0.22em] uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  CONTACT
                </button>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>Connect With Group</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </button>
            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans-clean text-white/50 tracking-wider">
            <div>
              <span>© 2026 Harpalani Ventures Pvt. Ltd. All rights reserved.</span>
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
