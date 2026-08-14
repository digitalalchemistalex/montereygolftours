"use client";

import { useChat } from "./ChatContext";

export default function ChatTriggerIcon() {
  const { setOpen } = useChat();

  return (
    <button
      type="button"
      aria-label="Open chat"
      onClick={() => setOpen(true)}
      className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink transition-transform hover:scale-105"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FAF6EE" strokeWidth="2.2">
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
