"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrolledFromTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const nearBottom = scrolledFromTop + viewportHeight >= fullHeight - 200;
      setVisible(nearBottom && scrolledFromTop > viewportHeight);
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
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:-translate-y-1"
    >
      <svg width="48" height="48" viewBox="0 0 34 34">
        <circle cx="17" cy="17" r="15.5" fill="#E8A0A8" stroke="#7A2E38" strokeWidth="1.5" />
        <g fill="#C97985">
          <circle cx="12" cy="11" r="1.5" />
          <circle cx="17" cy="9.5" r="1.5" />
          <circle cx="22" cy="11" r="1.5" />
          <circle cx="9.5" cy="15.5" r="1.5" />
          <circle cx="14.5" cy="15" r="1.5" />
          <circle cx="19.5" cy="15" r="1.5" />
          <circle cx="24.5" cy="15.5" r="1.5" />
          <circle cx="12" cy="19.5" r="1.5" />
          <circle cx="17" cy="19" r="1.5" />
          <circle cx="22" cy="19.5" r="1.5" />
          <circle cx="14.5" cy="24" r="1.5" />
          <circle cx="19.5" cy="24" r="1.5" />
        </g>
        <path d="M17 7 L17 17 L23 10" fill="none" stroke="#7A2E38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
