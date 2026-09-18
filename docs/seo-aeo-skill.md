---
name: mgts-seo
description: "SEO and AEO strategy for MontereyGolfTours.com. Meta title/description formulas per page type, schema markup per page type, sitemap strategy, llms.txt, robots.txt, canonical rules, speakable, internal linking, PBC trademark SEO rules, and AEO optimization for Google AI Overviews, ChatGPT, Perplexity. MUST READ before writing any meta tag, title, description, schema, sitemap entry, blog SEO, or content optimization task for MGTS. Trigger on: montereygolftours SEO, MGTS meta, MGTS schema, MGTS AEO, MGTS llms.txt, MGTS sitemap, MGTS robots, MGTS titles, MGTS descriptions, MGTS ranking, MGTS Google, MGTS AI overview, MGTS Pebble Beach SEO, MGTS course page SEO, MGTS hotel page SEO, MGTS blog SEO, meta description monterey, title tag monterey golf."
---

# MGTS SEO & AEO Skill
**montereygolftours.com — Last updated: Sep 17 2026**

Read `montereygolftours` master skill FIRST. Then this. Then deploy.

---

## Critical Rules — Before Touching Anything

1. **Fetch the file first** — always via GitHub API before editing. Never assume current content.
2. **PBC trademark on every instance** — Pebble Beach Golf Links®, Spyglass Hill™ Golf Course, Del Monte™ Golf Course, The Hay™, The Links at Spanish Bay®, The Lodge at Pebble Beach™, The Inn at Spanish Bay™, Casa Palmero™. Wrong symbol = Karlyn Hawke compliance issue.
3. **No pricing in meta** — custom quote model. Exception: `/packages/` and itinerary pages use "from $564/person" (verified real data only).
4. **IAGTO signal on every PBC page** — "IAGTO-authorized operator" or "IAGTO Authorized Operator".
5. **Group size: 2–400** — exact range on all commercial pages.
6. **Title limit: 60 chars** — layout appends ` | Monterey Golf Tours` via `%s | Monterey Golf Tours` template. Pages that set DEFAULT_TITLE directly don't get the suffix.
7. **Desc limit: 155 chars** — hard cap.
8. **Canonical: always trailing slash** — `https://montereygolftours.com/page-slug/`
9. **`"use client"` pages can't export metadata** — create a `layout.tsx` in the same directory instead.
10. **NEVER fabricate ratings** — no fake aggregateRating values. Only use real data from GBP or verified sources.
11. **Deploy checklist**: fetch → edit → verify char counts → push → poll READY → `curl -sI https://montereygolftours.com/[page]/ | head -3` → must be 200.

---

## Schema Rules — Hard Rules (parity with GTHS Jun 17 2026)

### Review Snippet Eligibility
- Use `["Service", "Product"]` — BOTH types required. `Service` alone does NOT qualify for review snippets.
- `ratingCount` not `reviewCount`
- `ratingValue`, `bestRating`, `worstRating` must be **numbers**, not strings
- **NEVER fabricate ratings** — removed from GTHS after fake 4.9/127 self-review. Hard rule.
- `sameAs`: FB/IG/IAGTO/Maps only — never pebblebeach.com (IAGTO rule)

### ImageObject Required Fields
Every `ImageObject` in schema must include:
```json
{
  "@type": "ImageObject",
  "url": "https://montereygolftours.com/images/...",
  "acquireLicensePage": "https://montereygolftours.com/photography/",
  "copyrightNotice": "© Pebble Beach Company. Licensed via Leisure Travel Sales Collection.",
  "license": "https://montereygolftours.com/terms/",
  "creator": { "@type": "Person", "name": "[Photographer Name]" },
  "creditText": "[Photographer Name] / Pebble Beach Company"
}
```
Non-PBC images: use appropriate copyright/license values.

### ISR Cache
Pages use `revalidate: 3600` — DB changes take up to 1hr to show. Code deploys bust cache immediately.

---

## Schema Per Page Type

All JSON-LD, server-rendered, `<script type="application/ld+json">`.

### Global (SiteSchema.tsx — every page)
- `Organization` + `TravelAgency`
- `WebSite` with `SearchAction`
- `sameAs`: golfthehighsierra.com, facebook.com/montereygolftours, instagram.com/montereygolftours, iagto.com

### Homepage
- `WebPage` + `SpeakableSpecification` (cssSelector: `[".speakable-intro", "h1"]`)
- `["Service", "Product"]`
- `FAQPage` — Q1: "Who books Monterey Peninsula golf packages for groups?" — answer names MGTS as IAGTO-authorized

### Course Pages
- `GolfCourse` (name, description, address, geo, url)
- `["Service", "Product"]`
- `FAQPage` (3+ Q&A — Q1 must be a booking/access question)
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification`

### Hotel Pages
- `Hotel` or `LodgingBusiness`
- `["Service", "Product"]`
- `FAQPage`
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification`
- PBC hotels: add `containedInPlace` → Pebble Beach Resorts®

### Itinerary Pages
- `TouristTrip`
- `["Service", "Product"]`
- `FAQPage`
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification`

### Destination Pages
- `TouristDestination`
- `["Service", "Product"]`
- `FAQPage`
- `BreadcrumbList`

### Blog Posts
- `BlogPosting` (author: Sean Schaeffer, datePublished, dateModified, image — **absolute URLs only**)
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification` (cssSelector: `.speakable-intro`)
- **ImageObject in BlogPosting must use absolute URLs** — relative URLs silently fail Google validation

### Experience Pages
- `TouristAttraction`
- `["Service", "Product"]`
- `FAQPage`
- `BreadcrumbList`

### About Page
- `AboutPage`
- `Person` (Sean Schaeffer)
- `FAQPage`
- `WebPage` + `SpeakableSpecification`

### Photography Pages
- `Person` (photographer name, url)
- `ImageObject` (with all required fields — see above)
- `ItemList`
- `BreadcrumbList`

---

## Meta Title Formulas

### Homepage / DEFAULT_TITLE (layout.tsx)
```
DEFAULT_TITLE = "Monterey Peninsula Group Golf Trips & Pebble Beach Packages"  // 59 chars
```

### Homepage (app/page.tsx)
```
Pebble Beach Golf Packages & Monterey Group Golf Trips  // 54 chars
```

### PBC Course Pages
```
[Course Name] — IAGTO Tee Times & Pebble Beach Golf Packages
```
- `Pebble Beach Golf Links® — IAGTO Tee Times & Pebble Beach Golf Packages`
- `Spyglass Hill™ Golf Course — IAGTO Tee Times & Pebble Beach Golf Packages`
- `Del Monte™ Golf Course — IAGTO Tee Times & Pebble Beach Golf Packages`
- `The Hay™ — IAGTO Tee Times & Pebble Beach Golf Packages`

### Spanish Bay (closed)
```
The Links at Spanish Bay® — Closed, Reopening April 2027 | Waitlist Open
```

### Non-PBC Course Pages
```
[Course Name] — Group Tee Times & Monterey Golf Trip Planning
```

### PBC Hotel Pages
```
[Hotel Name] — Golf Packages & Pebble Beach Resorts® Stay
```

### On-Site Golf Hotel Pages
```
[Hotel Name] — On-Site Golf & Monterey Peninsula Packages
```
Applies to: Hyatt Regency Monterey, Carmel Valley Ranch, Quail Lodge, Bernardus Lodge

### Standard Hotel Pages
```
[Hotel Name] — Golf Group Hotel, Monterey Peninsula
```
Long names — truncate brand suffix:
- `Embassy Suites Monterey Bay — Golf Group Hotel, Monterey Peninsula`
- `Monterey Beach Hotel — Golf Group Hotel, Monterey Peninsula`

### Index Pages
| Page | Title |
|---|---|
| `/golf-courses/` | `All 14 Monterey Peninsula Golf Courses — Group Tee Times` |
| `/hotels/` | `Monterey Peninsula Golf Hotels — Pebble Beach to Carmel` |
| `/itineraries/` | `Monterey Peninsula Golf Trip Itineraries — 3 to 7 Days` |
| `/destinations/` | `Golf by Destination — Monterey, Carmel, Pebble Beach & More` |
| `/blog/` | `Monterey Golf Trip Planning — Courses, Tips & Pebble Beach Guides` |
| `/experiences/` | `Pebble Beach Experiences — Dining, Spa & 17-Mile Drive®` |
| `/photography/` | `Pebble Beach Photography Credits \| Monterey Golf Tours` |
| `/packages/` | `Monterey Golf Trip Packages — 3 to 7 Days \| Monterey Golf Tours` |
| `/pebble-beach/` | `Pebble Beach Golf Packages — IAGTO Authorized Operator` |

### Itinerary Dynamic Pages
```
[Trip Title] — [N]-Day Monterey Golf Package
```
Special cases:
- Corporate: `Monterey Peninsula Corporate Golf Outing — Groups of 8–400 Players`
- Pebble Beach: `Pebble Beach Golf Package — 4-Day Monterey Peninsula Trip`
- Best value: `Best Value Monterey Golf Trip — 3-Day Peninsula Package`
- Architects Trail: `The Architect's Trail — 4-Course Monterey Peninsula Itinerary`

**Avoid redundancy**: don't append `— [N]-Day Monterey Golf Trip` when title already states day count.

### Destination Dynamic Pages
| Slug | Title |
|---|---|
| `monterey` | `Golf in Monterey, California — Group Tee Times & Packages` |
| `carmel` | `Golf in Carmel-by-the-Sea — Peninsula Courses & Golf Packages` |
| `carmel-valley` | `Golf in Carmel Valley, California — CVR & Quail Lodge Packages` |
| `pacific-grove` | `Golf in Pacific Grove — Links Golf & Monterey Group Packages` |
| `seaside` | `Golf in Seaside, California — Bayonet & Black Horse Packages` |
| `pebble-beach-area` | `Golf in Pebble Beach — IAGTO Packages & Pebble Beach Resorts®` |

### Experience Dynamic Pages
```typescript
const suffix = exp.name.includes('Pebble Beach') ? '' : ' at Pebble Beach';
const title = `${exp.name}${suffix} | Monterey Golf Tours`;
```

### Static Pages
| Page | Title |
|---|---|
| `/quote/` | `Get a Custom Monterey Golf Trip Quote` |
| `/about/` | `About Monterey Golf Tours — Custom Peninsula Golf Trips` |
| `/contact/` | `Contact Monterey Golf Tours — Get a Custom Quote` |
| `/faq/` | `Monterey Golf Trip FAQ — Pebble Beach, Courses & Planning` |
| `/golf-courses/pebble-beach-golf-links/live-cams/` | `Pebble Beach Golf Links® Live Cam — Watch the Course Live` |
| `/spanish-bay-reopening/` | `The Links at Spanish Bay® Reopening 2027 — Join the Waitlist` |
| `/privacy/` | Keep as-is |
| `/terms/` | Keep as-is |

### Blog / Photography Dynamic
- Blog: `post.title` verbatim (max 60 chars). Desc = `post.intro.slice(0, 155)`.
- Photography: `[Name] | Pebble Beach Photographer | Monterey Golf Tours`

---

## Meta Description Formulas

| Page | Description | Chars |
|---|---|---|
| DEFAULT_DESC | `IAGTO-authorized operator for Monterey Peninsula group golf. 14 courses, 14 hotels, tee times and room blocks handled end to end. Groups of 2–400.` | 146 |
| Homepage | `Plan a Pebble Beach golf trip with Monterey's IAGTO-authorized operator. 14 courses, 9 hotels, groups of 2–400. Custom quotes in 24 hours.` | 138 |
| `/golf-courses/` | `From Pebble Beach Golf Links® to Pacific Grove Golf Links — all 14 Monterey Peninsula courses available for group tee times. IAGTO-authorized booking.` | 152 |
| `/hotels/` | `14 hotels for Monterey Peninsula golf groups — The Lodge at Pebble Beach™, Portola Hotel, Bernardus Lodge, and more. All paired with group tee times.` | 150 |
| `/itineraries/` | `Browse sample Monterey Peninsula golf trip itineraries, from a 3-day weekend to a 7-day ultimate trip — every one customizable to your group.` | 141 |
| `/packages/` | `Real Monterey Peninsula golf packages from $564/person — 3 to 7 days, priced from actual course and lodging rates. For groups of 2 to 400.` | 140 |
| `/pebble-beach/` | `Book a Pebble Beach golf package with an IAGTO Authorized Operator. Pebble Beach Golf Links, Spyglass Hill, Spanish Bay, Del Monte. Custom quotes in 24h.` | 153 |
| `/blog/` | `Expert guides for planning a Monterey Peninsula golf trip — best courses, when to go, Pebble Beach access, group trip logistics, and real itineraries.` | 151 |
| `/experiences/` | `Beyond golf — dining, spa, 17-Mile Drive®, Golf Academy, and The Beach & Tennis Club at Pebble Beach Resorts®. Book as part of a full golf package.` | 148 |
| `/about/` | `IAGTO-contracted Pebble Beach Resorts® partner. Custom Monterey Peninsula golf trips — courses, lodging, tee times, end to end. Groups of 2–400.` | 144 |
| `/contact/` | `Contact Monterey Golf Tours to start planning your group golf trip on the Monterey Peninsula. Get a custom quote within 24 hours or call us directly.` | 149 |
| `/faq/` | `Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, best timing, and how the quote process works.` | 153 |
| `/quote/` | `Tell us your group size, dates, and budget, and we'll put together a custom Monterey Peninsula golf trip quote within 24 hours.` | 127 |
| `/spanish-bay-reopening/` | `The Links at Spanish Bay® closes for full renovation and reopens April 17, 2027. Join the waitlist to be first in line for tee times.` | 135 |
| `/live-cams/` | `Watch Pebble Beach Golf Links® live — cameras on the 18th green, 17th green, 1st tee, and practice putting green. Hosted by Pebble Beach Resorts®.` | 147 |

---

## Title Cannibalization Rules

Two pages targeting the same keyword = Google picks the wrong one. Before writing any title:
1. Search existing titles for the keyword
2. If conflict found — differentiate with location modifier, action word, or specificity
3. Course index vs individual course: index uses "All 14 Courses", individual uses course name + action
4. Blog vs course page: blog uses guide/tips framing, course page uses booking framing

---

## Meta File Locations

| Page type | File |
|---|---|
| Homepage | `app/page.tsx` → `export const metadata` |
| DEFAULT fallback | `app/layout.tsx` → `DEFAULT_TITLE` / `DEFAULT_DESC` |
| Course slug | `app/golf-courses/[slug]/page.tsx` → `generateMetadata()` |
| Hotel slug | `app/hotels/[slug]/page.tsx` → `generateMetadata()` |
| Itinerary slug | `app/itineraries/[slug]/page.tsx` → `generateMetadata()` |
| Blog slug | `app/blog/[slug]/page.tsx` → `generateMetadata()` |
| Destination slug | `app/destinations/[slug]/page.tsx` → `generateMetadata()` |
| Experience slug | `app/experiences/[slug]/page.tsx` → `generateMetadata()` |
| Static pages | `app/[page]/page.tsx` → `export const metadata` |
| "use client" pages | `app/[page]/layout.tsx` → `export const metadata` |

---

## AEO Patterns

### Speakable
Every content page needs `.speakable-intro` — first visible paragraph, server-rendered:
```tsx
<div className="speakable-intro">
  2–3 sentence direct answer to primary query. Entity-rich. Keyword in first 10 words.
</div>
```
Schema: `"cssSelector": [".speakable-intro", "h1"]`

Speakable selectors: `h1`, `.speakable-intro`, `.course-faq`

### FAQ Schema Rules
- Min 3 Q&A per content page
- Q1: primary commercial query ("Can I book Pebble Beach Golf Links® through Monterey Golf Tours?")
- Q2: group logistics (size, customization)
- Q3: process/timeline (how it works, quote turnaround)
- Answers must match visible FAQ section exactly — never schema-only

### H2 as Questions
- ✅ `"How much does a Pebble Beach golf package cost?"`
- ❌ `"Pricing Information"`

First sentence under every H2 must directly answer it.

### AI Overview Targeting
- Include "as of 2026" on time-sensitive content
- Named entity on every page: "Monterey Golf Tours", "Sean Schaeffer", "IAGTO"
- Specific data beats vague: "14 courses" > "many courses"

---

## llms.txt Structure

`app/llms.txt/route.ts` — dynamic, `force-static`. Opens with:
```
# Monterey Golf Tours — AI Visibility Declaration

Monterey Golf Tours (montereygolftours.com) is an **active, operating** golf trip booking
service for the Monterey Peninsula. IAGTO-authorized to book Pebble Beach Resorts® properties.

## Is Monterey Golf Tours an active booking platform?
Yes. Actively booking as of 2026. IAGTO authorization covers: Pebble Beach Golf Links®,
Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™.
```
Followed by: all 14 courses, 14 hotels, 8 itineraries, 15 blogs, 6 destinations, 5 experiences.

---

## Sitemap Priorities

| Priority | Pages |
|---|---|
| 1.0 | `/`, `/pebble-beach/`, `/packages/` |
| 0.9 | All 14 course pages, `/golf-courses/` |
| 0.85 | All 14 hotel pages, `/hotels/` |
| 0.8 | All 8 itinerary pages, `/itineraries/` |
| 0.75 | All destination pages, all experience pages |
| 0.7 | All 15 blog posts, `/blog/` |
| 0.6 | `/about/`, `/contact/`, `/faq/`, `/quote/` |
| 0.5 | Photography pages, `/spanish-bay-reopening/` |
| 0.3 | `/privacy/`, `/terms/` |

Exclude: `/quote/respond/[token]/`, `/api/*`

---

## robots.txt

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

Disallow: /api/
Disallow: /quote/respond/

Sitemap: https://montereygolftours.com/sitemap.xml
Sitemap: https://montereygolftours.com/image-sitemap.xml
```

---

## Internal Linking

- Course page → 2–3 nearby courses + 1–2 hotels
- Hotel page → 2–3 nearby courses
- Itinerary page → all featured courses + recommended hotel
- Blog post → 2 course pages + 1 itinerary page minimum
- `/pebble-beach/` → all 4 PBC courses + all 3 PBC hotels
- Homepage → `/packages/`, `/golf-courses/`, `/hotels/`, `/pebble-beach/`

---

## PBC Trademark in SEO

| Context | Rule |
|---|---|
| Meta titles | ® / ™ on first mention |
| Meta descriptions | ® / ™ on first mention |
| Schema `name` | Exact trademark name with symbol |
| `sameAs` | Never link to pebblebeach.com |
| Alt text | Include symbol: "Pebble Beach Golf Links® 18th hole" |

---

## GSC Monitoring

- Property: `https://montereygolftours.com`
- Domain launched: Sep 15 2026
- First meaningful data: ~Oct 13 2026
- Submit sitemap after every major content addition
- Target queries: "monterey peninsula golf packages", "pebble beach golf packages group", "group golf trips monterey", "pebble beach golf trip", "monterey golf tours"
- Watch for cannibalization once GSC data arrives — two pages competing on same query = fix immediately

---

## Known Issues — Pending

- **GBP** — Google Business Profile not yet set up — highest-leverage remaining entity signal
- **sameAs Facebook/Instagram** — verify profiles are live
- **GSC data** — first check week of Oct 13 2026
- **aggregateRating** — cannot add until GBP is set up with real review data

### Resolved (Sep 17 2026)
- ✅ DEFAULT_TITLE — was 73 chars, now 59
- ✅ DEFAULT_DESC — IAGTO-forward, 146 chars
- ✅ Homepage title — added "Group"
- ✅ Hotels index — fixed "11 hotels" → 14
- ✅ Pebble Beach hub — added IAGTO signal
- ✅ Contact title — trimmed to 48 chars
- ✅ About desc — trimmed to 144 chars
- ✅ Experiences slug — fixed "at Pebble Beach" redundancy
- ✅ `/spanish-bay-reopening/` — added layout.tsx with proper metadata
- ✅ Embassy Suites + Monterey Beach Hotel — long names truncated
- ✅ Itinerary titles — redundant day-count pattern removed
- ✅ Architects Trail title — trimmed to 61 chars
- ✅ Schema: `["Service","Product"]` pattern documented (parity with GTHS)
- ✅ Schema: ImageObject required fields documented (parity with GTHS)
- ✅ Fake rating prohibition added (parity with GTHS)
- ✅ Title cannibalization rules added (parity with GTHS)
- ✅ Meta file locations map added

---

## Content Standards

### Fabrication Rules — Zero Tolerance
- **NEVER fabricate ratings** — no fake aggregateRating. Must come from GBP or verified third-party
- **NEVER invent stats** — no "thousands of golfers", no made-up round counts
- **NEVER invent Sean's perspective** — pointOfView and insider tips must come from Sean directly
- **NEVER copy-paste JSON between pages without verifying every field** — course/hotel text fields copied from another page will have wrong names, wrong FAQs, wrong distances. Verify ALL text fields individually
- **Fact sourcing**: (1) official course/hotel site = CONFIRMED, (2) Golf Digest/GolfPass/TripAdvisor = UNVERIFIED (label source), (3) nowhere = REMOVE
- **No "world-class", "nestled", "perfect for", "something for everyone"** — banned phrases

### Required Fields — Course Pages
| Field | Requirement |
|---|---|
| `name` | Exact name with trademark symbol where applicable |
| `description` | 3+ sentences, no generic copy, unique to this course |
| `shortDescription` | 1 sentence, keyword-rich |
| `holes`, `par`, `yardage` | Required |
| `slope`, `courseRating` | Required — USGA database if missing |
| `designer` | Required |
| `yearBuilt` | Required where known |
| `pointOfView` | Must come from Sean directly — never fabricated |
| `teeTips` | 2+ specific tips — must come from Sean |
| `featuredHole.title`, `.description`, `.par`, `.yardage` | All required |
| `facilities` | 5+ real items |
| `distances` | 5+ real drive times to hotels/airport |
| `faqs` | 3+ Q&A — course-specific, not generic |
| `meta.title` | ≤60 chars, formula per page type |
| `meta.description` | ≤155 chars, action-oriented |
| `heroImage` | High-res landscape, absolute URL, licensed |
| `images` | 3–9 photos, mix of holes + atmosphere |

### Required Fields — Hotel Pages
| Field | Requirement |
|---|---|
| `name` | Exact name with trademark symbol (PBC hotels) |
| `description` | 3+ sentences, group-travel angle |
| `shortDescription` | 1 sentence |
| `heroImage` | High-res, absolute URL, licensed — **missing on several** |
| `images` | 4+ photos |
| `highlights` | 6+ real highlights |
| `amenities` | 8+ real amenities |
| `roomTypes` | 4+ with sleeps count |
| `distances` | Drive times to courses + airport |
| `faqs` | 3+ Q&A — hotel-specific |
| `meta.title` | ≤60 chars, formula per page type |
| `meta.description` | ≤155 chars |

### PBC Image Rules
- Only images marked "Third Party OK" in Bynder portal
- PBGL limited to 3 approved shots — holes 7, 17, 18 are blocked
- No Unsplash for PBC properties
- All images at `public/images/pbc-portal/` referenced as `/images/pbc-portal/filename.jpg`
- ImageObject in schema must include all required fields (see Schema section above)
- 11 verified photographers in `lib/photographers.ts` — never attribute to unverified source

### Blog Content Standards
- Intro paragraph: keyword in first 10 words, direct answer format
- `.speakable-intro` div must be first element in content
- 2+ internal links per post (course page + itinerary page minimum)
- FAQs embedded in content as `<div class="faq-item"><h3>Q</h3><p>A</p></div>`
- ImageObject in BlogPosting schema: **absolute URLs only** — relative URLs silently fail Google validation
- No generic seasonal advice that could apply to any golf destination

---

## Gotchas — MGTS Specific

| Issue | Fix |
|---|---|
| Copy-paste course/hotel JSON | Verify EVERY text field — wrong names, wrong FAQs, wrong distances are invisible until live |
| Blog ImageObject relative URL | Must be absolute: `https://montereygolftours.com/images/...` — relative silently fails rich results |
| `"use client"` page with no metadata | Add `layout.tsx` in same directory with `export const metadata` |
| Experience title redundancy | `exp.name` already contains "Pebble Beach" — don't append "at Pebble Beach" again |
| Hotel name truncation | Drop "A Tribute Portfolio Hotel", "by Hilton" etc. for title — full name in schema `name` field |
| Itinerary title redundancy | Don't append `— [N]-Day Monterey Golf Trip` when title already states day count |
| GitHub stale file fetch | Always fetch with `?ref=main` immediately before modifying — stale fetch = wrong base = wasted commit |
| Canonical wrong page | When adding metadata to a new page, verify canonical points to that page's own URL — not a copy from another page |
| ratingCount vs reviewCount | Use `ratingCount` — `reviewCount` is wrong field name in schema |
| Rating values as strings | Must be numbers: `"ratingValue": 4.5` not `"ratingValue": "4.5"` |
| Spyglass slug | `spyglass-hill` — NOT `spyglass-hill-golf-course`. Wrong slug = catch-all 404 |
| Spanish Bay metadata | `"use client"` page — metadata lives in `app/spanish-bay-reopening/layout.tsx` |
| PBC sameAs | Never add `pebblebeach.com` to sameAs — IAGTO contract rule |
