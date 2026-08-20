import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import WebsiteImage from "@/components/common/website-image";
import { stylesData } from "@/data/styles";
import { getMediaForSlot } from "@/lib/media/queries";

export default async function StyleSection() {
  const stylesWithMedia = await Promise.all(
    stylesData.map(async (style) => {
      const media = await getMediaForSlot(`styles.${style.id}`);
      return { ...style, media };
    })
  );

  return (
    <Section id="styles" variant="white">
      <SectionHeading
        eyebrow="Design Directions"
        heading="Find your interior style."
        description="Whether you prefer minimalist quietude or classical warmth, we guide you to fabrics that realize your vision."
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stylesWithMedia.map((style) => (
          <div
            key={style.id}
            className="group flex flex-col space-y-4 bg-card p-5 rounded-2xl border border-border/80 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
          >
            <WebsiteImage
              media={style.media}
              aspectRatio="3/4"
              fallbackCategory={style.tag}
              fallbackLabel={style.placeholderText}
              className="w-full"
            />

            <div className="space-y-2 pt-2">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-burgundy">
                {style.tag}
              </span>
              <h3 className="font-display text-2xl font-medium text-espresso group-hover:text-burgundy transition-colors">
                {style.name}
              </h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">
                {style.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
