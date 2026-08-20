import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Blinds in Besant Nagar, Chennai | CREATION'S",
  description:
    "Discover precision window blinds in Besant Nagar, Chennai. Explore tailored Roman blinds, roller shades, and wooden blinds designed for light control and privacy.",
  path: "/blinds",
});

export default function BlindsRoute() {
  return <CategoryPage category="blinds" />;
}
