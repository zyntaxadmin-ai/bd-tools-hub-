import type { MetadataRoute } from "next";
import { LIVE_SLUGS } from "@/lib/live";
import { categories } from "@/data/tools";
import { siteConfig } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  // A fixed date, not "now", so the sitemap does not claim every page changed on every build. Update it when you change content.
  const now = new Date("2026-11-04");
  const statics = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map((p) => ({
    url: `${base}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.4,
  }));
  const cats = categories.map((c) => ({ url: `${base}/category/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 }));
  const live = LIVE_SLUGS.map((s) => ({ url: `${base}/tool/${s}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 }));
  const guides = [{ url: `${base}/guides`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 }, ...GUIDES.map((g) => ({ url: `${base}/guides/${g.slug}`, lastModified: new Date(g.updated), changeFrequency: "monthly" as const, priority: 0.8 }))];
  return [...statics, ...cats, ...live, ...guides];
}
