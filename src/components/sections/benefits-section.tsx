import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BenefitsSection() {
  return (
    <Section id="why-us" variant="ivory" className="py-16 md:py-24">
      <SectionHeading
        eyebrow="Our Services"
        heading="From selection to installation."
        description="A simpler, personalised way to find, measure, and fit the right furnishings for your home."
        align="center"
      />

      {/* 2 × 2 Desktop Matrix / Clean 1-col Mobile Layout */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-card border border-border/80 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-0 divide-border/60">
          {services.map((service, index) => {
            const Icon = service.icon;
            // 2x2 divider borders on desktop:
            // 0 (top-left): border-r, border-b
            // 1 (top-right): border-b
            // 2 (bottom-left): border-r
            // 3 (bottom-right): clean
            const desktopBorderClasses = [
              "md:border-r md:border-b md:border-border/70",
              "md:border-b md:border-border/70",
              "md:border-r md:border-border/70",
              "",
            ][index];

            const isExternal = service.href?.startsWith("http");

            return (
              <div
                key={service.id}
                className={`flex flex-col items-center text-center p-8 sm:p-12 lg:p-14 space-y-4 group transition-colors duration-300 hover:bg-sand/20 ${desktopBorderClasses}`}
              >
                {/* Clean large line icon without heavy container */}
                <div className="flex items-center justify-center text-burgundy transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-10 w-10 sm:h-11 sm:w-11 stroke-[1.5]" />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-espresso pt-1">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed max-w-sm">
                  {service.description}
                </p>

                {/* Subtle text CTA */}
                {service.cta && service.href && (
                  <div className="pt-2">
                    {isExternal ? (
                      <a
                        href={service.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-dark transition-colors group/link"
                      >
                        <span>{service.cta}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </a>
                    ) : (
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-burgundy hover:text-burgundy-dark transition-colors group/link"
                      >
                        <span>{service.cta}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
