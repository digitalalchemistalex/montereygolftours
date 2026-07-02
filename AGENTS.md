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

**Updated: 2026-07-02**

0. **[OPEN — CRITICAL/BLOCKING] Supabase has zero tables. The site cannot capture a single lead right now.** Confirmed via direct REST probe against the live project (`ewhatqtehwzlypjguvoo.supabase.co`): every expected table returns 404, including `leads`. Only one migration file exists in the repo (`supabase/migrations/001_create_leads_table.sql`) and it was never run against the live database. Every quote form submission is currently failing silently — `supabase.from("leads").insert()` errors out, the form still shows the success message to the visitor, but nothing is stored and no one is notified. This has been true since the form went live; unknown how many real leads have already been lost.
   **Action, in order:** (1) Run `001_create_leads_table.sql` against the live Supabase project immediately. (2) Verify with a real test submission that a row actually lands. (3) Then build the notification path from directive #6 below — a working table with no notification is still better than nothing, but both are required. (4) Confirm whether `courses`, `hotels`, `packages`, `destinations`, `itineraries`, `blog_posts`, `trip_recaps` tables are needed yet per the strategy doc, or whether the current fully-static approach is the intended interim state — state this explicitly in your commit message, don't leave it ambiguous.

1. **[OPEN] Fix Spanish Bay bookability.** Confirmed live in two places:
   - `montereygolftours.vercel.app/golf-courses/links-at-spanish-bay/`: page title "Tee Times & Course Info," selectable in `/quote/` form, full booking FAQ, green fee shown, zero closure mention
   - `llms.txt`: lists it as a featured bookable course with zero closure mention — this is served directly to AI crawlers (GPTBot, ClaudeBot, PerplexityBot etc. all allowed in robots.txt)
   **Action:** Remove from quote form course list. Remove or replace course detail page content with a "reopening April 17, 2027" notice. Update its `llms.txt` entry the same way. Do not re-add booking-style content in either location until that date.

2. **[OPEN] Move all course pricing out of `lib/course-details.ts` into Supabase.** 33 hardcoded `$` instances across all 13 courses (`greenFeeEst` field, `description` prose, `faqs[].a` strings) — confirmed live and confirmed injected into `FAQPage` JSON-LD schema. Follow the pattern already correct in `app/packages/page.tsx` (`t.priceFrom` + `priceVerified` flag pulled from Supabase). No price should exist as a TS string/number literal anywhere in this file.

3. **[NOTE] Logo — flagged, no action needed retroactively.** Commit `d483847` (Raza, 2026-07-01) shipped the current live logo (white-outline dark-bg) without a preview/approval step, per Raza's own commit message. Noted for awareness — going forward, all visual/brand changes need a preview step before shipping (see Git workflow above). Not asking for a redo unless Sean flags it.

4. **[OPEN] Add Open Graph / Twitter Card meta tags — site-wide, 53/53 pages missing.** Confirmed live: zero `og:image`, `og:title`, `og:description`, `twitter:card` tags anywhere on the site (checked every page in the sitemap). Any link shared on Slack/iMessage/Facebook/LinkedIn currently renders with no preview card. **Action:** Add Open Graph + Twitter Card metadata via Next.js metadata API on every page/layout — at minimum `og:title`, `og:description`, `og:image` (needs a real image asset, not a placeholder), `og:url`, `twitter:card=summary_large_image`.

5. **[OPEN] Homepage missing `rel="canonical"`.** Every other page (52/53) has a self-referencing canonical tag; the homepage alone does not. Add canonical pointing to `https://montereygolftours.com/`.

6. **[OPEN] Lead notification system does not exist.** Confirmed by reading `components/QuoteForm.tsx` and the full repo tree: the quote form does a direct client-side `supabase.from("leads").insert()` and shows a static success message — that's the entire flow. No API route, no webhook, no email trigger anywhere in the repo. The form copy promises "a custom quote within 24 hours," but nothing notifies Sean when a lead comes in — leads currently land silently in Supabase with no one alerted. **Action:** Build the notification path (Resend or Gmail API, per `gmail-api-integration` skill pattern) that fires on insert and emails Sean. This is the only path to leads for the whole site — treat as high priority, not cosmetic.

---

*When you resolve a LIVE DIRECTIVE, change its tag from [OPEN] to [DONE] and note the commit SHA in your next commit message, don't delete the entry — MASTER needs the history.*
