import Link from "next/link";
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

const MEGA_MENUS = [
  {
    label: "Courses",
    href: "/golf-courses/",
    items: COURSES.slice(0, 8).map((c) => ({ label: c.name, href: `/golf-courses/${c.slug}/` })),
  },
  {
    label: "Hotels",
    href: "/hotels/",
    items: HOTELS.map((h) => ({ label: h.name, href: `/hotels/${h.slug}/` })),
  },
  {
    label: "Destinations",
    href: "/destinations/",
    items: Object.values(DESTINATIONS).map((d) => ({ label: d.name, href: `/destinations/${d.slug}/` })),
  },
  {
    label: "Itineraries",
    href: "/itineraries/",
    items: Object.values(ITINERARIES).map((t) => ({ label: t.title, href: `/itineraries/${t.slug}/` })),
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
            <div className="pointer-events-none absolute left-1/2 top-full w-[240px] -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="max-h-[380px] overflow-y-auto rounded-xl border border-[#e3ddcf] bg-white p-2 shadow-[0_16px_36px_rgba(30,40,38,.22)]">
                {menu.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 font-ui text-[13.5px] text-ink hover:bg-[#f4f0e7]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={menu.href}
                  className="mt-1 block rounded-lg px-3 py-2 font-ui text-[13.5px] font-semibold text-ocean hover:bg-[#f4f0e7]"
                >
                  View all &rarr;
                </Link>
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
