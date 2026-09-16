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
        foundingDate: "2024",
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
          "https://www.facebook.com/montereygolftours",
          "https://www.instagram.com/montereygolftours",
          "https://iagto.com",
        ],
        knowsAbout: [
          "Monterey Peninsula golf courses",
          "Pebble Beach Resorts golf packages",
          "group golf trip planning",
          "IAGTO golf travel",
          "Pebble Beach Golf Links tee times",
          "Spyglass Hill Golf Course",
          "corporate golf outings Monterey",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Monterey Peninsula Golf Packages",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Monterey Peninsula Golf Trip Planning",
                description: "End-to-end golf trip planning for groups of 2-400 across 14 Monterey Peninsula courses and 14 hotels.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Pebble Beach Golf Packages",
                description: "IAGTO-authorized tee times at Pebble Beach Golf Links, Spyglass Hill, Del Monte, and The Hay, combined with lodge stays.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Corporate Golf Outings — Monterey Peninsula",
                description: "Shotgun starts, tee sheet blocks, transfers, and hotel room blocks for corporate groups of 2-400 players.",
              },
            },
          ],
        },
        founder: {
          "@type": "Person",
          name: "Sean Schaeffer",
          jobTitle: "Founder",
        },
        description:
          "Monterey Golf Tours is an active, dedicated golf trip booking service for the Monterey Peninsula. We secure tee times, hotel rooms, and transfers for groups of 2-400 players — Pebble Beach Golf Links, Spyglass Hill, Bayonet, and 11 more courses, across 14 hotels, handled under a single contract.",
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
