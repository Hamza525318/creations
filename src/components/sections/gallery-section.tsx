import React from "react";
import Section from "@/components/layout/section";
import BrandLogo from "@/components/common/brand-logo";
import InteractiveGalleryGrid from "@/components/gallery/interactive-gallery-grid";
import { getMediaCollection, getMediaForSlot } from "@/lib/media/queries";
import { projects as fallbackProjects } from "@/data/projects";

export default async function GallerySection() {
  const [galleryMedia, logoMedia] = await Promise.all([
    getMediaCollection("gallery.projects"),
    getMediaForSlot("branding.logo-primary"),
  ]);

  return (
    <Section id="gallery" variant="ivory">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
        <div className="space-y-2">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-burgundy block">
            Featured Projects
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-espresso leading-none">
              Spaces by
            </h2>
            <div className="inline-flex items-center">
              <BrandLogo
                media={logoMedia}
                height={56}
                width={220}
                imageClassName="h-9 sm:h-11 md:h-12 lg:h-14 w-auto object-contain"
                fallbackClassName="text-burgundy text-3xl sm:text-4xl lg:text-5xl font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      <InteractiveGalleryGrid
        mediaItems={galleryMedia}
        fallbackProjects={fallbackProjects}
      />
    </Section>
  );
}
