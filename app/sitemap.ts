import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { DESTINATIONS } from "@/lib/destinations";
import { ITINERARIES } from "@/lib/itineraries";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/golf-courses/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/hotels/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/destinations/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/itineraries/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/packages/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/quote/`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/faq/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  for (const c of COURSES) {
    entries.push({
      url: `${base}/golf-courses/${c.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const h of HOTELS) {
    entries.push({
      url: `${base}/hotels/${h.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const d of Object.values(DESTINATIONS)) {
    entries.push({
      url: `${base}/destinations/${d.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const t of Object.values(ITINERARIES)) {
    entries.push({
      url: `${base}/itineraries/${t.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const p of Object.values(BLOG_POSTS)) {
    entries.push({
      url: `${base}/blog/${p.slug}/`,
      lastModified: new Date(p.dateModified),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
