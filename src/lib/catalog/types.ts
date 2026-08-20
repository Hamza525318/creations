export type CatalogCategory = "curtains" | "blinds" | "upholstery" | "bedspreads";

export type CatalogStatus = "draft" | "published";

export interface CatalogItem {
  assetId: string;
  publicId: string;
  secureUrl: string;
  category: CatalogCategory;
  title?: string;
  description?: string;
  priceDisplay?: string;
  alt: string;
  order: number;
  status: CatalogStatus;
  width: number;
  height: number;
  format: string;
  createdAt?: string;
}

export interface CategoryDefinition {
  key: CatalogCategory;
  label: string;
  href: string;
  coverSlot: string;
  eyebrow: string;
  heading: string;
  description: string;
  heroSubtitle: string;
  cloudinaryFolder: string;
}

export interface CatalogUploadPayload {
  category: CatalogCategory;
  title?: string;
  description?: string;
  priceDisplay?: string;
  alt: string;
  status: CatalogStatus;
}
