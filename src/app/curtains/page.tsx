import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Curtains in Besant Nagar, Chennai",
  description:
    "Custom drapes, sheer fabrics & blackout curtains in Besant Nagar, Chennai. Tailored stitching and fitting services by CREATION'S.",
  path: "/curtains",
});

export default function CurtainsRoute() {
  return <CategoryPage category="curtains" />;
}
