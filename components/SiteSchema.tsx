import { SITE } from "@/lib/site";

export default function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "TravelAgency"],
        "@id": `https://${SITE.domain}/#organization`,
        name: SITE.name,
        url: `https://${SITE.domain}`,
        logo: {
          "@type": "ImageObject",
          "@id": `https://${SITE.domain}/#logo`,
          url: `https://${SITE.domain}/brand/logo-correct.png`,
          contentUrl: `https://${SITE.domain}/brand/logo-correct.png`,
          caption: "Monterey Golf Tours",
          inLanguage: "en-US",
        },
        image: { "@id": `https://${SITE.domain}/#logo` },
        sameAs: [
          "https://golfthehighsierra.com",
        ],
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
          streetAddress: "140 W Franklin St Ste 203",
          addressLocality: "Monterey",
          addressRegion: "CA",
          postalCode: "93940",
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
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `https://${SITE.domain}/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
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
