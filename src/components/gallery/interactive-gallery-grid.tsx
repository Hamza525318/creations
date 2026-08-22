"use client";

import React, { useState } from "react";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import ImageLightbox, { LightboxImage } from "./image-lightbox";

interface FallbackProject {
  id: string;
  title: string;
  category: string;
  location?: string;
  aspectRatio?: string;
  placeholderLabel?: string;
}

interface InteractiveGalleryGridProps {
  mediaItems?: WebsiteMedia[];
  fallbackProjects?: FallbackProject[];
}

export default function InteractiveGalleryGrid({
  mediaItems,
  fallbackProjects,
}: InteractiveGalleryGridProps) {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);

  const hasMedia = mediaItems && mediaItems.length > 0;

  const handleOpenLightbox = (img: LightboxImage) => {
    if (img.secureUrl) {
      setActiveImage(img);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 items-start">
        {hasMedia
          ? mediaItems.map((item, index) => {
              const label = item.alt || `Featured project #${index + 1}`;
              const lightboxPayload: LightboxImage = {
                secureUrl: item.secureUrl,
                title: label,
                category: "Featured Project",
              };

              return (
                <button
                  key={item.publicId}
                  type="button"
                  onClick={() => handleOpenLightbox(lightboxPayload)}
                  aria-label={`Open enlarged view of ${label}`}
                  className="group flex flex-col space-y-2.5 sm:space-y-3 bg-card p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-border/70 text-left transition-all duration-300 hover:border-burgundy/50 hover:shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-burgundy cursor-pointer w-full"
                >
                  <div className="w-full overflow-hidden rounded-lg sm:rounded-xl">
                    <WebsiteImage
                      media={item}
                      aspectRatio="4/3"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.025]"
                    />
                  </div>
                </button>
              );
            })
          : fallbackProjects?.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col space-y-2.5 sm:space-y-3 bg-card p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-border/70 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
              >
                <div className="w-full overflow-hidden rounded-lg sm:rounded-xl">
                  <WebsiteImage
                    media={null}
                    aspectRatio={project.aspectRatio as any || "4/3"}
                    fallbackCategory={project.category}
                    fallbackLabel={project.placeholderLabel}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
      </div>

      {/* Shared Lightbox Dialog */}
      <ImageLightbox
        image={activeImage}
        isOpen={Boolean(activeImage)}
        onClose={() => setActiveImage(null)}
      />
    </>
  );
}
