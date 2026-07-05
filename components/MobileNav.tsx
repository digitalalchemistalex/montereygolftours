"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";

const LINKS = [
  {
    label: "Courses",
    href: "/golf-courses/",
    image: "https://images.unsplash.com/photo-1538648759472-7251f7cb2c2f",
  },
  {
    label: "Hotels",
    href: "/hotels/",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16",
  },
  {
    label: "Destinations",
    href: "/destinations/",
    image: "https://images.unsplash.com/photo-1502770513380-138d6d3a51dd",
  },
  {
    label: "Itineraries",
    href: "/itineraries/",
    image: "https://images.unsplash.com/photo-1605147861225-7bcd55f8e513",
  },
  { label: "Packages", href: "/packages/", image: "/art/packages-hero.svg" },
  { label: "Blog", href: "/blog/", image: "/art/blog-hero.svg" },
  { label: "About", href: "/about/", image: "/art/about-hero.svg" },
  { label: "FAQ", href: "/faq/", image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=85" },
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
        <div className="fixed inset-0 z-20 flex flex-col bg-[#16242c]">
          <div className="flex-1 overflow-y-auto pt-24">
            <nav className="flex flex-col">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="relative flex h-[76px] items-center overflow-hidden px-6"
                  style={{
                    backgroundImage: `url(${link.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(10,15,15,.75) 0%, rgba(10,15,15,.45) 55%, rgba(10,15,15,.2) 100%)",
                    }}
                  />
                  <span
                    className="relative font-display text-2xl font-bold text-cream"
                    style={{ textShadow: "0 1px 6px rgba(0,0,0,.6)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4 border-t border-[rgba(250,246,238,.1)] px-6 py-6">
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
