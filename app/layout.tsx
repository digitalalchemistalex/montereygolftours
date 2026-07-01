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
import "./globals.css";
import SiteSchema from "@/components/SiteSchema";

export const metadata: Metadata = {
  title: "Monterey Golf Tours — Private Group Golf Trips on the Monterey Peninsula",
  description:
    "Plan a private group golf trip to the Monterey Peninsula. Courses, lodging, and tee times handled end to end.",
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
        {children}
      </body>
    </html>
  );
}
