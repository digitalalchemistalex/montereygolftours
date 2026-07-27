import Image from "next/image";
import Reveal from "./Reveal";

export type FAQItem = { q: string; a: string };
export type FAQCategory = { category: string; items: FAQItem[] };

const CATEGORY_ICONS: Record<string, string> = {
  "Trip planning": "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513?auto=format&fit=crop&w=400&q=85",
  "Pebble Beach & courses": "https://images.unsplash.com/photo-1538648759472-7251f7cb2c2f?auto=format&fit=crop&w=400&q=85",
  "Timing & logistics": "https://images.unsplash.com/photo-1502770513380-138d6d3a51dd?auto=format&fit=crop&w=400&q=85",
  "Lodging & travel": "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=85",
};

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    category: "Trip planning",
    items: [
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
        q: "What is 'Combat Corner' at Bayonet?",
        a: "Combat Corner is the nickname for holes 11–15 at Bayonet, with hole 15 at the heart of the stretch. It's where the course turns most demanding — long, exposed holes with prevailing wind and little margin for error. Plan your best golf for here, and book an 8–10am tee time to have the best conditions before afternoon wind picks up.",
      },
      {
        q: "What's the pace of play at Bayonet?",
        a: "Approximately 4 hours 30 minutes for a standard group. For larger groups of 12+, an 8–10am tee time is industry-standard to ensure a full round without pace-of-play pressure.",
      },
      {
        q: "Do you sell single tee times, or only full trips?",
        a: "Full trips only — we don't offer standalone single-round bookings. Every quote covers courses, lodging, and logistics planned together.",
      },
      {
        q: "Are flights and meals included?",
        a: "Not by default. Pricing covers golf and lodging; flights and meals can be arranged separately if you'd like us to include them in your quote.",
      },
    ],
  },
  {
    category: "Pebble Beach & courses",
    items: [
      {
        q: "Can you book Pebble Beach Resorts® courses, or just describe them?",
        a: "We can book and name Pebble Beach Golf Links®, Spyglass Hill Golf Course®, The Links at Spanish Bay®, Del Monte Golf Course®, and The Hay™ as part of a planned trip, as an authorized travel partner.",
      },
      {
        q: "How far in advance can I book a Pebble Beach round?",
        a: "It depends on the course and whether you're staying on-property. Without a resort stay, Spyglass Hill can be booked 3 months out, and The Links at Spanish Bay, Del Monte, and The Hay can be booked 6 months out. Pebble Beach Golf Links itself generally requires a 2–3 night resort stay to book in advance — otherwise it's a 24-hour booking window.",
      },
      {
        q: "What's the oldest course on the peninsula?",
        a: "Del Monte Golf Course®, dating to 1897 — the oldest golf course in continuous operation west of the Mississippi.",
      },
      {
        q: "How many courses do you feature in total?",
        a: "14 courses across the peninsula, from accessible daily-fee options like Pacific Grove Golf Links to championship-caliber rounds like Bayonet and the full Pebble Beach Resorts® portfolio.",
      },
    ],
  },
  {
    category: "Timing & logistics",
    items: [
      {
        q: "When's the best time to play the Monterey Peninsula?",
        a: "March through May and September through November tend to have the lightest fog and mildest weather. Coastal courses fog in until 9–10am from May through August, so plan tee times for 9:30am or later if you want clear skies from the first hole.",
      },
      {
        q: "Should I avoid August?",
        a: "If Car Week and the Concours d'Elegance aren't part of the appeal, yes — Bayonet and Black Horse close for several days in mid-August, and hotel rates spike well above normal during the event.",
      },
      {
        q: "How do I get to the Monterey Peninsula?",
        a: "Monterey Regional Airport (MRY) is about 10 minutes from most courses, with direct flights from LAX, SFO, PHX, DEN, DFW, SAN, and SEA. San Jose (SJC) is about 1hr 15min; San Francisco (SFO) is about 1hr 55min if you're flying into one of those instead.",
      },
      {
        q: "Is Carmel Valley warmer than the coast?",
        a: "Yes — its inland location sits outside the coastal marine layer, so it's often clear and 15–18°F warmer even when Monterey and Pacific Grove are fogged in.",
      },
    ],
  },
  {
    category: "Lodging & travel",
    items: [
      {
        q: "How many hotels do you feature?",
        a: "9 verified properties, from golf-anchor resorts like Hyatt Regency Monterey and Carmel Valley Ranch to boutique village stays like L'Auberge Carmel.",
      },
      {
        q: "Can you help arrange ground transportation?",
        a: "Yes — the quote form includes an option to have us arrange airport transfers and transport between courses and hotels as part of your trip.",
      },
      {
        q: "What's included in a room at your featured hotels?",
        a: "It varies by property — some, like Carmel Valley Ranch, are all-suite with fireplaces and private decks; others are standard resort rooms. Each hotel's page lists its specific room features.",
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
                  <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
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
