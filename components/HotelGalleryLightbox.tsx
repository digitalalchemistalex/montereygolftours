"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  hotelName: string;
};

export default function HotelGalleryLightbox({ images, hotelName }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

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

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  if (images.length <= 3) {
    // No overflow photos — grid renders as-is elsewhere, nothing extra to show.
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openAt(0)}
        className="mt-4 inline-flex items-center gap-1.5 font-body text-[14px] font-semibold text-terracotta transition-colors hover:text-[#a8471f]"
      >
        View all {images.length} photos →
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${hotelName} photo gallery`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close gallery"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative h-[70vh] w-full max-w-5xl">
            <Image
              src={images[index]}
              alt={`${hotelName} — photo ${index + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next photo"
            className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-[13px] text-white/70">
            {index + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
