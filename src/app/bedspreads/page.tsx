import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Bedspreads & Quilts in Besant Nagar",
  description:
    "Luxury bedspreads, tailored quilts and bedroom linens in Besant Nagar, Chennai. Crafted for coastal comfort and style at CREATION'S.",
  path: "/bedspreads",
});

export default function BedspreadsRoute() {
  return <CategoryPage category="bedspreads" />;
}
