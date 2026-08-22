import React from "react";
import { CatalogCategory, CatalogItem } from "@/lib/catalog/types";
import { CATEGORIES } from "@/config/categories";
import { siteConfig } from "@/config/site";
import CatalogCard from "./catalog-card";
import WhatsAppButton from "@/components/common/whatsapp-button";
import Container from "@/components/layout/container";
import { Sparkles, MapPin } from "lucide-react";

interface CatalogGridProps {
  category: CatalogCategory;
  items: CatalogItem[];
}

export default function CatalogGrid({ category, items }: CatalogGridProps) {
  const catDef = CATEGORIES[category];
  const hasItems = items && items.length > 0;

  return (
    <section className="py-10 md:py-20 bg-background">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-12 gap-3 md:gap-4 border-b border-border/60 pb-4 md:pb-5">
          <div className="space-y-1">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
              Curated Gallery
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-espresso">
              Featured {catDef.label} Designs & Fabrics
            </h2>
          </div>

          <p className="font-sans text-xs text-taupe max-w-sm">
            Discover tailored options from our Besant Nagar studio. Each design can be customized to your window and furniture dimensions.
          </p>
        </div>

        {/* Catalog Grid (2 columns on mobile, 3-4 on tablet/desktop) or Empty State */}
        {hasItems ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
            {items.map((item) => (
              <CatalogCard key={item.publicId} item={item} />
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-14 text-center rounded-3xl bg-sand/30 border border-border/80 max-w-2xl mx-auto space-y-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-burgundy mx-auto shadow-xs">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-medium text-espresso">
                Our {catDef.label} collection is being updated.
              </h3>
              <p className="font-sans text-sm text-taupe leading-relaxed">
                Visit our Besant Nagar showroom or message us on WhatsApp to explore hundreds of fabric swatches, pleating samples, and bespoke options.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppButton
                variant="primary"
                label={`Explore ${catDef.label} on WhatsApp`}
              />
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-taupe hover:text-burgundy font-medium transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-burgundy" />
                <span>Showroom: {siteConfig.address.locality}, Chennai</span>
              </a>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
