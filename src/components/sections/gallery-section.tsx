import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import WebsiteImage from "@/components/common/website-image";
import { getMediaCollection } from "@/lib/media/queries";
import { projects as fallbackProjects } from "@/data/projects";

export default async function GallerySection() {
  const galleryMedia = await getMediaCollection("gallery.projects");

  const hasMedia = galleryMedia && galleryMedia.length > 0;

  return (
    <Section id="gallery" variant="ivory">
      <SectionHeading
        eyebrow="Featured Projects"
        heading="Spaces by CREATION'S."
        /* description="A selection of recent curtain, blind, and upholstery installations across residential homes in Chennai." */
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {hasMedia
          ? galleryMedia.map((item, index) => (
              <div
                key={item.publicId}
                className="group flex flex-col space-y-3 bg-card p-4 rounded-2xl border border-border/70 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
              >
                <WebsiteImage
                  media={item}
                  aspectRatio="4/3"
                  className="w-full"
                />
                {/* Product Title and Description commented out as requested */}
                {/* 
                <div className="flex items-center justify-between pt-1">
                  <div className="space-y-1">
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-burgundy">
                      Project #{index + 1}
                    </span>
                    <h3 className="font-display text-xl font-medium text-espresso group-hover:text-burgundy transition-colors">
                      {item.alt || "CREATION'S Furnishing Installation"}
                    </h3>
                  </div>
                </div>
                */}
              </div>
            ))
          : fallbackProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col space-y-3 bg-card p-4 rounded-2xl border border-border/70 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
              >
                <WebsiteImage
                  media={null}
                  aspectRatio={project.aspectRatio}
                  fallbackCategory={project.category}
                  fallbackLabel={project.placeholderLabel}
                  className="w-full"
                />

                {/* Product Title and Description commented out as requested */}
                {/* 
                <div className="flex items-center justify-between pt-1">
                  <div className="space-y-1">
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-burgundy">
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl font-medium text-espresso group-hover:text-burgundy transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {project.location && (
                    <span className="font-sans text-xs text-taupe bg-sand/70 px-2.5 py-1 rounded-full shrink-0">
                      {project.location}
                    </span>
                  )}
                </div>
                */}
              </div>
            ))}
      </div>
    </Section>
  );
}
