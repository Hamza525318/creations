export interface InteriorStyle {
  id: string;
  name: string;
  description: string;
  tag: string;
  aspectRatio: string;
  placeholderText: string;
}

export const stylesData: InteriorStyle[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    tag: "Quiet & Restrained",
    description:
      "Clean architectural lines, subtle sheer fabrics, and monochromatic neutral palettes for contemporary light-filled spaces.",
    aspectRatio: "3/4",
    placeholderText: "Modern Minimal Interior",
  },
  {
    id: "warm-contemporary",
    name: "Warm Contemporary",
    tag: "Layered & Inviting",
    description:
      "Rich linen textures, soft tactile upholstery, and warm sand tones that create comfortable, effortless residential spaces.",
    aspectRatio: "3/4",
    placeholderText: "Warm Contemporary Setting",
  },
  {
    id: "classic-elegant",
    name: "Classic Elegant",
    tag: "Timeless & Refined",
    description:
      "Structured drapes, intricate jacquard weaves, and deep burgundy & muted sage accents bringing enduring sophistication.",
    aspectRatio: "3/4",
    placeholderText: "Classic Elegant Interior",
  },
];
