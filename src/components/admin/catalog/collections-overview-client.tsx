"use client";

import React from "react";
import Link from "next/link";
import { CATEGORY_LIST } from "@/config/categories";
import { CatalogCategory } from "@/lib/catalog/types";
import { WebsiteMedia } from "@/lib/media/types";
import WebsiteImage from "@/components/common/website-image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Sparkles, ExternalLink } from "lucide-react";

interface CollectionsOverviewClientProps {
  counts: Record<CatalogCategory, { total: number; published: number; draft: number }>;
  covers: Record<string, WebsiteMedia | null>;
}

export default function CollectionsOverviewClient({
  counts,
  covers,
}: CollectionsOverviewClientProps) {
  return (
    <div className="space-y-8">
      {/* Overview Intro */}
      <div className="bg-sand/40 p-6 sm:p-8 rounded-3xl border border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-burgundy">
            <Layers className="h-4 w-4" />
            <span>Category Catalog CMS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-espresso">
            Product & Design Collections
          </h1>
          <p className="font-sans text-sm text-taupe leading-relaxed">
            Manage the visual catalog of designs, fabric samples, descriptions, and display prices shown across each dedicated category page.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-card p-4 rounded-2xl border border-border text-xs text-espresso">
          <Sparkles className="h-4 w-4 text-burgundy shrink-0" />
          <span>Real-time Cloudinary Catalog Synchronization</span>
        </div>
      </div>

      {/* 4 Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {CATEGORY_LIST.map((cat) => {
          const catCounts = counts[cat.key] || { total: 0, published: 0, draft: 0 };
          const coverMedia = covers[cat.coverSlot] || null;

          return (
            <div
              key={cat.key}
              className="group flex flex-col justify-between bg-card p-6 rounded-3xl border border-border/80 shadow-2xs hover:border-burgundy/40 hover:shadow-md transition-all space-y-6"
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-burgundy block">
                      Category
                    </span>
                    <h2 className="font-display text-2xl font-medium text-espresso">
                      {cat.label}
                    </h2>
                  </div>

                  <Link
                    href={cat.href}
                    target="_blank"
                    className="font-sans text-xs text-taupe hover:text-burgundy inline-flex items-center gap-1 bg-sand/60 px-3 py-1 rounded-full border border-border/60 transition-colors"
                  >
                    <span>View /{cat.key}</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                {/* Cover & Description */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-5">
                    <WebsiteImage
                      media={coverMedia}
                      aspectRatio="4/5"
                      fallbackCategory={cat.label}
                      fallbackLabel={`${cat.label} Cover`}
                      className="w-full max-h-48"
                    />
                  </div>

                  <div className="sm:col-span-7 space-y-2.5">
                    <p className="font-sans text-xs text-taupe leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Stats pills */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-sand px-2.5 py-1 rounded-lg text-xs font-semibold text-espresso">
                        {catCounts.total} Total Designs
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                        {catCounts.published} Published
                      </span>
                      {catCounts.draft > 0 && (
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg text-xs font-medium">
                          {catCounts.draft} Drafts
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-xs text-taupe">
                  Folder: <code className="font-mono text-[11px] bg-sand px-1.5 py-0.5 rounded">{cat.cloudinaryFolder}</code>
                </span>

                <Button asChild variant="primary" size="sm">
                  <Link href={`/admin/collections/${cat.key}`}>
                    <span>Manage {cat.label}</span>
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
