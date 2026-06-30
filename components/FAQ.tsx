const FAQS = [
  {
    q: "How many people can you plan a trip for?",
    a: "Any group size, really — from a twosome up to 300 players. There's no minimum beyond avoiding a solo trip of one.",
  },
  {
    q: "Can you book Pebble Beach Resorts® courses, or just describe them?",
    a: "We can book and name Pebble Beach Golf Links®, Spyglass Hill Golf Course®, The Links at Spanish Bay®, Del Monte Golf Course™, and The Hay™ as part of a planned trip, as an authorized travel partner.",
  },
  {
    q: "When's the best time to play the Monterey Peninsula?",
    a: "March through May and September through November tend to have the lightest fog and mildest weather. Coastal courses fog in until 9–10am from May through August, so plan tee times for 9:30am or later if you want clear skies from the first hole.",
  },
  {
    q: "Should I avoid August?",
    a: "If Car Week and the Concours d'Elegance aren't part of the appeal, yes — Bayonet and Black Horse close for several days in mid-August, and hotel rates spike well above normal during the event.",
  },
  {
    q: "How does the quote process work?",
    a: "Tell us your group size, dates, and budget through the quote form, and we'll put together a custom trip — courses, lodging, and a price range — within 24 hours.",
  },
  {
    q: "Do you handle lodging as well as golf?",
    a: "Yes. We work with 9 verified properties across the peninsula, from golf-anchor resorts with on-site courses to boutique village stays, and can pair the right one with your course lineup.",
  },
];

export default function FAQ() {
  return (
    <section className="border-b border-[#e3ddcf] bg-[#f4f0e7] px-6 py-12 md:px-14 md:py-14">
      <div className="mb-8 max-w-[600px]">
        <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
          Questions
        </div>
        <h2 className="mt-1 font-display text-3xl font-bold leading-[1.1] text-ink md:text-[40px]">
          Frequently asked questions
        </h2>
      </div>

      <div className="max-w-[820px] divide-y divide-[#e4e0d6] border-t border-[#e4e0d6]">
        {FAQS.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink md:text-lg">
              {f.q}
              <span className="flex-none font-ui text-2xl text-gold group-open:hidden">+</span>
              <span className="hidden flex-none font-ui text-2xl text-gold group-open:inline">
                &minus;
              </span>
            </summary>
            <p className="mt-3 max-w-[720px] font-body text-[15px] leading-relaxed text-[#5a564e]">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
