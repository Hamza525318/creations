import React from "react";
import Section from "@/components/layout/section";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Phone, MapPin } from "lucide-react";

export default function ContactCTASection() {
  return (
    <Section variant="burgundy" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center space-y-8">
        <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-champagne">
          Start Your Furnishing Journey
        </span>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-ivory leading-[1.12]">
          Planning to refresh your home?
        </h2>

        <p className="font-sans text-base sm:text-lg text-sand/90 leading-relaxed max-w-xl mx-auto">
          Share your window measurements, room photos, or style preferences with us on WhatsApp, or speak directly with our team in Besant Nagar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <WhatsAppButton
            size="lg"
            variant="default"
            className="bg-ivory text-burgundy hover:bg-sand hover:text-burgundy-dark font-semibold w-full sm:w-auto"
          />

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-ivory/60 text-ivory hover:bg-ivory hover:text-burgundy w-full sm:w-auto"
          >
            <a href={`tel:${siteConfig.phoneRaw}`}>
              <Phone className="h-4 w-4 mr-2" />
              Call {siteConfig.phone}
            </a>
          </Button>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-champagne/90">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span>Showroom: {siteConfig.address.fullAddress}</span>
        </div>
      </div>
    </Section>
  );
}
