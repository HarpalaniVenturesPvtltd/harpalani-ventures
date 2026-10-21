import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ChevronDown, Volume2, VolumeX, Sparkles, Compass } from "lucide-react";

interface CinematicIntroProps {
  onExploreClick?: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onExploreClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasAudioTrack, setHasAudioTrack] = useState(false);

  // Interactive subtle mouse tracking for ambient depth
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Safe video autoplay with audio detection
  useEffect(() => {
    const video = videoRef.current;
    if (video && !shouldReduceMotion) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      }

      // Check if video file has audio
      const checkAudio = () => {
        const v = video as unknown as Record<string, unknown>;
        const audioDetected = Boolean(v.mozHasAudio || v.webkitAudioDecodedByteCount || (v.audioTracks && (v.audioTracks as unknown[]).length > 0));
        setHasAudioTrack(audioDetected);
      };
      video.addEventListener("loadeddata", checkAudio);
      return () => video.removeEventListener("loadeddata", checkAudio);
    }
  }, [shouldReduceMotion]);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Scroll tracking within the dedicated scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth cinematic transitions driven by natural scrolling
  const opacity = useTransform(scrollYProgress, [0, 0.65, 0.95], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0.94]);
  const yTransform = useTransform(scrollYProgress, [0, 0.65, 1], ["0%", "0%", "-6%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

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
      onMouseMove={handleMouseMove}
      className="relative w-full h-[175vh] bg-[#0A0512] z-30"
      aria-label="Harpalani Ventures Cinematic Introduction"
    >
      {/* Sticky Fullscreen 100svh Viewport Container */}
      <div className="sticky top-0 w-full h-[100svh] min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#0A0512] select-none">
        
        {/* Deep Atmosphere Lighting */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(111, 45, 189, 0.32) 0%, rgba(50, 16, 107, 0.55) 45%, rgba(10, 5, 18, 0.96) 80%, #0A0512 100%)",
          }}
          aria-hidden="true"
        />

        {/* Interactive Mouse-Reactive Parallax Aurora Back-Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1200px] h-[70vh] max-h-[700px] rounded-full blur-[150px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(111, 45, 189, 0.18) 50%, transparent 80%)",
            x: shouldReduceMotion ? 0 : mousePos.x * 25,
            y: shouldReduceMotion ? 0 : mousePos.y * 25,
          }}
          animate={shouldReduceMotion ? undefined : {
            opacity: [0.75, 1, 0.75],
            scale: [0.98, 1.05, 0.98],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />

        {/* Full-bleed Edge-to-Edge Media Container */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? undefined : opacity,
            scale: shouldReduceMotion ? undefined : scale,
            y: shouldReduceMotion ? undefined : yTransform,
          }}
          className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Parallax Tilt on the Video Viewport */}
          <motion.div
            style={{
              rotateY: shouldReduceMotion ? 0 : mousePos.x * 1.8,
              rotateX: shouldReduceMotion ? 0 : -mousePos.y * 1.5,
              perspective: 1000,
            }}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* If reduced motion is requested or video errors, fallback to exact static artwork */}
            {shouldReduceMotion || videoError ? (
              <img
                src="/assets/aistudio/image_f75046db.png"
                alt="Harpalani Ventures - Building What Comes Next."
                className="w-full h-full object-contain sm:object-cover sm:scale-105 object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                loading="eager"
                decoding="async"
              />
            ) : (
              <video
                ref={videoRef}
                src="/assets/aistudio/animated_logo_watermark_removes_e9b6c2ba.mp4"
                poster="/assets/aistudio/image_f75046db.png"
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
                onError={() => setVideoError(true)}
                className="w-full h-full object-contain sm:object-cover sm:scale-[1.02] object-center pointer-events-none drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                aria-label="Harpalani Ventures Animated Corporate Logo"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Top-Right Sound Control (if video has audio track) */}
        {hasAudioTrack && (
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={toggleSound}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-sans-clean font-semibold tracking-[0.2em] uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              aria-label={isMuted ? "Unmute intro audio" : "Mute intro audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#C084FC]" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
              <span>{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
            </button>
          </div>
        )}

        {/* Floating Interactive Venture Quick Peek Tags in Intro corners */}
        <motion.div
          style={{ opacity: shouldReduceMotion ? 1 : indicatorOpacity }}
          className="hidden lg:flex absolute top-8 left-8 z-20 items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17131D]/60 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-sans-clean tracking-wider"
        >
          <Sparkles className="w-3 h-3 text-[#C084FC]" />
          <span>Pvt. Ltd. Diversified Portfolio</span>
        </motion.div>

        <motion.div
          style={{ opacity: shouldReduceMotion ? 1 : indicatorOpacity }}
          className="hidden lg:flex absolute top-8 right-8 z-20 items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17131D]/60 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-sans-clean tracking-wider"
        >
          <Compass className="w-3 h-3 text-[#C084FC]" />
          <span>Established 2026</span>
        </motion.div>

        {/* Elegant Scroll-To-Explore Indicator with pulsing ring */}
        <motion.div
          style={{
            opacity: shouldReduceMotion ? 1 : indicatorOpacity,
          }}
          className="absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none pointer-events-auto"
        >
          <button
            onClick={handleScrollToExplore}
            className="group flex flex-col items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] rounded-full p-2 transition-transform hover:-translate-y-1"
            aria-label="Scroll down to explore the Harpalani Ventures website"
          >
            <span className="font-sans-clean font-semibold tracking-[0.3em] uppercase text-[9.5px] sm:text-[11px] text-[#EDE5F7]/90 group-hover:text-white transition-colors">
              SCROLL TO EXPLORE
            </span>
            
            {/* Animated Downward Chevron in a glowing glass capsule */}
            <div className="relative">
              <span className="absolute -inset-1 rounded-full bg-[#6F2DBD]/30 blur-sm group-hover:bg-[#A855F7]/50 transition-all" />
              <motion.div
                animate={shouldReduceMotion ? undefined : {
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/25 bg-[#17131D]/70 backdrop-blur-md flex items-center justify-center text-[#EDE5F7] group-hover:border-[#A855F7] group-hover:text-white group-hover:bg-[#32106B] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                <ChevronDown className="w-4 h-4 text-[#C084FC] group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </button>
        </motion.div>

        {/* Seamless Vignette into Main Site */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0512] via-[#0A0512]/60 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default CinematicIntro;
