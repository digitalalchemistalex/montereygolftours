import Reveal from "./Reveal";

function showCarWeekWarning() {
  const month = new Date().getMonth(); // 0-indexed
  return month === 6 || month === 7; // July or August
}

export default function LocalIntel() {
  const showCarWeek = showCarWeekWarning();

  return (
    <section className="border-b border-[#e3ddcf] px-6 py-16 md:px-14 md:py-24">
      <Reveal>
        <div className="mb-10 max-w-[560px] md:mb-14">
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
            Local intelligence
          </div>
          <h2 className="text-display-md mt-2.5 font-display font-bold text-ink">
            Things a brochure won&apos;t tell you
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <div className="text-stat-lg font-display font-extrabold leading-none text-ocean">
            9&ndash;10<span className="text-3xl align-top">AM</span>
          </div>
          <p className="pull-quote mt-3 text-lg text-ink">
            &ldquo;when the coastal fog usually clears&rdquo;
          </p>
          <p className="mt-4 font-body text-[14px] leading-relaxed text-[#5a564e]">
            Bayonet, Black Horse, and Pacific Grove fog in most mornings from May
            through August. Book tee times for 9:30am or later if you want clear skies
            from the first hole.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <div className="font-ui text-sm font-bold uppercase tracking-[.06em] text-ocean-dark">
              Carmel Valley is warmer
            </div>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-[#5a564e]">
              Carmel Valley Ranch and Quail Lodge sit inland, running 15&ndash;18&deg;F
              warmer and often clear even when the coast is socked in.
            </p>
          </div>
          <div>
            <div className="font-ui text-sm font-bold uppercase tracking-[.06em] text-ocean-dark">
              Getting here
            </div>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-[#5a564e]">
              Monterey Regional Airport (MRY) is 10&ndash;20 minutes from most courses,
              with year-round nonstop service from LAX, SFO, PHX, DEN, DFW, SAN, and SEA.
            </p>
          </div>
          <div>
            <div className="font-ui text-sm font-bold uppercase tracking-[.06em] text-ocean-dark">
              Best season
            </div>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-[#5a564e]">
              March&ndash;May and September&ndash;November bring the lightest fog and
              mildest weather of the year.
            </p>
          </div>
          <div>
            <div className="font-ui text-sm font-bold uppercase tracking-[.06em] text-ocean-dark">
              Alternate airports
            </div>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-[#5a564e]">
              San Jose (SJC) is about 1h 15m by car; San Francisco (SFO) is about 1h 55m.
            </p>
          </div>
        </div>
      </div>

      {showCarWeek && (
        <div className="mt-10 rounded-2xl border-2 border-gold bg-[#fdf3f1] p-6 md:mt-14">
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
