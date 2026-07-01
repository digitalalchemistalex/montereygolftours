"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  { label: "Courses", href: "/golf-courses/" },
  { label: "Hotels", href: "/hotels/" },
  { label: "Destinations", href: "/destinations/" },
  { label: "Itineraries", href: "/itineraries/" },
  { label: "Packages", href: "/packages/" },
  { label: "Blog", href: "/blog/" },
  { label: "About", href: "/about/" },
  { label: "FAQ", href: "/faq/" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-30 flex h-9 w-9 flex-none flex-col items-center justify-center gap-[5px]"
      >
        <span
          className="block h-[2px] w-6 rounded-full bg-cream transition-transform duration-200"
          style={open ? { transform: "translateY(7px) rotate(45deg)" } : undefined}
        />
        <span
          className="block h-[2px] w-6 rounded-full bg-cream transition-opacity duration-200"
          style={open ? { opacity: 0 } : undefined}
        />
        <span
          className="block h-[2px] w-6 rounded-full bg-cream transition-transform duration-200"
          style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined}
        />
      </button>

      {open && (
        <div className="fixed inset-0 z-20 flex flex-col bg-[#16242c] px-6 pb-8 pt-24">
          <nav className="flex flex-1 flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[rgba(250,246,238,.1)] py-4 font-display text-2xl font-bold text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-4">
            <a href={SITE.phoneHref} className="font-ui text-base font-semibold text-cream">
              {SITE.phone}
            </a>
            <Link
              href="/quote/"
              onClick={() => setOpen(false)}
              className="rounded-[9px] bg-gold px-5 py-3.5 text-center font-ui text-[15px] font-bold text-ink"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
