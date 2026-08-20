import React from "react";
import { siteConfig } from "@/config/site";
import { WebsiteMedia } from "@/lib/media/types";

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    description:
      "Premier home furnishing showroom in Besant Nagar, Chennai. Specialising in custom curtains, precision blinds, upholstery fabrics, and luxury bedspreads.",
    logo: logoUrl,
    image: imageUrl,
    telephone: siteConfig.phone,
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
    sameAs: [siteConfig.socialLinks.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
