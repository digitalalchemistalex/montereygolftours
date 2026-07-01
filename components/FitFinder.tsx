import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const FIT_PROFILES = [
  {
    title: "Challenge seekers",
    blurb: "Tournament tees, firm greens, bucket-list tracks.",
    img: "https://images.unsplash.com/photo-1606443192517-919653213206?auto=format&fit=crop&w=600&h=600&fit=crop&q=75",
  },
  {
    title: "Beginners",
    blurb: "Forgiving layouts, relaxed pace, room to learn.",
    img: "https://images.unsplash.com/photo-1622482594949-a2ea0c800edd?auto=format&fit=crop&w=600&h=600&fit=crop&q=75",
  },
  {
    title: "Mixed groups",
    blurb: "A balance of difficulty so every level enjoys it.",
    img: "https://images.unsplash.com/photo-1592937238247-cd0090e02f65?auto=format&fit=crop&w=600&h=600&fit=crop&q=75",
  },
  {
    title: "Budget conscious",
    blurb: "Great value rounds without losing the views.",
    img: "https://images.unsplash.com/photo-1582528979903-bee578216a69?auto=format&fit=crop&w=600&h=600&fit=crop&q=75",
  },
];

export default function FitFinder() {
  return (
    <section className="border-b border-[#eceae1] px-6 py-16 md:px-14 md:py-24">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-14">
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
      </Reveal>

      <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
        {FIT_PROFILES.map((f, i) => (
          <Reveal key={f.title} delay={i * 100}>
            <Link href="/quote/" className="group flex flex-col items-center text-center">
              <div className="relative aspect-square w-full max-w-[260px] overflow-hidden rounded-full shadow-[0_8px_24px_rgba(30,40,38,.18)] transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_36px_rgba(30,40,38,.28)]">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 45vw, 260px"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[rgba(0,0,0,.06)]" />
              </div>
              <div className="mt-5 font-display text-lg font-bold text-ink md:text-xl">
                {f.title}
              </div>
              <div className="mt-1.5 hidden max-w-[170px] font-body text-[13px] leading-relaxed text-[#6a6a62] md:block">
                {f.blurb}
              </div>
              <div className="mt-2.5 font-ui text-xs font-semibold text-ocean group-hover:text-ocean-dark md:text-[13px]">
                Match my group &rarr;
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
