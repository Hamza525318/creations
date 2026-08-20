export type MediaSlotMode = "single" | "collection";

export interface MediaSlot {
  key: string;
  section: string;
  label: string;
  description?: string;
  mode: MediaSlotMode;
  aspectRatio: string;
  recommendedWidth?: number;
  recommendedHeight?: number;
  required?: boolean;
  maxItems?: number;
  cloudinaryFolder: string;
}

export const MEDIA_SLOTS: Record<string, MediaSlot> = {
  "branding.logo-primary": {
    key: "branding.logo-primary",
    section: "Branding",
    label: "Website Logo",
    description: "Primary CREATION'S logo displayed in the navigation header. PNG/WebP with transparent background recommended.",
    mode: "single",
    aspectRatio: "flexible",
    recommendedWidth: 800,
    recommendedHeight: 300,
    required: true,
    cloudinaryFolder: "creations/website/branding",
  },

  "hero.main": {
    key: "hero.main",
    section: "Hero",
    label: "Primary Hero Image",
    description: "Main residential drapery/living interior photograph (landscape/wide format recommended).",
    mode: "single",
    aspectRatio: "16:10",
    recommendedWidth: 1600,
    recommendedHeight: 1000,
    required: true,
    cloudinaryFolder: "creations/website/hero",
  },
  "hero.secondary": {
    key: "hero.secondary",
    section: "Hero",
    label: "Secondary Hero Accent",
    description: "Second offset/zig-zag accent photograph in the hero section.",
    mode: "single",
    aspectRatio: "16:10",
    recommendedWidth: 1200,
    recommendedHeight: 750,
    required: false,
    cloudinaryFolder: "creations/website/hero",
  },

  "categories.curtains": {
    key: "categories.curtains",
    section: "Categories",
    label: "Curtains Category",
    description: "Featured card image for curtains collection.",
    mode: "single",
    aspectRatio: "4:5",
    recommendedWidth: 1200,
    recommendedHeight: 1500,
    required: true,
    cloudinaryFolder: "creations/website/categories",
  },
  "categories.blinds": {
    key: "categories.blinds",
    section: "Categories",
    label: "Blinds Category",
    description: "Featured card image for window blinds collection.",
    mode: "single",
    aspectRatio: "4:5",
    recommendedWidth: 1200,
    recommendedHeight: 1500,
    required: true,
    cloudinaryFolder: "creations/website/categories",
  },
  "categories.upholstery": {
    key: "categories.upholstery",
    section: "Categories",
    label: "Upholstery Category",
    description: "Featured card image for upholstery fabrics collection.",
    mode: "single",
    aspectRatio: "4:5",
    recommendedWidth: 1200,
    recommendedHeight: 1500,
    required: true,
    cloudinaryFolder: "creations/website/categories",
  },
  "categories.bedspreads": {
    key: "categories.bedspreads",
    section: "Categories",
    label: "Bedspreads Category",
    description: "Featured card image for luxury bedspreads collection.",
    mode: "single",
    aspectRatio: "4:5",
    recommendedWidth: 1200,
    recommendedHeight: 1500,
    required: true,
    cloudinaryFolder: "creations/website/categories",
  },

  "gallery.curtain-reveal": {
    key: "gallery.curtain-reveal",
    section: "Curtain Reveal Gallery",
    label: "Curtain Reveal Gallery",
    description: "Curated collection of 4-6 project photos revealed when the animated curtains part on the homepage.",
    mode: "collection",
    aspectRatio: "mixed",
    maxItems: 6,
    required: false,
    cloudinaryFolder: "creations/website/curtain-reveal",
  },

  "gallery.projects": {
    key: "gallery.projects",
    section: "Featured Projects",
    label: "Project Gallery",
    description: "Collection of home installation photos across Chennai.",
    mode: "collection",
    aspectRatio: "3:4 or 4:3",
    maxItems: 12,
    cloudinaryFolder: "creations/website/gallery",
  },

  "styles.modern-minimal": {
    key: "styles.modern-minimal",
    section: "Find Your Style",
    label: "Modern Minimal Style",
    description: "Card image for modern minimal interior direction.",
    mode: "single",
    aspectRatio: "3:4",
    recommendedWidth: 1200,
    recommendedHeight: 1600,
    required: true,
    cloudinaryFolder: "creations/website/styles",
  },
  "styles.warm-contemporary": {
    key: "styles.warm-contemporary",
    section: "Find Your Style",
    label: "Warm Contemporary Style",
    description: "Card image for warm contemporary interior direction.",
    mode: "single",
    aspectRatio: "3:4",
    recommendedWidth: 1200,
    recommendedHeight: 1600,
    required: true,
    cloudinaryFolder: "creations/website/styles",
  },
  "styles.classic-elegant": {
    key: "styles.classic-elegant",
    section: "Find Your Style",
    label: "Classic Elegant Style",
    description: "Card image for classic elegant interior direction.",
    mode: "single",
    aspectRatio: "3:4",
    recommendedWidth: 1200,
    recommendedHeight: 1600,
    required: true,
    cloudinaryFolder: "creations/website/styles",
  },

  "about.main": {
    key: "about.main",
    section: "About CREATION'S",
    label: "Showroom & Studio",
    description: "Featured image for the Besant Nagar story section.",
    mode: "single",
    aspectRatio: "4:5",
    recommendedWidth: 1200,
    recommendedHeight: 1500,
    required: true,
    cloudinaryFolder: "creations/website/about",
  },

  "showroom.main": {
    key: "showroom.main",
    section: "Visit Showroom",
    label: "Location Thumbnail",
    description: "Visual image for store location section.",
    mode: "single",
    aspectRatio: "16:9",
    recommendedWidth: 1600,
    recommendedHeight: 900,
    required: false,
    cloudinaryFolder: "creations/website/showroom",
  },
};
