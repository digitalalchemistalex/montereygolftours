import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Links at Spanish Bay® Reopening 2027 — Join the Waitlist",
  description: "The Links at Spanish Bay® closes for full renovation and reopens April 17, 2027. Join the waitlist to be first in line for tee times.",
  alternates: {
    canonical: "https://montereygolftours.com/spanish-bay-reopening/",
  },
  openGraph: {
    title: "The Links at Spanish Bay® Reopening 2027 — Join the Waitlist",
    description: "The Links at Spanish Bay® closes for full renovation and reopens April 17, 2027. Join the waitlist to be first in line for tee times.",
    url: "https://montereygolftours.com/spanish-bay-reopening/",
    siteName: "Monterey Golf Tours",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Links at Spanish Bay® Reopening 2027 — Join the Waitlist",
    description: "The Links at Spanish Bay® closes for full renovation and reopens April 17, 2027. Join the waitlist to be first in line for tee times.",
  },
};

export default function SpanishBayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
