<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# MGTS PROJECT RULES

This file is the live source of truth for this repo. MASTER (Alex) updates it directly via GitHub from the oversight Claude instance. Read this in full at the start of every session before touching code.

## Roles
- **Sean Schaeffer** — client/owner. Present decisions to him, don't ask open questions. Build maximum without him.
- **Raza (johnparker2086@gmail.com / raza@montereygolftours.com)** — sole developer. You are Raza's Claude.
- **MASTER (Alex)** — oversight only, does not write code. Observes live commits/deployments and flags issues here.

## Git workflow
- Push directly to `main`. No `dev` branch gating required.
- MASTER observes live commits/deployments and fixes/flags issues after the fact — not a pre-merge gate.
- MAX 2 production commits per session. Build locally before pushing.
- No production changes (logo, palette, typography, structural) ship without a preview/approval step first — see LIVE DIRECTIVES below for a specific violation of this.

## Hard rules — no exceptions
- **No hardcoded prices or dates anywhere in code.** Every price/date must come from Supabase, dynamically. This includes prose descriptions and FAQ answer strings, not just display fields — hardcoded values in FAQ content get baked into JSON-LD schema and served to crawlers.
- **Pebble Beach trademark:** Pebble Beach Golf Links®, Spyglass Hill® Golf Course, The Links at Spanish Bay®/™ must carry ™/® on every single instance, no exceptions, including inside FAQ strings and prose.
- **The Links at Spanish Bay is CLOSED until April 17, 2027.** It must not be presented as bookable, must not appear in the quote form course list, and must not have live "tee times / book now" style page content until that date.
- **No logos** for Pebble Beach Company courses (name + ®/™ only, per IAGTO agreement terms).
- **Service role key** (Supabase) must never be exposed client-side.
- **No GitHub Actions automated commits.**

## Monitoring triggers (MASTER checks these live, not from trackers)
- Failed Vercel builds
- Exposed security keys
- Pebble Beach ™/® missing on any instance
- Spanish Bay listed as bookable before April 17, 2027
- Hardcoded prices or dates anywhere
- Incorrect GTHS API integration (region filter: strict `t.region === 'Monterey'`, not `'Monterey CA'`)
- Custom domain connected before MASTER authorizes cutover
- Actual cost spikes from repeated failed builds

## Process notes
- Never trust `MGTS_MasterTracker.xlsx` / `MGTS_BuildTracker.xlsx` as current state — they go stale. Live GitHub/Vercel/Supabase state is authoritative.
- Domain `montereygolftours.com` stays detached from the live project until MASTER explicitly authorizes cutover. Do not attach it.

---

## LIVE DIRECTIVES (current, check every session)

**Updated: 2026-07-01**

1. **[OPEN] Fix Spanish Bay bookability.** Confirmed live on `montereygolftours.vercel.app`:
   - Page title reads "The Links at Spanish Bay™ — Tee Times & Course Info"
   - Selectable checkbox in `/quote/` form
   - Full FAQ describing how to book, green fee shown
   - Zero mention of closure anywhere
   **Action:** Remove from quote form course list. Either remove the course detail page or replace its content with a "reopening April 17, 2027" notice. Do not re-add booking-style content until that date.

2. **[OPEN] Move all course pricing out of `lib/course-details.ts` into Supabase.** 33 hardcoded `$` instances across all 13 courses (`greenFeeEst` field, `description` prose, `faqs[].a` strings) — confirmed live and confirmed injected into `FAQPage` JSON-LD schema. Follow the pattern already correct in `app/packages/page.tsx` (`t.priceFrom` + `priceVerified` flag pulled from Supabase). No price should exist as a TS string/number literal anywhere in this file.

3. **[NOTE] Logo — flagged, no action needed retroactively.** Commit `d483847` (Raza, 2026-07-01) shipped the current live logo (white-outline dark-bg) without a preview/approval step, per Raza's own commit message. Noted for awareness — going forward, all visual/brand changes need a preview step before shipping (see Git workflow above). Not asking for a redo unless Sean flags it.

---

*When you resolve a LIVE DIRECTIVE, change its tag from [OPEN] to [DONE] and note the commit SHA in your next commit message, don't delete the entry — MASTER needs the history.*
