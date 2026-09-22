import React from "react";
import { siteConfig } from "@/config/site";
import { CategoryDefinition, CatalogItem } from "@/lib/catalog/types";
import { WebsiteMedia } from "@/lib/media/types";

interface ProductCategorySchemaProps {
  config: CategoryDefinition;
  coverMedia?: WebsiteMedia | null;
  items?: CatalogItem[];
}

export default function ProductCategorySchema({
  config,
  coverMedia,
  items = [],
}: ProductCategorySchemaProps) {
  const imageUrl =
    coverMedia?.secureUrl || `${siteConfig.url}/og-default.jpg`;
  const canonicalUrl = `${siteConfig.url}${config.href}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonicalUrl}#product`,
    name: `${config.label} - ${siteConfig.name}`,
    description: config.description,
    image: imageUrl,
    url: canonicalUrl,
    category: config.label,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      "@id": `${siteConfig.url}/#business`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      priceRange: "₹₹",
      availability: "https://schema.org/InStock",
      url: canonicalUrl,
      seller: {
        "@type": "HomeGoodsStore",
        name: siteConfig.name,
        "@id": `${siteConfig.url}/#business`,
      },
    },
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    ...(items.length > 0 && {
      hasVariant: items.slice(0, 12).map((item) => ({
        "@type": "Product",
        name: item.title || `${config.label} Design`,
        description: item.alt || config.description,
        image: item.secureUrl,
        category: config.label,
        brand: {
          "@type": "Brand",
          name: siteConfig.name,
        },
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
