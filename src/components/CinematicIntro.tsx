import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface CinematicIntroProps {
  onExploreClick?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking within the dedicated 180vh scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth cinematic transitions driven by natural scrolling
  // From 0 to 0.7: stable presentation; 0.7 to 1.0: gently scales down and dissolves away
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.65, 0.95],
    [1, 1, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [1, 1, 0.92]
  );

  const yTransform = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    ["0%", "0%", "-8%"]
  );

  const indicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.35],
    [1, 0]
  );

  const handleScrollToExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const target = document.getElementById("main-content");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[175vh] bg-[#0A0512] z-30"
      aria-label="Harpalani Ventures Cinematic Introduction"
    >
      {/* Sticky Fullscreen 100svh Viewport Container */}
      <div className="sticky top-0 w-full h-[100svh] min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A0512]">
        
        {/* Subtle Ambient Cosmic / Midnight-Purple Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 45%, rgba(111, 45, 189, 0.28) 0%, rgba(50, 16, 107, 0.45) 45%, rgba(10, 5, 18, 0.98) 85%, #0A0512 100%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient Pulsing Back-Glow (Controlled and Behind the Artwork) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[55vh] max-h-[500px] rounded-full blur-[140px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.24) 0%, rgba(111, 45, 189, 0.16) 50%, transparent 80%)",
          }}
          animate={shouldReduceMotion ? undefined : {
            opacity: [0.75, 1, 0.75],
            scale: [0.98, 1.04, 0.98],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        {/* Cinematic Artwork Presentation Wrapper */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? undefined : opacity,
            scale: shouldReduceMotion ? undefined : scale,
            y: shouldReduceMotion ? undefined : yTransform,
          }}
          className="relative z-10 w-full h-full max-h-[82svh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center"
        >
          {/* Initial Entrance Reveal */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full h-full flex items-center justify-center select-none"
          >
            {/* The EXACT Uploaded Reference Image Asset - No cropping, no redraw */}
            <img
              src="/assets/aistudio/image_f75046db.png"
              alt="Harpalani Ventures - Building What Comes Next."
              className="w-full h-full max-h-[76svh] object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>

        {/* Elegant Scroll-To-Explore Indicator (Outside the image artwork) */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? 1 : indicatorOpacity,
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none pointer-events-auto"
        >
          <button
            onClick={handleScrollToExplore}
            className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] rounded-full p-2 transition-transform hover:-translate-y-0.5"
            aria-label="Scroll down to explore the Harpalani Ventures website"
          >
            <span className="font-sans-clean font-semibold tracking-[0.3em] uppercase text-[9.5px] sm:text-[11px] text-[#EDE5F7]/85 group-hover:text-white transition-colors">
              SCROLL TO EXPLORE
            </span>
            
            {/* Animated Downward Chevron */}
            <motion.div
              animate={shouldReduceMotion ? undefined : {
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center text-[#EDE5F7] group-hover:border-[#A855F7] group-hover:text-white group-hover:bg-[#32106B]/50 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <ChevronDown className="w-4 h-4 text-[#C084FC] group-hover:text-white transition-colors" />
            </motion.div>
          </button>
        </motion.div>

        {/* Bottom Ambient Vignette to create seamless depth into the main site */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0512] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default CinematicIntro;
