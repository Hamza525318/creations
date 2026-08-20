import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import { testimonials } from "@/data/testimonials";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <Section id="testimonials" variant="ivory">
      <SectionHeading
        eyebrow="Customer Experiences"
        heading="Trusted by local homeowners."
        description="Real verified Google reviews from clients who have furnished their homes with CREATION'S."
        align="left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 items-stretch">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between bg-card p-6 rounded-2xl border border-border/80 relative space-y-5 shadow-2xs hover:border-burgundy/30 hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-3.5">
              {/* Header: Quote mark & 5 Stars */}
              <div className="flex items-center justify-between">
                <Quote className="h-6 w-6 text-burgundy/60" />
                <div className="flex items-center space-x-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="font-sans text-xs sm:text-sm text-taupe leading-relaxed italic">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Author & Context Footer */}
            <div className="pt-4 border-t border-border/60 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-sans text-sm font-semibold text-espresso">
                    {item.author}
                  </h3>
                  {item.badge && (
                    <p className="font-sans text-[11px] text-taupe/80">
                      {item.badge}
                    </p>
                  )}
                </div>

                {item.timeAgo && (
                  <span className="font-sans text-[10px] text-taupe/70 shrink-0">
                    {item.timeAgo}
                  </span>
                )}
              </div>

              <div className="pt-1">
                <span className="font-sans text-[10px] font-semibold text-burgundy bg-sand px-2 py-0.5 rounded-md inline-block">
                  {item.projectType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
