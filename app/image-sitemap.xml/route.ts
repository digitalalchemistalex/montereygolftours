import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { ITINERARIES } from "@/lib/itineraries";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

type ImageEntry = { loc: string; images: { url: string; title: string; caption?: string }[] };

export async function GET() {
  const base = `https://${SITE.domain}`;
  const entries: ImageEntry[] = [];

  // Course pages
  for (const c of COURSES) {
    if (c.image) {
      entries.push({
        loc: `${base}/golf-courses/${c.slug}/`,
        images: [{
          url: `${c.image}?auto=format&fit=crop&w=1200&h=800&q=85`,
          title: `${c.name} — Monterey Peninsula Golf Course`,
          caption: `${c.name} in ${c.city}. Par ${c.par}, ${c.yards}.`,
        }],
      });
    }
  }

  // Hotel pages
  const { HOTEL_DETAILS } = await import("@/lib/hotel-details");
  for (const h of Object.values(HOTEL_DETAILS)) {
    if (h.image) {
      entries.push({
        loc: `${base}/hotels/${h.slug}/`,
        images: [{
          url: `${h.image}?auto=format&fit=crop&w=1200&h=800&q=85`,
          title: `${h.name} — Monterey Golf Tours Lodging`,
          caption: `${h.name} in ${h.city} — lodging for Monterey Peninsula golf trips.`,
        }],
      });
    }
  }

  // Itinerary pages
  for (const t of Object.values(ITINERARIES)) {
    if (t.image) {
      entries.push({
        loc: `${base}/itineraries/${t.slug}/`,
        images: [{
          url: `${t.image}?auto=format&fit=crop&w=1200&h=800&q=85`,
          title: `${t.title} — Monterey Golf Tours`,
          caption: `${t.durationDays}-day Monterey Peninsula golf trip. ${t.rounds}.`,
        }],
      });
    }
  }

  // Blog post images
  for (const p of Object.values(BLOG_POSTS)) {
    if (p.cardImage) {
      entries.push({
        loc: `${base}/blog/${p.slug}/`,
        images: [{
          url: `${p.cardImage}`,
          title: `${p.title} — Monterey Golf Tours Blog`,
          caption: p.intro.slice(0, 150),
        }],
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map(e => `  <url>
    <loc>${esc(e.loc)}</loc>
${e.images.map(img => `    <image:image>
      <image:loc>${esc(img.url)}</image:loc>
      <image:title>${esc(img.title)}</image:title>
      ${img.caption ? `<image:caption>${esc(img.caption.replace(/\n/g, " "))}</image:caption>` : ""}
    </image:image>`).join("\n")}
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
