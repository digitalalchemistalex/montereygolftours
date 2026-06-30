import { SITE } from "@/lib/site";

export default function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `https://${SITE.domain}/#organization`,
        name: SITE.name,
        url: `https://${SITE.domain}`,
        founder: {
          "@type": "Person",
          name: "Sean Schaeffer",
          jobTitle: "Founder",
        },
        description:
          "Custom Monterey Peninsula golf trips. Verified courses and resorts across Monterey, Carmel, Pacific Grove, Seaside, and Carmel Valley.",
        areaServed: {
          "@type": "Place",
          name: "Monterey Peninsula, California",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: SITE.email ?? undefined,
          telephone: SITE.phone,
          areaServed: "US",
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "2700 Mill St Suite 800",
          addressLocality: "Reno",
          addressRegion: "NV",
          postalCode: "89502",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": `https://${SITE.domain}/#website`,
        url: `https://${SITE.domain}`,
        name: SITE.name,
        publisher: { "@id": `https://${SITE.domain}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
