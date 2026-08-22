import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import InteractiveGalleryGrid from "@/components/gallery/interactive-gallery-grid";
import { getMediaCollection } from "@/lib/media/queries";
import { projects as fallbackProjects } from "@/data/projects";

export default async function GallerySection() {
  const galleryMedia = await getMediaCollection("gallery.projects");

  return (
    <Section id="gallery" variant="ivory">
      <SectionHeading
        eyebrow="Featured Projects"
        heading="Spaces by CREATION'S."
        /* description="A selection of recent curtain, blind, and upholstery installations across residential homes in Chennai." */
        align="left"
      />

      <InteractiveGalleryGrid
        mediaItems={galleryMedia}
        fallbackProjects={fallbackProjects}
      />
    </Section>
  );
}
