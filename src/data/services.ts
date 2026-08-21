import { Store, Sparkles, Layers, Ruler, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  cta?: string;
}

export const services: ServiceItem[] = [
  {
    id: "showroom",
    title: "Visit Our Showroom",
    description:
      "Explore curtains, blinds, upholstery, and bedspreads in person at our Besant Nagar showroom.",
    icon: Store,
    href: "#location",
    cta: "Get Directions",
  },
  {
    id: "guidance",
    title: "Expert Guidance",
    description:
      "Tell us what your space needs and we'll help you explore suitable fabrics, colours, and furnishing options.",
    icon: Sparkles,
    href: siteConfig.whatsappUrl,
    cta: "Talk to Us on WhatsApp",
  },
  {
    id: "quality",
    title: "Quality You Can Feel",
    description:
      "Explore carefully selected furnishing materials with attention to finish, texture, and everyday comfort.",
    icon: Layers,
    href: "#categories",
    cta: "Explore Collections",
  },
  {
    id: "installation",
    title: "Measurement & Home Installation",
    description:
      "Get your windows measured and your selected furnishings tailored and fitted at home in Chennai.",
    icon: Ruler,
    href: "/measurement-guide",
    cta: "How to Measure",
  },
];
