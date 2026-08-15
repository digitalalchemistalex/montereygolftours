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
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#FAF6EE" strokeWidth="2">
        <path d="M4 13a8 8 0 0 1 16 0" strokeLinecap="round" />
        <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H5a1 1 0 0 0-1 1z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 13v3a2 2 0 0 1-2 2h-1v-6h1a1 1 0 0 1 1 1z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 20h-2a1 1 0 0 1-1-1v0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
