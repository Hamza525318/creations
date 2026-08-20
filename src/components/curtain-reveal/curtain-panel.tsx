import React from "react";
import { cn } from "@/lib/utils";

interface CurtainPanelProps {
  side: "left" | "right";
  isRevealed: boolean;
  reducedMotion?: boolean;
}

export default function CurtainPanel({
  side,
  isRevealed,
  reducedMotion = false,
}: CurtainPanelProps) {
  // Movement style when revealed
  const transformClass = reducedMotion
    ? side === "left"
      ? "-translate-x-full opacity-0"
      : "translate-x-full opacity-0"
    : isRevealed
    ? side === "left"
      ? "-translate-x-[102%] opacity-0 sm:opacity-10 sm:-translate-x-[92%] lg:-translate-x-[90%]"
      : "translate-x-[102%] opacity-0 sm:opacity-10 sm:translate-x-[92%] lg:translate-x-[90%]"
    : "translate-x-0 opacity-100";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute top-0 bottom-0 z-20 w-1/2 overflow-hidden pointer-events-none select-none transition-all duration-1000 md:duration-1200 ease-out will-change-transform",
        side === "left" ? "left-0 shadow-[8px_0_24px_rgba(41,36,31,0.35)]" : "right-0 shadow-[-8px_0_24px_rgba(41,36,31,0.35)]",
        transformClass
      )}
    >
      {/* Textile Drape Texture & Folds (Burgundy to Deep Burgundy with pleats) */}
      <div
        className="w-full h-full relative"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              #421a1f 0px,
              #572229 18px,
              #722f37 36px,
              #853740 54px,
              #572229 72px,
              #421a1f 90px
            )
          `,
        }}
      >
        {/* Subtle fabric vertical grain overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/40 mix-blend-multiply pointer-events-none" />

        {/* Soft lighting highlight across folds */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Top Header Pleat Trim */}
        <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-black/40 to-transparent border-b border-gold/40" />

        {/* Leading Edge Trim & Subtle Gold Accent Ribbon */}
        <div
          className={cn(
            "absolute top-0 bottom-0 w-2.5 bg-gradient-to-r from-gold/30 via-champagne/40 to-gold/20 backdrop-blur-xs border-gold/40 shadow-xs",
            side === "left" ? "right-0 border-l" : "left-0 border-r"
          )}
        >
          {/* Subtle gold tassel / stitch lines */}
          <div className="h-full w-full opacity-60 bg-[repeating-linear-gradient(0deg,#b58a4a_0px,#b58a4a_4px,transparent_4px,transparent_12px)]" />
        </div>

        {/* Bottom Hem */}
        <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/50 to-transparent border-t border-gold/30" />
      </div>
    </div>
  );
}
