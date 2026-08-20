import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import { Compass, Layers, UserCheck, MapPin } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Compass,
      title: "Made for Your Space",
      description:
        "Custom window treatments and furnishings measured and proportioned specifically for your architectural layout.",
    },
    {
      icon: Layers,
      title: "Curated Selection",
      description:
        "A considered range of premium drapery fabrics, blinds, textures, and finishes selected for aesthetic durability.",
    },
    {
      icon: UserCheck,
      title: "Personal Guidance",
      description:
        "Thoughtful recommendations on combining fabric weights, colors, and textures to complement your overall decor.",
    },
    {
      icon: MapPin,
      title: "Local Besant Nagar Store",
      description:
        "Visit our local showroom in Chennai to see and touch physical fabric swatches before making your decision.",
    },
  ];

  return (
    <Section id="why-us" variant="sand">
      <SectionHeading
        eyebrow="The CREATION'S Difference"
        heading="Considered furnishing for residential interiors."
        description="We believe home furnishing should feel personal, knowledgeable, and effortlessly tasteful."
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="flex flex-col space-y-4 p-6 rounded-2xl bg-card border border-border/70 shadow-2xs transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-burgundy">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-medium text-espresso">
                {benefit.title}
              </h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
