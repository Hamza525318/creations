import React from "react";
import { siteConfig } from "@/config/site";
import { WebsiteMedia } from "@/lib/media/types";
import { testimonials } from "@/data/testimonials";

interface LocalBusinessSchemaProps {
  logoMedia?: WebsiteMedia | null;
  coverMedia?: WebsiteMedia | null;
}

export default function LocalBusinessSchema({
  logoMedia,
  coverMedia,
}: LocalBusinessSchemaProps) {
  const logoUrl = logoMedia?.secureUrl || `${siteConfig.url}/logo.png`;
  const imageUrl = coverMedia?.secureUrl || `${siteConfig.url}/og-default.jpg`;

  // Calculate review aggregation
  const reviewCount = testimonials.length;
  const ratingSum = testimonials.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = reviewCount > 0 ? (ratingSum / reviewCount).toFixed(1) : "5.0";

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description:
      "Curtains and blinds store in Besant Nagar, Chennai. Specialising in custom drapery, ready made curtains, precision window blinds, upholstery fabrics, and luxury bedspreads for homes in Besant Nagar, Adyar, ECR, and South Chennai.",
    logo: logoUrl,
    image: imageUrl,
    telephone: siteConfig.phone,
    email: "contact@creations.ind.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.googleMapsUrl,
    openingHoursSpecification: siteConfig.openingHoursSchema.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.days,
      opens: item.opens,
      closes: item.closes,
    })),
    priceRange: "₹₹",
    areaServed: siteConfig.areaServed.map((area) => ({
      "@type": "City",
      name: area,
    })),
    sameAs: [siteConfig.socialLinks.instagram],

    // =========================================================================
    // Reviews & Aggregate Rating for Rich Snippets
    // =========================================================================
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: t.quote,
      publisher: {
        "@type": "Organization",
        name: "Google Reviews",
      },
    })),

    // =========================================================================
    // Product & Services Catalog Declaration for Search Bots & AI Scrapers
    // =========================================================================
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CREATION'S Furnishing Collections & Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Curtains & Drapery",
          url: `${siteConfig.url}/curtains`,
          itemListElement: [
            { "@type": "Offer", name: "Custom Pleated Curtains" },
            { "@type": "Offer", name: "Ready Made Curtains" },
            { "@type": "Offer", name: "Blackout Drapery" },
            { "@type": "Offer", name: "Sheer Linen Drapes" },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Window Blinds & Motorised Systems",
          url: `${siteConfig.url}/blinds`,
          itemListElement: [
            { "@type": "Offer", name: "Roman Blinds" },
            { "@type": "Offer", name: "Roller Shades" },
            { "@type": "Offer", name: "Wooden Venetian Blinds" },
            { "@type": "Offer", name: "Motorised Blinds" },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Sofa Re-covering & Upholstery Fabrics",
          url: `${siteConfig.url}/upholstery`,
          itemListElement: [
            { "@type": "Offer", name: "Custom Sofa Upholstery" },
            { "@type": "Offer", name: "Armchair & Dining Chair Re-covering" },
            { "@type": "Offer", name: "High-Rub Performance Fabrics" },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Luxury Bedspreads & Quilts",
          url: `${siteConfig.url}/bedspreads`,
          itemListElement: [
            { "@type": "Offer", name: "Tailored Quilts & Bedspreads" },
            { "@type": "Offer", name: "Duvet Sets & Bedroom Linens" },
          ],
        },
        {
          "@type": "Offer",
          name: "On-Site Window Measurement & Professional Installation",
          url: `${siteConfig.url}/measurement-guide`,
          description: "Professional measurement verification and guaranteed on-site fitting across Chennai.",
        },
      ],
    },

    // =========================================================================
    // Semantic Knowledge Entities for Search Bots & AI Engines
    // =========================================================================
    knowsAbout: [
      "Custom Curtains",
      "Ready Made Curtains",
      "Ready to Fit Curtains",
      "Sheer Linen Curtains",
      "Blackout Drapery",
      "Window Blinds",
      "Roman Blinds",
      "Roller Shades",
      "Wooden Venetian Blinds",
      "Motorised Blinds",
      "Sofa Upholstery",
      "Furniture Re-covering",
      "Luxury Bedspreads",
      "Window Measurement",
      "Home Furnishings Besant Nagar Chennai",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
