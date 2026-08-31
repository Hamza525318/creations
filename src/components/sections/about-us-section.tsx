import React from "react";
import Section from "@/components/layout/section";
import WebsiteImage from "@/components/common/website-image";
import BrandLogo from "@/components/common/brand-logo";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getMediaForSlot } from "@/lib/media/queries";
import { MapPin, CheckCircle2 } from "lucide-react";

export default async function AboutSection() {
  const [aboutMedia, logoMedia] = await Promise.all([
    getMediaForSlot("about.main"),
    getMediaForSlot("branding.logo-primary"),
  ]);

  return (
    <Section id="about" variant="sand">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Visual Column */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-ivory/60 rotate-1 -z-10 hidden sm:block" />
            <WebsiteImage
              media={aboutMedia}
              aspectRatio="4/5"
              fallbackCategory="Besant Nagar Showroom"
              fallbackLabel="Showroom & Fabric Gallery"
              className="w-full shadow-md"
            />
          </div>
        </div>

        {/* Story Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <BrandLogo
                media={logoMedia}
                height={48}
                width={190}
                imageClassName="h-9 sm:h-11 md:h-12 w-auto object-contain"
                fallbackClassName="text-burgundy text-xl sm:text-2xl font-bold"
              />
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-burgundy">
                · Besant Nagar Studio
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-espresso leading-[1.12]">
              A local destination for considered home furnishing.
            </h2>
          </div>

          <p className="font-sans text-base sm:text-lg text-taupe leading-relaxed">
            Based in Besant Nagar, our dedicated home furnishing studio is focused on helping homeowners transform their spaces with tailored curtains, precision window blinds, custom upholstery, and luxury bedroom linens.
          </p>

          <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed">
            We believe that selecting fabrics for your home should be an enjoyable, collaborative experience. Rather than overwhelming you with endless catalogs, we curate collections that suit Chennai&apos;s climate, light, and architectural styles.
          </p>

          {/* Key Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              "Personalized fabric consultation",
              "Precision window measurement",
              "Custom drapery & stitching",
              "Showroom in Besant Nagar",
            ].map((point, index) => (
              <div key={index} className="flex items-center space-x-2.5">
                <CheckCircle2 className="h-4 w-4 text-burgundy shrink-0" />
                <span className="font-sans text-sm font-medium text-espresso">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Button asChild variant="primary">
              <a href="#location">
                <MapPin className="h-4 w-4 mr-2" />
                Visit Our Showroom
              </a>
            </Button>
            <WhatsAppButton variant="secondary" />
          </div>
        </div>
      </div>
    </Section>
  );
}
