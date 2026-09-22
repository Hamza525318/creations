import React from "react";
import WebsiteImage from "@/components/common/website-image";
import BrandLogo from "@/components/common/brand-logo";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import { getMediaForSlot } from "@/lib/media/queries";
import { MapPin, ArrowRight } from "lucide-react";

export default async function HeroSection() {
  const [heroMedia, secondaryHeroMedia, logoMedia] = await Promise.all([
    getMediaForSlot("hero.main"),
    getMediaForSlot("hero.secondary"),
    getMediaForSlot("branding.logo-primary"),
  ]);

  return (
    <section className="relative overflow-hidden bg-background py-8 md:py-12 lg:py-14 flex items-center min-h-[75vh]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Content Column (~50% width on desktop) */}
          <div className="flex flex-col items-start lg:col-span-6 space-y-5 md:space-y-6">
            {/* Location context badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-espresso shadow-2xs">
              <MapPin className="h-3.5 w-3.5 text-burgundy shrink-0" />
              <span>Besant Nagar, Chennai</span>
            </div>

            {/* Category Eyebrow */}
            <div className="space-y-2">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-burgundy">
                Curtains · Blinds · Upholstery · Bedspreads
              </p>

              {/* Main Headline (Target H1) */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-medium leading-[1.1] tracking-tight text-espresso">
                Curtains and Blinds Store in Besant Nagar
              </h1>
            </div>

            {/* Supporting Copy with Inline Brand Logo */}
            <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed max-w-xl">
              <span className="inline-flex items-center align-middle mr-1.5 -translate-y-[1px]">
                <BrandLogo
                  media={logoMedia}
                  height={28}
                  width={120}
                  imageClassName="h-5 sm:h-6 w-auto object-contain"
                  fallbackClassName="font-semibold text-espresso"
                />
              </span>
              is a curtains and blinds store in Besant Nagar, Chennai, offering custom drapery, precision window blinds, ready-made options, upholstery fabrics, and luxury bedspreads for residential interiors.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button asChild variant="primary" size="default" className="shrink-0">
                <a
                  href="#categories"
                  className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Explore Collections</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>

              <WhatsAppButton variant="secondary" size="default" />
            </div>

            {/* Subtle Gold Accent Divider / Service Area Context */}
            <div className="pt-2 flex items-center gap-3 w-full">
              <div className="h-[1px] w-12 bg-gold/50" />
              <span className="font-display text-xs italic text-charcoal">
                Serving Besant Nagar, Adyar, ECR, and South Chennai homes
              </span>
            </div>
          </div>

          {/* Dual Zig-Zag Image Media Composition (~50% width, wider & shorter) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Background ambient decorative backdrop */}
              <div className="absolute -inset-3 rounded-3xl bg-sand/50 -rotate-1 -z-10 hidden sm:block" />

              {/* Primary Main Image (Top-Left, Wide Landscape) */}
              <div className="w-[78%] sm:w-[74%] relative z-10">
                <WebsiteImage
                  media={heroMedia}
                  aspectRatio="16/10"
                  fallbackCategory="Curtains & Drapery"
                  fallbackLabel="Living Room Curtains Installation"
                  priority
                  sizes="(max-width: 1024px) 75vw, 40vw"
                  className="w-full shadow-lg border-2 border-card max-h-[300px] sm:max-h-[340px]"
                />
              </div>

              {/* Secondary Accent Image (Zig-Zag Offset / Bottom-Right, Wide Landscape) */}
              <div className="w-[66%] sm:w-[62%] ml-auto -mt-12 sm:-mt-16 relative z-20">
                <WebsiteImage
                  media={secondaryHeroMedia}
                  aspectRatio="16/10"
                  fallbackCategory="Window Blinds"
                  fallbackLabel="Custom Window Blinds in Besant Nagar"
                  sizes="(max-width: 1024px) 60vw, 32vw"
                  className="w-full shadow-2xl border-4 border-card max-h-[240px] sm:max-h-[280px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
