import React from "react";
import { CatalogCategory } from "@/lib/catalog/types";
import { getCategoryConfig, CATEGORY_LIST } from "@/config/categories";
import { getCatalogItems } from "@/lib/catalog/queries";
import { getMediaForSlot } from "@/lib/media/queries";
import CategoryHero from "./category-hero";
import CatalogGrid from "./catalog-grid";
import CategorySEOContent from "./category-seo-content";
import CategoryContactCTA from "./category-contact-cta";
import RelatedCategories from "./related-categories";
import BreadcrumbSchema from "@/components/seo/breadcrumb-schema";
import { WebsiteMedia } from "@/lib/media/types";

interface CategoryPageProps {
  category: CatalogCategory;
}

export default async function CategoryPage({ category }: CategoryPageProps) {
  const config = getCategoryConfig(category);

  // 1. Fetch category cover image from fixed media slot
  const coverMedia = await getMediaForSlot(config.coverSlot);

  // 2. Fetch published catalog items for this category (cached)
  const items = await getCatalogItems(category, false);

  // 3. Fetch cover images for related categories
  const covers: Record<string, WebsiteMedia | null> = {};
  await Promise.all(
    CATEGORY_LIST.map(async (cat) => {
      covers[cat.coverSlot] = await getMediaForSlot(cat.coverSlot);
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <BreadcrumbSchema items={[{ name: config.label, url: config.href }]} />
      <CategoryHero config={config} coverMedia={coverMedia} />
      <CatalogGrid category={category} items={items} />
      <CategorySEOContent category={category} />
      <CategoryContactCTA config={config} />
      <RelatedCategories currentCategory={category} covers={covers} />
    </div>
  );
}
