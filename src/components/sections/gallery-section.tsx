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
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-espresso">
              Spaces by
            </h2>
            <BrandLogo
              media={logoMedia}
              height={44}
              width={160}
              imageClassName="h-8 sm:h-10 w-auto object-contain"
              fallbackClassName="text-burgundy text-3xl sm:text-4xl font-semibold"
            />
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
