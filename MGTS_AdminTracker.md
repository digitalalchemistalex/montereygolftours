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

