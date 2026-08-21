import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import FAQList from "@/components/faq/faq-list";
import { publishedFaqs } from "@/data/faqs";
import { siteConfig } from "@/config/site";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FAQSection() {
  return (
    <Section id="faq" variant="ivory" className="py-16 md:py-24 border-t border-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
        {/* Left Column: Heading & Reassurance / Direct Contact */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Common Questions"
            heading="Everything you need to know before getting started."
            description="Clear answers about our Besant Nagar showroom, fabric swatches, home window measurement, and custom fitting."
            align="left"
            className="mb-0 md:mb-0"
          />

          {/* Quick Help Box */}
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-2xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-medium text-espresso">
                Have a unique window or fabric question?
              </h3>
              <p className="font-sans text-xs text-taupe leading-relaxed">
                Our team in Besant Nagar is available to assist you directly with bespoke drapery and upholstery advice.
              </p>
            </div>

            <div className="pt-1 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Button asChild size="sm" variant="primary" className="w-full justify-center">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>Ask on WhatsApp</span>
                </a>
              </Button>

              <Button asChild size="sm" variant="secondary" className="w-full justify-center">
                <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call {siteConfig.phone}</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: FAQ Accordion */}
        <div className="lg:col-span-7">
          <FAQList items={publishedFaqs} />
        </div>
      </div>
    </Section>
  );
}
