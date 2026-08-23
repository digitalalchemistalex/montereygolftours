import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Links at Spanish Bay® Reopening 2027 | Monterey Golf Tours",
  description:
    "The Links at Spanish Bay® reopens April 17, 2027 after a full Gil Hanse redesign. Join our priority waitlist for group tee times before public availability — Pebble Beach Resorts® IAGTO partner.",
  alternates: {
    canonical: `https://${SITE.domain}/spanish-bay-reopening/`,
  },
  openGraph: {
    title: "The Links at Spanish Bay® Reopening April 17, 2027",
    description:
      "Gil Hanse has redesigned one of America\'s most atmospheric links courses. Join the waitlist for first-access group tee times.",
    url: `https://${SITE.domain}/spanish-bay-reopening/`,
    siteName: SITE.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Links-style golf course along the Pacific Ocean coastline",
      },
    ],
  },
};

export default function SpanishBayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
