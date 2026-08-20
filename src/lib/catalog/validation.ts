import { CatalogCategory, CatalogStatus } from "./types";
import { CATEGORIES } from "@/config/categories";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function isValidCategory(category: string): category is CatalogCategory {
  return Object.keys(CATEGORIES).includes(category);
}

export function validateCatalogInput(input: {
  category: string;
  alt: string;
  title?: string;
  description?: string;
  priceDisplay?: string;
  status?: string;
}): ValidationResult {
  if (!isValidCategory(input.category)) {
    return { valid: false, error: `Invalid category: ${input.category}` };
  }

  if (!input.alt || typeof input.alt !== "string" || input.alt.trim().length === 0) {
    return { valid: false, error: "Image alt text is mandatory for accessibility and SEO." };
  }

  if (input.alt.length > 200) {
    return { valid: false, error: "Alt text must be under 200 characters." };
  }

  if (input.title && input.title.length > 100) {
    return { valid: false, error: "Title must be under 100 characters." };
  }

  if (input.description && input.description.length > 400) {
    return { valid: false, error: "Description must be under 400 characters." };
  }

  if (input.priceDisplay && input.priceDisplay.length > 50) {
    return { valid: false, error: "Price display must be under 50 characters." };
  }

  if (input.status && input.status !== "draft" && input.status !== "published") {
    return { valid: false, error: "Status must be either 'draft' or 'published'." };
  }

  return { valid: true };
}

export function sanitizePlainText(text?: string): string {
  if (!text) return "";
  return text
    .replace(/[<>]/g, "") // remove potential html tags
    .replace(/[|]/g, " ") // avoid delimiter clashes in context
    .trim();
}
