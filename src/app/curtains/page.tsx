import React from "react";
import { Metadata } from "next";
import CategoryPage from "@/components/collections/category-page";
import { createMetadata } from "@/config/seo";

export const metadata: Metadata = createMetadata({
  title: "Curtains in Besant Nagar, Chennai | CREATION'S",
  description:
    "Explore bespoke curtains in Besant Nagar, Chennai. From sheer linen drapes to lined blackout curtains, tailor your living room and bedroom window treatments with CREATION'S.",
  path: "/curtains",
});

export default function CurtainsRoute() {
  return <CategoryPage category="curtains" />;
}
