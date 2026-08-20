import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import CurtainRevealAnimation from "@/components/curtain-reveal/curtain-reveal-animation";
import { getMediaCollection } from "@/lib/media/queries";
import { ArrowRight } from "lucide-react";

export default async function CurtainRevealSection() {
  const revealImages = await getMediaCollection("gallery.curtain-reveal");

  return (
    <Section id="curtain-reveal" variant="sand" className="py-20 md:py-28 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
        <SectionHeading
          eyebrow="Curated Living"
          heading="Behind every curtain, a new space."
          description="Experience our craftsmanship as tailored drapery and textured blinds part to reveal refined residential interiors."
          align="left"
          className="mb-0"
        />

        <a
          href="#gallery"
          className="font-sans text-xs font-semibold uppercase tracking-wider text-burgundy inline-flex items-center gap-1.5 hover:text-burgundy-dark transition-colors group shrink-0 pb-1"
        >
          <span>Explore All Featured Projects</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Animated Curtain Stage */}
      <CurtainRevealAnimation images={revealImages} />
    </Section>
  );
}
