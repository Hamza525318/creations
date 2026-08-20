import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Bedspreads in Besant Nagar, Chennai | CREATION'S",
  description:
    "Explore luxury bedspreads, tailored quilts, and coordinated bedroom textiles designed for rest and character at CREATION'S in Besant Nagar, Chennai.",
  path: "/bedspreads",
});

export default function BedspreadsRoute() {
  return <CategoryPage category="bedspreads" />;
}
