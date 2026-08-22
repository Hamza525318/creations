"use client";

import React, { useEffect, useRef, useState } from "react";
import CurtainPanel from "./curtain-panel";
import CurtainGallery from "./curtain-gallery";
import { WebsiteMedia } from "@/lib/media/types";

interface CurtainRevealAnimationProps {
  images: WebsiteMedia[];
}

export default function CurtainRevealAnimation({ images }: CurtainRevealAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      setIsRevealed(true);
      return;
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setIsRevealed(true);
    };

    mediaQuery.addEventListener("change", handleChange);

    if (isRevealed) return;

    let timeoutId: NodeJS.Timeout | undefined;

    // 2. IntersectionObserver with ~80% threshold + 400ms deliberate delay
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Substantially inside viewport (>= 75% on mobile / 80% on desktop)
        const isSubstantial = entry.intersectionRatio >= 0.75;

        if (isSubstantial) {
          // Start deliberate ~400ms delay
          if (!timeoutId) {
            timeoutId = setTimeout(() => {
              setIsRevealed(true);
              observer.disconnect();
            }, 400);
          }
        } else {
          // User scrolled away before delay finished -> cancel pending reveal
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = undefined;
          }
        }
      },
      {
        threshold: [0, 0.5, 0.75, 0.85],
        rootMargin: "0px 0px -5% 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isRevealed]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-3xl border border-border/80 bg-sand/30 shadow-md min-h-[420px]"
    >
      {/* Decorative Curtain Header Valance / Pelmet */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 z-30 h-3 bg-gradient-to-r from-burgundy-dark via-burgundy to-burgundy-dark border-b border-gold/40 shadow-xs"
      />

      {/* Left Curtain Panel */}
      <CurtainPanel side="left" isRevealed={isRevealed} reducedMotion={reducedMotion} />

      {/* Gallery Content revealed behind curtains */}
      <div className="relative z-10 w-full p-2 sm:p-4">
        <CurtainGallery images={images} />
      </div>

      {/* Right Curtain Panel */}
      <CurtainPanel side="right" isRevealed={isRevealed} reducedMotion={reducedMotion} />
    </div>
  );
}
