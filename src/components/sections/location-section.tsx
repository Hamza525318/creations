import React from "react";
import Section from "@/components/layout/section";
import SectionHeading from "@/components/common/section-heading";
import WebsiteImage from "@/components/common/website-image";
import BrandLogo from "@/components/common/brand-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getMediaForSlot } from "@/lib/media/queries";
import { MapPin, Phone, Clock, Navigation, Smartphone } from "lucide-react";

export default async function LocationSection() {
  const [showroomMedia, logoMedia] = await Promise.all([
    getMediaForSlot("showroom.main"),
    getMediaForSlot("branding.logo-primary"),
  ]);

  return (
    <Section id="location" variant="white">
      <SectionHeading
        eyebrow="Visit Our Showroom"
        heading="Visit Our Curtains & Blinds Showroom in Besant Nagar"
        description="Located in Besant Nagar and conveniently accessible from Adyar, ECR, and South Chennai neighbourhoods. Experience our drapery fabrics, blinds mechanisms, and upholstery swatches in person."
        align="left"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Info Column: Prominently displayed across all screens */}
        <div className="w-full lg:col-span-5 flex flex-col justify-between bg-card p-6 sm:p-8 rounded-2xl border border-border/80 space-y-8">
          <div className="space-y-6">
            {/* Showroom Brand Logo Header */}
            <div className="space-y-2">
              <BrandLogo
                media={logoMedia}
                height={52}
                width={200}
                imageClassName="h-11 sm:h-12 w-auto object-contain"
                fallbackClassName="text-burgundy text-3xl font-semibold"
              />
              <p className="font-sans text-xs uppercase tracking-widest text-taupe font-semibold">
                {siteConfig.tagline}
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3 text-espresso">
                <MapPin className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-sm font-semibold">Showroom Address</h3>
                  <p className="font-sans text-sm text-taupe leading-relaxed">
                    {siteConfig.address.fullAddress}
                  </p>
                  <p className="font-sans text-xs text-taupe/80 pt-1">
                    Conveniently accessible from Besant Nagar, Adyar, ECR & Thiruvanmiyur.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-espresso">
                <Smartphone className="h-5 w-5 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-sans text-sm font-semibold">Mobile & WhatsApp</h3>
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
                  <h3 className="font-sans text-sm font-semibold">Landline</h3>
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
                  <h3 className="font-sans text-sm font-semibold">Showroom Hours</h3>
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
