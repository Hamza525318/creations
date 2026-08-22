"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface LightboxImage {
  secureUrl: string;
  alt?: string;
  title?: string;
  category?: string;
}

interface ImageLightboxProps {
  image: LightboxImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  image,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  if (!image) return null;

  const titleText = image.title || image.alt || "CREATION'S Furnishing Showcase";
  const categoryText = image.category || "CREATION'S Besant Nagar, Chennai";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[92vw] sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl p-3 sm:p-5 bg-card/95 backdrop-blur-md border-border/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
      >
        <DialogTitle className="sr-only">{titleText}</DialogTitle>
        <DialogDescription className="sr-only">
          Enlarged photograph view for {titleText}
        </DialogDescription>

        <div className="flex flex-col space-y-3">
          {/* Main Large Image Container */}
          <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[78vh] rounded-xl sm:rounded-2xl overflow-hidden bg-sand/30 flex items-center justify-center">
            <Image
              src={image.secureUrl}
              alt={titleText}
              fill
              priority
              sizes="(max-width: 768px) 92vw, (max-width: 1280px) 85vw, 1400px"
              className="object-contain"
            />
          </div>

          {/* Minimal Caption Bar */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="space-y-0.5 max-w-xl">
              <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-burgundy">
                {categoryText}
              </span>
              <h4 className="font-display text-base sm:text-lg font-medium text-espresso truncate">
                {titleText}
              </h4>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="font-sans text-xs font-semibold text-taupe hover:text-burgundy px-3 py-1.5 rounded-lg bg-sand/50 hover:bg-sand transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
