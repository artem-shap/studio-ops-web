import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * One public page. Portal routes are deliberately absent: they are private,
 * per-client, and listing them would be the same mistake as indexing them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
