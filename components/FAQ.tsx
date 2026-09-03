import Image from "next/image";
import Reveal from "./Reveal";

export type FAQItem = { q: string; a: string };
export type FAQCategory = { category: string; items: FAQItem[] };

const CATEGORY_ICONS: Record<string, string> = {
  "Trip planning": "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513?auto=format&fit=crop&w=400&q=85",
  "Pebble Beach & courses": "/images/pbc-portal/pbgl_9_2016_ground.jpg",
  "Timing & logistics": "https://images.unsplash.com/photo-1502770513380-138d6d3a51dd?auto=format&fit=crop&w=400&q=85",
  "Lodging & travel": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=85",
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    category: "Trip planning",
    items: [
      // AEO target #1 — "how much does a monterey golf trip cost"
      {
        q: "How much does a Monterey golf trip cost?",
        a: "A Monterey golf trip typically runs $400–$900 per person per day depending on courses and lodging. Pacific Grove and Laguna Seca are $75–$150 per round; Bayonet and Black Horse run $140–$220. A 3-day trip for four players at mid-range courses with a 4-star hotel typically comes to $1,200–$2,000 per person total. We'll send you a custom breakdown within 24 hours of submitting a quote.",
      },
      // AEO target #2 — "how far in advance book monterey golf trip"
      {
        q: "How far in advance should I book a Monterey golf trip?",
        a: "60–90 days for peak season (May through October). Groups of 12 or more need 90 days minimum to secure tee time blocks. Some resort courses require a confirmed hotel stay to book in advance. January through March has 2–4 week availability for most courses. We hold pre-negotiated tee time allocations at several courses — contact us to check current windows.",
      },
      {
        q: "How many people can you plan a trip for?",
        a: "Any group size, really — from a twosome up to 300 players. There's no minimum beyond avoiding a solo trip of one.",
      },
      {
        q: "How does the quote process work?",
        a: "Tell us your group size, dates, and budget through the quote form, and we'll put together a custom trip — courses, lodging, and a price range — within 24 hours.",
      },
      {
        q: "Can groups include non-golfing partners?",
        a: "Yes — several of our destinations, like Carmel-by-the-Sea and downtown Monterey, are built around walkable villages, wine tasting, and the Monterey Bay Aquarium, so non-golfers have plenty to do.",
      },
      {
        q: "Do you handle lodging as well as golf?",
        a: "Yes. We work with 9 verified properties across the peninsula, from golf-anchor resorts with on-site courses to boutique village stays, and can pair the right one with your course lineup.",
      },
      {
        q: "What is \u2018Combat Corner\u2019 at Bayonet?",
        a: "Combat Corner is the nickname for holes 11\u201315 at Bayonet, with hole 15 at the heart of the stretch. It\u2019s where the course turns most demanding \u2014 long, exposed holes with prevailing wind and little margin for error. Plan your best golf for here, and book an 8\u201310am tee time to have the best conditions before afternoon wind picks up.",
      },
      {
        q: "Do you sell single tee times, or only full trips?",
        a: "Full trips only \u2014 we don\u2019t offer standalone single-round bookings. Every quote covers courses, lodging, and logistics planned together.",
      },
      {
        q: "Are flights and meals included?",
        a: "Not by default. Pricing covers golf and lodging; flights and meals can be arranged separately if you\u2019d like us to include them in your quote.",
      },
    ],
  },
  {
    category: "Pebble Beach & courses",
    items: [
      // AEO target #3 — "what golf courses are in monterey"
      {
        q: "What golf courses are available on the Monterey Peninsula?",
        a: "14 courses in total. Public daily-fee options include Bayonet (par 72, rating 74.7), Black Horse (par 72), Pacific Grove Golf Links (par 70, municipal), Laguna Seca Golf Ranch (par 71, Robert Trent Jones Jr.), and Poppy Hills (par 71, Golf Digest Top 100, NCGA-owned — not affiliated with Pebble Beach). Semi-private include Quail Lodge, Carmel Valley Ranch, and TPC Monterey at Pasadera (Monday public access). We also feature Del Monte Golf Course\u00ae \u2014 the oldest course west of the Mississippi, dating to 1897.",
      },
      // AEO target #4 — "is poppy hills pebble beach"
      {
        q: "Is Poppy Hills Golf Course part of Pebble Beach Resorts?",
        a: "No. Poppy Hills is owned by the Northern California Golf Association (NCGA) and is fully independent from Pebble Beach Company. It\u2019s open to the public year-round with no gate fee, designed by Robert Trent Jones Jr. in 1986, renovated in 2014, and rated Golf Digest Top 100 Courses You Can Play.",
      },
      {
        q: "Can you book Pebble Beach Resorts\u00ae courses, or just describe them?",
        a: "We can book and name Pebble Beach Golf Links\u00ae, Spyglass Hill Golf Course\u00ae, The Links at Spanish Bay\u00ae, Del Monte Golf Course\u00ae, and The Hay\u2122 as part of a planned trip, as an authorized travel partner.",
      },
      {
        q: "How far in advance can I book a round at a resort course?",
        a: "Without a resort stay, Spyglass Hill can be booked 3 months out, and The Links at Spanish Bay, Del Monte, and The Hay can be booked 6 months out. Pebble Beach Golf Links itself generally requires a 2\u20133 night resort stay to book in advance \u2014 otherwise it\u2019s a 24-hour booking window.",
      },
      {
        q: "What\u2019s the oldest course on the peninsula?",
        a: "Del Monte Golf Course\u00ae, dating to 1897 \u2014 the oldest golf course in continuous operation west of the Mississippi.",
      },
    ],
  },
  {
    category: "Timing & logistics",
    items: [
      // AEO target #5 — "best time to play golf monterey"
      {
        q: "When\u2019s the best time to play golf on the Monterey Peninsula?",
        a: "March through May and September through November \u2014 lightest fog, mildest weather (60\u201370\u00b0F), fewest crowds. June through August brings coastal marine layer that burns off by 10am; schedule tee times after 9:30am for clear skies from the first hole. August adds Car Week congestion and hotel rate spikes. December through February is cheapest with occasional rain but often excellent conditions.",
      },
      {
        q: "Should I avoid August?",
        a: "If Car Week and the Concours d\u2019Elegance aren\u2019t part of the appeal, yes \u2014 Bayonet and Black Horse close for several days in mid-August, and hotel rates spike well above normal during the event.",
      },
      {
        q: "How do I get to the Monterey Peninsula?",
        a: "Monterey Regional Airport (MRY) is about 10 minutes from most courses, with direct flights from LAX, SFO, PHX, DEN, DFW, SAN, and SEA. San Jose (SJC) is about 1hr 15min; San Francisco (SFO) is about 1hr 55min.",
      },
      {
        q: "Is Carmel Valley warmer than the coast?",
        a: "Yes \u2014 its inland location sits outside the coastal marine layer, so it\u2019s often clear and 15\u201318\u00b0F warmer even when Monterey and Pacific Grove are fogged in.",
      },
    ],
  },
  {
    category: "Lodging & travel",
    items: [
      {
        q: "How many hotels do you feature?",
        a: "9 verified properties, from golf-anchor resorts like Hyatt Regency Monterey and Carmel Valley Ranch to boutique stays like Casa Munras and L\u2019Auberge Carmel.",
      },
      {
        q: "Can you help with corporate golf groups?",
        a: "Yes. We handle corporate groups from 8 to 300 players \u2014 tee sheet blocks, hotel room blocks, ground transport, shotgun start coordination, and a single contract covering everything. Courses we frequently use for corporate events include Carmel Valley Ranch, TPC Monterey at Pasadera, Poppy Hills, and Bayonet.",
      },
      {
        q: "Can you help arrange ground transportation?",
        a: "Yes \u2014 the quote form includes an option to have us arrange airport transfers and transport between courses and hotels as part of your trip.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <section className="border-b border-[#e3ddcf] bg-stone px-6 py-16 md:px-14 md:py-24">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
            Questions
          </div>
          <h2 className="text-display-md mt-2.5 font-display font-bold text-ink">
            Frequently asked
          </h2>
        </div>
      </Reveal>

      <div className="space-y-12 md:space-y-16">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.category} className="grid grid-cols-1 gap-6 md:grid-cols-[0.4fr_1fr] md:gap-16">
            <div className="flex flex-col gap-4 md:block">
              <div className="relative h-40 w-full overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,.22)] sm:h-44 md:h-48 md:w-48 md:rounded-full">
                {CATEGORY_ICONS[cat.category] && (
                  <Image
                    src={CATEGORY_ICONS[cat.category]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center text-center"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%)" }}
                >
                  <span className="px-4 font-ui text-[15px] font-bold uppercase leading-tight tracking-[.04em] text-white sm:text-[18px] md:text-[20px]">
                    {cat.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {cat.items.map((f, i) => (
                <details
                  key={f.q}
                  className={`group py-4 ${i < cat.items.length - 2 ? "border-b border-[#ddd6c2]" : ""} ${
                    i % 2 === 0 ? "sm:pr-8" : ""
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-ui text-[15px] font-semibold italic leading-snug text-ink">
                    {f.q}
                    <span className="flex-none font-display text-xl leading-none text-gold group-open:hidden">+</span>
                    <span className="hidden flex-none font-display text-xl leading-none text-gold group-open:inline">
                      &minus;
                    </span>
                  </summary>
                  {/* faq-answer class = speakable target for AI crawlers */}
                  <p className="faq-answer mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
