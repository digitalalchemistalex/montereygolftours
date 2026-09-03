# MGTS Admin Tracker
**Project:** montereygolftours.com  
**Last updated:** 2026-08-21  
**Status:** Pre-build — blocked on D#12–D#15 + MASTER auth sign-off  

---

## Context

MGTS launched with no admin panel (explicitly ruled out in strategy doc). That decision is now reversed — the business needs it. This file is the single source of truth for the admin build. Claude must read this file at the start of every session before making any admin-related decision or writing any directive.

**Why reversed:** Leads silently dropping since launch (RESEND broken, D#7 unresolved). Sean has zero visibility into his pipeline. At $5–20k per booking this is unacceptable. Admin needed to: see leads, build quotes, send them, track replies.

**Design principle:** GTHS pipeline architecture + MSG pricing precision + MGTS-specific PBC/IAGTO layer.

---

## Sean Feedback — Received 2026-08-21

Raw feedback from Sean. Each item tracked below with status and directive assignment.

| # | Sean's request | Status | Assigned to | Notes |
|---|---|---|---|---|
| S1 | Portola Hotel listed first in all dropdowns and lodging pages | ✅ Done · 5ab96d5002 | MASTER | lib/hotels.ts reordered — Portola now position #1 |
| S2 | Carmel Valley Ranch golf photos are no good | ❌ Open | TBD directive | Need better golf course photos — not the current ones. Source needed. |
| S3 | Pasadera has only the hero image — needs more photos | ❌ Open | TBD directive | Single image on Pasadera page. Need gallery or multiple photos. |
| S4 | Pacific Grove page has a photo problem | ❌ Open | TBD directive | Unspecified — need to inspect live page and identify the issue |
| S5 | Poppy Hills images aren't good — need to find some | ❌ Open | TBD directive | Need sourcing + replacement. IAGTO portal may have options (see S6). |
| S6 | Re-access IAGTO portal to check images available for PBC properties | ❌ Open | MASTER action | Sean/MASTER need to log into IAGTO portal. Could solve S5 and other PBC image gaps. |
| S7 | Need a toll-free phone number on the site | ❌ Open | Sean action | Sean to supply the number. Once supplied → Raza adds to header/footer/contact. |
| S8 | Homepage "Which course fits your group?" section needs to be replaced | ✅ Removed · b0676320ae | MASTER | FitFinder removed from app/page.tsx. Replacement section TBD — MASTER to propose. |
| S9 | QuoteForm must match GTHS — group size needs precise number of golfers | ✅ Done · e68097de4392 | MASTER | GROUP_SIZES dropdown replaced with <input type="number" min="2" max="400"> — label "Number of golfers" — 3 commits to reach final values |

---

## Action Items from Sean Feedback

### MASTER must decide/action before Raza can touch:

- **S6:** Log into IAGTO portal, audit what images are available for PBC properties (Pebble Beach Golf Links®, Spyglass Hill®, Del Monte®). This could solve S5 (Poppy Hills is not PBC but IAGTO portal may have Monterey Peninsula golf imagery). Document what's available and what requires photographer credit.
- **S7:** Sean supplies the toll-free number → MASTER adds to directive for Raza to implement in header, footer, contact page, QuoteForm.
- **S8:** MASTER proposes what replaces "Which course fits your group?" before any directive is written. Options: a testimonials strip, a "How it works" 3-step block, an itinerary highlights section, a stats bar, or a trust/credibility block. Decision needed before D#13/D#14 work begins.

### Raza directive scope additions:

- **S1:** Add to next content directive — Portola Hotel sort_order = 1 in data file or Supabase. Affects: hotel dropdown in QuoteForm, lodging page order, any hotel list component.
- **S2, S3, S4, S5:** Image sourcing is a MASTER/Sean task. Once images are sourced and supplied, Raza implements. Do not send Raza to find images — he will use wrong ones.
- **S9:** Already within D#15 scope. Add explicit note: group_size field must be `<input type="number" min="1">` — not a dropdown, not a range. Match GTHS QuoteForm exactly.

---

## Pre-requisites (must all close before D#16 starts)

| Item | Status | Notes |
|---|---|---|
| D#12 hero stats fixed (8→14 courses, 8→11 hotels) | ✅ Done | Live — confirmed 14 courses / 11 hotels on montereygolftours.vercel.app |
| D#13 PBR nav mega-menu live | ✅ Done | Live — PBR in nav confirmed |
| D#14 PBR homepage section live | ✅ Done | Live — PBR homepage section confirmed |
| D#15 QuoteForm 25-field upgrade | ✅ Done | Full redesign + DB migration complete — 2026-08-22 |
| MASTER formal sign-off on admin build | ✅ Done | Given 2026-08-22 |

---

## Directive Block: D#16–D#21

### D#16 — Auth + Middleware
**Status:** BLOCKED (pre-requisites not met)  
**Depends on:** All pre-requisites above  

**What it does:** HMAC-SHA256 login, brute force protection, session cookie, admin_users table, logAndAlert() error tracking.

**Critical rules from GTHS lessons:**
- Middleware at `src/middleware.ts` NOT root (silent failure if at root)
- From address must be `"Sean Schaeffer <sean@montereygolftours.com>"` not bare email
- Brute force: 5 attempts per IP per 15min → lockout + alert alex@

**Tasks:**
- [ ] HMAC-SHA256 middleware at src/middleware.ts
- [ ] Brute force rate limiter (5 attempts → lockout + email alex@)
- [ ] Session cookie with expiry
- [ ] Backup protonmail access
- [ ] admin_users table in Supabase
- [ ] Seed: Sean (sean@montereygolftours.com), Alex (digitalalchemistalex@gmail.com), backup protonmail
- [ ] ADMIN_SECRET env var set in Vercel
- [ ] /admin login page with error states
- [ ] logAndAlert() utility in src/lib/admin-error.ts
- [ ] Verify live on montereygolftours.vercel.app

**Completion criteria:** Sean can log in at /admin. Brute force tested. logAndAlert confirmed sending to alex@.

---

### D#17 — Lead Pipeline + Detail
**Status:** PENDING (blocked on D#16)  
**Depends on:** D#16 complete  

**What it does:** Lead list with pipeline filters, lead scoring, all 25 D#15 fields on detail view, notes, activity log.

**Critical rules:**
- activity_log `details` column is JSONB — notes go in `details.note`, NOT a separate text column (GTHS had this bug and had to fix it)
- activity_log real columns: `id, action, entity_type, entity_id, details, created_by, created_at`
- Spanish Bay® must show as closed/crossed-out chip on courses_interested
- PBC courses must show IAGTO badge on lead detail
- Lead score = group_size × budget_tier × urgency (travel <60 days = 3x, 60-120 = 2x, 120+ = 1x)

**Tasks:**
- [ ] activity_log table in Supabase (correct schema — details jsonb)
- [ ] /admin/leads list with status filter tabs (New/Contacted/Quoted/Booked/Archived)
- [ ] Lead scoring display (Hot 🔥 / Warm 🌤 / Cold)
- [ ] Sort: travel date, group size, budget
- [ ] ok_to_call / ok_to_text badges on list row
- [ ] PBC badge on leads with PBC courses interested
- [ ] /admin/leads/[id] detail — all 25 D#15 fields visible
- [ ] Spanish Bay® chip shown as closed/crossed out
- [ ] Status change dropdown inline
- [ ] Notes field → saves to activity_log details.note
- [ ] Activity feed renders details.note + details.subject
- [ ] Notifications resent button

**Completion criteria:** Sean can see all leads, open any lead, read all 25 fields, add a note, change status.

---

### D#18 — Quote Builder + Rate Configs
**Status:** PENDING (blocked on D#17)  
**Depends on:** D#17 complete + Sean supplies IAGTO rates for 3 PBC courses  

**What it does:** Quote builder embedded in lead detail, auto-fills from form data, full MSG-style pricing (golf/lodging/F&B/transport/activities), margin slider, per-person breakdown, PBC rate enforcement, email preview, send via Resend.

**Critical rules:**
- Auto-fill reads `raw_payload._preview`: hotel, courses, dates, rounds, group_size
- IAGTO rates stored in rate_configs.iagto_rate — MUST NEVER appear in customer email, only per-person package price
- is_pbc flag on PBC courses in rate_configs
- Spanish Bay® greyed out / not selectable in course picker (closed until Apr 17 2027)
- From address: `"Sean Schaeffer <sean@montereygolftours.com>"` (not bare — GTHS bug)
- Course images in email must be absolute URLs — prepend `https://montereygolftours.com` if relative (GTHS bug)
- IAGTO mandatory acknowledgment line in every quote email footer
- Monterey TOT = 10.5% (pre-filled, editable)
- California golf tax = 0% (pre-filled)
- Portola Hotel must be first in hotel selector (S1)

**rate_configs table schema:**
```
id uuid PK
slug text
name text
type text (golf | hotel)
is_pbc bool
net_rate numeric
iagto_rate numeric (PBC courses only — internal, never shown to customer)
tax_rate numeric
resort_fee numeric
season_year int
updated_at timestamptz
```

**quote_drafts table schema:**
```
id uuid PK
lead_id uuid FK → leads
status text CHECK (draft | sent | approved | declined)
golf_items jsonb
lodging_items jsonb
fb_items jsonb
transport_items jsonb
activity_items jsonb
margin_pct numeric
total_pp_single_golfer numeric
total_pp_double_golfer numeric
total_pp_single_nongolfer numeric
total_pp_double_nongolfer numeric
group_total numeric
sent_at timestamptz
approved_at timestamptz
updated_at timestamptz DEFAULT NOW()
```

**Tasks:**
- [ ] rate_configs table in Supabase
- [ ] Seed rate_configs: all 13 MGTS courses + 11 hotels (PBC flagged, is_pbc=true for PBL/SH/SB/Del Monte)
- [ ] Spanish Bay® row: is_pbc=true, net_rate=null (closed), closed_until='2027-04-17'
- [ ] quote_drafts table in Supabase
- [ ] Quote builder embedded in /admin/leads/[id] as a tab
- [ ] Auto-fill from lead raw_payload
- [ ] Golf line items: course, players, NET rate, golf tax (CA=0% pre-filled)
- [ ] Lodging line items: hotel, nights, rooms, nightly rate, TOT (10.5%), resort fee, tourism fee
- [ ] F&B line item: headcount, cost pp, description
- [ ] Transport line item: MRY/SJC/SFO selector, cost pp
- [ ] Activities line items (whale watching, wine tour, Aquarium, etc.)
- [ ] Margin % slider (default 20%)
- [ ] Per-person breakdown: golfer/non-golfer × single/double occ
- [ ] PBC courses flagged in course picker (IAGTO badge, rate shown internally only)
- [ ] Spanish Bay® greyed out / disabled in course picker
- [x] Portola Hotel listed first in hotel selector (S1) — done in lib/hotels.ts · 5ab96d5002
- [ ] Branded email preview (Sean sees exactly what customer sees)
- [ ] From address formatted correctly with display name
- [ ] Course images absolute URLs in email
- [ ] IAGTO acknowledgment in email footer (mandatory)
- [ ] ↑ Save rate button appears for unrated courses → upserts rate_configs
- [ ] POST /api/admin/leads/[id]/send-quote route
- [ ] Quote history panel per lead (sent/approved/declined badges)
- [ ] PATCH /api/admin/leads/[id]/quote-status (approve → lead → booked, decline)
- [ ] GET/POST /api/admin/rates routes
- [ ] /admin/rates page (rate_configs management UI)

**Completion criteria:** Sean can open a lead, auto-filled quote appears, adjust margin, preview email (NET rates not visible), send quote, lead moves to quoted.

---

### D#19 — Email Tracking + Gmail Poll + SMS
**Status:** PENDING (blocked on D#18)  
**Depends on:** D#18 complete  

**What it does:** Resend webhook tracks email events (delivered/opened/clicked/bounced), Gmail poll cron detects lead replies, Twilio SMS fires on quote send if ok_to_text.

**Critical rules:**
- email_log must have `clicked_url` column — tells Sean which link the lead clicked (GTHS added this)
- Resend webhook must be manually registered at resend.com after go-live (health panel must show this as red until done)
- Gmail poll cron: every 2hrs, matches reply sender email to quoted leads, logs lead_replied to activity_log
- Twilio is currently trial — SMS code is built but won't work until Sean upgrades + verifies toll-free number
- Toll-free number to be supplied by Sean (S7) — add to SMS sender config once received

**email_log table schema:**
```
id uuid PK
lead_id uuid FK → leads
quote_draft_id uuid FK → quote_drafts
resend_email_id text
delivered_at timestamptz
opened_at timestamptz
clicked_at timestamptz
clicked_url text
replied_at timestamptz
bounced_at timestamptz
```

**Cron schedule (vercel.json):**
```
/api/cron/enrich-leads    → 0 2 * * *     (2am daily)
/api/cron/poll-inbox      → */30 * * * *  (every 30 mins)
/api/cron/poll-replies    → 0 */2 * * *   (every 2 hours)
```

**Tasks:**
- [ ] email_log table in Supabase (all columns incl. clicked_url)
- [ ] POST /api/webhooks/resend — delivered/opened/clicked/bounced handler
- [ ] Webhook updates email_log + logs to activity_log
- [ ] clicked_url stored on click event
- [ ] GET /api/cron/poll-replies — Gmail reply detection
- [ ] GET /api/cron/poll-inbox
- [ ] GET /api/cron/enrich-leads
- [ ] Cron routes added to vercel.json
- [ ] src/lib/twilio-sms.ts — smsQuoteToLead() function
- [ ] Twilio SMS fires after quote send if ok_to_text=true
- [ ] Toll-free number configured once Sean supplies it (S7)
- [ ] Activity feed shows email tracking events (opened, clicked, replied)
- [ ] Health panel Resend webhook status shows red until manually confirmed

**Completion criteria:** Sean can see in the activity log when a lead opens the email, clicks a link, or replies.

---

### D#20 — Health Panel
**Status:** PENDING (blocked on D#19)  
**Depends on:** D#19 complete  

**What it does:** Single /admin/health page Sean checks to know if everything is working. All checks are live API calls — never cached.

**Tasks:**
- [ ] /admin/health page
- [ ] Env var status: RESEND_API_KEY, LEAD_NOTIFY_EMAIL, TWILIO_ACCOUNT_SID, ADMIN_SECRET
- [ ] Vercel latest deploy: readyState + commit SHA
- [ ] HTTP check: all 14 course pages (200 OK)
- [ ] HTTP check: all 11 hotel pages (200 OK)
- [ ] Spanish Bay® closed flag: active ✓ + countdown (days until Apr 17 2027)
- [ ] PBC trademark scan: ®/™ present on all PBC mentions across all pages
- [ ] Hardcoded price detection in src/ (anything that isn't a Supabase query)
- [ ] Domain alias status (montereygolftours.com not yet assigned — red until cutover authorized)
- [ ] PBC staging submission status (manual flag Sean sets in settings)
- [ ] Resend webhook registration status (manual flag — red by default)
- [ ] Lead pipeline stats (total leads, last received timestamp)
- [ ] Email alerts status (red if RESEND_API_KEY missing)
- [ ] Hero stats check (confirms D#12 is live — 14 courses, 11 hotels)
- [ ] Toll-free number present in site config (S7)

**Completion criteria:** Sean can see at a glance exactly what's broken and what's working with no technical knowledge needed.

---

### D#21 — Standalone Quote Builder
**Status:** PENDING (blocked on D#20)  
**Depends on:** D#18 components complete  

**What it does:** /admin/quotes/new — same quote builder as D#18 but not pre-filled, for manual/phone/walk-in quotes.

**Tasks:**
- [ ] /admin/quotes/new standalone page
- [ ] Same pricing components as D#18 (reused — no new code)
- [ ] Optional lead_id field (link to existing lead after the fact)
- [ ] Quotes list at /admin/quotes (all sent quotes across all leads)
- [ ] "Quotes" nav item in sidebar

**Completion criteria:** Sean can build and send a quote without needing an existing lead record.

---

## Known bugs to NOT repeat (from GTHS/MSG)

| Bug | What happened | Fix |
|---|---|---|
| Middleware at root | Silent failure — all routes unprotected | Always use `src/middleware.ts` |
| Bare from address | Resend rejected — "mike@..." not accepted | Format: `"Name <email>"` |
| Relative image URLs in email | Images broken in email clients | Prepend `https://montereygolftours.com` if path starts with `/` |
| Notes column mismatch | activity_log insert failed silently | Notes go in `details.note` (jsonb), not a separate column |
| Columns don't exist in Supabase | Supabase silently drops fields | Verify schema before any insert |
| Preview URL returns SSO wall | Can't use preview URLs for testing | Always test on `montereygolftours.vercel.app` |

---

## Sean action items (cannot be done by Claude or Raza)

| Item | For | Status |
|---|---|---|
| Supply IAGTO rates for PBL®, SH®, Del Monte® | D#18 rate_configs seed | ❌ Not supplied |
| Submit staging URL to traveldesk@pebblebeach.com | Domain cutover | ❌ Not done |
| Pull exact PBC trademark disclaimer from IAGTO agreement | Footer text | ❌ Not done |
| Upgrade Twilio trial → paid + submit toll-free verification | D#19 SMS | ❌ Not done |
| Register Resend webhook at resend.com after D#19 deploys | Email tracking | ❌ Post-launch |
| Supply toll-free phone number for site (S7) | Header/footer/contact | ❌ Not supplied |
| Log into IAGTO portal — audit available images for PBC properties (S6) | S2/S3/S4/S5 image fixes | ❌ Not done |
| Source replacement photos for CVR golf (S2) | Course page | ❌ Not done |
| Source additional photos for Pasadera (S3) | Course page | ❌ Not done |
| Identify/fix Pacific Grove photo issue (S4) | Course page | ❌ Needs inspection |
| Source replacement Poppy Hills images (S5) | Course page | ❌ Not done |
| Decide what replaces "Which course fits your group?" homepage section (S8) | Homepage | ❌ MASTER to propose options |

---

## Env vars required for admin

| Var | Used for | Status |
|---|---|---|
| RESEND_API_KEY | Email alerts + quote sends | ❌ Missing (D#7 unresolved) |
| LEAD_NOTIFY_EMAIL | Lead notification target | ❌ Missing |
| ADMIN_SECRET | HMAC auth (D#16) | ❌ Not yet created |
| TWILIO_ACCOUNT_SID | SMS (D#19) | ✅ Set (trial) |
| TWILIO_AUTH_TOKEN | SMS (D#19) | ✅ Set (trial) |
| TWILIO_FROM_NUMBER | SMS (D#19) | ✅ Set (trial, unverified — awaiting toll-free from Sean S7) |
| GMAIL_REFRESH_TOKEN | Gmail poll cron (D#19) | ❌ Not set |

---

## DB tables to create (admin build)

| Table | Created in | Status |
|---|---|---|
| admin_users | D#16 | ❌ |
| activity_log | D#17 | ❌ |
| quote_drafts | D#18 | ❌ |
| rate_configs | D#18 | ❌ |
| email_log | D#19 | ❌ |

---

## Update log

| Date | Update |
|---|---|
| 2026-08-21 | Tracker created. All directives spec'd. D#16–D#21 defined. All pre-requisites confirmed open. |
| 2026-08-21 | Sean feedback received (9 items S1–S9). Added to tracker. S9 added to D#15 scope. S1 added to D#18 scope. S7 added to D#19/D#20 scope. S6/S8 require MASTER action before directives can be written. S2/S3/S4/S5 image sourcing blocked on Sean/MASTER. |
| 2026-08-21 | MASTER fixed S1, S8, S9 directly (no Raza). S1: Portola Hotel moved to #1 in lib/hotels.ts (5ab96d5002). S8: FitFinder removed from app/page.tsx — replacement TBD (b0676320ae). S9: QuoteForm group size — number input min=2 max=400, label "Number of golfers" (final: e68097de4392). All READY on Vercel. |
| 2026-08-22 | MASTER formal sign-off on admin build given. D#15 complete — leads table migration: added hotels_interested, activities_interested, ground_transport_needed, referral_source, ok_to_call, ok_to_text, raw_payload, nights, returning_customer, transport_needed, non_golfer_count, trip_type, corp_attendees, corp_event_type, corp_needs, hotel_pick_for_me, game_level columns. D#12/D#13/D#14 confirmed live (pre-requisites met). Admin build authorized — ready for D#16. |
| 2026-08-22 | QuoteForm full redesign session. Changes: (1) removed budget field entirely, (2) trip length dropdown → nights number input, (3) 6 numbered sections GTHS-style, (4) ok_to_call/ok_to_text moved to contact section + required validation, (5) returning customer checkbox, (6) transport dropdown replacing checkbox, (7) course cards with real golfer stats (par/yards/rating/slope/walkable/pace/difficulty) from course-intelligence.md, (8) hotel strips with left accent bar, (9) sticky sidebar desktop, (10) page widened to max-w-1200px, (11) 21-day minimum arrival date, (12) auto-calculate nights from dates, (13) PBC 30-day lead time warning, (14) contact preference required validation, (15) courses required validation, (16) non-golfer count reveal, (17) trip type selector (Golf only/Golf+Stay/Full experience/Corporate) with conditional section visibility, (18) corporate needs section (attendees/event type/needs tags), (19) hotel pick-for-me option, (20) game level selector (Single figures/Club golfer/Social golfer/Casual) with intelligent course recommendations per tier. All READY on Vercel. Final QuoteForm commit: 2ec82cae7c. courses.ts extended with rating/slope/walkable/pace/difficulty: e91a4ea226. |


---

## SESSION LOG — 2026-08-23 (MASTER)

### Build activity this session

| Item | Commit | Status |
|---|---|---|
| Pebble Pilgrimage + Corporate Golf Outing itineraries (no pricing) | dceed39121 | ✅ |
| Itinerary page: hide pricing when priceFrom=0 — show "Custom quote" | a254222ff1 | ✅ |
| Spanish Bay waitlist page /spanish-bay-reopening/ | 477d493cbf | ✅ |
| Hotel mega-menu links fixed — no longer pointing to pebblebeach.com | 6e82ffeae3 | ✅ |
| The Lodge at Pebble Beach™ hotel page (verified from pebblebeach.com Aug 23 2026) | 55b174c86f | ✅ |
| The Inn at Spanish Bay™ hotel page (verified from pebblebeach.com Aug 23 2026) | 7a7b203174 | ✅ |
| Casa Palmero™ hotel page (verified from pebblebeach.com Aug 23 2026) | a7119e6d91 | ✅ |
| GalleryLightbox.tsx — shared gallery with captions + tags + thumbnail strip | 483540ed3c | ✅ |
| course-details.ts: gallery type extended to `{ src, caption, tag? }[]`, captions added for 8 courses | 658a59feae | ✅ |
| hotel-details.ts: gallery type extended, captions added for all 11 hotels | 4a76fc4497 | ✅ |
| Hotel + course pages wired to GalleryLightbox | bfbabd23a1 | ✅ |
| All 14 course hero images replaced — unique verified Unsplash, no duplicates | f863c3b960 | ✅ |
| PBC hotel hero images fixed (Lodge, Inn, Casa Palmero) | e916900d1a | ✅ |
| Itinerary images fixed — 4-day (verified PB GL Patrick Konior), 3-day | 4a6addafbc | ✅ |

### Key decisions

- **No pricing anywhere** — `priceFrom: 0` handled conditionally throughout site
- **PBC hotels can be named on MGTS** — IAGTO carveout confirmed via golfcentralcoast-legal skill
- **Gallery type change is breaking** — `string[]` → `{ src, caption, tag? }[]` — do not revert
- **Drive "Monterey Images" folder** — contains saved HTML pages only, not actual image files
- **Montereygolftours skill packaged** — montereygolftours-skill.skill created Aug 23 2026

### Outstanding Sean actions (unchanged)
- IAGTO rates for PBC courses
- Toll-free number (S7)
- Staging submission to traveldesk@pebblebeach.com
- Licensed photography from PBC press kit + course operators
- S8 homepage replacement section
- RESEND_API_KEY + LEAD_NOTIFY_EMAIL missing from Vercel env vars

### Raza next steps
- D#16 (Auth + Middleware) — authorized, in progress
- Do NOT start D#17 without MASTER explicit go-ahead

---

## SESSION LOG — 2026-08-23 (MASTER) — QuoteForm Enrichment Session

### Commits this session

| Commit | Description | Status |
|---|---|---|
| `fbda12a8f9` | fix(notify-lead): align email to D#15 fields — remove budget/trip_length, add game_level/trip_type/nights/contact_pref/corporate/transport | ✅ |
| `9f28393cb1` | feat(QuoteForm): add rounds/golfer (auto+override), tee time 1st+2nd pref, room config, caddie pref, budget tier, arrival airport | ✅ |
| `921c9653e0` | feat(QuoteForm): replace room config with 6 hotel-accurate options — king_single, two_queens, suite_shared, villa_cottage, exclusive_buyout, no_preference | ✅ |
| `3677e818c1` | fix(QuoteForm): fix JSX structure — rounds+tee time block inside Golf section div (Turbopack parse error) | ✅ |
| `6e33b52728` | feat(QuoteForm): full required field validation — rounds, tee time 1st, caddie, room config (lodging), budget tier, airport (conditional), phone, startDate, nights (flexible), non-golfer count, corp fields | ✅ |
| `9fd3ee17ff` | fix(QuoteForm): remove duplicate </p> on Flying into label | ✅ |
| `f599a45419` | fix(QuoteForm): remove redundant date order validation — endDate min attribute handles it natively | ✅ |
| `1d72f578e1` | fix(QuoteForm): phone always required; group size min restored to 2 | ✅ |

### Supabase schema changes
7 new columns added to `leads` table:
`rounds_per_golfer` (integer), `tee_time_pref_1` (text), `tee_time_pref_2` (text), `room_config` (text), `caddie_option` (text), `budget_tier` (text), `arrival_airport` (text)

### QuoteForm enrichment — full field list now required for Sean to quote without follow-up

**New required fields added:**
- Rounds per golfer (auto from nights, manual override)
- Tee time 1st preference (Early bird / Morning / Mid-day / Afternoon)
- Tee time 2nd preference (optional fallback)
- Caddie preference (Caddies / Cart / Walking / Flexible)
- Room configuration — 6 hotel-accurate options mapped to actual properties
- Budget tier (Value / Mid / Premium / No limit)
- Arrival airport (MRY / SJC / SFO / Own) — required when transport includes airport

**Required validation added/fixed:**
- Phone — always required (removed okToCall condition)
- group_size — no default, min 2
- startDate — required unless datesFlexible
- nights — required when datesFlexible
- non_golfer_count — required when nonGolfer checked
- corp_attendees + corp_event_type — required when Corporate trip type
- Removed redundant date order check (endDate min attr handles it)

### Room config decision
Old options (Sharing/Own/Mixed) replaced with hotel-accurate options:
- `king_single` → Portola, IC, Abrego, PBC properties
- `two_queens` → Portola, IC, Monterey Beach Hotel
- `suite_shared` → Embassy Suites (all-suite), CVR (all-suite 800sqft min), Quail
- `villa_cottage` → CVR, Bernardus, Lodge Cottages (Palmer/Eastwood)
- `exclusive_buyout` → Casa Palmero (24 rooms) or CVR cottages — triggers contextual callout
- `no_preference` → we advise

### Skill updated
montereygolftours.skill packaged with all changes from this session.

### Key learnings added to skill gotchas
- Always check Vercel build state after every commit
- JSX patches: read line structure before pushing, string match ≠ valid JSX nesting
- notify-lead email must stay in sync with QuoteForm payload
- endDate min enforced by input attribute, no JS validation needed
- phone always required, not conditional
- group_size has no default, min=2


---

## SESSION LOG — 2026-08-25 (MASTER + Claude)

### Team change
- Raza is off the project. All code now pushed directly by MASTER + Claude. AGENTS.md is stale.

### Completed this session
- GitHub token refreshed (90-day, workflow access) — stored in skill only
- `RESEND_API_KEY` set in Vercel — lead notifications now live
- `LEAD_NOTIFY_EMAIL` set: `dawoodanialtaaf@gmail.com`
- Redeployed READY: `dpl_4ERw8YbncNjNHGKnB8QhX4CERNvW`
- montereygolftours skill updated + packaged

### D#16 checklist
- [ ] Create admin_users table in Supabase
- [ ] Set ADMIN_SECRET in Vercel
- [ ] Push src/middleware.ts
- [ ] Push app/admin/login/page.tsx
- [ ] Push app/api/admin/auth/login/route.ts
- [ ] Push app/api/admin/auth/logout/route.ts
- [ ] Push src/lib/admin-error.ts
- [ ] Verify login on montereygolftours.vercel.app/admin

---

## Session Update: Aug 27 2026

### Commits this session
| Commit | Description |
|---|---|
| `047dca62ff` | fix(itineraries): show 'Custom quote' instead of $0 when priceFrom unset |
| `bc1318f57c` | fix(pebble-beach): reorder gallery holes 6→7→8-10→18, remove duplicate cliff shots |
| `f66b267280` | fix(pebble-beach): swap hole 6/7 gallery order to fix dead space |
| `ba0181cbbb` | fix(pebble-beach): correct hero image path — was 404, now points to gallery |
| `e03e332510` | fix(gallery): match top-right image height to hero — eliminate wasted space |
| `917d8faf21` | fix(spyglass): replace Spanish Bay gallery images with correct Spyglass images |
| `69d7372081` | feat(spanish-bay): move bagpiper to body pointers, reorder gallery |
| `c0d05eefa5` | fix(pacific-grove): remove missing gallery-2 image reference |

### Status changes
- PBC staging email sent to Karlyn Hawke (khawke@pebblebeach.com + traveldesk@pebblebeach.com) — awaiting sign-off
- All gallery issues resolved across 4 course pages
- Itinerary $0 display bug fixed
- Skill + memory updated

### Outstanding blockers
- Karlyn Hawke PBC sign-off → domain cutover
- Sean: IAGTO rates, toll-free number, CVR/Pasadera/Poppy Hills images


---

## Session Update: Sep 2 2026

### PBC Image Compliance — Karlyn Hawke email received today

#### What Karlyn said
- **Approved image portal:** `https://assets.pebblebeach.com/share/ADAC1BEF-4BC0-47DF-8D395D20A6CCBCD7/`
- **"3rd party ok"** label on approved images — Sean must check each image description in portal
- **Photographer credit required** on every PBC image — use name from description, fallback `© Pebble Beach Company`
- **Max 3 PBGL images** for new operators — holes 7, 17, 18 explicitly blocked
- **Spanish Bay images** — do not use any (course under renovation)
- **Trademark PDF** attached: "PBC TRADEMARKS 2026.pdf" — sent with email, Sean to review
- She will audit the site once IT unblocks external access

#### Current PBGL gallery audit (8 images — all need replacing)
| File | What it shows | Issue |
|------|--------------|-------|
| `pebble-beach-3.webp` | Hole 7 cliff shot | ❌ Hole 7 — explicitly blocked |
| `pebble-beach-hole-6.webp` | Hole 6 | Over 3-image limit |
| `pebble-beach-2.webp` | Holes 8–10 | Over 3-image limit |
| `pebble-beach-4.webp` | Coastal holes | Over 3-image limit |
| `pebble-beach-5.webp` | Hole 18 | ❌ Hole 18 — explicitly blocked |
| `holes-8-9-10.webp` | Holes 8–10 | Over 3-image limit |
| `hole-9-10.webp` | Holes 9–10 | Over 3-image limit |
| `gallery-1.webp` | Course overview | Over 3-image limit |

Hero image (`hole-6.webp`) — ✅ fine, not a blocked hole.

#### Spanish Bay gallery — still populated (needs clearing)
6 images still in `course-details.ts` gallery array for `links-at-spanish-bay`. Must be emptied entirely — it's a closed course page.

#### What needs to happen (blocked on Sean)
1. Sean opens the portal, finds images marked **"3rd party ok"** (max 3 for PBGL)
2. Downloads those images + notes photographer name from each description
3. Sends files to MASTER
4. MASTER replaces PBGL gallery with those 3 images + adds photographer credits in caption fields
5. MASTER clears Spanish Bay gallery array in `course-details.ts`
6. Sean reviews "PBC TRADEMARKS 2026.pdf" — confirm our ®/™ usage is compliant

#### Photographer credit implementation plan (when images arrive)
- Add credit as a second line in the `caption` field: `"...\n© [Photographer Name]"` or `"...\n© Pebble Beach Company"`
- GalleryLightbox already renders captions — credits will show under each image
- Apply same credit process to Spyglass Hill gallery images (also PBC licensed)
- Apply to Del Monte gallery images (also PBC licensed)

#### Outstanding Sean actions updated
- ✅ Staging email sent Aug 27 — Karlyn replied Sep 2 (IT blocking site, will audit when unblocked)
- ❌ Download 3 approved PBGL images from portal (marked "3rd party ok") — IN PROGRESS
- ❌ Note photographer credit for each downloaded image
- ❌ Review "PBC TRADEMARKS 2026.pdf" attachment from Karlyn's email


---

## Session Update: Sep 2 2026 — Part 2 (PBC Image Compliance Complete)

### Summary
Full PBC image compliance session. All Unsplash images removed from PBC properties. All galleries replaced with approved PBC portal images with photographer credits.

### Key clarification from Karlyn Hawke
- **3-image limit applies to PBGL only** — all other 108 portal images are unrestricted for use on the site
- Portal URL: `https://assets.pebblebeach.com/share/ADAC1BEF-4BC0-47DF-8D395D20A6CCBCD7/`
- Rights tag to check: **"Third Party OK"** in image description
- Photographer credit format: `Photo by [Name]` or `© Pebble Beach Company` if no name listed

### Images downloaded and uploaded
Sean downloaded zip from portal ("Leisure Travel Sales Collection.zip", 64MB). Uploaded via bash script from Mac terminal directly to GitHub repo at `public/images/pbc-portal/` — 100 images total.

### Commits this session
| Commit | Description |
|--------|-------------|
| `179524e9` | Upload PBGL hole 9 ground image |
| `3ca8b9d5` | Replace PBGL gallery — 1 approved image (temp) |
| `be32543a` | Upload aerial, fairway, hole 6 images |
| `aa74559e` | PBGL gallery — 3 approved portal images with credits |
| `348bb226` | Replace PBGL hero with aerial (Jeff Marsh) |
| `88baf8cc` | Swap gallery — hole 9 ground replaces aerial |
| `3cd4c0bf` | Homepage hero — replace Unsplash with portal images |
| `23ae0365` | course-details.ts — Spyglass/Del Monte/The Hay galleries |
| `c9309817` | hotel-details.ts — Lodge/Inn galleries |
| `ca59b46c` | courses.ts — The Hay hero (portal aerial) |
| `fe03c55a` | hotels.ts — Casa Palmero hero (portal pool exterior) |

### Final image state per property
| Property | Hero | Gallery | Credits |
|----------|------|---------|---------|
| Pebble Beach Golf Links® | Portal aerial (Jeff Marsh) | 3 portal images — holes 9/9/6 | ✅ All credited |
| Spyglass Hill® Golf Course | Existing (IAGTO) | 3 portal images — holes 4/7/11 | ✅ © PBC on all |
| Del Monte™ Golf Course | Existing | Portal hole 16 + 2 existing | ✅ © PBC on portal |
| The Hay™ | Portal aerial | 3 portal images — aerial/hole 2/hole 5 | ✅ © PBC on all |
| The Lodge at Pebble Beach™ | Existing | 5 portal images — exterior/lobby/building/cottage/studio | ✅ All credited |
| The Inn at Spanish Bay™ | Existing | 5 portal images — lobby/ocean room/presidential suite/fire pits/forest suite | ✅ Sherman Chu credited |
| Casa Palmero® | Portal pool exterior | Existing CP_2024 gallery images | ✅ |
| Homepage hero | Portal aerial (Jeff Marsh) desktop / hole 9 ground mobile | — | ✅ |

### Remaining Unsplash (acceptable)
- `club-at-pasadera` hero — not a PBC property, no portal image available
- `Hero.tsx` — old component, not used anywhere (HeroCentered is active)

### Outstanding PBC actions
- Sean to review "PBC TRADEMARKS 2026.pdf" — attached to Karlyn's Sep 2 email
- Fix Del Monte™ trademark — site may still show "Del Monte Golf Course®" (should be "Del Monte™ Golf Course")
- Add mandatory PBC trademark acknowledgement line to site footer
- Karlyn still hasn't audited the site (IT blocking) — domain cutover still blocked

---

## Session Update: Sep 2 2026 — Part 3 (CWV, Cleanup, GTHS Admin Fix)

### Core Web Vitals Optimisation

**Baseline (pre-fix, mobile):** FCP 2.4s 🟡, LCP 4.7s 🔴, TBT 20ms ✅, CLS 0 ✅, Speed Index 4.8s
**Desktop was already perfect:** FCP 0.3s, LCP 0.8s, TBT 0ms, CLS 0.002

**Fixes applied:**
| Commit | Fix | Expected impact |
|--------|-----|----------------|
| `8648dee8` | next.config.ts — AVIF/WebP formats, 1yr cache TTL, compress:true | ~60-80% smaller images served |
| `ea516a7a` | layout.tsx — removed unused Pacifico + Cinzel font imports | 2 fewer render-blocking CSS files |
| `3faf63f1` | layout.tsx — switched @fontsource → next/font/google | Eliminates 1,500ms render block (biggest FCP win) |
| `33dc29d7` | globals.css — use next/font CSS variables | Fonts load via CSS vars correctly |
| `4d86eed5` | page.tsx — dynamic import below-fold sections, remove unused Hero import | Smaller initial JS bundle |

### Chat System Removal (MESSY — 6 failed builds)
**Root cause of failures:** Did not read all downstream references before starting. Made changes file-by-file instead of planning all changes first.

**What was removed:**
- `ChatWidget.tsx` — unused, was loading 142KB of course/hotel data on every page
- `ChatContext.tsx` — unused
- `ChatTriggerIcon.tsx` — was referenced in Footer, Header, MobileNav
- `ChatProvider` wrapper — removed from layout.tsx

**Failed commits:** `007a70284e` (TS error), `ab2e964ebc` (ssr:false in Server Component), `bdd79291f1` (didn't find all references), `63363ee22a` (orphaned button tag)

**Final state:** `295f7bf5db` — READY. ChatWidget fully removed.

### Dead File Cleanup
| File | Size | Reason |
|------|------|--------|
| `ChatWidget.tsx` | 8KB | Removed — no chat feature |
| `ChatContext.tsx` | 1KB | Removed — no chat feature |
| `ChatTriggerIcon.tsx` | 1KB | Removed — no chat feature |
| `AdminSidebar.tsx` | 7KB | Removed — leftover from stripped admin routes |
| `Hero.tsx` | 4KB | Removed — replaced by HeroCentered |
| `FitFinder.tsx` | 3KB | Removed — unused component |

### Unsplash Audit (Full Codebase — 82 files checked)
All PBC properties now using portal images only. Remaining Unsplash all non-PBC acceptable:
- `app/about/page.tsx`, `app/blog/page.tsx`, `app/contact/page.tsx`, `app/faq/page.tsx` — generic scenes
- `app/itineraries/page.tsx`, `app/packages/page.tsx` — generic golf/GTHS fallbacks
- `lib/blog.ts` — blog card thumbnails
- `lib/destinations.ts` — Carmel/Monterey city images
- `lib/courses.ts` — club-at-pasadera only (non-PBC)
- `next.config.ts` — domain allowlist (keep, needed)

### Trademark Fixes
- `Del Monte Golf Course®` → `Del Monte™ Golf Course` — **22 instances across 6 files**
- Footer trademark acknowledgement updated to exact mandatory PBC TRADEMARKS 2026 text

### GTHS Unified Admin — MGTS Connection
**Status before fix:** `MGTS_SUPABASE_SERVICE_KEY` was set in GTHS Vercel but had **empty value** — MGTS leads not loading in unified admin.
**Fix:** Patched env var with correct value `[REDACTED — see Vercel env vars]`. GTHS redeployed commit `e0877f71`.
**MGTS integration files confirmed live:**
- `src/lib/unified-admin/sites/mgts.ts` — site config with Supabase URL + service key
- `src/app/api/admin/mgts-proxy/leads/route.ts` — leads proxy
- `src/app/admin/unified/mgts/[leadId]/page.tsx` — lead detail view
- `src/lib/unified-admin/registry.ts` — MGTS in ACTIVE_SITES list

### Current Outstanding
- Run PSI after chat removal — expect significant improvement on mobile FCP/LCP
- Karlyn Hawke PBC site audit still pending (IT blocking external URLs)
- Domain cutover `montereygolftours.com` still blocked on Karlyn sign-off
- Sean to review PBC TRADEMARKS 2026.pdf
- Sean to supply IAGTO rates, confirm toll-free, source higher-res CVR/Clement/Abrego images
