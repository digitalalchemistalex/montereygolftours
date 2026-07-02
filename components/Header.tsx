import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { COURSES } from "@/lib/courses";
import { HOTELS } from "@/lib/hotels";
import { DESTINATIONS } from "@/lib/destinations";
import { ITINERARIES } from "@/lib/itineraries";
import MobileNav from "./MobileNav";

const SIMPLE_LINKS = [
  { label: "Packages", href: "/packages/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
];

const featuredCourse = COURSES.find((c) => c.slug === "bayonet")!;
const featuredHotel = HOTELS.find((h) => h.slug === "hyatt-regency-monterey")!;
const featuredDestination = DESTINATIONS["monterey"];
const featuredItinerary = ITINERARIES["4-day-monterey-peninsula-golf-trip"];

const MEGA_MENUS = [
  {
    label: "Courses",
    href: "/golf-courses/",
    eyebrow: "14 courses",
    featured: {
      name: featuredCourse.name,
      href: `/golf-courses/${featuredCourse.slug}/`,
      image: featuredCourse.image!,
      blurb: featuredCourse.hook,
    },
    items: COURSES.filter((c) => c.slug !== "bayonet")
      .slice(0, 7)
      .map((c) => ({ label: c.name, sub: c.city, href: `/golf-courses/${c.slug}/` })),
  },
  {
    label: "Hotels",
    href: "/hotels/",
    eyebrow: "9 properties",
    featured: {
      name: featuredHotel.name,
      href: `/hotels/${featuredHotel.slug}/`,
      image: featuredHotel.image,
      blurb: featuredHotel.description,
    },
    items: HOTELS.filter((h) => h.slug !== "hyatt-regency-monterey").map((h) => ({
      label: h.name,
      sub: h.city,
      href: `/hotels/${h.slug}/`,
    })),
  },
  {
    label: "Destinations",
    href: "/destinations/",
    eyebrow: "6 areas",
    featured: {
      name: featuredDestination.name,
      href: `/destinations/${featuredDestination.slug}/`,
      image: featuredDestination.image,
      blurb: featuredDestination.speakable,
    },
    items: Object.values(DESTINATIONS)
      .filter((d) => d.slug !== "monterey")
      .map((d) => ({ label: d.name, sub: null, href: `/destinations/${d.slug}/` })),
  },
  {
    label: "Itineraries",
    href: "/itineraries/",
    eyebrow: "6 sample trips",
    featured: {
      name: featuredItinerary.title,
      href: `/itineraries/${featuredItinerary.slug}/`,
      image: featuredItinerary.image,
      blurb: featuredItinerary.target,
    },
    items: Object.values(ITINERARIES)
      .filter((t) => t.slug !== "4-day-monterey-peninsula-golf-trip")
      .map((t) => ({ label: t.title, sub: `${t.durationDays} days`, href: `/itineraries/${t.slug}/` })),
  },
];

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-7 px-6 py-6 md:px-14">
      <Link href="/" className="flex items-center gap-3 flex-none">
        <span
          className="font-display text-xl font-bold leading-none text-[#f6f2e7]"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,.5)" }}
        >
          Monterey Golf
          <br />
          Tours
        </span>
      </Link>

      <nav className="hidden flex-1 items-center justify-center gap-5 whitespace-nowrap lg:flex">
        {MEGA_MENUS.map((menu) => (
          <div key={menu.href} className="group relative">
            <Link
              href={menu.href}
              className="flex items-center gap-1 py-3 font-ui text-[15px] text-[#f3efe2] hover:text-white"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,.5)" }}
            >
              {menu.label}
              <svg width="10" height="6" viewBox="0 0 10 6" className="mt-[1px] opacity-70">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </Link>

            <div className="pointer-events-none absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 ease-out [transform:translateY(-6px)] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:[transform:translateY(0)]">
              <div className="overflow-hidden rounded-2xl border border-[#e3ddcf] bg-white shadow-[0_24px_60px_rgba(20,25,20,.28)]">
                <div className="grid grid-cols-[0.9fr_1.1fr]">
                  <Link href={menu.featured.href} className="group/f relative block h-full min-h-[260px] overflow-hidden">
                    <Image
                      src={menu.featured.image}
                      alt={menu.featured.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/f:scale-105"
                      sizes="230px"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(15,21,18,.92) 0%, rgba(15,21,18,.4) 55%, rgba(15,21,18,.05) 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="inline-block rounded-full bg-gold px-2.5 py-1 font-ui text-[9.5px] font-bold uppercase tracking-[.06em] text-ink">
                        Featured
                      </span>
                      <div className="mt-2 font-display text-[17px] font-bold leading-snug text-cream">
                        {menu.featured.name}
                      </div>
                      <p className="mt-1 line-clamp-2 font-body text-[12px] leading-snug text-[rgba(250,246,238,.85)]">
                        {menu.featured.blurb}
                      </p>
                    </div>
                  </Link>

                  <div className="flex flex-col p-3">
                    <div className="px-2 pb-2 font-ui text-[10.5px] font-bold uppercase tracking-[.1em] text-[#a8a294]">
                      {menu.eyebrow}
                    </div>
                    <div className="max-h-[220px] flex-1 overflow-y-auto pr-1">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-baseline justify-between gap-2 rounded-lg px-2 py-2 font-ui text-[13.5px] text-ink hover:bg-[#f4f0e7]"
                        >
                          <span>{item.label}</span>
                          {item.sub && (
                            <span className="flex-none font-body text-[11px] text-[#a8a294]">{item.sub}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={menu.href}
                      className="mt-2 block rounded-lg bg-[#f4f0e7] px-3 py-2.5 text-center font-ui text-[13px] font-semibold text-ocean-dark hover:bg-[#ede7d5]"
                    >
                      View all {menu.label.toLowerCase()} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {SIMPLE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-ui text-[15px] text-[#f3efe2] hover:text-white"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,.5)" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 flex-none">
        <a
          href={SITE.phoneHref}
          className="hidden font-ui text-[14.5px] font-semibold text-[#f3efe2] sm:inline"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,.5)" }}
        >
          {SITE.phone}
        </a>
        <Link
          href="/quote/"
          className="hidden rounded-[7px] bg-gold px-5 py-[11px] font-ui text-[15px] font-bold text-ink shadow-[0_3px_11px_rgba(0,0,0,.18)] hover:bg-[#dc8893] lg:inline-block"
        >
          Get a Quote
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
