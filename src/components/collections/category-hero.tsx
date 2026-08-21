import React from "react";
import { CategoryDefinition } from "@/lib/catalog/types";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import WhatsAppButton from "@/components/common/whatsapp-button";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/container";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, ArrowLeft, Ruler } from "lucide-react";
import Link from "next/link";

interface CategoryHeroProps {
  config: CategoryDefinition;
  coverMedia: WebsiteMedia | null;
}

export default function CategoryHero({ config, coverMedia }: CategoryHeroProps) {
  const isWindowTreatment = config.key === "curtains" || config.key === "blinds";

  return (
    <section className="relative bg-sand/30 py-10 md:py-16 border-b border-border/60">
      <Container>
        {/* Back Link */}
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs text-taupe hover:text-burgundy">
            <Link href="/#categories">
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              Back to All Collections
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Content (~45% on desktop) */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-espresso shadow-2xs">
              <MapPin className="h-3 w-3 text-burgundy shrink-0" />
              <span>Besant Nagar, Chennai</span>
            </div>

            <div className="space-y-2">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-burgundy block">
                {config.eyebrow}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.12] tracking-tight text-espresso">
                {config.heading}
              </h1>
            </div>

            <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed">
              {config.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <WhatsAppButton
                variant="primary"
                size="default"
                label={`Enquire about ${config.label}`}
              />

              <Button asChild variant="secondary" size="default">
                <a href={`tel:${siteConfig.phoneRaw}`} className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>Call Showroom</span>
                </a>
              </Button>
            </div>

            {isWindowTreatment && (
              <div className="pt-1">
                <Link
                  href="/measurement-guide"
                  className="inline-flex items-center gap-1.5 text-xs text-burgundy font-medium hover:underline group"
                >
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Not sure about window sizes? View our Measurement Guide →</span>
                </Link>
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <div className="h-[1px] w-10 bg-gold/50" />
              <span className="font-display text-xs italic text-taupe/80">
                {config.heroSubtitle}
              </span>
            </div>
          </div>

          {/* Cover Media (~55% on desktop) */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 rounded-3xl bg-sand/60 -rotate-1 -z-10 hidden sm:block" />
              <WebsiteImage
                media={coverMedia}
                aspectRatio="4/5"
                fallbackCategory={config.label}
                fallbackLabel={`${config.label} Signature Showcase`}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full shadow-lg border-2 border-card max-h-[440px] sm:max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
