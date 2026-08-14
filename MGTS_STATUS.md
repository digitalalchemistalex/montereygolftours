---
name: montereygolftours
description: "Master skill for MontereyGolfTours.com (MGTS) — Monterey Peninsula + Central Coast golf tour booking site. Sean Schaeffer property. Next.js 15, dedicated Supabase, dedicated GitHub repo, dedicated Vercel project. NO ADMIN PANEL. MUST READ before any code, content, SEO, deploy, or DB task on this project. Trigger on: montereygolftours, monterey golf tours, MGTS, Monterey Peninsula golf packages, Carmel golf tours, any task related to this domain or repo."
---

# MONTEREYGOLFTOURS.COM — MASTER STRATEGY & SKILL
**Last verified: August 14 2026**
**Status: LIVE — deployed at montereygolftours.vercel.app (domain cutover pending)**
**READ THIS BEFORE ANY WORK ON THIS PROJECT**

---

## LIVE SITE STATE (verified August 14 2026)

| Asset | Status | Verified |
|---|---|---|
| GitHub repo | ✅ Live | `digitalalchemistalex/montereygolftours` |
| Vercel project | ✅ READY | `prj_36SupULpvPpDElcJmqCZlvmGgjEi`, team `golfbookingsystem` |
| Production URL | ✅ Live | `montereygolftours.vercel.app` |
| Domain | ⏳ Pending cutover | `montereygolftours.com` DNS on Vercel nameservers, intentionally detached until MASTER authorizes |
| All pages | ✅ 200 OK | All routes returning 200 |
| Supabase | ✅ Live | `ewhatqtehwzlypjguvoo.supabase.co` |
| Resend email alerts | ❌ NOT WIRED | `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` NOT in Vercel env — lead emails are silently failing |

---

## ⚠️ CRITICAL LEGAL CONSTRAINT — READ FIRST

MGTS operates under an **active IAGTO agreement with Pebble Beach Company**. This is a carveout from the general prohibition — PBC course names CAN be used on MGTS with mandatory ® and ™ on every instance. Full rules in `golfcentralcoast-legal` skill.

**The strategy file previously said "never use Pebble Beach trademarks" — that was pre-IAGTO-agreement. It is now WRONG. MGTS is AUTHORIZED to name PBC courses.**

Current live TM usage: courses named with ® and ™ in `lib/courses.ts`, footer has IAGTO disclaimer block. Exact wording of footer disclaimer must still be verified against the signed agreement (MASTER action — not yet done).

---

## INFRASTRUCTURE & CREDENTIALS

### GitHub
- **Repo:** `digitalalchemistalex/montereygolftours`
- **MASTER token:** `[REDACTED]`
- **Raza's Claude token:** `[REDACTED]`

### Vercel
- **Project ID:** `prj_36SupULpvPpDElcJmqCZlvmGgjEi`
- **Team:** `golfbookingsystem`
- **Production URL:** `montereygolftours.vercel.app`
- **MASTER token (1yr):** `[REDACTED]`
- **Raza's Claude token:** `[REDACTED]`
- **Env vars set:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Env vars MISSING:** `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` — lead emails are broken until these are set

### Supabase
- **URL:** `https://ewhatqtehwzlypjguvoo.supabase.co`
- **DB password:** `[REDACTED]`
- **Anon key:** `[REDACTED]`
- **Service role key:** `[REDACTED]`
- **Management API PAT:** `[REDACTED]`
- **Separate instance** from GTHS, MSG, PSG, buyback

---

## TECH STACK (LIVE)

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel (golfbookingsystem team)
- **Database:** Supabase (dedicated instance)
- **Email:** Resend via `/api/notify-lead/route.ts` — NOT YET FUNCTIONAL (env vars missing)
- **Branch:** Raza pushes directly to `main` — no dev branch workflow
- **No admin panel** — no auth tables

---

## CONTENT INVENTORY (verified against live repo)

### Courses — 15 in `lib/courses.ts`, 14 shown in nav ("View all 14 courses")
| Slug | Name | Status |
|---|---|---|
| bayonet | Bayonet | ✅ Live |
| black-horse | Black Horse | ✅ Live |
| carmel-valley-ranch | Carmel Valley Ranch | ✅ Live |
| quail-lodge | Quail Lodge & Golf Club | ✅ Live |
| laguna-seca-golf-ranch | Laguna Seca Golf Ranch | ✅ Live |
| pacific-grove-golf-links | Pacific Grove Golf Links | ✅ Live |
| poppy-hills | Poppy Hills Golf Course | ✅ Live |
| club-at-pasadera | Club at Pasadera | ✅ Live (TPC partner registration still pending — MASTER action) |
| pebble-beach-golf-links | Pebble Beach Golf Links® | ✅ Live |
| spyglass-hill | Spyglass Hill® Golf Course | ✅ Live |
| links-at-spanish-bay | The Links at Spanish Bay® | ✅ Live — marked CLOSED, reopens April 17 2027 |
| del-monte-golf-course | Del Monte Golf Course® | ✅ Live |
| the-hay | The Hay™ | ✅ Live |
| pasatiempo | Pasatiempo Golf Club | ✅ Live |

**Note: `the-hay` is a short course (9-hole). It appears in `lib/courses.ts` and the nav but is not in the confirmed 13-course list from Sean. Verify with Sean whether The Hay should be bookable as a standalone or only as an add-on.**

### Hotels — 11 in `lib/hotels.ts`
| Slug | Property | Area |
|---|---|---|
| hyatt-regency-monterey | Hyatt Regency Monterey | Monterey |
| monterey-plaza | Monterey Plaza Hotel & Spa | Monterey |
| intercontinental-the-clement | InterContinental The Clement Monterey | Monterey |
| portola-hotel | Portola Hotel & Spa | Monterey |
| casa-munras | Casa Munras Garden Hotel & Spa | Monterey |
| hotel-abrego | Hotel Abrego | Monterey |
| embassy-suites-monterey-bay-seaside | Embassy Suites Monterey Bay Seaside | Seaside |
| monterey-beach-hotel | Monterey Beach Hotel | Sand City |
| bernardus-lodge | Bernardus Lodge & Spa | Carmel Valley |
| quail-lodge | Quail Lodge & Golf Club | Carmel Valley |
| carmel-valley-ranch | Carmel Valley Ranch | Carmel Valley |

### Blog — 10 posts live
1. best-time-to-play-golf-monterey-peninsula
2. how-to-plan-a-group-golf-trip-monterey
3. bayonet-golf-course-guide
4. best-golf-courses-monterey-peninsula
5. monterey-golf-trip-on-a-budget
6. pacific-grove-golf-links-guide
7. carmel-valley-ranch-golf-guide
8. monterey-car-week-golf-guide
9. poppy-hills-golf-course-guide
10. monterey-golf-first-time-guide

### Itineraries — 6 live
1. 3-day-monterey-golf-weekend
2. 4-day-monterey-peninsula-golf-trip
3. 5-day-complete-monterey-golf-vacation
4. 7-day-ultimate-monterey-golf-trip
5. carmel-valley-golf-getaway
6. monterey-golf-trip-best-value

### Destinations — 6 live
monterey, carmel, carmel-valley, pacific-grove, seaside, pebble-beach-area

### Sitemap
All pages registered. Image sitemap live at `/image-sitemap.xml`.

---

## HOMEPAGE SECTIONS (verified against `app/page.tsx`)

Order: Hero → Configurator → FitFinder → Courses → Packages → Itinerary → Hotels → LocalIntel → FAQ → Footer

**Hero stats (WRONG — need fixing):**
- Shows "8 Courses on tap" — should be 14
- Shows "8 Properties to stay" — should be 11

---

## SUPABASE SCHEMA (verified live)

### `leads` table (actual columns)
```
id, created_at, name, email, phone, group_size, travel_dates, trip_length,
budget_per_person, courses_interested (ARRAY), non_golfer_in_group (boolean), message
```

**PROBLEM:** QuoteForm tries to insert `hotels_interested`, `activities_interested`, `ground_transport_needed`, `referral_source` — these columns DO NOT EXIST in the table. These fields are silently dropped on every lead submission. Supabase does not error on extra columns — it just ignores them.

### `course_pricing` table (14 rows, all "enquire" labels — no dollar amounts)

---

## NAVIGATION (verified in `components/Header.tsx`)

Top-level: Courses (dropdown) | Hotels (dropdown) | Destinations (dropdown) | Itineraries (dropdown) | Packages | Blog | About | FAQ

**Courses dropdown:** PB Resorts section (5 courses) + Championship/Resort/Daily Fee section (9 courses) = 14 total. "View all 14 courses" footer link.

**Hotels dropdown:** Monterey section (8 hotels) + Carmel & Valley section (3 hotels) = 11 total. "View all 11 hotels" footer link.

**No Pebble Beach® dedicated nav item** — PBC courses appear in the Courses dropdown under a "Pebble Beach Resorts®" sub-header.

---

## QUOTE FORM STATE (verified against `components/QuoteForm.tsx`)

### Fields that EXIST
name, email, phone, groupSize, startDate, endDate, datesFlexible, tripLength, nonGolfer, selectedHotels, selectedActivities, groundTransport, referralSource, referralOther, budget, selectedCourses, message

### Features MISSING vs GTHS GTHSQuoteForm
- First/last name split (MGTS uses single `name` field)
- Company field
- Number of nights field (MGTS uses `tripLength` dropdown instead)
- Number of rounds
- Tee time preference (1st choice)
- Second choice tee time
- Play on arrival? Yes/No
- Play on departure? Yes/No
- Lodging type selector
- Room configuration selector
- Transport type (MGTS has bool only — GTHS has type: Shuttle/Charter/Limo/Rental)
- Dining venue chips (MGTS has generic activity chips, not venue-specific)
- F&B event field + details
- Corporate needs chips
- Concierge services (for private residence)
- Returning customer checkbox + year
- "OK to call" / "OK to text" checkboxes
- Privacy/comms consent checkbox (required)
- Live trip summary card above submit
- Rich thank-you state with confetti + course/hotel cards
- Session/UTM tracking on submit payload
- Cross-device prefill from sessionStorage

### DB columns missing for existing fields
`hotels_interested`, `activities_interested`, `ground_transport_needed`, `referral_source` — all being silently dropped on insert

---

## KEY PEOPLE

- **Sean Schaeffer** — client/owner, decision authority on legal/content
- **Raza** — sole developer (`raza@montereygolftours.com`, `johnparker2086@gmail.com`)
- **Karlyn Hawke** — Director of Leisure Travel Sales, Pebble Beach Co. (`khawke@pebblebeach.com`, 831-648-7861)
- **MASTER (Alex)** — PM/architect (`digitalalchemistalex@gmail.com`, `dawoodanialtaaf@gmail.com`)

---

## OPEN BLOCKERS (all MASTER/Sean actions — not Raza)

1. **Resend env vars** — add `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` to Vercel. Until done, zero lead emails are sent.
2. **PBC staging submission** — submit `montereygolftours.vercel.app` to `traveldesk@pebblebeach.com` before domain cutover
3. **Footer TM wording** — pull exact trademark acknowledgment text from signed IAGTO agreement, give to Raza to replace current live footer text
4. **TPC partner registration** — complete before Pasadera page is promoted
5. **Domain cutover** — authorize after blockers 2-3 are done
6. **OG image** — source a real owned photo before cutover (currently no owned OG image)
7. **Low-res hero images** — Carmel Valley Ranch, InterContinental The Clement, Hotel Abrego heroes are low-res; source higher-res replacements

---

## PENDING DIRECTIVES (not yet executed by Raza)

- **Hero stat fix** — change "8 Courses on tap" → "14" and "8 Properties to stay" → "11"
- **QuoteForm upgrade** — mirror GTHS form features (see fields list above) + fix missing DB columns
- **Pebble Beach® homepage section** — featured section near top of homepage for PBR courses + lodging
- **Pebble Beach® nav item** — dedicated top-level nav item (currently PBC only appears in Courses dropdown sub-header)

---

## BRAND POSITIONING

**Scope:** Monterey Peninsula + Central Coast (confirmed by Sean — accommodates Pasatiempo/Santa Cruz and future additions)

**Voice:** Knowledgeable specialist talking peer-to-peer. Never "all-inclusive" framing. Fog is real — mention it honestly (burns off by midday). Year-round play.

**Copy rules:**
- No hardcoded prices anywhere
- Dynamic pricing from Supabase `course_pricing` table
- JSX entity escaping: `&apos;` `&ldquo;` `&rdquo;`
- Trailing slash on all URLs
- PBC trademarks: ® or ™ on every instance, no exceptions

---

## WORKFLOW RULES

- **Raza pushes directly to `main`** — no dev branch
- **AGENTS.md** in repo root is the live instruction file for Raza's Claude. MASTER pushes directives there via GitHub Contents API.
- **Never trust Raza's status reports alone** — verify against live GitHub commits + Vercel deployments + live HTTP checks
- **SHA freshness** — always fetch fresh SHA immediately before any PUT to GitHub Contents API
- **Never use tracker files** (MGTS_MasterTracker.xlsx, MGTS_BuildTracker.xlsx) for status — always verify live
- **Production URL only** — preview URLs hit Vercel SSO wall; always test against `montereygolftours.vercel.app`

---

## KNOWN ISSUES / GOTCHAS

1. **Hero stats wrong** — hardcoded "8" for both courses and hotels in `components/Hero.tsx`
2. **Lead DB columns missing** — 4 QuoteForm fields silently fail on insert
3. **Resend not wired** — RESEND_API_KEY env var not set, all lead emails fail silently
4. **Logo** — Current logo went through a Lone Cypress trademark scare (AGENTS.md emergency directive). Raza replaced it. Verify current logo is safe before domain cutover.
5. **The Hay™** — 9-hole short course. Confirm with Sean whether it should be bookable standalone.
6. **Spanish Bay® CLOSED** — April 17 2027 reopen. Must not appear as bookable until then.
7. **TPC Pasadera** — TPC partner registration not complete. Page is live but should not be actively promoted.
8. **Footer TM disclaimer** — exact wording not yet verified against signed IAGTO agreement.
9. **Del Monte Golf Course®** — carries ® in `lib/courses.ts`. Verify this is correct per IAGTO agreement (Del Monte is a PBR property but the ® symbol on "Del Monte Golf Course" specifically needs confirmation).

---

## RELATED SKILLS

- `golfcentralcoast-legal` — trademark guardrails (mandatory for ALL content)
- `master-coding-standards` — universal coding rules
- `master-session-protocol` — session protocol
- `live-site-protection` — production safety
- `truth-verification` — no hallucinations

---

## VERSION HISTORY

| Date | Changes |
|---|---|
| June 2 2026 | Initial strategy created. Pre-build phase. 8 courses verified. |
| August 14 2026 | Full rewrite. Site is live. All content inventoried from live repo and Supabase. Stale pre-build content removed. Verified: 15 courses, 11 hotels, 10 blogs, 6 itineraries, 6 destinations. Known issues documented. Open blockers current. |
