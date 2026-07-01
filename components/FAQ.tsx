export type FAQItem = { q: string; a: string };
export type FAQCategory = { category: string; items: FAQItem[] };

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
    ],
  },
];

export default function FAQ() {
  return (
    <section className="border-b border-[#e3ddcf] bg-stone px-6 py-16 md:px-14 md:py-24">
      <div className="mb-12 md:mb-16">
        <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
          Questions
        </div>
        <h2 className="text-display-md mt-2.5 font-display font-bold text-ink">
          Frequently asked
        </h2>
      </div>

      <div className="space-y-12 md:space-y-16">
        {FAQ_CATEGORIES.map((cat) => (
          <div key={cat.category} className="grid grid-cols-1 gap-6 md:grid-cols-[0.35fr_1fr] md:gap-16">
            <div className="font-ui text-sm font-bold uppercase tracking-[.08em] text-ocean-dark">
              {cat.category}
            </div>
            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {cat.items.map((f, i) => (
                <details
                  key={f.q}
                  className={`group py-4 ${i < cat.items.length - 2 ? "border-b border-[#ddd6c2]" : ""} ${
                    i % 2 === 0 ? "sm:pr-8" : ""
                  }`}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-ui text-[15px] font-semibold leading-snug text-ink">
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
