import type { MetadataRoute } from "next";
import { site, navigation } from "@/data/site";
import { speakers } from "@/data/speakers";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map((n) => n.href),
    "/passes",
    "/volunteer",
    "/privacy",
    "/terms",
    "/accessibility",
    ...speakers.map((s) => "/speakers/" + s.slug),
  ].map((path) => ({
    url: site.url + (path === "/" ? "" : path),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
