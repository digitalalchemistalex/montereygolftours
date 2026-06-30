import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV_LINKS = [
  { label: "Courses", href: "/golf-courses/" },
  { label: "Hotels", href: "/hotels/" },
  { label: "Destinations", href: "/destinations/" },
  { label: "Itineraries", href: "/itineraries/" },
  { label: "Packages", href: "/packages/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
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

      <nav className="hidden flex-1 items-center justify-center gap-6 whitespace-nowrap lg:flex">
        {NAV_LINKS.map((link) => (
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
          className="rounded-[7px] bg-gold px-5 py-[11px] font-ui text-[15px] font-bold text-ink shadow-[0_3px_11px_rgba(0,0,0,.25)] hover:bg-[#c4884a]"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
