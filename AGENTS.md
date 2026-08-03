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

