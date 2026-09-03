import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroCentered from "@/components/HeroCentered";
import Configurator from "@/components/Configurator";
import PebbleBeachSection from "@/components/PebbleBeachSection";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";

const Packages  = dynamic(() => import("@/components/Packages"));
const Itinerary = dynamic(() => import("@/components/Itinerary"));
const Hotels    = dynamic(() => import("@/components/Hotels"));
const LocalIntel = dynamic(() => import("@/components/LocalIntel"));
const FAQ       = dynamic(() => import("@/components/FAQ"));

// ── Metadata ─────────────────────────────────────────────────────────
// Formula: P1 keyword first | price signal | brand | ≤60 chars title
export const metadata: Metadata = {
  title: "Monterey Golf Packages & Group Trips | Monterey Golf Tours",
  description:
    "Custom Monterey Peninsula golf packages for groups. 14 courses, 9 hotels, tee times and transfers handled end to end. Get a quote in 24 hours.",
  alternates: {
    canonical: "https://montereygolftours.com/",
  },
  openGraph: {
    title: "Monterey Golf Packages & Group Trips | Monterey Golf Tours",
    description:
      "Custom Monterey Peninsula golf packages for groups. 14 courses, 9 hotels, tee times and transfers handled end to end. Get a quote in 24 hours.",
    url: "https://montereygolftours.com/",
    siteName: "Monterey Golf Tours",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monterey Golf Packages & Group Trips | Monterey Golf Tours",
    description:
      "Custom Monterey Peninsula golf packages for groups. 14 courses, 9 hotels, tee times and transfers handled end to end.",
  },
};

// ── Schema graph ──────────────────────────────────────────────────────
// GTHS lesson: ["TravelAgency","Service"] for review snippet eligibility
// FAQPage node = AI Overview citation target
// SpeakableSpecification = voice + AI assistant pull
const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebSite — sitelinks search box eligibility
    {
      "@type": "WebSite",
      "@id": "https://montereygolftours.com/#website",
      url: "https://montereygolftours.com/",
      name: "Monterey Golf Tours",
      description:
        "Custom Monterey Peninsula golf packages for groups. 14 courses, 9 hotels, tee times and transfers handled end to end.",
      publisher: { "@id": "https://montereygolftours.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://montereygolftours.com/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 2. Organization — entity graph, sameAs for AI disambiguation
    {
      "@type": ["Organization", "TravelAgency"],
      "@id": "https://montereygolftours.com/#organization",
      name: "Monterey Golf Tours",
      url: "https://montereygolftours.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://montereygolftours.com/brand/logo.png",
        width: 280,
        height: 268,
      },
      founder: { "@type": "Person", name: "Sean Schaeffer" },
      telephone: "+18662787010",
      email: "info@montereygolftours.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2700 Mill St Suite 800",
        addressLocality: "Reno",
        addressRegion: "NV",
        postalCode: "89502",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "Place",
        name: "Monterey Peninsula, California",
      },
      description:
        "Monterey Golf Tours plans custom golf packages on the Monterey Peninsula — tee times, lodging, and transfers across 14 courses and 9 hotels.",
      sameAs: [
        "https://golfthehighsierra.com",
      ],
    },

    // 3. Service — what we sell; required alongside Organization for rich results
    {
      "@type": "Service",
      "@id": "https://montereygolftours.com/#service",
      name: "Monterey Peninsula Golf Trip Planning",
      serviceType: "Golf Trip Planning",
      provider: { "@id": "https://montereygolftours.com/#organization" },
      areaServed: {
        "@type": "Place",
        name: "Monterey Peninsula, California",
      },
      description:
        "End-to-end Monterey Peninsula golf trip planning for groups: tee times at 14 courses, lodging at 9 hotels, ground transfers, and a custom quote within 24 hours.",
      url: "https://montereygolftours.com/quote/",
      offers: {
        "@type": "Offer",
        url: "https://montereygolftours.com/quote/",
        description: "Custom Monterey golf package — price varies by group size, courses, and lodging",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    },

    // 4. WebPage — page-level signals; speakable targets H1 + FAQ
    {
      "@type": "WebPage",
      "@id": "https://montereygolftours.com/#webpage",
      url: "https://montereygolftours.com/",
      name: "Monterey Golf Packages & Group Trip Planning | Monterey Golf Tours",
      description:
        "Custom Monterey Peninsula golf packages for groups. 14 courses, 9 hotels, tee times and transfers handled end to end. Get a quote in 24 hours.",
      isPartOf: { "@id": "https://montereygolftours.com/#website" },
      about: { "@id": "https://montereygolftours.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://montereygolftours.com/",
          },
        ],
      },
      speakable: {
        "@type": "SpeakableSpecification",
        // H1 + FAQ answers — what AI assistants and voice search pull
        cssSelector: ["h1", ".speakable-summary", ".faq-answer"],
      },
    },

    // 5. FAQPage — AI Overview citation target
    // Exact queries from MGTS AEO skill; answer-first format per AEO law #1
    {
      "@type": "FAQPage",
      "@id": "https://montereygolftours.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What golf courses are in Monterey, California?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Monterey Peninsula has 14 public and semi-private golf courses. Key options include Bayonet Golf Course (par 72, rating 74.7), Black Horse Golf Course (par 72, rating 72.8), Pacific Grove Golf Links (par 70, municipal), Laguna Seca Golf Ranch (par 71, Robert Trent Jones Jr.), Quail Lodge Golf Club (par 71, Carmel Valley), Poppy Hills Golf Course (par 71, Golf Digest Top 100), and Del Monte Golf Course (1897, oldest course west of the Mississippi). Pebble Beach Golf Links, Spyglass Hill Golf Course, and The Links at Spanish Bay are also on the peninsula.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a Monterey golf trip cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A Monterey golf trip typically costs $400–$900 per person per day depending on which courses you play and where you stay. Daily-fee courses like Pacific Grove Golf Links and Laguna Seca Golf Ranch run $75–$150 per round. Premium courses such as Bayonet and Black Horse are $140–$220 per round. Resort course green fees vary and require a lodge stay to access. A 3-day trip for a group of 4 playing mid-range courses and staying at a 4-star hotel typically runs $1,200–$2,000 per person total. Contact Monterey Golf Tours for a custom quote based on your group size and course preferences.",
          },
        },
        {
          "@type": "Question",
          name: "What is the best time of year to play golf in Monterey?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The best months to play golf on the Monterey Peninsula are March through May and September through November. These windows have the lightest marine layer, mildest temperatures (60–70°F), and the fewest crowds. June through August brings daily coastal fog that typically burns off by 10am — schedule tee times after 9:30am if you want clear skies from the first hole. August adds Car Week congestion and hotel rate spikes. December through February is the quietest and cheapest period with occasional rain but often excellent playing conditions.",
          },
        },
        {
          "@type": "Question",
          name: "How far in advance should I book a Monterey golf trip?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Book 60–90 days in advance for peak season (May through October). For groups of 12 or more, 90 days is the minimum to secure tee time blocks. Resort course bookings require even more lead time — some require a confirmed hotel stay. January through March has 2–4 week availability for most courses. The AT&T Pro-Am in February closes several courses for a week, so plan around that. Contact Monterey Golf Tours to check current availability — we hold pre-negotiated tee time allocations at several courses.",
          },
        },
        {
          "@type": "Question",
          name: "Is Poppy Hills Golf Course part of Pebble Beach Resorts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Poppy Hills Golf Course is owned and operated by the Northern California Golf Association (NCGA) and is completely independent from Pebble Beach Company. It is open to the public year-round, located in Pebble Beach (zip 93953) with no gate fee required. Poppy Hills is a Golf Digest Top 100 Courses You Can Play and was designed by Robert Trent Jones Jr. in 1986, renovated in 2014.",
          },
        },
        {
          "@type": "Question",
          name: "Can you book Monterey golf packages for corporate groups?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Monterey Golf Tours handles corporate golf groups from 8 to 300 players on the Monterey Peninsula. We secure tee sheet blocks at courses including Carmel Valley Ranch, TPC Monterey at Pasadera, Poppy Hills, and Bayonet. Services include hotel room blocks, ground transportation, shotgun start coordination, and a single contract covering all arrangements. Contact us for a corporate group quote.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <main className="flex-1">
        <HeroCentered />
        <Configurator />
        <PebbleBeachSection />
        <Courses />
        <Packages />
        <Itinerary />
        <Hotels />
        <LocalIntel />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
