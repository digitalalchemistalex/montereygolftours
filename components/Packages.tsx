import Link from "next/link";
import Reveal from "./Reveal";

const PACKAGES = [
  {
    label: "Weekend",
    days: "3 days",
    rounds: "2 rounds",
    from: 564,
    to: 1740,
    badge: null,
  },
  {
    label: "Classic Peninsula",
    days: "4 days",
    rounds: "3 rounds",
    from: 949,
    to: 2340,
    badge: "Most booked",
  },
  {
    label: "Full Peninsula",
    days: "5 days",
    rounds: "4–5 rounds",
    from: 1264,
    to: 2915,
    badge: null,
  },
];

export default function Packages() {
  return (
    <section className="relative overflow-hidden border-b border-[#e3ddcf] bg-gradient-to-br from-ocean to-ocean-dark px-6 py-16 md:px-14 md:py-24">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold opacity-[0.12] md:h-96 md:w-96"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-cream opacity-[0.06]"
        aria-hidden="true"
      />

      <Reveal>
        <div className="relative z-10 mb-9 max-w-[600px]">
          <span className="inline-block rounded-full bg-gold px-4 py-1.5 font-ui text-xs font-bold uppercase tracking-[.1em] text-ink">
            Real pricing, no surprises
          </span>
          <h2 className="mt-4 text-display-md font-display font-bold text-cream">
            Trip packages, priced from real Monterey rounds
          </h2>
          <p className="mt-3 font-body text-[15px] leading-relaxed text-[rgba(250,246,238,.85)] md:text-base">
            Every range below is built from actual course and hotel rates — not placeholder
            numbers. Final pricing depends on which courses and nights you pick.
          </p>
        </div>
      </Reveal>

      <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {PACKAGES.map((p) => (
          <div
            key={p.label}
            className={`flex flex-col justify-between rounded-2xl bg-cream p-6 shadow-[0_10px_30px_rgba(0,0,0,.18)] transition-transform duration-150 hover:-translate-y-1.5 ${
              p.badge ? "ring-2 ring-gold md:scale-[1.04]" : ""
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-ui text-[11px] font-bold uppercase tracking-[.08em] text-ocean-dark">
                  {p.days} &middot; {p.rounds}
                </span>
                {p.badge && (
                  <span className="rounded-full bg-gold px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-[.05em] text-ink">
                    {p.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 font-display text-2xl font-bold text-ink">{p.label}</div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-ui text-sm text-[#6a665e]">from</span>
                <span className="font-display text-3xl font-bold text-ocean-dark">
                  ${p.from.toLocaleString()}
                </span>
                <span className="font-ui text-sm text-[#6a665e]">/person</span>
              </div>
              <div className="mt-1 font-body text-[13px] text-[#8a857a]">
                up to ${p.to.toLocaleString()} for premium courses and hotels
              </div>
            </div>
            <Link
              href="/quote/"
              className="mt-6 inline-flex items-center justify-center rounded-[9px] bg-ocean px-5 py-3 font-ui text-sm font-semibold text-cream hover:bg-ocean-dark"
            >
              Build this trip &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
