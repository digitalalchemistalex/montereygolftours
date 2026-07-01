import Link from "next/link";

const STEPS = [
  { n: "01", label: "Group size", detail: "2 to 300 players" },
  { n: "02", label: "Skill level", detail: "Beginner to scratch" },
  { n: "03", label: "Dates", detail: "Flexible or fixed" },
  { n: "04", label: "Budget", detail: "Value to premium" },
];

export default function Configurator() {
  return (
    <section className="border-b border-[#eceae1] bg-stone px-6 py-16 md:px-14 md:py-24">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_1.4fr] md:gap-16">
        <div>
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-ocean-dark">
            Get started
          </div>
          <h2 className="text-display-md mt-3 font-display font-bold text-ink">
            Four questions.
            <br />
            One trip, built for you.
          </h2>
          <p className="mt-4 max-w-[380px] font-body text-[15px] leading-relaxed text-[#6a6a62]">
            No obligation, no generic packages — just tell us who&apos;s playing and
            we&apos;ll shape the rest.
          </p>
          <Link
            href="/quote/"
            className="mt-7 inline-flex items-center gap-2 rounded-[9px] bg-ocean px-7 py-4 font-ui text-base font-semibold text-white shadow-[0_5px_16px_rgba(31,79,102,.35)] transition-transform hover:-translate-y-0.5 hover:bg-ocean-dark"
          >
            Build my custom trip &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`py-6 ${i % 2 === 0 ? "sm:pr-8" : "sm:pl-8"} ${
                i < 2 ? "border-b border-[#ddd6c2]" : ""
              } ${i % 2 === 0 ? "sm:border-r sm:border-[#ddd6c2]" : ""}`}
            >
              <div className="font-display text-4xl font-bold leading-none text-gold">
                {s.n}
              </div>
              <div className="mt-3 font-ui text-lg font-semibold text-ink">{s.label}</div>
              <div className="mt-1 font-body text-sm text-[#8a857a]">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
