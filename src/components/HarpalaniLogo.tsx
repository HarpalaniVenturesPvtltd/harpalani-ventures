import React from "react";

interface HarpalaniLogoProps {
  variant?: "light" | "dark"; // "light" for white/light backgrounds, "dark" for deep purple backgrounds
  className?: string;
  symbolOnly?: boolean;
  layout?: "horizontal" | "stacked";
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * The official Harpalani Ventures HV Monogram Symbol
 * Stylized dimensional 3D purple "HV" mark with serif columns,
 * sweeping satin ribbon crossbar, and soaring wing flourish.
 */
export const HarpalaniSymbol: React.FC<{
  variant?: "light" | "dark";
  className?: string;
  size?: number;
}> = ({ variant = "light", className = "", size = 42 }) => {
  const isDark = variant === "dark";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="Harpalani Ventures HV Mark"
    >
      <defs>
        {/* Left Column Gradient */}
        <linearGradient id={`hv-sym-stem-l-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#240742"} />
          <stop offset="35%" stopColor={isDark ? "#E9D8FD" : "#4B127D"} />
          <stop offset="70%" stopColor={isDark ? "#C084FC" : "#6F2DBD"} />
          <stop offset="100%" stopColor={isDark ? "#A855F7" : "#2D0A54"} />
        </linearGradient>

        {/* Right Column Gradient */}
        <linearGradient id={`hv-sym-stem-r-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#2A084D"} />
          <stop offset="45%" stopColor={isDark ? "#D8B4FE" : "#55158C"} />
          <stop offset="85%" stopColor={isDark ? "#9D4EDD" : "#7B2CBF"} />
          <stop offset="100%" stopColor={isDark ? "#7E22CE" : "#320A5B"} />
        </linearGradient>

        {/* 3D Flowing Ribbon Outer Surface */}
        <linearGradient id={`hv-sym-ribbon-out-${variant}`} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={isDark ? "#E0AAFF" : "#7B2CBF"} />
          <stop offset="35%" stopColor={isDark ? "#C77DFF" : "#9D4EDD"} />
          <stop offset="70%" stopColor={isDark ? "#9D4EDD" : "#5A189A"} />
          <stop offset="100%" stopColor={isDark ? "#581C87" : "#240046"} />
        </linearGradient>

        {/* Ribbon Underside Highlight */}
        <linearGradient id={`hv-sym-ribbon-in-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? "#6B21A8" : "#3C096C"} />
          <stop offset="50%" stopColor={isDark ? "#9333EA" : "#621B9E"} />
          <stop offset="100%" stopColor={isDark ? "#F3E8FF" : "#C77DFF"} />
        </linearGradient>

        {/* Soaring V-Wing Flourish Gradient */}
        <linearGradient id={`hv-sym-wing-${variant}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? "#581C87" : "#240046"} />
          <stop offset="30%" stopColor={isDark ? "#7E22CE" : "#5A189A"} />
          <stop offset="65%" stopColor={isDark ? "#A855F7" : "#7B2CBF"} />
          <stop offset="85%" stopColor={isDark ? "#D8B4FE" : "#9D4EDD"} />
          <stop offset="100%" stopColor={isDark ? "#FFFFFF" : "#E0AAFF"} />
        </linearGradient>

        {/* Specular Highlight Strip */}
        <linearGradient id={`hv-sym-spec-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity={isDark ? "0.6" : "0.35"} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g transform="translate(-178, -32)">
        {/* Left Stem of H with Bilateral Bracketed Serifs */}
        <path
          d="M 194 48 L 244 48 C 238 58, 235 68, 235 84 L 235 186 C 235 202, 238 212, 244 222 L 194 222 C 200 212, 203 202, 203 186 L 203 84 C 203 68, 200 58, 194 48 Z"
          fill={`url(#hv-sym-stem-l-${variant})`}
        />
        <rect x="214" y="58" width="8" height="154" fill={`url(#hv-sym-spec-${variant})`} />

        {/* Right Stem of H with Bilateral Bracketed Serifs */}
        <path
          d="M 268 48 L 318 48 C 312 58, 309 68, 309 84 L 309 186 C 309 202, 312 212, 318 222 L 268 222 C 274 212, 277 202, 277 186 L 277 84 C 277 68, 274 58, 268 48 Z"
          fill={`url(#hv-sym-stem-r-${variant})`}
        />
        <rect x="288" y="58" width="7" height="154" fill={`url(#hv-sym-spec-${variant})`} />

        {/* 3D Ribbon Loop (Underside twist) */}
        <path
          d="M 218 142 C 228 120, 248 98, 274 98 C 298 98, 314 114, 328 140 L 340 238 C 336 238, 328 228, 320 206 L 308 148 C 298 126, 286 114, 270 114 C 248 114, 234 130, 222 152 Z"
          fill={`url(#hv-sym-ribbon-in-${variant})`}
        />

        {/* 3D Ribbon Loop (Main Arched Upper Surface) */}
        <path
          d="M 216 138 C 234 104, 258 88, 286 92 C 312 95, 332 118, 345 158 L 342 242 C 338 238, 332 226, 326 202 L 312 144 C 302 118, 288 108, 272 108 C 248 108, 230 128, 216 156 Z"
          fill={`url(#hv-sym-ribbon-out-${variant})`}
        />

        {/* Ribbon Gloss Highlight Edge */}
        <path
          d="M 218 138 C 236 106, 258 92, 284 94 C 308 97, 326 116, 338 152"
          fill="none"
          stroke={isDark ? "#FFFFFF" : "#EDE5F7"}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity={isDark ? 0.95 : 0.85}
        />

        {/* Ascending V-Wing Flourish Petal */}
        <path
          d="M 336 238 C 342 208, 356 156, 372 108 C 384 72, 396 48, 404 42 C 404 46, 398 68, 390 98 C 382 128, 372 168, 360 208 C 354 228, 344 238, 336 238 Z"
          fill={`url(#hv-sym-wing-${variant})`}
        />

        {/* Wing Tip Highlight Crest */}
        <path
          d="M 390 44 C 398 56, 403 66, 404 74 C 401 92, 388 134, 374 174 L 358 218"
          fill="none"
          stroke={isDark ? "#FFFFFF" : "#EDE5F7"}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={isDark ? 0.95 : 0.8}
        />
      </g>
    </svg>
  );
};

export const HarpalaniLogo: React.FC<HarpalaniLogoProps> = ({
  variant = "light",
  className = "",
  symbolOnly = false,
  layout = "horizontal",
  size = "md",
}) => {
  const isDark = variant === "dark";

  const sizeMap = {
    sm: { symbol: 32, textMain: "text-xs", textSub: "text-[8.5px]", textPvt: "text-[7.5px]" },
    md: { symbol: 40, textMain: "text-sm sm:text-base", textSub: "text-[10px]", textPvt: "text-[8.5px]" },
    lg: { symbol: 52, textMain: "text-lg sm:text-xl", textSub: "text-xs", textPvt: "text-[9.5px]" },
    xl: { symbol: 68, textMain: "text-2xl sm:text-3xl", textSub: "text-sm", textPvt: "text-[11px]" },
  };

  const currentSize = sizeMap[size];

  if (symbolOnly) {
    return <HarpalaniSymbol variant={variant} size={currentSize.symbol} className={className} />;
  }

  // STACKED FULL-LOCKUP (Exact presentation of the brand logo as provided by the user)
  if (layout === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <HarpalaniSymbol variant={variant} size={currentSize.symbol * 1.5} className="mb-2" />
        
        {/* HARPALANI */}
        <span
          className={`font-serif-luxury font-semibold tracking-[0.28em] uppercase ${currentSize.textMain} ${
            isDark ? "text-white" : "text-[#17131D]"
          }`}
        >
          HARPALANI
        </span>

        {/* — VENTURES — */}
        <div className="flex items-center justify-center gap-3 w-full my-1">
          <span className={`h-px w-8 sm:w-12 ${isDark ? "bg-white/40" : "bg-[#32106B]/40"}`} />
          <span
            className={`font-serif-luxury font-medium tracking-[0.38em] uppercase ${currentSize.textSub} ${
              isDark ? "text-[#EDE5F7]" : "text-[#32106B]"
            }`}
          >
            VENTURES
          </span>
          <span className={`h-px w-8 sm:w-12 ${isDark ? "bg-white/40" : "bg-[#32106B]/40"}`} />
        </div>

        {/* PVT. LTD. */}
        <span
          className={`font-sans-clean font-bold tracking-[0.42em] uppercase ${currentSize.textPvt} ${
            isDark ? "text-[#D8B4FE]" : "text-[#6F2DBD]"
          }`}
        >
          PVT. LTD.
        </span>

        {/* BUILDING WHAT COMES NEXT. */}
        <span
          className={`font-sans-clean font-medium tracking-[0.28em] uppercase text-[7.5px] sm:text-[9px] mt-2 ${
            isDark ? "text-white/60" : "text-[#17131D]/60"
          }`}
        >
          BUILDING WHAT COMES NEXT.
        </span>
      </div>
    );
  }

  // HORIZONTAL COMPACT LOCKUP (Optimal for sticky navigation bars and header controls)
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      <HarpalaniSymbol variant={variant} size={currentSize.symbol} />
      <div className="flex flex-col text-left">
        <span
          className={`font-serif-luxury font-medium tracking-[0.18em] uppercase leading-tight ${currentSize.textMain} ${
            isDark ? "text-white" : "text-[#17131D]"
          }`}
        >
          HARPALANI VENTURES
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`font-sans-clean font-bold tracking-[0.34em] uppercase ${currentSize.textSub} ${
              isDark ? "text-[#D8B4FE]" : "text-[#6F2DBD]"
            }`}
          >
            PVT. LTD.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HarpalaniLogo;
