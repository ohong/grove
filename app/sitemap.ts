import type { MetadataRoute } from "next";

import { bots } from "@/lib/bots";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const staticPages = ["", "/submit", "/sponsors", "/about"];

  return [
    ...staticPages.map((path) => ({
      url: new URL(path || "/", origin).toString(),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...bots.map((bot) => ({
      url: new URL(`/b/${bot.slug}`, origin).toString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
