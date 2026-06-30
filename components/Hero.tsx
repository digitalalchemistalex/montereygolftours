import Link from "next/link";
import Image from "next/image";
import Header from "./Header";

const STATS = [
  { n: "8", l: "Courses on tap" },
  { n: "9", l: "Properties to stay" },
  { n: "1954", l: "Year Bayonet opened" },
  { n: "1897", l: "Oldest course on the peninsula" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[640px] flex-col overflow-hidden bg-[#19231e] md:min-h-[840px]">
      <Image
        src="https://images.unsplash.com/photo-1500932334442-8761ee4810a7?auto=format&fit=crop&w=1920&q=80"
        alt="Golf course fairway on the Monterey Peninsula in morning light"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: "center 50%" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,26,20,.13) 0%, rgba(18,26,20,.13) 26%, rgba(18,26,20,.40) 64%, rgba(18,26,20,.46) 100%)",
        }}
      />

      <Header />

      <div className="relative z-10 mt-auto max-w-[820px] px-6 pb-8 md:px-14 md:pb-7">
        <h1
          className="font-display text-[42px] font-extrabold leading-[1.05] text-[#f5f1e6] md:text-[72px] md:leading-[1.0]"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,.34)" }}
        >
          Plan your perfect round on{" "}
          <span className="text-[#cda14f]">the Monterey Peninsula</span>
        </h1>
        <p className="mt-5 max-w-[600px] font-body text-base leading-relaxed text-[rgba(246,242,231,.88)] md:mt-6 md:text-xl">
          Private group golf trips to California&apos;s most storied coastline — we handle courses,
          tee times, lodging, and transport end to end.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 md:mt-8">
          <Link
            href="/quote/"
            className="inline-flex items-center gap-2 rounded-[9px] bg-cypress px-7 py-4 font-ui text-base font-semibold text-white shadow-[0_6px_18px_rgba(20,35,25,.45)] hover:bg-[#26392c]"
          >
            Get a Custom Quote &rarr;
          </Link>
          <Link
            href="/itineraries/"
            className="inline-flex items-center rounded-[9px] border-[1.5px] border-[rgba(246,242,231,.5)] bg-[rgba(20,30,24,.25)] px-7 py-4 font-ui text-base font-semibold text-[#f3e8d1] backdrop-blur-[2px] hover:border-[#cda150] hover:bg-[rgba(184,141,66,.18)]"
          >
            See Sample Itineraries
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-6 flex max-w-[920px] border-t border-[rgba(246,242,231,.24)] px-0 py-6 md:mx-14 md:py-7">
        {STATS.map((s) => (
          <div key={s.l} className="flex-1">
            <div className="font-display text-2xl font-extrabold leading-none text-[#dbb466] md:text-[42px]">
              {s.n}
            </div>
            <div className="mt-2 font-ui text-[11px] font-medium uppercase tracking-[.06em] text-[rgba(246,242,231,.8)] md:text-xs">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
