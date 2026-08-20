import { CatalogCategory, CategoryDefinition } from "@/lib/catalog/types";

export const CATEGORIES: Record<CatalogCategory, CategoryDefinition> = {
  curtains: {
    key: "curtains",
    label: "Curtains",
    href: "/curtains",
    coverSlot: "categories.curtains",
    eyebrow: "Custom Curtains & Drapery",
    heading: "Curtains designed around your space.",
    description:
      "Explore sheer curtains, lined drapes, rich textures, and bespoke pleat styles tailored to complement your room light, privacy, and architectural character.",
    heroSubtitle: "Hand-finished drapery, blackout linings, and sheer fabrics tailored in Chennai.",
    cloudinaryFolder: "creations/catalog/curtains",
  },
  blinds: {
    key: "blinds",
    label: "Blinds",
    href: "/blinds",
    coverSlot: "categories.blinds",
    eyebrow: "Tailored Window Blinds",
    heading: "Clean, considered window solutions.",
    description:
      "Precision window blinds providing effortless light control, modern privacy, and crisp architectural lines for contemporary living spaces and bedrooms.",
    heroSubtitle: "Roman blinds, roller shades, textured wooden blinds, and motorised options.",
    cloudinaryFolder: "creations/catalog/blinds",
  },
  upholstery: {
    key: "upholstery",
    label: "Upholstery",
    href: "/upholstery",
    coverSlot: "categories.upholstery",
    eyebrow: "Bespoke Upholstery & Fabrics",
    heading: "Give familiar furniture a fresh perspective.",
    description:
      "Durable, tactile upholstery fabrics and custom re-covering for sofas, accent lounge chairs, headboards, dining chairs, and decorative cushions.",
    heroSubtitle: "High-rub count linens, velvets, textured weaves, and performance textiles.",
    cloudinaryFolder: "creations/catalog/upholstery",
  },
  bedspreads: {
    key: "bedspreads",
    label: "Bedspreads",
    href: "/bedspreads",
    coverSlot: "categories.bedspreads",
    eyebrow: "Luxury Bedspreads & Linens",
    heading: "Comfort, texture and character for the bedroom.",
    description:
      "Coordinated bedspreads, tailored quilts, duvet ensembles, and bespoke pillow pairings designed for a restorative, layered sanctuary.",
    heroSubtitle: "Pure cottons, quilted velvets, and coordinated bedroom linens.",
    cloudinaryFolder: "creations/catalog/bedspreads",
  },
};

export const CATEGORY_LIST: CategoryDefinition[] = Object.values(CATEGORIES);

export function getCategoryConfig(category: CatalogCategory): CategoryDefinition {
  return CATEGORIES[category] || CATEGORIES.curtains;
}
