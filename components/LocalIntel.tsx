function showCarWeekWarning() {
  const month = new Date().getMonth(); // 0-indexed
  return month === 6 || month === 7; // July or August
}

export default function LocalIntel() {
  const showCarWeek = showCarWeekWarning();

  return (
    <section className="border-b border-[#e3ddcf] px-6 py-12 md:px-14 md:py-14">
      <div className="mb-8">
        <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
          Local intelligence
        </div>
        <h2 className="mt-1 font-display text-3xl font-bold leading-none text-ink md:text-[40px]">
          Things a brochure won&apos;t tell you
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#e3ddcf] bg-[#f4f0e7] p-6">
          <div className="font-display text-lg font-bold text-ink">About the marine layer</div>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
            Coastal courses (Bayonet, Black Horse, Pacific Grove) fog in until 9&ndash;10am
            most mornings from May through August. It burns off. Plan tee times for 9:30am+
            if you want clear skies from the first hole.
          </p>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
            Carmel Valley courses (Carmel Valley Ranch, Quail Lodge) sit inland and run
            15&ndash;18&deg;F warmer, often clear even when the coast is socked in &mdash;
            a good call for early rounds.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3ddcf] bg-[#f4f0e7] p-6">
          <div className="font-display text-lg font-bold text-ink">Getting to Monterey</div>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
            Monterey Regional Airport (MRY) is close to most courses &mdash; typically a
            10&ndash;20 minute drive. Year-round nonstop service runs from LAX, SFO, PHX,
            DEN, DFW, SAN, and SEA, with seasonal summer routes from LAS, BUR, ORD, and SNA.
          </p>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
            If MRY doesn&apos;t fit your schedule, San Jose (SJC) is about 1h 15m by car,
            and San Francisco (SFO) is about 1h 55m.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3ddcf] bg-[#f4f0e7] p-6">
          <div className="font-display text-lg font-bold text-ink">Best tee times</div>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
            Coastal rounds: book 9:30am or later to avoid morning fog. Carmel Valley
            rounds: 8&ndash;9am works fine since the inland warmth clears earlier.
          </p>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-[#5a564e]">
            Best overall conditions on the peninsula run March&ndash;May and
            September&ndash;November &mdash; the lightest fog and mildest weather of the
            year.
          </p>
        </div>
      </div>

      {showCarWeek && (
        <div className="mt-5 rounded-2xl border-2 border-gold bg-[#fdf3f1] p-6">
          <div className="font-display text-lg font-bold text-[#a85561]">
            August in Monterey &mdash; read before booking
          </div>
          <p className="mt-3 max-w-[760px] font-body text-[14px] leading-relaxed text-[#5a564e]">
            The Concours d&apos;Elegance and Car Week (mid-August) close Bayonet and Black
            Horse for several days and bring a wave of visitors to the peninsula. Hotel
            rates spike well above normal. Unless Car Week itself is part of the appeal,
            we&apos;d steer your group toward a different week.
          </p>
        </div>
      )}
    </section>
  );
}
