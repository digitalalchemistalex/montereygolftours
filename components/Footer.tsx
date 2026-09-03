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

const EXPLORE_LINKS = [
  { label: "Pebble Beach Golf Links®", href: "/golf-courses/pebble-beach-golf-links/" },
  { label: "Pasatiempo Golf Course", href: "/golf-courses/pasatiempo/" },
  { label: "Spyglass Hill® Golf Course", href: "/golf-courses/spyglass-hill/" },
  { label: "Quail Lodge & Golf Club", href: "/golf-courses/quail-lodge/" },
  { label: "Bayonet", href: "/golf-courses/bayonet/" },
];

const LEARN_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Blog", href: "/blog/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contact", href: "/contact/" },
];

const TRUST_ITEMS = [
  "IAGTO Partner",
  "Authorized Pebble Beach Resorts® Golf Travel Operator",
  SITE.groupSizeNote,
];

const CONFIDENCE_ITEMS = [
  { label: "Custom quote within 24 hours", href: "/quote/" },
  { label: `${SITE.minGroupSize}–${SITE.maxGroupSize} players, any group size`, href: "/quote/" },
  { label: "14 courses, 11 hotels on the Peninsula", href: "/golf-courses/" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-terracotta bg-cream">
      {/* Trust bar */}
      <div className="border-b border-[#e8e2d3] bg-[#f4f0e7] px-6 py-3 md:px-14">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center">
          {TRUST_ITEMS.map((item, i) => (
            <span key={item} className="flex items-center gap-x-6">
              <span className="font-ui text-[10.5px] font-semibold uppercase tracking-[.08em] text-[#8a8276]">
                {item}
              </span>
              {i < TRUST_ITEMS.length - 1 && (
                <span className="hidden text-[#d8d1c2] md:inline">&middot;</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-cream px-6 py-12 md:flex-row md:justify-between md:px-14">
        <div className="max-w-[300px]">
          <Link href="/" className="inline-block">
            <Logo size={110} />
          </Link>
          <p className="mt-4 font-body text-sm italic leading-relaxed text-[#5a5147]">
            Private group golf trips to California&apos;s most storied coastline.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          <div>
            <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Play</div>
            <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-ink">
              {PLAY_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-terracotta-dark">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Explore Courses</div>
            <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-ink">
              {EXPLORE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-terracotta-dark">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Learn</div>
            <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-ink">
              {LEARN_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-terracotta-dark">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="font-ui text-[10px] font-bold uppercase tracking-[.16em] text-gold">Contact</div>
            <div className="mt-3 flex flex-col gap-3 font-ui text-[15px] text-ink">
              <a href={SITE.phoneHref}>{SITE.phone}</a>
              {SITE.email ? (
                <a href={`mailto:${SITE.email}`} className="break-all">
                  {SITE.email}
                </a>
              ) : null}
              <span>Monterey, CA</span>
              
            </div>
          </div>
        </div>
      </div>

      {/* Confidence strip */}
      <div className="border-t border-[#e8e2d3] bg-cream px-6 py-6 md:px-14">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          {CONFIDENCE_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-ui text-[12.5px] font-medium text-ink hover:text-terracotta-dark"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Pebble Beach Resorts® Trademark Acknowledgment — required per PBC TRADEMARKS 2026 */}
      <div className="border-t border-[#e8e2d3] bg-[#f4f0e7] px-6 py-4 text-center md:px-14">
        <p className="mx-auto max-w-[900px] font-ui text-[10.5px] leading-relaxed text-[#8a8276]">
          Pebble Beach®, Pebble Beach Golf Links®, Pebble Beach Resorts®, The Lodge at Pebble Beach™,
          Fairway One™, The Inn at Spanish Bay™, The Links at Spanish Bay™, Spyglass Hill® Golf Course,
          The Lone Cypress™, The Spa at Pebble Beach™, Casa Palmero®, 17-Mile Drive®,
          Pebble Beach Golf Academy™, The Heritage logo, and their respective underlying distinctive images
          are trademarks, service marks and trade dress of Pebble Beach Company. Used by permission.
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 bg-cream px-6 py-4 text-center md:flex-row md:px-14 md:text-left">
        <span className="font-ui text-[11px] text-[#6b6357]">
          &copy; {new Date().getFullYear()} Monterey Golf Tours. All rights reserved.
        </span>
        <span className="font-ui text-[11px] text-gold">
          Fog typically clears by 10am &middot; Best tee time: 8&ndash;10am
        </span>
        <span className="font-ui text-[11px] text-[#6b6357]">
          <Link href="/privacy/">Privacy Policy</Link> &middot; <Link href="/terms/">Terms of Use</Link>
        </span>
      </div>
    </footer>
  );
}
