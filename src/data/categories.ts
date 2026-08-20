export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  aspectRatio: string;
  placeholderText: string;
  href: string;
}

export const categories: Category[] = [
  {
    id: "curtains",
    title: "Curtains",
    slug: "curtains",
    description:
      "Custom curtains selected to complement your room, light and interior style.",
    aspectRatio: "4/5",
    placeholderText: "Curtain Selection Photography",
    href: "#categories",
  },
  {
    id: "blinds",
    title: "Blinds",
    slug: "blinds",
    description:
      "Tailored window blinds providing precise light control, privacy and sleek modern aesthetic.",
    aspectRatio: "4/5",
    placeholderText: "Blinds & Roman Shades",
    href: "#categories",
  },
  {
    id: "upholstery",
    title: "Upholstery",
    slug: "upholstery",
    description:
      "Considered upholstery fabrics and re-covering for sofas, accent chairs and cushions.",
    aspectRatio: "4/5",
    placeholderText: "Upholstery Fabric Textures",
    href: "#categories",
  },
  {
    id: "bedspreads",
    title: "Bedspreads",
    slug: "bedspreads",
    description:
      "Coordinated bedspreads, duvet covers and bedroom textiles for a restful sanctuary.",
    aspectRatio: "4/5",
    placeholderText: "Bedspread & Bedroom Linen",
    href: "#categories",
  },
];
