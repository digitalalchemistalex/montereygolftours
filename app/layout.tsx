import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import "./globals.css";
import SiteSchema from "@/components/SiteSchema";
import BackToTop from "@/components/BackToTop";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-playfair",
  preload: true,
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-lora",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

const OG_IMAGE = "/og-image.jpg";

const DEFAULT_TITLE = "Monterey Golf Tours — Private Group Golf Trips on the Monterey Peninsula";
const DEFAULT_DESC =
  "Plan a private group golf trip to the Monterey Peninsula. Courses, lodging, and tee times handled end to end.";

export const metadata: Metadata = {
  metadataBase: new URL("https://montereygolftours.com"),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Monterey Golf Tours",
  },
  description: DEFAULT_DESC,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: "Monterey Golf Tours",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: "https://montereygolftours.com/",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Monterey Peninsula golf" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col">
        <SiteSchema />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
