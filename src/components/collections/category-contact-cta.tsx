import React from "react";
import { CategoryDefinition } from "@/lib/catalog/types";
import Container from "@/components/layout/container";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Phone, Sparkles } from "lucide-react";

interface CategoryContactCTAProps {
  config: CategoryDefinition;
}

export default function CategoryContactCTA({ config }: CategoryContactCTAProps) {
  return (
    <section className="bg-sand/40 py-14 md:py-20 border-y border-border/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-card border border-border text-xs font-semibold text-burgundy shadow-2xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Custom Tailoring & Guidance</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
            Looking for something specific in {config.label.toLowerCase()}?
          </h2>

          <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed max-w-xl mx-auto">
            Share your window or furniture measurements, fabric preferences, or room reference photos with us. We&apos;ll help you explore matching textures and finishes.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton
              size="lg"
              variant="primary"
              label={`Chat with a ${config.label} Specialist`}
            />

            <Button asChild size="lg" variant="secondary">
              <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>Call {siteConfig.phone}</span>
              </a>
            </Button>
          </div>

          <p className="text-xs text-taupe pt-2">
            No obligation · Expert fabric & measurement advice in Chennai
          </p>
        </div>
      </Container>
    </section>
  );
}
