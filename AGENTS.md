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
- MAX 2 production commits per session. Build locally before pushing. **This means: iterate locally, look at it yourself, decide it's right, THEN push once.** Pushing 5+ commits to fix/re-fix/revert/re-do the same visual element (a logo, a color, a spacing value) is the rule being violated, not a gray area — each of those should have been one local iteration cycle ending in one commit. If you catch yourself about to push a second commit that touches the same element you just pushed, stop and ask MASTER first instead of pushing again.
- **Work the open LIVE DIRECTIVES in order, top to bottom, before starting anything not on the list.** If you want to work on something not listed (a UI polish item, a font, a color), say so to MASTER first and get it explicitly added — don't just start. The directives list is not a suggestion queue; it's the actual priority order.
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

**Updated: 2026-07-02**

-1. **[OPEN — read this first] Session review, 2026-07-02 14:00–14:16 UTC: process violation, not a code violation.** 14 commits pushed this session (`9436a0a` through `fa0ba22`). Of those, 9 were logo iterations on the same element in sequence (font swap → revert → redo → color change → resize → embossed variant → spacing fix), and 1 was quote form fields (not on the directive list at the time, unrequested). Zero of the 14 touched directives #2, #4, #5, or #6, which were the actual open priority list at session start. This is exactly what "MAX 2 production commits per session" and "work directives in order" (see Git workflow above) exist to prevent — not a formality, a real repeated pattern (see directive #3 below, same root cause: no local-iteration discipline before pushing). **Before your next session:** read the Git workflow section above in full. Work directive #2 next, in order. Don't start on anything not on this list without asking MASTER first.

0. **[DONE — resolved by MASTER, 2026-07-02] Supabase leads table created and verified live.** Ran `001_create_leads_table.sql` against the correct live project (`ewhatqtehwzlypjguvoo.supabase.co`) via the Supabase Management API. Table confirmed live with correct schema (11 columns, matches `QuoteForm.tsx` exactly including `trip_length` and `non_golfer_in_group`). RLS confirmed correct — `anon` can INSERT only, no SELECT/UPDATE/DELETE grant abuse. Ran a real end-to-end test matching the actual client call shape (`Prefer: return=minimal`, same as the Supabase JS `.insert()` default) — succeeded, row landed, cleaned up after. **The quote form works correctly right now.**
   **Root cause note for future account-mismatch confusion:** Raza's Claude previously flagged its Supabase MCP connector resolving to a different, inactive project (`coeeukjzoteaaowgzwml` under johnparker2086@gmail.com) instead of the correct one. That MCP-level mismatch is STILL unresolved as of this session — you did not fix it, and it still blocks your Claude from self-verifying Supabase work. Fix it before your next Supabase task: repoint the connector at `ewhatqtehwzlypjguvoo`.
   **Still open, lower priority now that the table exists:** directive #4 (lead notification system) and confirming whether `courses`/`hotels`/`packages`/etc. tables are needed yet or the static approach is intentional for now — state explicitly in commit message when addressed.

1. **[DONE — resolved by Raza's Claude, see this commit] Fix Spanish Bay bookability.** Rewrote `lib/course-details.ts` entry entirely (accurate closure description, construction start 3/18/2026, confirmed reopen 4/17/2027, removed green fee and all booking-style FAQ content, replaced with closure-status FAQs — independently verified against pebblebeach.com before publishing, not just copied from this directive). Removed from the quote form's selectable course list (`components/QuoteForm.tsx`, new `CLOSED_COURSE_SLUGS` filter). Updated `lib/courses.ts` type/hook fields so the index card and header mega-nav badge both show "Closed until Apr 2027" instead of implying active resort status. Special-cased the page `<title>`/meta description and JSON-LD `WebPage` name for this one course. Updated both `llms.txt` instances (intro line and course listing).

2. **[OPEN] Move all course pricing out of `lib/course-details.ts` into Supabase.** 33 hardcoded `$` instances across all 13 courses (`greenFeeEst` field, `description` prose, `faqs[].a` strings) — confirmed live and confirmed injected into `FAQPage` JSON-LD schema. Follow the pattern already correct in `app/packages/page.tsx` (`t.priceFrom` + `priceVerified` flag pulled from Supabase). No price should exist as a TS string/number literal anywhere in this file.
   **Scope is narrow — this is NOT a full site migration.** Do not expand this into a general content-management or dynamic-data overhaul. The only deliverable is: (a) create a `course_pricing` Supabase table with columns `slug`, `green_fee_est`, `price_note`, `price_verified`; (b) seed it with the 13 courses' current values; (c) replace the hardcoded price strings in `lib/course-details.ts` with a server-side fetch; (d) verify FAQPage JSON-LD no longer contains hardcoded dollar amounts. All other content (`description`, `location`, `par`, `yardage`, etc.) stays static in `lib/course-details.ts` — do not move it. Your Supabase MCP connector mismatch does NOT block this task — use the Supabase table editor UI directly to create and seed the table, then write the fetch code normally.

3. **[NOTE] Logo — flagged, no action needed retroactively.** Commit `d483847` (Raza, 2026-07-01) shipped the current live logo (white-outline dark-bg) without a preview/approval step, per Raza's own commit message. Noted for awareness — going forward, all visual/brand changes need a preview step before shipping (see Git workflow above). Not asking for a redo unless Sean flags it.

4. **[OPEN] Add Open Graph / Twitter Card meta tags — site-wide, 53/53 pages missing.** Confirmed live: zero `og:image`, `og:title`, `og:description`, `twitter:card` tags anywhere on the site (checked every page in the sitemap). Any link shared on Slack/iMessage/Facebook/LinkedIn currently renders with no preview card. **Action:** Add Open Graph + Twitter Card metadata via Next.js metadata API on every page/layout — at minimum `og:title`, `og:description`, `og:image` (needs a real image asset, not a placeholder), `og:url`, `twitter:card=summary_large_image`.

5. **[OPEN] Homepage missing `rel="canonical"`.** Every other page (52/53) has a self-referencing canonical tag; the homepage alone does not. Add canonical pointing to `https://montereygolftours.com/`.

6. **[OPEN] Lead notification system does not exist.** Confirmed by reading `components/QuoteForm.tsx` and the full repo tree: the quote form does a direct client-side `supabase.from("leads").insert()` and shows a static success message — that's the entire flow. No API route, no webhook, no email trigger anywhere in the repo. The form copy promises "a custom quote within 24 hours," but nothing notifies Sean when a lead comes in — leads currently land silently in Supabase with no one alerted. **Action:** Build the notification path (Resend or Gmail API, per `gmail-api-integration` skill pattern) that fires on insert and emails Sean. This is the only path to leads for the whole site — treat as high priority, not cosmetic.

---

*When you resolve a LIVE DIRECTIVE, change its tag from [OPEN] to [DONE] and note the commit SHA in your next commit message, don't delete the entry — MASTER needs the history.*

