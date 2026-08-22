import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import WebsiteImage from "@/components/common/website-image";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getMediaForSlot } from "@/lib/media/queries";
import { MapPin, Phone, Clock, Navigation, Smartphone } from "lucide-react";

export default async function LocationSection() {
  const showroomMedia = await getMediaForSlot("showroom.main");

  return (
    <Section id="location" variant="white">
      <SectionHeading
        eyebrow="Visit Our Showroom"
        heading="Find us in Besant Nagar."
        description="Experience our drapery fabrics, blinds mechanisms, and upholstery swatches in person."
        align="left"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Info Column: Prominently displayed across all screens */}
        <div className="w-full lg:col-span-5 flex flex-col justify-between bg-card p-6 sm:p-8 rounded-2xl border border-border/80 space-y-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-display text-3xl font-semibold text-burgundy">
                {siteConfig.name}
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-taupe font-semibold">
                {siteConfig.tagline}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 text-espresso">
                <MapPin className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-sm font-semibold">Showroom Address</h4>
                  <p className="font-sans text-sm text-taupe leading-relaxed">
                    {siteConfig.address.fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-espresso">
                <Smartphone className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-sm font-semibold">Mobile & WhatsApp</h4>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="font-sans text-sm text-taupe hover:text-burgundy transition-colors block"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-espresso">
                <Phone className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-sm font-semibold">Landline</h4>
                  <a
                    href={`tel:${siteConfig.landlineRaw}`}
                    className="font-sans text-sm text-taupe hover:text-burgundy transition-colors block"
                  >
                    {siteConfig.landline}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-espresso">
                <Clock className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-sans text-sm font-semibold">Showroom Hours</h4>
                  <p className="font-sans text-sm text-taupe">
                    {siteConfig.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/60">
            <Button asChild variant="primary" className="w-full justify-center">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Get Directions on Google Maps
              </a>
            </Button>
          </div>
        </div>

        {/* Media / Map Container: Hidden on mobile (<lg) to reduce vertical clutter */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center items-center bg-sand/60 p-4 rounded-2xl border border-border/80 min-h-[360px] text-center relative overflow-hidden group">
          <WebsiteImage
            media={showroomMedia}
            aspectRatio="16/9"
            fallbackCategory="Location"
            fallbackLabel="Besant Nagar Showroom Location"
            className="w-full h-full min-h-[320px]"
          />
        </div>
      </div>
    </Section>
  );
}
