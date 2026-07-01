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
import "@fontsource/cormorant/700.css";
import "@fontsource/abril-fatface/400.css";
import "@fontsource/prata/400.css";
import "@fontsource/frank-ruhl-libre/700.css";
import "@fontsource/spectral/600.css";
import "@fontsource/crimson-pro/600.css";
import "@fontsource/forum/400.css";
import "@fontsource/julius-sans-one/400.css";
import "@fontsource/josefin-sans/500.css";
import "@fontsource/quattrocento/700.css";
import "@fontsource/cardo/700.css";
import "@fontsource/vollkorn/700.css";
import "@fontsource/zilla-slab/600.css";
import "@fontsource/rozha-one/400.css";
import "@fontsource/caudex/700.css";
import "@fontsource/fjalla-one/400.css";
import "@fontsource/oswald/600.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/archivo-black/400.css";
import "@fontsource/anton/400.css";
import "@fontsource/yeseva-one/400.css";
import "@fontsource/abhaya-libre/700.css";
import "@fontsource/gilda-display/400.css";
import "@fontsource/domine/700.css";
import "@fontsource/piazzolla/600.css";
import "@fontsource/fraunces/600.css";
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
