"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolledFromTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrollableHeight = fullHeight - viewportHeight;
      const scrolledFraction = scrollableHeight > 0 ? scrolledFromTop / scrollableHeight : 0;
      setVisible(scrolledFraction >= 0.25);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(0,0,0,.2)] transition-transform hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(0,0,0,.25)]"
    >
      <svg width="48" height="48" viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="15.5" fill="#FFFFFF" stroke="#D8D2C2" strokeWidth="1" />
        <g fill="#E4E0D2">
          <circle cx="9" cy="8" r="0.9" />
          <circle cx="12.5" cy="7" r="0.9" />
          <circle cx="16" cy="6.3" r="0.9" />
          <circle cx="19.5" cy="7" r="0.9" />
          <circle cx="23" cy="8" r="0.9" />
          <circle cx="7" cy="11.5" r="0.9" />
          <circle cx="10.5" cy="10.5" r="0.9" />
          <circle cx="14" cy="9.8" r="0.9" />
          <circle cx="17.5" cy="9.8" r="0.9" />
          <circle cx="21" cy="10.5" r="0.9" />
          <circle cx="24.5" cy="11.5" r="0.9" />
          <circle cx="6" cy="15" r="0.9" />
          <circle cx="9.5" cy="14" r="0.9" />
          <circle cx="13" cy="13.3" r="0.9" />
          <circle cx="17" cy="13" r="0.9" />
          <circle cx="21" cy="13.3" r="0.9" />
          <circle cx="24.5" cy="14" r="0.9" />
          <circle cx="28" cy="15" r="0.9" />
          <circle cx="6" cy="18.5" r="0.9" />
          <circle cx="9.5" cy="17.7" r="0.9" />
          <circle cx="13" cy="17" r="0.9" />
          <circle cx="17" cy="16.7" r="0.9" />
          <circle cx="21" cy="17" r="0.9" />
          <circle cx="24.5" cy="17.7" r="0.9" />
          <circle cx="28" cy="18.5" r="0.9" />
          <circle cx="7" cy="22" r="0.9" />
          <circle cx="10.5" cy="21.2" r="0.9" />
          <circle cx="14" cy="20.5" r="0.9" />
          <circle cx="17.5" cy="20.3" r="0.9" />
          <circle cx="21" cy="20.5" r="0.9" />
          <circle cx="24.5" cy="21.2" r="0.9" />
          <circle cx="9" cy="25.3" r="0.9" />
          <circle cx="12.5" cy="24.5" r="0.9" />
          <circle cx="16" cy="24" r="0.9" />
          <circle cx="19.5" cy="24.5" r="0.9" />
          <circle cx="23" cy="25.3" r="0.9" />
          <circle cx="12" cy="27.8" r="0.9" />
          <circle cx="16" cy="27.3" r="0.9" />
          <circle cx="20" cy="27.8" r="0.9" />
        </g>
      </svg>
    </button>
  );
}
