import Link from "next/link";

const STEPS = [
  { n: 1, label: "Group size" },
  { n: 2, label: "Skill level" },
  { n: 3, label: "Dates" },
  { n: 4, label: "Budget" },
];

export default function Configurator() {
  return (
    <section className="border-b border-[#eceae1] bg-[#f4f0e7] px-6 py-12 md:px-14 md:py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-7">
        <div className="min-w-[280px] flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-2xl font-bold text-[#1e2826] md:text-[32px]">
              Build your custom trip in 4 steps
            </h2>
          </div>
          <p className="mt-2 font-body text-sm text-[#6a6a62] md:text-[15px]">
            Answer four quick questions and we&apos;ll shape a trip around your group — no
            obligation.
          </p>
        </div>
        <Link
          href="/quote/"
          className="whitespace-nowrap rounded-[8px] bg-cypress px-7 py-4 font-ui text-base font-semibold text-white shadow-[0_5px_16px_rgba(20,35,25,.4)] hover:bg-[#26392c]"
        >
          Build my custom trip &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="flex items-center gap-4 rounded-[11px] border border-[#e7e2d6] bg-white p-5 shadow-[0_2px_8px_rgba(30,40,38,.07)]"
          >
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-cypress font-ui text-base font-semibold text-white">
              {s.n}
            </div>
            <div className="font-ui text-[15px] font-semibold text-[#1e2826]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
