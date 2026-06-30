import Link from "next/link";
import Image from "next/image";
import { COURSES } from "@/lib/courses";

const FEATURED_SLUG = "bayonet";
const GRID_SLUGS = ["pacific-grove-golf-links", "carmel-valley-ranch", "poppy-hills"];

export default function Courses() {
  const featured = COURSES.find((c) => c.slug === FEATURED_SLUG)!;
  const gridCourses = GRID_SLUGS.map((slug) => COURSES.find((c) => c.slug === slug)!);

  return (
    <section className="border-b border-[#e3ddcf] px-6 py-12 md:px-14 md:py-[54px]">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="font-ui text-[13px] font-bold uppercase tracking-[.14em] text-gold">
            The courses
          </div>
          <h2 className="font-display text-3xl font-bold leading-none text-ink md:text-[40px]">
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

      <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
        <Link
          href={`/golf-courses/${featured.slug}/`}
          className="group flex flex-col overflow-hidden rounded-[13px] border border-[#e3ddcf] bg-white shadow-[0_6px_20px_rgba(37,35,33,.08)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(37,35,33,.14)] md:flex-[1.6]"
        >
          {featured.image && (
            <div className="relative h-[180px] w-full overflow-hidden md:h-[220px]">
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <span className="inline-block rounded-full bg-[#fbecee] px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-[#a85561]">
                {featured.type}
              </span>
              <div className="mt-4 font-display text-2xl font-bold text-ink md:text-[28px]">
                {featured.name}
              </div>
              <div className="mt-2 font-body text-[15px] text-[#6a665e]">
                {featured.city} &middot; Par {featured.par} &middot; {featured.yards}
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-[#5a564e]">
                {featured.hook}
              </p>
            </div>
            <div className="mt-4 font-ui text-[15px] font-semibold text-ocean">View course &rarr;</div>
          </div>
        </Link>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:flex-[2.4]">
          {gridCourses.map((c) => (
            <Link
              key={c.slug}
              href={`/golf-courses/${c.slug}/`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#e3ddcf] bg-white shadow-[0_3px_11px_rgba(37,35,33,.06)] transition-transform duration-150 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(37,35,33,.12)]"
            >
              {c.image && (
                <div className="relative h-[120px] w-full overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 20vw"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="inline-block rounded-full bg-[#e7f0f3] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-ocean-dark">
                    {c.type}
                  </span>
                  <div className="mt-3 font-display text-lg font-bold text-ink">{c.name}</div>
                  <div className="mt-1.5 font-body text-[13px] text-[#6a665e]">
                    Par {c.par} &middot; {c.yards}
                  </div>
                </div>
                <div className="mt-3 font-ui text-sm font-semibold text-ocean">View course &rarr;</div>
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
