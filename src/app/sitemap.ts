import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModDate = new Date("2026-08-20T00:00:00.000Z");

  return [
    {
      url: baseUrl,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/curtains`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blinds`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upholstery`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bedspreads`,
      lastModified: lastModDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
