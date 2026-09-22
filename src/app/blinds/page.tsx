import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Window Blinds in Besant Nagar, Chennai",
  description:
    "Custom Roman blinds, roller shades & wooden Venetian blinds in Besant Nagar, Chennai. Smooth light control & fitting by CREATION'S.",
  path: "/blinds",
});

export default function BlindsRoute() {
  return <CategoryPage category="blinds" />;
}
