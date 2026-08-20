import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Upholstery in Besant Nagar, Chennai | CREATION'S",
  description:
    "Give familiar furniture a fresh perspective with durable, tactile upholstery fabrics and custom sofa re-covering at CREATION'S in Besant Nagar, Chennai.",
  path: "/upholstery",
});

export default function UpholsteryRoute() {
  return <CategoryPage category="upholstery" />;
}
