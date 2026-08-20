import { cloudinary, isCloudinaryConfigured } from "@/lib/cloudinary/server";
import { CatalogCategory, CatalogItem } from "./types";
import { parseCloudinaryCatalogAsset } from "./mapping";
import { CATEGORIES } from "@/config/categories";
import { unstable_cache } from "next/cache";

async function fetchCatalogItemsRaw(
  category: CatalogCategory,
  includeDrafts: boolean = false
): Promise<CatalogItem[]> {
  if (!isCloudinaryConfigured()) return [];

  try {
    const catConfig = CATEGORIES[category];
    const folder = catConfig?.cloudinaryFolder || `creations/catalog/${category}`;

    const result = await cloudinary.search
      .expression(`tags=creations-catalog AND folder="${folder}*" AND context.catalog_category="${category}"`)
      .max_results(100)
      .with_field("context")
      .execute();

    if (!result.resources || result.resources.length === 0) return [];

    const items: CatalogItem[] = result.resources.map((res: any) =>
      parseCloudinaryCatalogAsset(res, category)
    );

    // Filter status for public queries
    const filtered = includeDrafts ? items : items.filter((item) => item.status === "published");

    // Sort by order ascending
    return filtered.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error querying catalog for [${category}]:`, error);
    return [];
  }
}

export async function getCatalogItems(
  category: CatalogCategory,
  includeDrafts: boolean = false
): Promise<CatalogItem[]> {
  if (includeDrafts) {
    // For admin, query direct (un-cached) to see immediate live draft/published changes
    return fetchCatalogItemsRaw(category, true);
  }

  return unstable_cache(
    () => fetchCatalogItemsRaw(category, false),
    [`catalog-items-${category}`],
    {
      revalidate: 3600,
      tags: ["catalog", `catalog:${category}`],
    }
  )();
}

export async function getCatalogCounts(): Promise<Record<CatalogCategory, { total: number; published: number; draft: number }>> {
  const counts: Record<CatalogCategory, { total: number; published: number; draft: number }> = {
    curtains: { total: 0, published: 0, draft: 0 },
    blinds: { total: 0, published: 0, draft: 0 },
    upholstery: { total: 0, published: 0, draft: 0 },
    bedspreads: { total: 0, published: 0, draft: 0 },
  };

  if (!isCloudinaryConfigured()) return counts;

  try {
    const result = await cloudinary.search
      .expression("tags=creations-catalog")
      .max_results(200)
      .with_field("context")
      .execute();

    if (!result.resources) return counts;

    for (const res of result.resources) {
      const item = parseCloudinaryCatalogAsset(res);
      if (counts[item.category]) {
        counts[item.category].total += 1;
        if (item.status === "published") {
          counts[item.category].published += 1;
        } else {
          counts[item.category].draft += 1;
        }
      }
    }

    return counts;
  } catch (error) {
    console.error("Error fetching catalog counts:", error);
    return counts;
  }
}
