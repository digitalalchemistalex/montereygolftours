"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { COURSE_DETAILS } from "@/lib/course-details";
import { HOTEL_DETAILS } from "@/lib/hotel-details";
import { useChat } from "./ChatContext";

type Message = { text: string; fromUser: boolean };

type FaqEntry = { q: string; a: string };

function scoreMatch(query: string, question: string): number {
  const qWords = query
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(" ")
    .filter((w) => w.length > 2);
  const questionLower = question.toLowerCase();
  let score = 0;
  for (const w of qWords) {
    if (questionLower.includes(w)) score++;
  }
  return score;
}

const GREETINGS = [
  "Hey there! \u{1F44B} I know this peninsula pretty well \u2014 ask me about any course or hotel, like \u201cIs Bayonet open to the public?\u201d",
  "Hi! Happy to help you plan your trip \u2014 try asking about a specific course or hotel, like \u201cHow many rooms at Quail Lodge?\u201d",
];

const LEAD_INS = [
  "Good question \u2014 here's what I've got:",
  "Here you go:",
  "Sure thing:",
  "Here's what I know:",
];

const FALLBACKS = [
  "Hmm, I don't have that one yet \u2014 but our team definitely does! Try the Get a Quote form and they'll get back to you personally.",
  "That's a bit outside what I know so far. Ask me about a specific course or hotel by name, or reach a real human through Get a Quote.",
  "I'm still learning that one. For anything I can't answer, our Get a Quote form goes straight to a person who can help.",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ChatWidget() {
  const { open, setOpen } = useChat();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: pickRandom(GREETINGS), fromUser: false },
  ]);
  const bodyRef = useRef<HTMLDivElement>(null);

  const faqs: FaqEntry[] = useMemo(() => {
    const list: FaqEntry[] = [];
    for (const c of Object.values(COURSE_DETAILS)) {
      for (const f of c.faqs ?? []) list.push({ q: f.q, a: f.a });
    }
    for (const h of Object.values(HOTEL_DETAILS)) {
      for (const f of h.faqs ?? []) list.push({ q: f.q, a: f.a });
    }
    return list;
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  function findBestAnswer(query: string): FaqEntry | null {
    let best: FaqEntry | null = null;
    let bestScore = 0;
    for (const item of faqs) {
      const s = scoreMatch(query, item.q);
      if (s > bestScore) {
        bestScore = s;
        best = item;
      }
    }
    return bestScore > 0 ? best : null;
  }

  function handleSend() {
    const query = input.trim();
    if (!query) return;
    setMessages((prev) => [...prev, { text: query, fromUser: true }]);
    setInput("");
    setTyping(true);
    const delay = 450 + Math.random() * 400;
    setTimeout(() => {
      const match = findBestAnswer(query);
      const reply = match ? `${pickRandom(LEAD_INS)} ${match.a}` : pickRandom(FALLBACKS);
      setMessages((prev) => [...prev, { text: reply, fromUser: false }]);
      setTyping(false);
    }, delay);
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-[320px] overflow-hidden rounded-2xl border border-[#e3ddcf] bg-cream shadow-[0_12px_32px_rgba(37,35,33,.2)]">
        <div className="flex items-center justify-between bg-ink px-4 py-3.5">
          <div>
            <div className="font-ui text-[14px] font-bold text-cream">Monterey Golf Tours</div>
            <div className="mt-0.5 font-ui text-[11px] text-[rgba(250,246,238,.75)]">
              Ask about courses, hotels, or trips
            </div>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="rounded-full p-1 text-cream hover:bg-[rgba(250,246,238,.15)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div ref={bodyRef} className="flex h-[260px] flex-col gap-2.5 overflow-y-auto bg-white p-3.5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.fromUser
                  ? "max-w-[85%] self-end rounded-xl bg-ink px-3 py-2 font-ui text-[12.5px] leading-relaxed text-cream"
                  : "max-w-[85%] self-start rounded-xl bg-[#F4F0E7] px-3 py-2 font-ui text-[12.5px] leading-relaxed text-ink"
              }
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="flex max-w-[85%] items-center gap-1 self-start rounded-xl bg-[#F4F0E7] px-3 py-2.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a89b87] [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a89b87] [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a89b87] [animation-delay:300ms]" />
            </div>
          )}
        </div>

        <div className="flex gap-2 border-t border-[#e3ddcf] bg-cream p-2.5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a question..."
            className="flex-1 rounded-lg border border-[#d8d2c2] px-2.5 py-2 font-ui text-[13px] outline-none focus:border-ocean/50"
          />
          <button
            type="button"
            onClick={handleSend}
            className="rounded-lg bg-terracotta-dark px-3.5 py-2 font-ui text-[13px] font-bold text-white hover:bg-[#9c4e24]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
