import { CatalogItem, CatalogCategory, CatalogStatus } from "./types";
import { CATEGORIES } from "@/config/categories";

export function parseCloudinaryCatalogAsset(resource: any, defaultCategory?: CatalogCategory): CatalogItem {
  const custom = resource.context?.custom || resource.context || {};
  
  const rawCat = custom.catalog_category || defaultCategory || "curtains";
  const category: CatalogCategory = (rawCat in CATEGORIES) ? (rawCat as CatalogCategory) : "curtains";

  const rawStatus = custom.catalog_status || "published";
  const status: CatalogStatus = rawStatus === "draft" ? "draft" : "published";

  return {
    assetId: resource.asset_id || resource.public_id,
    publicId: resource.public_id,
    secureUrl: resource.secure_url,
    category,
    title: custom.catalog_title || undefined,
    description: custom.catalog_description || undefined,
    priceDisplay: custom.catalog_price_display || undefined,
    alt: custom.catalog_alt_text || custom.alt_text || custom.alt || `${CATEGORIES[category]?.label || "CREATION'S"} design photograph`,
    order: parseInt(custom.catalog_display_order || custom.display_order || "0", 10) || 0,
    status,
    width: resource.width || 0,
    height: resource.height || 0,
    format: resource.format || "jpg",
    createdAt: resource.created_at || new Date().toISOString(),
  };
}

export function buildCatalogContextString(params: {
  category: CatalogCategory;
  alt: string;
  title?: string;
  description?: string;
  priceDisplay?: string;
  order?: number;
  status?: CatalogStatus;
}): string {
  const sanitize = (str?: string) => (str || "").replace(/[|=]/g, " ").trim();

  const pairs: string[] = [
    `catalog_category=${sanitize(params.category)}`,
    `catalog_alt_text=${sanitize(params.alt)}`,
    `catalog_display_order=${params.order ?? 0}`,
    `catalog_status=${params.status || "published"}`,
  ];

  if (params.title) {
    pairs.push(`catalog_title=${sanitize(params.title)}`);
  }
  if (params.description) {
    pairs.push(`catalog_description=${sanitize(params.description)}`);
  }
  if (params.priceDisplay) {
    pairs.push(`catalog_price_display=${sanitize(params.priceDisplay)}`);
  }

  return pairs.join("|");
}
