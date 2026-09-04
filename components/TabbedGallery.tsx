"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/components/GalleryLightbox";

type Props = {
  images: GalleryImage[];
  entityName: string;
};

export default function TabbedGallery({ images, entityName }: Props) {
  // Build category tabs from images — preserve insertion order
  const categories = Array.from(
    new Set(images.map((img) => img.category ?? "Gallery"))
  );
  const hasTabs = categories.length > 1;

  const [activeTab, setActiveTab] = useState(categories[0]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const tabImages = images.filter(
    (img) => (img.category ?? "Gallery") === activeTab
  );

  // Reset mobile swiper when tab changes
  useEffect(() => setMobileIndex(0), [activeTab]);

  // Global image index for lightbox (across all images, not just active tab)
  const openLightbox = (tabLocalIndex: number) => {
    const img = tabImages[tabLocalIndex];
    const globalIndex = images.findIndex((i) => i.src === img.src);
    setLightboxIndex(globalIndex);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLight = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const nextLight = useCallback(() =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevLight();
      if (e.key === "ArrowRight") nextLight();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, closeLightbox, prevLight, nextLight]);

  // Mobile swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setMobileIndex((i) => Math.min(i + 1, tabImages.length - 1));
      else setMobileIndex((i) => Math.max(i - 1, 0));
    }
    touchStartX.current = null;
  };

  const currentLight = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <>
      {/* ── TABS ─────────────────────────────────────────────────────── */}
      {hasTabs && (
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveTab(cat)}
              className={[
                "flex-none rounded-full px-4 py-1.5 font-ui text-[12px] font-semibold transition-colors",
                activeTab === cat
                  ? "bg-fairway text-white"
                  : "bg-[#eae6dc] text-[#5c6048] hover:bg-[#d8d4ca]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── DESKTOP LAYOUT ───────────────────────────────────────────── */}
      <div className="hidden sm:block">
        {tabImages.length === 0 ? null : tabImages.length === 1 ? (
          // Single image — full width
          <figure
            className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={tabImages[0].src}
              alt={tabImages[0].alt ?? tabImages[0].caption}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="100vw"
              priority
            />
            {tabImages[0].credit && (
              <figcaption className="absolute bottom-3 right-3 rounded bg-black/55 px-2 py-0.5 font-ui text-[10px] text-white/80 backdrop-blur-sm">
                {tabImages[0].credit}
              </figcaption>
            )}
          </figure>
        ) : (
          <>
            {/* Hero + sidebar */}
            <div className="grid grid-cols-[1fr_280px] gap-3 xl:grid-cols-[1fr_320px]">
              {/* Hero */}
              <figure
                className="relative h-[420px] cursor-pointer overflow-hidden rounded-2xl"
                onClick={() => openLightbox(0)}
              >
                <Image
                  src={tabImages[0].src}
                  alt={tabImages[0].alt ?? tabImages[0].caption}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="70vw"
                  priority
                />
                {/* Tag */}
                {tabImages[0].tag && (
                  <div className="absolute left-3 bottom-3 rounded-full bg-black/60 px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.06em] text-white backdrop-blur-sm">
                    {tabImages[0].tag}
                  </div>
                )}
                {/* Caption on hover */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100">
                  <figcaption className="p-4">
                    <p className="gallery-caption font-body text-[13px] leading-snug text-white">
                      {tabImages[0].caption}
                    </p>
                    {tabImages[0].credit && (
                      <p className="mt-1 font-ui text-[10px] text-white/60">
                        {tabImages[0].credit}
                      </p>
                    )}
                  </figcaption>
                </div>
                {/* Always-visible credit */}
                {tabImages[0].credit && (
                  <div className="absolute right-3 bottom-3 rounded bg-black/50 px-1.5 py-0.5 font-ui text-[9px] text-white/75 backdrop-blur-sm">
                    {tabImages[0].credit}
                  </div>
                )}
              </figure>

              {/* Sidebar stack — up to 3 */}
              <div className="flex flex-col gap-3">
                {tabImages.slice(1, 4).map((img, i) => (
                  <figure
                    key={img.src}
                    className="relative flex-1 cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => openLightbox(i + 1)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? img.caption}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="280px"
                    />
                    {img.credit && (
                      <figcaption className="absolute bottom-1.5 right-1.5 rounded bg-black/50 px-1 py-0.5 font-ui text-[8px] text-white/75 backdrop-blur-sm">
                        {img.credit}
                      </figcaption>
                    )}
                    {/* +N overlay on last sidebar tile */}
                    {i === 2 && tabImages.length > 4 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="font-display text-2xl font-bold text-white">
                          +{tabImages.length - 4}
                        </span>
                      </div>
                    )}
                  </figure>
                ))}
              </div>
            </div>

            {/* Thumbnail strip — remaining images */}
            {tabImages.length > 4 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {tabImages.slice(4).map((img, i) => (
                  <figure
                    key={img.src}
                    className="relative h-[90px] w-[130px] flex-none cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => openLightbox(i + 4)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? img.caption}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="130px"
                    />
                    {img.credit && (
                      <figcaption className="absolute bottom-1 right-1 rounded bg-black/50 px-1 py-0.5 font-ui text-[7px] text-white/70 backdrop-blur-sm">
                        {img.credit}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── MOBILE SWIPER ────────────────────────────────────────────── */}
      <div className="sm:hidden">
        {tabImages.length > 0 && (
          <>
            <figure
              className="relative h-[260px] w-full overflow-hidden rounded-2xl"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={() => openLightbox(mobileIndex)}
            >
              <Image
                src={tabImages[mobileIndex].src}
                alt={tabImages[mobileIndex].alt ?? tabImages[mobileIndex].caption}
                fill
                className="object-cover"
                sizes="100vw"
                priority={mobileIndex === 0}
              />
              {/* Tag */}
              {tabImages[mobileIndex].tag && (
                <div className="absolute left-3 bottom-10 rounded-full bg-black/60 px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-[.06em] text-white backdrop-blur-sm">
                  {tabImages[mobileIndex].tag}
                </div>
              )}
              {/* Credit */}
              {tabImages[mobileIndex].credit && (
                <figcaption className="absolute bottom-3 right-3 rounded bg-black/55 px-1.5 py-0.5 font-ui text-[9px] text-white/80 backdrop-blur-sm">
                  {tabImages[mobileIndex].credit}
                </figcaption>
              )}
            </figure>

            {/* Caption */}
            <p className="gallery-caption mt-2 px-1 font-body text-[13px] leading-snug text-[#5c6048]">
              {tabImages[mobileIndex].caption}
            </p>

            {/* Dot indicators */}
            {tabImages.length > 1 && (
              <div className="mt-3 flex justify-center gap-1.5">
                {tabImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMobileIndex(i)}
                    aria-label={`Go to photo ${i + 1}`}
                    className={[
                      "h-1.5 rounded-full transition-all",
                      i === mobileIndex ? "w-5 bg-fairway" : "w-1.5 bg-[#c5c0b4]",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────── */}
      {lightboxIndex !== null && currentLight && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]/96"
          role="dialog"
          aria-modal="true"
          aria-label={`${entityName} photo gallery`}
          onClick={closeLightbox}
        >
          {/* Counter + close */}
          <div
            className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-ui text-[12px] text-white/60">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prevLight(); }}
            aria-label="Previous photo"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Image */}
          <figure
            className="relative mx-auto h-[60vh] w-full max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentLight.src}
              alt={currentLight.alt ?? currentLight.caption}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
              unoptimized
            />
            <figcaption className="absolute inset-x-0 -bottom-20 mx-auto w-full max-w-3xl px-6 text-center">
              {currentLight.tag && (
                <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[.08em] text-white/70">
                  {currentLight.tag}
                </span>
              )}
              <p className="gallery-caption font-body text-[15px] leading-relaxed text-white/90">
                {currentLight.caption}
              </p>
              {currentLight.credit && (
                <p className="mt-2 font-ui text-[11px] tracking-wide text-white/45">
                  {currentLight.credit}
                </p>
              )}
            </figcaption>
          </figure>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); nextLight(); }}
            aria-label="Next photo"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Thumbnail strip */}
          <div
            className="mt-24 flex gap-2 overflow-x-auto px-6 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={[
                  "relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-opacity",
                  i === lightboxIndex ? "ring-2 ring-white opacity-100" : "opacity-50 hover:opacity-75",
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
