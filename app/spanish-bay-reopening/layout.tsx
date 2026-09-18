import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Links at Spanish Bay® Reopening 2027 — Join the Waitlist",
  description:
    "The Links at Spanish Bay® closes for full renovation and reopens April 17, 2027. Join the waitlist to be first in line for group tee times.",
  alternates: {
    canonical: `https://${SITE.domain}/spanish-bay-reopening/`,
  },
  openGraph: {
    title: "The Links at Spanish Bay® Reopening 2027 — Join the Waitlist",
    description:
      "Gil Hanse has redesigned one of America's most atmospheric links courses. Join the waitlist for first-access group tee times.",
    url: `https://${SITE.domain}/spanish-bay-reopening/`,
    siteName: SITE.name,
    images: [
      {
        url: "https://montereygolftours.com/images/pbc-portal/the-inn-at-spanish-bay---fire-pits.jpg",
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
