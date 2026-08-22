"use client";

import React, { useState } from "react";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import ImageLightbox, { LightboxImage } from "@/components/gallery/image-lightbox";

interface CurtainGalleryProps {
  images: WebsiteMedia[];
}

const FALLBACK_REVEAL_ITEMS = [
  {
    id: "cr-1",
    title: "Double-Height Velvet Drapery",
    category: "Living Room Curtains",
    aspectRatio: "16/9" as const,
    label: "Living Room Curtains Installation",
  },
  {
    id: "cr-2",
    title: "Motorised Sheer Roman Blinds",
    category: "Master Bedroom",
    aspectRatio: "4/5" as const,
    label: "Sheer Window Treatments",
  },
  {
    id: "cr-3",
    title: "Custom Linen Sectional Upholstery",
    category: "Upholstery Design",
    aspectRatio: "4/5" as const,
    label: "Bespoke Sofa Re-covering",
  },
  {
    id: "cr-4",
    title: "Layered Cotton Bedroom Suite",
    category: "Bedspreads & Linens",
    aspectRatio: "16/9" as const,
    label: "Quilted Bedding Ensemble",
  },
];

export default function CurtainGallery({ images }: CurtainGalleryProps) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);
  const hasImages = images && images.length > 0;

  const handleOpen = (img: LightboxImage) => {
    if (img.secureUrl) {
      setActiveImage(img);
    }
  };

  return (
    <>
      {hasImages ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 p-2.5 sm:p-6 bg-card/60 rounded-2xl sm:rounded-3xl border border-border/70">
          {images.map((item, index) => {
            const label = item.alt || `Curtain installation #${index + 1}`;
            const payload: LightboxImage = {
              secureUrl: item.secureUrl,
              title: label,
              category: "Curtain Reveal Installation",
            };

            return (
              <button
                key={item.publicId}
                type="button"
                onClick={() => handleOpen(payload)}
                aria-label={`Open enlarged view of ${label}`}
                className="group flex flex-col space-y-2 bg-card p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-border/80 text-left transition-all duration-300 hover:border-burgundy/50 hover:shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-burgundy cursor-pointer w-full"
              >
                <div className="w-full overflow-hidden rounded-lg sm:rounded-xl">
                  <WebsiteImage
                    media={item}
                    aspectRatio="4/3"
                    alt={label}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 p-2.5 sm:p-6 bg-card/60 rounded-2xl sm:rounded-3xl border border-border/70">
          {FALLBACK_REVEAL_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col space-y-2 bg-card p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-border/80 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
            >
              <div className="w-full overflow-hidden rounded-lg sm:rounded-xl">
                <WebsiteImage
                  media={null}
                  aspectRatio="4/5"
                  fallbackCategory={item.category}
                  fallbackLabel={item.label}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Shared Lightbox Dialog */}
      <ImageLightbox
        image={activeImage}
        isOpen={Boolean(activeImage)}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
