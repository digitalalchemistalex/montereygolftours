import Link from "next/link";
import { SITE } from "@/lib/site";
import Logo from "./Logo";

const PLAY_LINKS = [
  { label: "Courses", href: "/golf-courses/" },
  { label: "Hotels", href: "/hotels/" },
  { label: "Destinations", href: "/destinations/" },
  { label: "Itineraries", href: "/itineraries/" },
  { label: "Packages", href: "/packages/" },
];

const LEARN_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col gap-10 bg-ink px-6 py-12 md:flex-row md:justify-between md:px-14">
        <div className="max-w-[300px]">
          <Link href="/" className="inline-block">
            <Logo variant="dark-bg" className="h-9 w-auto" />
          </Link>
          <p className="mt-4 font-body text-sm italic leading-relaxed text-[#c4ccc6]">
            Private group golf trips to California&apos;s most storied coastline.
          </p>
        </div>

        <div>
          <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Play</div>
          <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-[#f3efe2]">
            {PLAY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Learn</div>
          <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-[#f3efe2]">
            {LEARN_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Contact</div>
          <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-[#f3efe2]">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            {SITE.email ? <a href={`mailto:${SITE.email}`}>{SITE.email}</a> : null}
            <span>Monterey, CA</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(250,246,238,.08)] bg-[#0f171a] px-6 py-3 text-center md:px-14">
        <p className="mx-auto max-w-[900px] font-ui text-[10.5px] leading-relaxed text-[#7d847f]">
          Pebble Beach®, Pebble Beach Resorts®, Pebble Beach Golf Links®, The Links at
          Spanish Bay™, Spyglass Hill® Golf Course, Del Monte Golf Course®, and their
          underlying distinctive images are trademarks, service marks, and trade dress of
          Pebble Beach Company. Used with permission.
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 bg-[#161F23] px-6 py-4 text-center md:flex-row md:px-14 md:text-left">
        <span className="font-ui text-[11px] text-[#9aa39d]">
          &copy; {new Date().getFullYear()} Monterey Golf Tours. All rights reserved.
        </span>
        <span className="font-ui text-[11px] text-gold">
          Fog typically clears by 10am &middot; Best tee time: 8&ndash;10am
        </span>
        <span className="font-ui text-[11px] text-[#9aa39d]">
          <Link href="/privacy/">Privacy Policy</Link> &middot; <Link href="/terms/">Terms of Use</Link>
        </span>
      </div>
    </footer>
  );
}
