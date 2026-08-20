import { Metadata } from "next";
import { siteConfig } from "./site";

export interface PageMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: PageMetadataProps): Metadata {
  const canonicalUrl = path ? `${siteConfig.url}${path}` : siteConfig.url;

  const defaultImage = {
    url: `${siteConfig.url}/og-default.jpg`,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} - Home Furnishings in Besant Nagar, Chennai`,
  };

  const ogImage = image
    ? {
        url: image.url,
        width: image.width || 1200,
        height: image.height || 630,
        alt: image.alt || title,
      }
    : defaultImage;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_IN",
      url: canonicalUrl,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
