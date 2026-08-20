import React from "react";
import Link from "next/link";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import WebsiteImage from "@/components/common/website-image";
import { CATEGORY_LIST } from "@/config/categories";
import { getMediaForSlot } from "@/lib/media/queries";
import { ArrowRight } from "lucide-react";

export default async function CategorySection() {
  const mediaItems = await Promise.all(
    CATEGORY_LIST.map(async (cat) => {
      const media = await getMediaForSlot(cat.coverSlot);
      return { ...cat, media };
    })
  );

  return (
    <Section id="categories" variant="white">
      <SectionHeading
        eyebrow="Our Collections"
        heading="Furnish every part of your home."
        description="Explore our four core categories crafted to bring warmth, privacy, and architectural elegance to your space."
        align="left"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {mediaItems.map((category) => (
          <div
            key={category.key}
            className="group flex flex-col justify-between bg-card rounded-2xl p-4 sm:p-5 border border-border/80 transition-all duration-300 hover:border-burgundy/40 hover:shadow-md"
          >
            <div className="space-y-4">
              <WebsiteImage
                media={category.media}
                aspectRatio="4/5"
                fallbackCategory={category.label}
                fallbackLabel={`${category.label} Collection Showcase`}
                className="w-full"
              />

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-medium text-espresso group-hover:text-burgundy transition-colors">
                  {category.label}
                </h3>
                <p className="font-sans text-sm text-taupe leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-border/40 mt-4">
              <Link
                href={category.href}
                className="font-sans text-xs font-semibold uppercase tracking-wider text-burgundy inline-flex items-center gap-1.5 transition-transform group-hover:translate-x-1"
              >
                <span>Explore {category.label}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
