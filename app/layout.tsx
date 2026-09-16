import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter } from "next/font/google";
import Script from "next/script";
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
  preload: true,
});

const GA4_ID = "G-2FREF1K3T1";
const GTM_ID = "GTM-P42W2PKX";

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
    // og image served by app/opengraph-image.tsx (dynamic @vercel/og)
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    // twitter image served by app/twitter-image.tsx
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${playfair.variable} ${lora.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        {/* GTM */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        {/* GA4 */}
        <Script
          id="ga4-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-2FREF1K3T1"
        />
        <Script
          id="ga4-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-2FREF1K3T1',{page_path:window.location.pathname,send_page_view:true});"
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <SiteSchema />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
