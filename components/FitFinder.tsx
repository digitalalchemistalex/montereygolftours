import Image from "next/image";

const FIT_PROFILES = [
  {
    title: "Challenge seekers",
    blurb: "Tournament tees, firm greens, bucket-list tracks.",
    img: "https://images.unsplash.com/photo-1606443192517-919653213206?auto=format&fit=crop&w=900&q=72",
  },
  {
    title: "Beginners",
    blurb: "Forgiving layouts, relaxed pace, room to learn.",
    img: "https://images.unsplash.com/photo-1622482594949-a2ea0c800edd?auto=format&fit=crop&w=900&q=72",
  },
  {
    title: "Mixed groups",
    blurb: "A balance of difficulty so every level enjoys it.",
    img: "https://images.unsplash.com/photo-1592937238247-cd0090e02f65?auto=format&fit=crop&w=900&q=72",
  },
  {
    title: "Budget conscious",
    blurb: "Great value rounds without losing the views.",
    img: "https://images.unsplash.com/photo-1582528979903-bee578216a69?auto=format&fit=crop&w=900&q=72",
  },
];

export default function FitFinder() {
  return (
    <section className="border-b border-[#eceae1] px-6 py-16 md:px-14 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-12">
        <div className="max-w-[520px]">
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
            Find your fit
          </div>
          <h2 className="text-display-md mt-2.5 font-display font-bold text-ink">
            Which course fits your group?
          </h2>
        </div>
        <p className="max-w-[280px] font-body text-[15px] leading-relaxed text-[#6a6a62]">
          Pick the profile that matches your foursome — we&apos;ll match the courses.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {FIT_PROFILES.map((f) => (
          <div
            key={f.title}
            className="group relative h-[220px] cursor-pointer overflow-hidden rounded-2xl shadow-[0_5px_16px_rgba(30,40,38,.16)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(30,40,38,.3)] md:h-[300px]"
          >
            <Image
              src={f.img}
              alt={f.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,21,18,.93) 0%, rgba(15,21,18,.52) 44%, rgba(15,21,18,.14) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <div
                className="font-display text-lg font-bold leading-[1.05] text-white md:text-[25px]"
                style={{ textShadow: "0 1px 14px rgba(0,0,0,.5)" }}
              >
                {f.title}
              </div>
              <div className="mt-1.5 hidden font-body text-[13.5px] leading-relaxed text-[rgba(255,255,255,.88)] md:block">
                {f.blurb}
              </div>
              <div className="mt-2.5 font-ui text-xs font-semibold text-[#f0b4bc] md:text-[13px]">
                Match my group &rarr;
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
