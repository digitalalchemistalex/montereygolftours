"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt?: string;         // descriptive only — falls back to caption for non-PBC images
  caption: string;      // display caption — no credit
  credit?: string;      // "Photo by [Name]" — displayed separately
  photographer?: string; // photographer name for schema/filtering
  year?: number;
  category?: string;    // tab grouping
  tag?: string;         // pill label on thumbnail
  location?: string;    // for ImageObject schema
};

type Props = {
  images: GalleryImage[];
  entityName: string;
  triggerLabel?: string;
};

export default function GalleryLightbox({ images, entityName, triggerLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  const openAt = (i: number) => { setIndex(i); setOpen(true); };
  const current = images[index];

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.slice(0, 5).map((img, i) => (
          <figure
            key={img.src}
            className={[
              "group relative overflow-hidden rounded-xl bg-[#e3ddcf] cursor-pointer",
              i === 0 ? "col-span-2 h-[240px] sm:col-span-2 sm:h-[280px]" : i === 1 ? "h-[140px] sm:h-[280px]" : "h-[140px] sm:h-[160px]",
            ].join(" ")}
            onClick={() => openAt(i)}
          >
            <Image
              src={img.src}
              alt={img.alt ?? img.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />

            {/* Tag badge */}
            {img.tag && (
              <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-white backdrop-blur-sm">
                {img.tag}
              </div>
            )}

            {/* Photographer credit — always visible bottom-right */}
            {img.credit && (
              <figcaption className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-ui text-[9px] leading-tight text-white/80 backdrop-blur-sm">
                {img.credit}
              </figcaption>
            )}

            {/* Hover overlay with caption */}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <p className="gallery-caption line-clamp-2 px-3 pb-3 font-ui text-[12px] leading-snug text-white">
                {img.caption}
              </p>
            </div>

            {/* Last tile: +N more */}
            {i === 4 && images.length > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                <span className="font-display text-2xl font-bold text-white">+{images.length - 5}</span>
              </div>
            )}
          </figure>
        ))}
      </div>

      {images.length > 5 && (
        <button
          type="button"
          onClick={() => openAt(0)}
          className="mt-3 inline-flex items-center gap-1.5 font-ui text-[14px] font-semibold text-terracotta hover:text-[#a8471f]"
        >
          {triggerLabel ?? `View all ${images.length} photos →`}
        </button>
      )}

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]/95"
          role="dialog"
          aria-modal="true"
          aria-label={`${entityName} photo gallery`}
          onClick={close}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
            <span className="font-ui text-[12px] text-white/60">
              {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Main image */}
          <figure
            className="relative mx-auto h-[60vh] w-full max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt ?? current.caption}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              unoptimized
            />

            {/* Caption + credit panel */}
            <figcaption className="absolute inset-x-0 -bottom-20 mx-auto w-full max-w-3xl px-6 text-center">
              {current.tag && (
                <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-white/70">
                  {current.tag}
                </span>
              )}
              <p className="gallery-caption font-body text-[15px] leading-relaxed text-white/90">
                {current.caption}
              </p>
              {current.credit && (
                <p className="mt-2 font-ui text-[11px] tracking-wide text-white/45">
                  {current.credit}
                </p>
              )}
            </figcaption>
          </figure>

          {/* Thumbnail strip */}
          <div
            className="mt-24 flex gap-2 overflow-x-auto px-6 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                className={[
                  "relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-opacity",
                  i === index ? "ring-2 ring-white opacity-100" : "opacity-50 hover:opacity-75",
                ].join(" ")}
                aria-label={`Go to photo ${i + 1}`}
              >
                <Image src={img.src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
