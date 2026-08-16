## 🔴 HARD SESSION LOCK — READ THIS BEFORE ANY OTHER LINE IN THIS FILE

**Date: August 15, 2026**
**Set by: MASTER**

You have been doing unsolicited work — gallery photos, nav fixes, chat widget, mobile logo — none of which were on the directive list. This stops now.

**THE PATTERN BEING VIOLATED:**
You read AGENTS.md, see the directives, then work on something else entirely. This has happened across multiple sessions. It is not a misunderstanding — it is a discipline failure. The directives are the job. Everything else is noise.

**THIS SESSION: ONE TASK ONLY**

→ **Execute Directive #12.** Nothing else.

Do not open any other file. Do not notice a UI issue and fix it. Do not add photos. Do not improve anything. Do not start D#13 until D#12 is verified READY on Vercel and you have reported back to MASTER.

**Directive #12 is a 5-minute task.** One file (`components/Hero.tsx`). Two number changes. One commit. If you find yourself doing anything more than that, stop.

**After D#12 is verified live:**
- Report back with commit SHA and confirmation the live homepage shows 14 and 11
- Do not start D#13 without MASTER's explicit "go ahead" in a new AGENTS.md update
- Do not start D#14 or D#15 without explicit authorization for each

**If you are tempted to fix something you noticed while reading this file:** don't. Write it down and tell MASTER. MASTER will decide if it gets added to the list.

This lock stays at the top of this file until MASTER removes it.

---

## STANDING RULE — TRACKER UPDATE AFTER EVERY DIRECTIVE
**This rule applies to every directive, forever. No exceptions.**

After every directive is complete and Vercel shows READY:

1. Open `MGTS_BuildTracker.xlsx` from Google Drive (`Zoomaway/MontereyGolfTours/MGTS_BuildTracker.xlsx`)
2. On the **MGTS Build Status** sheet, find the row matching the directive and update:
   - **Status** column → `✅ Done`
   - **Notes** column → what was done + commit SHA (first 7 chars)
   - **Next Action** column → `—` (or next step if applicable)
3. If the directive added a new feature not in the tracker, append a new row
4. Update **cell A2** (Last updated date) to today's date
5. Save the file back to Google Drive

**Also update `MGTS_STATUS.md` in the repo root** — find the relevant section and mark it done with the commit SHA.

**Do NOT mark a directive done until:**
- Vercel shows READY (not building, not error)
- You have verified the change on the live site at `montereygolftours.vercel.app`
- The specific verification steps listed in the directive pass

---

---

## 🚨 EMERGENCY DIRECTIVE — LOGO MUST BE REPLACED BEFORE ANY OTHER WORK

**Date: August 2, 2026**
**Priority: HIGHEST — legal risk, overrides all other directives including #9**

---

### THE PROBLEM

The current logo (`/public/brand/logo.png` and all variants) depicts a **cypress tree on a rocky coastal outcrop with ocean waves** — identical in composition to the **Lone Cypress**, which is a registered trademark of Pebble Beach Company.

Pebble Beach Company actively enforces this trademark. Using it — even a stylized or illustrated version — exposes the site to immediate legal action. This logo cannot appear on any live page.

**The site must NOT go live on montereygolftours.com with this logo under any circumstances.**

---

### YOUR ONLY JOB THIS SESSION

Replace the logo across the entire site with a safe text-only or abstract placeholder before touching anything else, including directive #9.

---

### WHAT TO DO — EXACTLY

**Step 1 — Create a safe placeholder logo**

Create a new file at `public/brand/logo-placeholder.png` — a simple square image with:
- Dark navy background (#16242c)
- Gold text "MGT" centered
- No tree, no cypress, no coastline, no recognizable landmark

Use a canvas/node script or a minimal SVG converted to PNG. Keep it 300×300px to match the current logo dimensions.

Alternatively, if creating a PNG is complex, convert the existing logo references in the codebase to use an inline SVG text mark instead. Check how `logo.png` is referenced first.

**Step 2 — Find every reference to the logo files**

Search the codebase for:
- `/brand/logo.png`
- `/brand/logo-400.png`
- `/brand/logo-master.jpg`
- `/brand/logo-transparent-master.png`

These appear in at minimum: `components/Header.tsx`, `components/MobileNav.tsx`, `app/layout.tsx` (apple-icon, favicon references), and the wordmark inline style blocks.

**Step 3 — Replace or remove**

For every `<Image src="/brand/logo.png" ...>` instance: either point to the new placeholder, or if the wordmark "MonTeReY / GOLf TOURS" text renders independently without the logo image, remove the `<Image>` entirely and let the text wordmark stand alone. The text wordmark is safe — the image is the problem.

**Step 4 — Do NOT delete the old logo files from git**

Leave `logo.png`, `logo-400.png`, `logo-master.jpg`, `logo-transparent-master.png` in place in the repo. Just stop referencing them in components. MASTER will handle permanent replacement with a new commissioned logo.

**Step 5 — Single commit**

Commit message: `fix: remove Lone Cypress logo — trademark risk (Pebble Beach Co.); replace with safe placeholder`

Wait for Vercel READY. Report back with confirmation.

---

### DO NOT:
- Proceed with directive #9 (image uploads) until this is done
- Leave the cypress logo rendering on any page
- Delete the old logo files (preserve for reference)
- Make any other changes in this commit

---

---

## ✅ HOLD LIFTED FOR RAZA — DIRECTIVE #9 ONLY — READ THIS FULLY BEFORE TOUCHING ANYTHING

**Date: August 2, 2026**

Developer — the hold at the top of this file is partially lifted. Here is exactly what has happened and exactly what you are authorized to do. No speculation required.

---

### WHAT MASTER'S CLAUDE ALREADY DID (do not redo any of this)

Two commits were made to AGENTS.md by MASTER's Claude instance today:

- `dda0b7c` (15:28) — wrote directive #9 with the full image upload mapping
- `e85503e` (15:31) — corrected 3 oversized files in the mapping (mbeach 1→13, quail golf 4→1, portola 1→9)

**No code was committed to the repo. No images were uploaded. No lib files were changed.**
MASTER's Claude only updated AGENTS.md. The actual image work has NOT been done.
Your job is to do that work now.

---

### WHAT YOU ARE AUTHORIZED TO DO THIS SESSION

**One task only: execute directive #9 as written below.**

Nothing else. Do not touch any other file, do not start any other directive, do not make any improvements you think are needed. Directive #9 only.

---

### THE EXACT FILES YOU WILL CHANGE

1. `public/images/courses/` — new folder, 8 image files uploaded here
2. `public/images/hotels/` — new folder, 8 image files uploaded here
3. `public/og-image.jpg` — 1 image file at the public root
4. `lib/courses.ts` — image field updated for 8 courses (string replacement only)
5. `lib/hotels.ts` — image field updated for 8 hotels (string replacement only)
6. `app/layout.tsx` — OG_IMAGE constant replaced with `/og-image.jpg`

**Total: 18 image files + 3 code files. Nothing else.**

---

### THE EXACT IMAGE RENAME MAPPING

Sean provided a zip of licensed photos. You should have received it directly.
Rename files exactly as shown before uploading. No other files from the zip are in scope.

**Courses → upload to `/public/images/courses/`:**

| Source filename (in zip) | Upload as |
|---|---|
| `bayonet 1.webp` | `bayonet-hero.webp` |
| `black horse 1.jpg` | `black-horse-hero.jpg` |
| `CVR Golf 1.webp` | `carmel-valley-ranch-hero.webp` |
| `laguna 1.jpg` | `laguna-seca-hero.jpg` |
| `pacific grove 1-potential home page shot.jpg` | `pacific-grove-hero.jpg` |
| `pasa 1.jpg` | `pasatiempo-hero.jpg` |
| `poppy 1.webp` | `poppy-hills-hero.webp` |
| `quail golf 1.jpg` | `quail-lodge-hero.jpg` |

**Hotels → upload to `/public/images/hotels/`:**

| Source filename (in zip) | Upload as |
|---|---|
| `Hyatt 1.webp` | `hyatt-regency-hero.webp` |
| `CVR 1.webp` | `carmel-valley-ranch-hotel-hero.webp` |
| `quail 1.webp` | `quail-lodge-hotel-hero.webp` |
| `bern 13-best shot here.webp` | `bernardus-lodge-hero.webp` |
| `mbeach 13.webp` | `monterey-plaza-hero.webp` |
| `intercon 4.avif` | `intercontinental-hero.avif` |
| `portola 9.jpg` | `portola-hotel-hero.jpg` |
| `casa 1.avif` | `casa-munras-hero.avif` |

**OG image → upload to `/public/` (root):**

| Source filename (in zip) | Upload as |
|---|---|
| `pasa-use this on home back background maybe.jpg` | `og-image.jpg` |

**DO NOT use any other file from the zip.** Ignore: LAB, abrego, embassy, mp 11_files/, LAB 2_files/. Those are not in scope.

---

### THE EXACT CODE CHANGES

**`lib/courses.ts` — replace the `image:` field value for these slugs only:**

```
bayonet              → /images/courses/bayonet-hero.webp
black-horse          → /images/courses/black-horse-hero.jpg
carmel-valley-ranch  → /images/courses/carmel-valley-ranch-hero.webp
laguna-seca-golf-ranch → /images/courses/laguna-seca-hero.jpg
pacific-grove-golf-links → /images/courses/pacific-grove-hero.jpg
pasatiempo           → /images/courses/pasatiempo-hero.jpg
poppy-hills          → /images/courses/poppy-hills-hero.webp
quail-lodge          → /images/courses/quail-lodge-hero.jpg
```

Leave all Pebble Beach Resorts® courses untouched (pebble-beach-golf-links, spyglass-hill, links-at-spanish-bay, del-monte-golf-course, the-hay, club-at-pasadera).

**`lib/hotels.ts` — replace the `image:` field value for these slugs only:**

```
hyatt-regency-monterey       → /images/hotels/hyatt-regency-hero.webp
carmel-valley-ranch          → /images/hotels/carmel-valley-ranch-hotel-hero.webp
quail-lodge                  → /images/hotels/quail-lodge-hotel-hero.webp
bernardus-lodge              → /images/hotels/bernardus-lodge-hero.webp
monterey-plaza               → /images/hotels/monterey-plaza-hero.webp
intercontinental-the-clement → /images/hotels/intercontinental-hero.avif
portola-hotel                → /images/hotels/portola-hotel-hero.jpg
casa-munras                  → /images/hotels/casa-munras-hero.avif
```

**`app/layout.tsx` — replace lines 16–17:**

Find:
```typescript
const OG_IMAGE =
  "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&h=630&fit=crop&q=80";
```

Replace with:
```typescript
const OG_IMAGE = "/og-image.jpg";
```

**Also in the same commit — fix this 1-line bug:**
In the hotels nav dropdown component, find `"View all 9 hotels →"` and change to `"View all 8 hotels →"`.
Search `components/Header.tsx` and `components/MobileNav.tsx` for this string.

---

### COMMIT RULES

- **One single commit** containing all 18 images + 3 code file changes + the hotel count fix
- Commit message must be exactly: `feat: replace Unsplash placeholders with real licensed course + hotel photos; fix hotel nav count`
- Do NOT split into multiple commits
- Wait for Vercel READY status before reporting back

---

### ⚠️ FILE SIZE LIMIT

GitHub Contents API maximum is **1MB per file**. Every file in the mapping above is confirmed under 1MB. If you find a file is over 1MB, stop and report to MASTER — do not substitute a different file without authorization.

---

### DO NOT:
- Add gallery arrays or change the TypeScript type of the `image` field (it stays `string`)
- Touch `next.config.ts` (local `/images/` paths need no remotePatterns config)
- Touch `course-details.ts`, any page TSX, `itineraries.ts`, blog posts, destinations
- Use any image not in the mapping table above
- Make more than one commit for this task

---

---

## ⛔ SESSION HOLD — READ BEFORE DOING ANYTHING

**MASTER has taken over this project directly. Do NOT start any new work this session.**

All open directives are either resolved or being handled by MASTER and his Claude instance.
The site is in a stable, near-complete state. Your job right now is to **do nothing** until
MASTER explicitly lifts this hold in a future AGENTS.md update.

If you have been asked by someone to work on a task, confirm with MASTER first before touching
any file, making any commit, or running any tool.

---


---

## ⚠️ MANDATORY PRE-PUSH REASONING PROTOCOL

Before ANY GitHub PUT (file commit), you MUST explicitly reason through ALL of the following.
No exceptions. No shortcuts. A failed build costs MASTER real money and time.

**Step 1 — Type verification**
For every TypeScript property you reference (e.g. `course.image`, `hotel.slug`), you MUST have
already fetched and read the actual type definition in the source file. If you have not read it,
READ IT NOW before writing any code. "I think it has that field" is not acceptable.

**Step 2 — Replacement string uniqueness**
If using `content.replace(old, new)`, confirm the OLD string is long enough to be unambiguous.
Count how many times OLD appears in the file. If >1, use a longer, more unique string.
NEVER use short generic tokens like `"\n};\n"` — they will hit the wrong target.

**Step 3 — Scope check**
List every file the commit touches. Confirm each file change was explicitly requested.
Any out-of-scope file change requires MASTER approval before pushing.

**Step 4 — Build confidence**
Before pushing: mentally compile the changed code. Trace every import, every property access,
every function call. If you cannot trace it confidently, fetch the relevant files and check.

**Step 5 — Verify READY before next change**
After each push, confirm the Vercel deployment reaches READY state before starting the next
code change. Never stack commits on a broken build.

---
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# MGTS PROJECT RULES

This file is the live source of truth for this repo. MASTER (Alex) updates it directly via GitHub from the oversight Claude instance. Read this in full at the start of every session before touching code.

## Roles
- **Sean Schaeffer** — client/owner. Present decisions to him, don't ask open questions. Build maximum without him.
- **Developer (johnparker2086@gmail.com / raza@montereygolftours.com)** — sole developer. You are the Developer Claude.
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

**Updated: 2026-07-04**

-1. **[OPEN — read this first] Session review, 2026-07-02 14:00–14:16 UTC: process violation, not a code violation.** 14 commits pushed this session (`9436a0a` through `fa0ba22`). Of those, 9 were logo iterations on the same element in sequence (font swap → revert → redo → color change → resize → embossed variant → spacing fix), and 1 was quote form fields (not on the directive list at the time, unrequested). Zero of the 14 touched directives #2, #4, #5, or #6, which were the actual open priority list at session start. This is exactly what "MAX 2 production commits per session" and "work directives in order" (see Git workflow above) exist to prevent — not a formality, a real repeated pattern (see directive #3 below, same root cause: no local-iteration discipline before pushing). **Before your next session:** read the Git workflow section above in full. Work directive #2 next, in order. Don't start on anything not on this list without asking MASTER first.

0. **[DONE — resolved by MASTER, 2026-07-02] Supabase leads table created and verified live.** Ran `001_create_leads_table.sql` against the correct live project (`ewhatqtehwzlypjguvoo.supabase.co`) via the Supabase Management API. Table confirmed live with correct schema (11 columns, matches `QuoteForm.tsx` exactly including `trip_length` and `non_golfer_in_group`). RLS confirmed correct — `anon` can INSERT only, no SELECT/UPDATE/DELETE grant abuse. Ran a real end-to-end test matching the actual client call shape (`Prefer: return=minimal`, same as the Supabase JS `.insert()` default) — succeeded, row landed, cleaned up after. **The quote form works correctly right now.**
   **Root cause note for future account-mismatch confusion:** Developer Claude previously flagged its Supabase MCP connector resolving to a different, inactive project (`coeeukjzoteaaowgzwml` under johnparker2086@gmail.com) instead of the correct one. That MCP-level mismatch is STILL unresolved as of this session — you did not fix it, and it still blocks Developer Claude from self-verifying Supabase work. Fix it before your next Supabase task: repoint the connector at `ewhatqtehwzlypjguvoo`.
   **Still open, lower priority now that the table exists:** directive #4 (lead notification system) and confirming whether `courses`/`hotels`/`packages`/etc. tables are needed yet or the static approach is intentional for now — state explicitly in commit message when addressed.

1. **[DONE — resolved by Developer Claude, see this commit] Fix Spanish Bay bookability.** Rewrote `lib/course-details.ts` entry entirely (accurate closure description, construction start 3/18/2026, confirmed reopen 4/17/2027, removed green fee and all booking-style FAQ content, replaced with closure-status FAQs — independently verified against pebblebeach.com before publishing, not just copied from this directive). Removed from the quote form's selectable course list (`components/QuoteForm.tsx`, new `CLOSED_COURSE_SLUGS` filter). Updated `lib/courses.ts` type/hook fields so the index card and header mega-nav badge both show "Closed until Apr 2027" instead of implying active resort status. Special-cased the page `<title>`/meta description and JSON-LD `WebPage` name for this one course. Updated both `llms.txt` instances (intro line and course listing).

2. **[DONE — ACTUALLY completed 2026-07-05 by MASTER] Move all course pricing out of `lib/course-details.ts` into Supabase.** Commit 0b8e95b created the code path but never created the Supabase table — `course_pricing` did not exist. MASTER created table + seeded 14 rows with compliant non-dollar price labels. No hardcoded prices appear on any page. 33 hardcoded `$` instances across all 13 courses (`greenFeeEst` field, `description` prose, `faqs[].a` strings) — confirmed live and confirmed injected into `FAQPage` JSON-LD schema. Follow the pattern already correct in `app/packages/page.tsx` (`t.priceFrom` + `priceVerified` flag pulled from Supabase). No price should exist as a TS string/number literal anywhere in this file.
   **Pre-condition — fix your Supabase MCP connector first.** Your connector currently resolves to `coeeukjzoteaaowgzwml` (wrong inactive project). Go to Claude → Settings → Connectors → Supabase → reconnect with the account that owns `ewhatqtehwzlypjguvoo`. Verify by running a simple query and confirming you see the `leads` table. Do not start the coding steps below until this resolves correctly — otherwise you will error on every Supabase operation and waste commits debugging a connector issue, not code.
   **Scope is narrow — this is NOT a full site migration.** Do not expand this into a general content-management or dynamic-data overhaul. The only deliverable is: (a) create a `course_pricing` Supabase table with columns `slug`, `green_fee_est`, `price_note`, `price_verified`; (b) seed it with the 13 courses' current values; (c) replace the hardcoded price strings in `lib/course-details.ts` with a server-side fetch; (d) verify FAQPage JSON-LD no longer contains hardcoded dollar amounts. All other content (`description`, `location`, `par`, `yardage`, etc.) stays static in `lib/course-details.ts` — do not move it. Your Supabase MCP connector mismatch does NOT block this task — use the Supabase table editor UI directly to create and seed the table, then write the fetch code normally.

3. **[NOTE] Logo — flagged, no action needed retroactively.** Commit `d483847` (2026-07-01) shipped the current live logo (white-outline dark-bg) without a preview/approval step, Noted for awareness — going forward, all visual/brand changes need a preview step before shipping (see Git workflow above). Not asking for a redo unless Sean flags it.

4. **[DONE — resolved by MASTER, 2026-07-04, commit b70dd03] Add Open Graph / Twitter Card meta tags — site-wide, 53/53 pages missing.** Confirmed live: zero `og:image`, `og:title`, `og:description`, `twitter:card` tags anywhere on the site (checked every page in the sitemap). Any link shared on Slack/iMessage/Facebook/LinkedIn currently renders with no preview card. **Resolution:** Added `metadataBase`, `openGraph`, and `twitter` defaults to `app/layout.tsx`. All 53 pages now inherit site-wide OG/Twitter tags. Per-page `metadata` exports override title/description automatically. Current `og:image` is an Unsplash placeholder — replace with a real photo asset before go-live.

5. **[DONE — resolved by MASTER, 2026-07-04, commit 0bdacf2] Homepage missing `rel="canonical"`.** Every other page (52/53) has a self-referencing canonical tag; the homepage alone does not. Add canonical pointing to `https://montereygolftours.com/`.

6. **[DONE — resolved by MASTER, 2026-07-04, commits 1d06b4e + 78960f1] Lead notification system does not exist.** Confirmed by reading `components/QuoteForm.tsx` and the full repo tree: the quote form does a direct client-side `supabase.from("leads").insert()` and shows a static success message — that's the entire flow. No API route, no webhook, no email trigger anywhere in the repo. The form copy promises "a custom quote within 24 hours," but nothing notifies Sean when a lead comes in — leads currently land silently in Supabase with no one alerted. **Resolution:** Created `app/api/notify-lead/route.ts` (edge runtime, Resend). QuoteForm calls it fire-and-forget after successful insert. **Two env vars must be set in Vercel before this activates:** `RESEND_API_KEY` (from resend.com) and `LEAD_NOTIFY_EMAIL` (Sean's receiving email). Domain `montereygolftours.com` must be verified in Resend for the FROM address to work. Until both are set, the route returns 200 silently and logs a console warning — leads still save, Sean just won't receive emails yet. **MASTER: set these vars in Vercel dashboard before go-live.**

7. **[OPEN — MASTER action required] Activate lead notification emails.** Directive #6 code is live but inactive until two env vars are set in Vercel: `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL`. Steps: (1) Create a Resend account at resend.com, (2) verify the `montereygolftours.com` domain in Resend DNS settings, (3) create an API key, (4) add both vars to the Vercel project under Settings → Environment Variables → Production. Once set, every new lead submission will email the `LEAD_NOTIFY_EMAIL` address with full lead details.

8. **[OPEN] OG image placeholder.** The site-wide `og:image` currently uses an Unsplash URL. Replace with a real owned photo asset (hosted at `/og-image.jpg` in `public/`) before domain cutover. Unsplash URLs work for now but are not suitable for production social sharing.


---

*When you resolve a LIVE DIRECTIVE, change its tag from [OPEN] to [DONE] and note the commit SHA in your next commit message, don't delete the entry — MASTER needs the history.*



9. **[OPEN — Developer action required] Replace Unsplash placeholders with real licensed photos across all course and hotel pages.**

MASTER has uploaded a zip of real licensed images from Sean (Google Drive folder "Monterey Images"). The zip has been inventoried. This directive gives you the exact mapping — do not deviate, do not guess, do not use any image not listed here.

---

### STEP 1 — Download the images

Sean's images are in Google Drive folder: `https://drive.google.com/drive/folders/1R49od5MrIFrM3yHTUh9n0ChVIaBjugAl`

Download the full folder as a zip (already done by MASTER — available as `drive-download-20260802T152205Z-1-001.zip`). Extract it locally. You will see files like `bayonet 1.webp`, `bern 13-best shot here.webp`, etc.

---

### ⚠️ FILE SIZE LIMIT — GitHub Contents API max is 1MB per file
All files in the mapping below are confirmed under 1MB. Do not substitute larger files.

### STEP 2 — Rename files using this exact mapping

Rename each file as shown. Use the EXACT filenames below — these become the public URLs. No spaces. Lowercase only.

**Courses:**
| Original filename | Rename to |
|---|---|
| `bayonet 1.webp` | `bayonet-hero.webp` |
| `black horse 1.jpg` | `black-horse-hero.jpg` |
| `CVR Golf 1.webp` | `carmel-valley-ranch-hero.webp` |
| `laguna 1.jpg` | `laguna-seca-hero.jpg` |
| `pacific grove 1-potential home page shot.jpg` | `pacific-grove-hero.jpg` |
| `pasa 1.jpg` | `pasatiempo-hero.jpg` |
| `poppy 1.webp` | `poppy-hills-hero.webp` |
| `quail golf 1.jpg` | `quail-lodge-hero.jpg` |

**Hotels:**
| Original filename | Rename to |
|---|---|
| `Hyatt 1.webp` | `hyatt-regency-hero.webp` |
| `CVR 1.webp` | `carmel-valley-ranch-hotel-hero.webp` |
| `quail 1.webp` | `quail-lodge-hotel-hero.webp` |
| `bern 13-best shot here.webp` | `bernardus-lodge-hero.webp` |
| `mbeach 13.webp` | `monterey-plaza-hero.webp` |
| `intercon 4.avif` | `intercontinental-hero.avif` |
| `portola 9.jpg` | `portola-hotel-hero.jpg` |
| `casa 1.avif` | `casa-munras-hero.avif` |

**Homepage OG image (also resolves directive #8):**
| Original filename | Rename to |
|---|---|
| `pasa-use this on home back background maybe.jpg` | `og-image.jpg` |

**DO NOT rename or use any other files from the zip** — the rest are extras Sean may use later. Ignore `LAB 1.jpg`, `Lab 3.jpg`, `abrego *.avif`, `embassy *.avif` — MASTER will handle those separately.

---

### STEP 3 — Place files in `/public/images/courses/` and `/public/images/hotels/`

Create two new folders:
- `public/images/courses/` — all course hero images
- `public/images/hotels/` — all hotel hero images
- `public/` — `og-image.jpg` goes here (root of public, not in a subfolder)

Upload ALL renamed files to GitHub in **one single commit** using the Contents API. The commit message must be:

```
feat: replace Unsplash placeholders with real licensed course + hotel photos
```

Commit all image files + the two `lib/` file changes (Step 4) in the **same commit**. Do not split across multiple commits.

---

### STEP 4 — Update `lib/courses.ts` and `lib/hotels.ts`

Replace the `image` field value for each entity. Use local paths, not external URLs.

**`lib/courses.ts` changes:**
```
bayonet        → /images/courses/bayonet-hero.webp
black-horse    → /images/courses/black-horse-hero.jpg
carmel-valley-ranch → /images/courses/carmel-valley-ranch-hero.webp
laguna-seca-golf-ranch → /images/courses/laguna-seca-hero.jpg
pacific-grove-golf-links → /images/courses/pacific-grove-hero.jpg
pasatiempo     → /images/courses/pasatiempo-hero.jpg
poppy-hills    → /images/courses/poppy-hills-hero.webp
quail-lodge    → /images/courses/quail-lodge-hero.jpg
```
Pebble Beach Resorts® courses (pebble-beach-golf-links, spyglass-hill, links-at-spanish-bay, del-monte-golf-course, the-hay, club-at-pasadera) — leave image field as-is (Unsplash or absent). Do not touch them.

**`lib/hotels.ts` changes:**
```
hyatt-regency-monterey      → /images/hotels/hyatt-regency-hero.webp
carmel-valley-ranch         → /images/hotels/carmel-valley-ranch-hotel-hero.webp
quail-lodge                 → /images/hotels/quail-lodge-hotel-hero.webp
bernardus-lodge             → /images/hotels/bernardus-lodge-hero.webp
monterey-plaza              → /images/hotels/monterey-plaza-hero.webp
intercontinental-the-clement → /images/hotels/intercontinental-hero.avif
portola-hotel               → /images/hotels/portola-hotel-hero.jpg
casa-munras                 → /images/hotels/casa-munras-hero.avif
```

**`app/layout.tsx` or wherever og:image is set:**
Replace the Unsplash og:image URL with `/og-image.jpg`. This resolves directive #8.

---

### STEP 5 — Verify before pushing

1. Confirm every image file exists at its new path locally before committing
2. Confirm `courses.ts` TypeScript still compiles — the `image` field is `string | undefined`, local paths are valid strings
3. Confirm `hotels.ts` same — `image` field is `string`, all entries now have a local path
4. Confirm `og-image.jpg` is in `/public/` root
5. Run `next build` locally — zero errors expected since this is only string values changing
6. Single commit, then wait for Vercel READY before reporting back to MASTER

---

### CONSTRAINTS — read carefully

- **Do not add a gallery or image array.** Current `image` field is a single string. Do not change the type. That is a future task.
- **Do not touch any file not listed above.** Not `course-details.ts`, not any page TSX, not `itineraries.ts`, not blog posts. Only: `lib/courses.ts`, `lib/hotels.ts`, `app/layout.tsx` (og:image only), plus new image files in `/public/images/`.
- **Do not commit images to git as base64.** Upload as binary blobs via the GitHub Contents API (base64-encode the binary for the API call, but the stored file will be the raw binary).
- **Do not use any image from the zip that is not in the mapping table above.**
- **The hold at the top of this file is lifted for this directive only.** Work directive #9 and only directive #9 this session.






---

## ✅ DIRECTIVE #10 — BUILD MONTEREY BEACH HOTEL PAGE

**Date: August 2, 2026**
**Authorized by: MASTER**

---

### YOUR TASK

Build the hotel page for **Monterey Beach Hotel, A Tribute Portfolio Hotel** using the exact same template and structure as the existing hotel pages already in the codebase.

---

### HOTEL FACTS — USE EXACTLY AS WRITTEN

- **Full legal name:** Monterey Beach Hotel, A Tribute Portfolio Hotel
- **Short name (for UI labels, cards, nav):** Monterey Beach Hotel
- **Address:** 2600 Sand Dunes Dr, Monterey, CA 93940
- **Brand:** Marriott Tribute Portfolio
- **Slug:** `monterey-beach-hotel`

Do not invent any other facts (star rating, room count, amenities, description). Use only what is confirmed above. For any fields the template requires that are not listed here, use a placeholder comment `{/* TODO: Sean to confirm */}` — do not fabricate.

---

### WHAT TO DO

1. Look at an existing hotel page (e.g. Portola Hotel or Casa Munras) to understand the exact file structure, data shape, and template used
2. Add the hotel entry to `lib/hotels.ts` using the confirmed facts above
3. Create the hotel page at `app/hotels/monterey-beach-hotel/page.tsx` following the same pattern
4. Do not add an image path — leave the `image` field absent or as an empty string until MASTER provides one
5. Single commit, wait for Vercel READY, report back

---

### CONSTRAINTS

- **Template only** — no new components, no new patterns, no improvements
- **No invented facts** — name, address, brand only; everything else gets a TODO placeholder
- **Do not touch any other file** beyond `lib/hotels.ts` and the new page file
- **Do not start any other directive**



---

## ✅ DIRECTIVE #11 — ADD 3 NEW HOTELS TO NAV MEGA-MENU

**Date: August 3, 2026**
**Authorized by: MASTER**

---

### CONTEXT

Three new hotels were added in Directive #10 and are live at:
- `/hotels/hotel-abrego/`
- `/hotels/embassy-suites-monterey-bay-seaside/`
- `/hotels/monterey-beach-hotel/`

They exist in `lib/hotels.ts` and `lib/hotel-details.ts` but are **not appearing in the nav mega-menu dropdown** because `components/Header.tsx` was not updated. This is the only fix needed.

---

### YOUR TASK — ONE FILE ONLY: `components/Header.tsx`

**Change 1 — Add 3 entries to `HOTEL_NOTE`:**

Find the `HOTEL_NOTE` constant (it contains entries like `"casa-munras"`, `"portola-hotel"`, etc.) and add these 3 entries:

```ts
"hotel-abrego":                      { stars: "★★★", note: "Boutique · downtown Monterey" },
"embassy-suites-monterey-bay-seaside": { stars: "★★★", note: "All-suite · free breakfast" },
"monterey-beach-hotel":              { stars: "★★★", note: "Beachfront · Tribute Portfolio" },
```

**Change 2 — Add slugs to `MONTEREY_SLUGS`:**

Find the line:
```ts
const MONTEREY_SLUGS = ["hyatt-regency-monterey","monterey-plaza","intercontinental-the-clement","portola-hotel","casa-munras"];
```

Replace it with:
```ts
const MONTEREY_SLUGS = ["hyatt-regency-monterey","monterey-plaza","intercontinental-the-clement","portola-hotel","casa-munras","hotel-abrego","embassy-suites-monterey-bay-seaside","monterey-beach-hotel"];
```

---

### CONSTRAINTS

- **Touch only `components/Header.tsx`** — no other files
- **Do not change any existing entries** in `HOTEL_NOTE` or `MONTEREY_SLUGS`
- **Do not reformat, restructure, or improve anything else** in the file
- Single commit message: `fix: add 3 new hotels to nav mega-menu dropdown`
- Wait for Vercel READY, then verify all 3 appear in the Hotels dropdown at `https://montereygolftours.vercel.app`
- Report back with confirmation

---

### PRE-PUSH PROTOCOL (MANDATORY)

1. Read the current `components/Header.tsx` from GitHub API before making any change
2. Confirm `HOTEL_NOTE` and `MONTEREY_SLUGS` are present exactly as described above
3. Make both changes in a single PUT — not two separate commits
4. Verify the build passes before reporting done



---

## DIRECTIVE #12 — Fix hero stat numbers
**Date: August 14 2026**
**Authorized by: MASTER + Sean Schaeffer**
**Priority: Quick fix — do this first**

### THE PROBLEM
`components/Hero.tsx` displays hardcoded stat chips. Currently shows "8" for both courses and hotels. Actual live counts: 14 courses, 11 hotels.

### EXACT CHANGE REQUIRED

**File:** `components/Hero.tsx`

Find the stats array (exact strings will vary — search for the number `8` near the words "Courses" and "Properties" or "Hotels"). Replace whatever structure holds those two stats with:

- Courses stat: number `14`, label `"Courses available"`
- Hotels stat: number `11`, label `"Hotels & resorts"`

Do not change any other stat in the hero (year founded, etc.). Do not change any other file.

### COMMIT
```
fix: hero stats — 8→14 courses, 8→11 hotels (verified live counts)
```

Wait for Vercel READY. Confirm the live homepage shows 14 and 11 before marking done.

---

## DIRECTIVE #13 — Pebble Beach Resorts® dedicated nav item
**Date: August 14 2026**
**Authorized by: MASTER + Sean Schaeffer**
**Priority: High**

### THE GOAL
Add "Pebble Beach Resorts®" as a top-level nav item with its own mega-menu dropdown. It sits between the existing "Courses" and "Hotels" items. This gives PBR a dedicated presence — not buried inside the Courses dropdown sub-header.

### FILE: `components/Header.tsx`

**Step 1 — Add nav item**

In the desktop nav `<nav>` element, after the Courses dropdown trigger and before the Hotels dropdown trigger, add:

```tsx
{/* Pebble Beach Resorts® */}
<div className="relative group">
  <button className="... (match existing nav button styles) ...">
    Pebble Beach Resorts®
  </button>
  {/* mega-menu dropdown — see Step 2 */}
</div>
```

Match the exact className pattern used on existing nav dropdown triggers. Do not invent new styles.

**Step 2 — Mega-menu content**

The dropdown shows two columns:

**Column 1 — Golf Courses (5 courses)**
```
Pebble Beach Golf Links®          /golf-courses/pebble-beach-golf-links/
Spyglass Hill® Golf Course        /golf-courses/spyglass-hill/
The Links at Spanish Bay®         /golf-courses/links-at-spanish-bay/
  ↳ show CLOSED badge: "Closed — reopens Apr 17, 2027"
Del Monte Golf Course®            /golf-courses/del-monte-golf-course/
The Hay™                          /golf-courses/the-hay/
```

**Column 2 — Lodging (3 properties)**
```
The Lodge at Pebble Beach™        (external link — https://www.pebblebeach.com/accommodations/the-lodge/)
The Inn at Spanish Bay™           (external link — https://www.pebblebeach.com/accommodations/the-inn-at-spanish-bay/)
Casa Palmero™                     (external link — https://www.pebblebeach.com/accommodations/casa-palmero/)
```

External links: `target="_blank" rel="noopener noreferrer"`.

**Below the two columns**, add a small footer bar inside the dropdown:
```
IAGTO Partner · Authorized Pebble Beach Resorts® Golf Travel Operator
```
Same styling as the existing IAGTO badge used elsewhere in the nav.

**Step 3 — Mobile nav**

In `components/MobileNav.tsx`, add "Pebble Beach Resorts®" as an accordion section with the same 8 links (5 courses + 3 lodging). Match the exact pattern used for existing mobile nav sections.

**Step 4 — ® and ™ rules (non-negotiable)**
- `Pebble Beach Golf Links®` — ® every instance
- `Spyglass Hill® Golf Course` — ® every instance
- `The Links at Spanish Bay®` — ® every instance
- `Del Monte Golf Course®` — ® every instance
- `The Hay™` — ™ every instance
- `Pebble Beach Resorts®` — ® every instance
- `The Lodge at Pebble Beach™` — ™ every instance
- `The Inn at Spanish Bay™` — ™ every instance
- `Casa Palmero™` — ™ every instance

Never drop the symbol. Not in link text, not in aria-labels, not in alt text.

### COMMIT
```
feat: add Pebble Beach Resorts® dedicated nav item with mega-menu (courses + lodging)
```

Wait for Vercel READY. Check desktop nav and mobile nav on live site before marking done.

---

## DIRECTIVE #14 — Pebble Beach Resorts® homepage featured section
**Date: August 14 2026**
**Authorized by: MASTER + Sean Schaeffer**
**Priority: High**

### THE GOAL
Create a visually distinct "site within a site" section on the homepage showcasing Pebble Beach Resorts® courses and lodging. It sits between `<FitFinder />` and `<Courses />` in the homepage render order, so it appears near the top before the general course grid.

### STEP 1 — Create `components/PebbleBeachSection.tsx`

**Visual treatment:**
- Background: dark navy (`#0e1f2b` or closest Tailwind equivalent — `bg-[#0e1f2b]`)
- Gold accent color for headings and borders (`#c8a84b` — same gold used site-wide)
- Full-width section, generous vertical padding (`py-20` or `py-24`)
- White text on dark background

**Section structure (top to bottom):**

```
[IAGTO badge chip — small pill: "IAGTO Authorized Partner"]

[H2] Pebble Beach Resorts®
[Subheading] Exclusive access to the world's most celebrated golf destination

[2-col grid: Golf Courses | Lodging]

[TM acknowledgment line]

[CTA button]
```

**Golf Courses column (5 cards):**

Each card shows: course name (with ® or ™), one-line description, link to course page. Spanish Bay® card must show the CLOSED state clearly — "Closed for renovation · Reopens April 17, 2027 · Gil Hanse redesign".

```
Pebble Beach Golf Links®
"The world's most famous public golf course — clifftop drama on Stillwater Cove"
→ /golf-courses/pebble-beach-golf-links/

Spyglass Hill® Golf Course
"Where forest meets ocean — one of the most scenic and challenging tracks on the Peninsula"
→ /golf-courses/spyglass-hill/

The Links at Spanish Bay®  [CLOSED BADGE]
"Closed for renovation · Reopens April 17, 2027 · Gil Hanse redesign"
→ /golf-courses/links-at-spanish-bay/

Del Monte Golf Course®
"The oldest continuously operating golf course west of the Mississippi, est. 1897"
→ /golf-courses/del-monte-golf-course/

The Hay™
"A 9-hole short course designed by Tiger Woods — perfect for a warm-up or twilight round"
→ /golf-courses/the-hay/
```

**Lodging column (3 cards):**

Each card shows: property name (with ™), one-line description, external link. Open in new tab.

```
The Lodge at Pebble Beach™
"Iconic resort at the 18th hole — the benchmark for golf resort luxury"
→ https://www.pebblebeach.com/accommodations/the-lodge/

The Inn at Spanish Bay™
"Scottish links atmosphere with ocean-view rooms and a nightly bagpiper at sunset"
→ https://www.pebblebeach.com/accommodations/the-inn-at-spanish-bay/

Casa Palmero™
"An intimate 24-room retreat — the most exclusive address on the Peninsula"
→ https://www.pebblebeach.com/accommodations/casa-palmero/
```

**TM acknowledgment line (required — below the grid, above the CTA):**
```
Pebble Beach®, Pebble Beach Golf Links®, Spyglass Hill® Golf Course, The Links at Spanish Bay®,
Del Monte Golf Course®, The Hay™, The Lodge at Pebble Beach™, The Inn at Spanish Bay™, and
Casa Palmero™ are trademarks, service marks, and trade dress of Pebble Beach Company. Used with permission.
```
Style: small text (`text-xs`), muted white/gray, centered.

**CTA button:**
```
Plan Your Pebble Beach Resorts® Trip →
href="/quote/?interest=pebble-beach"
```
Gold background, dark text. Match existing CTA button style from other sections.

### STEP 2 — Wire into homepage

**File:** `app/page.tsx`

Add the import and place the component:

```tsx
import PebbleBeachSection from "@/components/PebbleBeachSection";

// In the JSX, between <FitFinder /> and <Courses />:
<FitFinder />
<PebbleBeachSection />
<Courses />
```

### STEP 3 — JSX rules
- All `®` symbols: use `&reg;` or the literal `®` character — both are fine in JSX
- All `™` symbols: use `&trade;` or literal `™`
- Apostrophes in copy: `&apos;`
- No raw `'` or `"` in JSX text nodes

### COMMIT
```
feat: add PebbleBeachSection homepage component — PBR courses + lodging featured section
```

Wait for Vercel READY. Check live homepage — section must appear above the general Courses grid. Check all ® and ™ symbols render correctly. Check Spanish Bay® shows closed badge. Check CTA links to /quote/?interest=pebble-beach.

---

## DIRECTIVE #15 — QuoteForm GTHS parity upgrade
**Date: August 14 2026**
**Authorized by: MASTER + Sean Schaeffer**
**Priority: High — current form is losing lead data**

### CONTEXT

The current QuoteForm has two active bugs and is missing 19 features vs the GTHS GTHSQuoteForm:

**Bug 1:** 4 fields (`hotels_interested`, `activities_interested`, `ground_transport_needed`, `referral_source`) are being inserted into Supabase but those columns don't exist in the `leads` table. They are silently dropped on every submission. This has been happening since launch.

**Bug 2:** `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL` env vars are not set in Vercel — all lead email notifications are silently failing. MASTER will add these env vars separately. Your job is only to ensure the API route is still correctly called after the form upgrade.

### STEP 1 — Supabase migration (run first, before any code changes)

Add all missing columns to the `leads` table. Use the Supabase Management API at `https://api.supabase.com/v1/projects/ewhatqtehwzlypjguvoo/database/query` with the PAT in your credentials.

```sql
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS hotels_interested TEXT[],
  ADD COLUMN IF NOT EXISTS activities_interested TEXT[],
  ADD COLUMN IF NOT EXISTS ground_transport_needed BOOLEAN,
  ADD COLUMN IF NOT EXISTS referral_source TEXT,
  ADD COLUMN IF NOT EXISTS firstname TEXT,
  ADD COLUMN IF NOT EXISTS lastname TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS num_nights TEXT,
  ADD COLUMN IF NOT EXISTS num_rounds TEXT,
  ADD COLUMN IF NOT EXISTS tee_time_pref TEXT,
  ADD COLUMN IF NOT EXISTS tee_time_second TEXT,
  ADD COLUMN IF NOT EXISTS play_arrival TEXT,
  ADD COLUMN IF NOT EXISTS play_departure TEXT,
  ADD COLUMN IF NOT EXISTS lodging_type TEXT,
  ADD COLUMN IF NOT EXISTS room_config TEXT,
  ADD COLUMN IF NOT EXISTS transport_type TEXT,
  ADD COLUMN IF NOT EXISTS dining_notes TEXT,
  ADD COLUMN IF NOT EXISTS fb_event TEXT,
  ADD COLUMN IF NOT EXISTS fb_event_details TEXT,
  ADD COLUMN IF NOT EXISTS corporate_needs TEXT[],
  ADD COLUMN IF NOT EXISTS returning_customer BOOLEAN,
  ADD COLUMN IF NOT EXISTS last_trip_year TEXT,
  ADD COLUMN IF NOT EXISTS ok_to_call BOOLEAN,
  ADD COLUMN IF NOT EXISTS ok_to_text BOOLEAN,
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN;
```

Confirm the migration succeeds before touching any code.

### STEP 2 — Upgrade `components/QuoteForm.tsx`

Add the following fields and features. Match the existing visual style exactly — same input classes, same section headers, same color palette. Do not redesign the form — extend it.

**Contact fields (replace single `name` with split fields):**
- First name (required) — `firstname`
- Last name (required) — `lastname`
- Keep email, phone as-is
- Add: Company / Group name (optional) — `company`

**Trip details (add to existing section):**
- Number of nights (text select: 1/2/3/4/5/6/7/8/9/10/11/12/13/14/14+) — `num_nights`
- Number of rounds (select: 1/2/3/4/5/6/7/8/9/10/10+) — `num_rounds`

**Tee time preferences (new section):**
- Tee time preference (required select):
  `Early Bird (6:00–7:30am)` / `Morning (7:30–9:00am)` / `Mid-Morning (9:00–10:30am)` / `Late Morning (10:30am–12pm)` / `Afternoon (12pm–2pm)` / `Twilight (2pm+)` / `No Preference`
  → `tee_time_pref`
- Second choice tee time (optional, same options + "No Second Choice") — `tee_time_second`

**Arrival & departure play (new section):**
- Play on day of arrival? (required select: Yes / No) — `play_arrival`
- Play on day of departure? (required select: Yes / No) — `play_departure`

**Lodging preferences (new section):**
- Lodging type (select: Hotel/Resort / Boutique Property / Private Rental / No Preference) — `lodging_type`
- Room configuration (select: Single Occupancy / Double Occupancy / Mix of Both / Not Sure) — `room_config`

**Transportation (extend existing):**
- Keep existing groundTransport boolean (renamed to `ground_transport_needed`)
- If Yes: show Transport type select: `Group Shuttle` / `Charter Bus` / `Limo/SUV` / `Rental Cars` / `Not Sure` — `transport_type`

**Dining & F&B (new section):**
- Dining notes (text input: "Any dietary restrictions or dining preferences?") — `dining_notes`
- Special F&B event? (select: No / Yes — Private Dinner / Yes — Group Lunch / Yes — Welcome Reception / Yes — Awards Banquet) — `fb_event`
- If fb_event is not "No": show details textarea — `fb_event_details`

**Corporate needs (new section, multi-select chips):**
Options: `AV/Presentation` / `Branded Materials` / `Prizes & Gifts` / `Team Building Activity` / `Meeting Space` / `None`
→ `corporate_needs` (TEXT[] array)

**Returning customer (new section):**
- Checkbox: "I've traveled with Monterey Golf Tours before" → `returning_customer`
- If checked: show Year select (last 10 years) → `last_trip_year`

**Contact preferences (required — at least one must be checked):**
- Checkbox: "You may call me" → `ok_to_call`
- Checkbox: "You may text me" → `ok_to_text`
- Validation: at least one must be true before submit is allowed

**Consent (required):**
- Checkbox (required): "I agree to the [Privacy Policy](/privacy/) and consent to being contacted about my trip request." → `consent_given`
- Submit button must be disabled if this is unchecked

**Live trip summary card:**
- Above the submit button, show a summary card that updates as the user fills in the form
- Show: dates, group size, selected courses (names), selected hotel, tee time preference, number of nights/rounds
- Use the same gold/navy color scheme as the PebbleBeachSection
- Label it: "Your trip at a glance"

**Rich thank-you state:**
- After successful Supabase insert + notify-lead API call, show a `done` state instead of the basic success message
- Done state shows:
  - "We've received your request — expect to hear from us within 24 hours"
  - Summary of what they requested (courses, hotel, dates, group size)
  - "In the meantime" links to: /itineraries/, /blog/, /golf-courses/pebble-beach-golf-links/

### STEP 3 — Update Supabase insert payload in `components/QuoteForm.tsx`

The insert object must include ALL fields. Replace the existing insert payload with the full set:

```ts
{
  // Contact
  firstname, lastname, email, phone, company,
  // Trip
  group_size: groupSize,
  travel_dates: `${startDate} to ${endDate}`,
  dates_flexible: datesFlexible,
  trip_length: tripLength,
  num_nights: numNights,
  num_rounds: numRounds,
  // Courses & hotels
  courses_interested: selectedCourses,
  hotels_interested: selectedHotels,
  // Tee times
  tee_time_pref: teePref,
  tee_time_second: teePref2,
  play_arrival: playArrival,
  play_departure: playDeparture,
  // Lodging
  lodging_type: lodgingType,
  room_config: roomConfig,
  // Transport
  ground_transport_needed: groundTransport,
  transport_type: transportType,
  // F&B
  activities_interested: selectedActivities,
  dining_notes: diningNotes,
  fb_event: fbEvent,
  fb_event_details: fbEventDetails,
  // Corporate
  corporate_needs: corporateNeeds,
  // Non-golfer
  non_golfer_in_group: nonGolfer,
  // Budget
  budget_per_person: budget,
  // Returning
  returning_customer: returningCustomer,
  last_trip_year: lastYear,
  // Contact prefs
  ok_to_call: okToCall,
  ok_to_text: okToText,
  // Referral
  referral_source: referralSource === 'Other' ? referralOther : referralSource,
  // Consent
  consent_given: consentGiven,
  // Message
  message,
}
```

### STEP 4 — Update notify-lead email template

**File:** `app/api/notify-lead/route.ts`

Add the new fields to the `buildHtml` function table so they appear in the email Sean receives. Add rows for: tee_time_pref, play_arrival, play_departure, lodging_type, room_config, transport_type, fb_event, returning_customer, ok_to_call, ok_to_text. Keep existing rows.

### HARD CONSTRAINTS
- Do NOT remove any existing fields from the form — only add
- Do NOT change the visual design or color scheme — extend it
- Do NOT remove the budget range selector, nonGolfer checkbox, or activities chips — keep them
- The `name` field in the leads table stays — populate it as `${firstname} ${lastname}` on insert (keeps backward compatibility)
- All new selects and inputs must match the className pattern of existing form elements
- JSX entity escaping: `&apos;` `&ldquo;` `&rdquo;` — no raw apostrophes in text nodes
- TypeScript: no `any` types. New state vars must be properly typed.

### VALIDATION RULES
- `firstname`, `lastname`, `email` — required, block submit if empty
- `ok_to_call` OR `ok_to_text` — at least one required
- `consent_given` — required, submit button disabled if false
- All other new fields — optional

### COMMIT (two commits — migration separate from code)

Commit 1 (after Step 1):
```
fix: add missing leads table columns — hotels_interested, activities_interested, ground_transport_needed, referral_source + 21 new GTHS parity fields
```

Commit 2 (after Steps 2–4):
```
feat: QuoteForm GTHS parity — 19 new fields, live summary card, rich thank-you state, consent + contact prefs
```

Wait for Vercel READY after Commit 2. Test the form end-to-end on the live site:
1. Fill out the form completely
2. Submit
3. Verify the Supabase `leads` row in the dashboard contains all fields (not just the old 12)
4. Verify the done/thank-you state renders correctly
5. Report back with the Supabase row ID of the test submission


