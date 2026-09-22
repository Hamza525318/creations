import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Upholstery in Besant Nagar, Chennai",
  description:
    "Custom upholstery fabrics & sofa re-covering in Besant Nagar, Chennai. Premium textures and tailored furniture revival at CREATION'S.",
  path: "/upholstery",
});

export default function UpholsteryRoute() {
  return <CategoryPage category="upholstery" />;
}
