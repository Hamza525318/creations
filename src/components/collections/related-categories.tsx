import React from "react";
import Link from "next/link";
import { CatalogCategory } from "@/lib/catalog/types";
import { CATEGORY_LIST } from "@/config/categories";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import Container from "@/components/layout/container";
import { ArrowRight } from "lucide-react";

interface RelatedCategoriesProps {
  currentCategory: CatalogCategory;
  covers: Record<string, WebsiteMedia | null>;
}

export default function RelatedCategories({
  currentCategory,
  covers,
}: RelatedCategoriesProps) {
  const otherCategories = CATEGORY_LIST.filter((cat) => cat.key !== currentCategory);

  return (
    <section className="py-14 md:py-20 bg-background">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-3 border-b border-border/60 pb-4">
          <div className="space-y-1">
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy">
              Explore More
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-espresso">
              Explore Other Collections
            </h2>
          </div>

          <Link
            href="/#categories"
            className="font-sans text-xs font-semibold text-burgundy hover:underline inline-flex items-center gap-1"
          >
            <span>View All Four Categories</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherCategories.map((cat) => {
            const coverMedia = covers[cat.coverSlot] || null;

            return (
              <Link
                key={cat.key}
                href={cat.href}
                className="group flex flex-col justify-between bg-card p-4 rounded-2xl border border-border/80 hover:border-burgundy/40 hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <WebsiteImage
                    media={coverMedia}
                    aspectRatio="4/5"
                    fallbackCategory={cat.label}
                    fallbackLabel={`${cat.label} Collection`}
                    className="w-full max-h-64"
                  />

                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-medium text-espresso group-hover:text-burgundy transition-colors">
                      {cat.label}
                    </h3>
                    <p className="font-sans text-xs text-taupe line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-burgundy">
                  <span>Explore {cat.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
