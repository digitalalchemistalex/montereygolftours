import type { Metadata } from "next";
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/800.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/500.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/pacifico/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/600.css";
import "./globals.css";
import SiteSchema from "@/components/SiteSchema";
import BackToTop from "@/components/BackToTop";
import ChatWidget from "@/components/ChatWidget";
import { ChatProvider } from "@/components/ChatContext";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteSchema />
        <ChatProvider>
          {children}
          <ChatWidget />
        </ChatProvider>
        <BackToTop />
      </body>
    </html>
  );
}
