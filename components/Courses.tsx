import Link from "next/link";
import Image from "next/image";
import { COURSES } from "@/lib/courses";
import Reveal from "./Reveal";

const FEATURED_SLUG = "bayonet";
const GRID_SLUGS = ["pacific-grove-golf-links", "carmel-valley-ranch", "poppy-hills"];

export default function Courses() {
  const featured = COURSES.find((c) => c.slug === FEATURED_SLUG)!;
  const gridCourses = GRID_SLUGS.map((slug) => COURSES.find((c) => c.slug === slug)!);

  return (
    <section className="border-b border-[#e3ddcf] px-6 py-16 md:px-14 md:py-24">
      <Reveal>
        <div className="mb-8 flex items-end justify-between md:mb-10">
          <div>
            <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
              The courses
            </div>
            <h2 className="text-display-md mt-2.5 font-display font-bold text-ink">
              Featured courses
            </h2>
          </div>
          <Link
            href="/golf-courses/"
            className="hidden whitespace-nowrap font-ui text-[15px] font-semibold text-ocean hover:text-ocean-dark md:inline"
          >
            View all courses &rarr;
          </Link>
        </div>
      </Reveal>

      <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
        <Link
          href={`/golf-courses/${featured.slug}/`}
          className="group relative flex h-[320px] flex-col justify-end overflow-hidden rounded-[13px] shadow-[0_6px_20px_rgba(37,35,33,.14)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(37,35,33,.24)] md:h-[420px] md:flex-[1.6]"
        >
          {featured.image && (
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,21,18,.92) 0%, rgba(15,21,18,.5) 50%, rgba(15,21,18,.08) 100%)",
            }}
          />
          <div className="relative z-10 p-6">
            <span className="inline-block rounded-full bg-[rgba(255,255,255,.15)] px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-cream backdrop-blur-sm">
              {featured.type}
            </span>
            <div className="mt-3 font-display text-2xl font-bold text-cream md:text-[30px]">
              {featured.name}
            </div>
            <div className="mt-2 font-body text-[15px] text-[rgba(250,246,238,.85)]">
              {featured.city} &middot; Par {featured.par} &middot; {featured.yards}
            </div>
            <p className="mt-3 max-w-[420px] font-body text-sm leading-relaxed text-[rgba(250,246,238,.85)]">
              {featured.hook}
            </p>
            <div className="mt-4 font-ui text-[15px] font-semibold text-[#e8b8be]">
              View course &rarr;
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:flex-[2.4]">
          {gridCourses.map((c) => (
            <Link
              key={c.slug}
              href={`/golf-courses/${c.slug}/`}
              className="group relative flex h-[200px] flex-col justify-end overflow-hidden rounded-xl shadow-[0_3px_11px_rgba(37,35,33,.1)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(37,35,33,.2)] md:h-auto"
            >
              {c.image && (
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 20vw"
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,21,18,.9) 0%, rgba(15,21,18,.45) 55%, rgba(15,21,18,.05) 100%)",
                }}
              />
              <div className="relative z-10 p-5">
                <span className="inline-block rounded-full bg-[rgba(255,255,255,.15)] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-cream backdrop-blur-sm">
                  {c.type}
                </span>
                <div className="mt-2 font-display text-lg font-bold text-cream">{c.name}</div>
                <div className="mt-1 font-body text-[13px] text-[rgba(250,246,238,.85)]">
                  Par {c.par} &middot; {c.yards}
                </div>
                <div className="mt-2.5 font-ui text-sm font-semibold text-[#e8b8be]">
                  View course &rarr;
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/golf-courses/"
        className="mt-6 block font-ui text-[15px] font-semibold text-ocean hover:text-ocean-dark md:hidden"
      >
        View all courses &rarr;
      </Link>
    </section>
  );
}
