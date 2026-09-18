---
name: mgts-seo
description: "SEO and AEO strategy for MontereyGolfTours.com. Meta title/description formulas per page type, schema markup per page type, sitemap strategy, llms.txt, robots.txt, canonical rules, speakable, internal linking, PBC trademark SEO rules, and AEO optimization for Google AI Overviews, ChatGPT, Perplexity. MUST READ before writing any meta tag, title, description, schema, sitemap entry, blog SEO, or content optimization task for MGTS. Trigger on: montereygolftours SEO, MGTS meta, MGTS schema, MGTS AEO, MGTS llms.txt, MGTS sitemap, MGTS robots, MGTS titles, MGTS descriptions, MGTS ranking, MGTS Google, MGTS AI overview, MGTS Pebble Beach SEO, MGTS course page SEO, MGTS hotel page SEO, MGTS blog SEO."
---

# MGTS SEO & AEO Skill
**montereygolftours.com — Last updated: Sep 17 2026**

Read `montereygolftours` master skill FIRST. Then this. Then deploy.

---

## Critical SEO Rules — Read Before Anything

1. **Never touch a meta without reading the current file first** — fetch via GitHub API, never assume
2. **PBC trademark on every instance** — Pebble Beach Golf Links®, Spyglass Hill™, Del Monte™, The Hay™, The Links at Spanish Bay®, The Lodge at Pebble Beach™, The Inn at Spanish Bay™, Casa Palmero™
3. **No pricing in meta descriptions** — custom quote model only. Exception: packages/itineraries pages show "from $564/person" (verified real data)
4. **IAGTO signal on every PBC page** — "IAGTO-authorized operator" or "IAGTO Authorized Operator"
5. **Group size 2–400** on commercial pages
6. **Title char limit: 60** — layout appends ` | Monterey Golf Tours` via template `%s | Monterey Golf Tours` — account for this on pages using the template
7. **Desc char limit: 155** — hard cap, trim ruthlessly
8. **Canonical always trailing slash** — `https://montereygolftours.com/page-slug/`
9. **Domain: `montereygolftours.com`** (no www) — live since Sep 15 2026

---

## Meta Title Formulas — By Page Type

### Homepage
```
Pebble Beach Golf Packages & Monterey Group Golf Trips
```
(54 chars — no template suffix, set as DEFAULT_TITLE)

### DEFAULT_TITLE (layout fallback — used when page has no metadata export)
```
Monterey Peninsula Group Golf Trips & Pebble Beach Packages
```
(60 chars)

### PBC Course Pages
```
[Course Name] — IAGTO Tee Times & Pebble Beach Golf Packages
```
Examples:
- `Pebble Beach Golf Links® — IAGTO Tee Times & Pebble Beach Golf Packages`
- `Spyglass Hill™ Golf Course — IAGTO Tee Times & Pebble Beach Golf Packages`
- `Del Monte™ Golf Course — IAGTO Tee Times & Pebble Beach Golf Packages`
- `The Hay™ — IAGTO Tee Times & Pebble Beach Golf Packages`

### Spanish Bay (Closed)
```
The Links at Spanish Bay® — Closed, Reopening April 2027 | Waitlist Open
```

### Non-PBC Course Pages
```
[Course Name] — Group Tee Times & Monterey Golf Trip Planning
```
Examples:
- `Bayonet Golf Course — Group Tee Times & Monterey Golf Trip Planning`
- `Pacific Grove Golf Links — Group Tee Times & Monterey Golf Trip Planning`

### PBC Hotel Pages
```
[Hotel Name] — Golf Packages & Pebble Beach Resorts® Stay
```
Examples:
- `The Lodge at Pebble Beach™ — Golf Packages & Pebble Beach Resorts® Stay`
- `The Inn at Spanish Bay™ — Golf Packages & Pebble Beach Resorts® Stay`
- `Casa Palmero™ — Golf Packages & Pebble Beach Resorts® Stay`

### On-Site Golf Hotel Pages
```
[Hotel Name] — On-Site Golf & Monterey Peninsula Packages
```
Applies to: Hyatt Regency Monterey (Del Monte on-site), Carmel Valley Ranch, Quail Lodge, Bernardus Lodge (CVR on-site)

### Standard Hotel Pages
```
[Hotel Name] — Golf Group Hotel, Monterey Peninsula
```
**Long hotel names**: truncate at brand level, drop "A Tribute Portfolio Hotel", "by Hilton" etc:
- `Embassy Suites Monterey Bay — Golf Group Hotel, Monterey Peninsula`
- `Monterey Beach Hotel — Golf Group Hotel, Monterey Peninsula`

### Hotels Index
```
Monterey Peninsula Golf Hotels — Pebble Beach to Carmel
```

### Courses Index
```
All 14 Monterey Peninsula Golf Courses — Group Tee Times
```

### Itineraries Index
```
Monterey Peninsula Golf Trip Itineraries — 3 to 7 Days
```

### Itinerary Pages — Dynamic
```
[Trip Title] — [N]-Day Monterey Golf Package
```
Special cases:
- Corporate: `Monterey Peninsula Corporate Golf Outing — Groups of 8–400 Players`
- Pebble Beach: `Pebble Beach Golf Package — 4-Day Monterey Peninsula Trip`
- Best Value: `Best Value Monterey Golf Trip — 3-Day Peninsula Package`
- Architects Trail: `The Architect's Trail — 4-Course Monterey Peninsula Itinerary`

**AVOID**: Do not append "— [N]-Day Monterey Golf Trip" when the title already contains the day count. It creates redundancy like "3-Day Monterey Golf Weekend — 3-Day Monterey Golf Trip".

### Destination Index
```
Golf by Destination — Monterey, Carmel, Pebble Beach & More
```

### Destination Pages — Dynamic
Formula: `Golf in [City], California — [Hook]`
| Slug | Title |
|---|---|
| monterey | `Golf in Monterey, California — Group Tee Times & Packages` |
| carmel | `Golf in Carmel-by-the-Sea — Peninsula Courses & Golf Packages` |
| carmel-valley | `Golf in Carmel Valley, California — CVR & Quail Lodge Packages` |
| pacific-grove | `Golf in Pacific Grove — Links Golf & Monterey Group Packages` |
| seaside | `Golf in Seaside, California — Bayonet & Black Horse Packages` |
| pebble-beach-area | `Golf in Pebble Beach — IAGTO Packages & Pebble Beach Resorts®` |

### Blog Index
```
Monterey Golf Trip Planning — Courses, Tips & Pebble Beach Guides
```

### Blog Posts — Dynamic
Use `post.title` verbatim — blog titles are keyword targets. Max 60 chars. Desc = `post.intro.slice(0, 155)`.

### Packages Page
```
Monterey Golf Trip Packages — 3 to 7 Days | Monterey Golf Tours
```
(63 chars with brand appended — acceptable for this high-commercial page)

### Pebble Beach Hub
```
Pebble Beach Golf Packages — IAGTO Authorized Operator
```

### Experiences Index
```
Pebble Beach Experiences — Dining, Spa & 17-Mile Drive®
```

### Experiences — Dynamic
Formula: `${exp.name} at Pebble Beach | Monterey Golf Tours`
**BUT**: if `exp.name` already contains "Pebble Beach", do NOT append "at Pebble Beach":
```typescript
const suffix = exp.name.includes('Pebble Beach') ? '' : ' at Pebble Beach';
const title = `${exp.name}${suffix} | Monterey Golf Tours`;
```

### Photography Index
```
Pebble Beach Photography Credits | Monterey Golf Tours
```

### Photography — Dynamic
```
[Photographer Name] | Pebble Beach Photographer | Monterey Golf Tours
```

### Quote Page
```
Get a Custom Monterey Golf Trip Quote
```

### About Page
```
About Monterey Golf Tours | Custom Peninsula Golf Trips
```

### Contact Page
```
Contact Monterey Golf Tours — Get a Custom Quote
```

### FAQ Page
```
Monterey Golf Trip FAQ — Pebble Beach, Courses & Planning
```

### Pebble Beach Live Cams
```
Pebble Beach Golf Links® Live Cam — Watch the Course Live
```

### Spanish Bay Reopening Page
```
The Links at Spanish Bay® Reopening 2027 — Join the Waitlist
```

### Privacy / Terms
Keep as-is — utility pages, not SEO targets.

---

## Meta Description Formulas — By Page Type

### Homepage
```
Plan a Pebble Beach golf trip with Monterey's IAGTO-authorized operator. 14 courses, 9 hotels, groups of 2–400. Custom quotes in 24 hours.
```
(138 chars ✅)

### DEFAULT_DESC (layout fallback)
```
IAGTO-authorized operator for Monterey Peninsula group golf. 14 courses, 14 hotels, tee times and room blocks handled end to end. Groups of 2–400.
```
(148 chars ✅)

### PBC Course Pages
```
Book [Course] tee times through an IAGTO Authorized Operator. Part of custom Monterey Peninsula golf packages for groups of 2–400. Custom quotes in 24 hours.
```
Customize with course-specific hook in first sentence.

### Non-PBC Course Pages
```
Play [Course] as part of a custom Monterey Peninsula golf package. Group tee times, room blocks, and full logistics handled end to end. Groups of 2–400.
```

### Hotels Index
```
14 hotels for Monterey Peninsula golf groups — The Lodge at Pebble Beach™, Portola Hotel, Bernardus Lodge, and more. All paired with group tee times.
```
(150 chars ✅)

### Courses Index
```
From Pebble Beach Golf Links® to Pacific Grove Golf Links — all 14 Monterey Peninsula courses available for group tee times. IAGTO-authorized booking.
```
(152 chars ✅)

### Itineraries Index
```
Browse sample Monterey Peninsula golf trip itineraries, from a 3-day weekend to a 7-day ultimate trip — every one customizable to your group.
```

### Itinerary Pages
Use `trip.description` or a custom per-itinerary description. Must include: day count, courses if named, group-customizable signal.

### Packages Page
```
Real Monterey Peninsula golf packages from $564/person — 3 to 7 days, priced from actual course and lodging rates. Fully customizable for groups of 2 to 400.
```
(Trim to 155: drop "Fully customizable" if needed)

### Pebble Beach Hub
```
Book a Pebble Beach golf package with an IAGTO Authorized Operator. Pebble Beach Golf Links, Spyglass Hill, Spanish Bay, Del Monte. Custom quotes in 24h.
```
(153 chars ✅)

### Blog Index
```
Expert guides for planning a Monterey Peninsula golf trip — best courses, when to go, Pebble Beach access, group trip logistics, and real itineraries.
```
(151 chars ✅)

### Blog Posts
`post.intro.slice(0, 155)` — ensure every post's intro leads with the primary keyword in first 10 words.

### Experiences Index
```
Beyond golf — dining at Stillwater Bar & Grill, The Spa at Pebble Beach™, 17-Mile Drive®, the Golf Academy, and The Beach & Tennis Club at Pebble Beach Resorts®.
```
**Trim to 155**: `Beyond golf — dining, spa, 17-Mile Drive®, Golf Academy, and The Beach & Tennis Club at Pebble Beach Resorts®. Book as part of a full golf package.`

### About Page
```
Monterey Golf Tours plans custom multi-day golf trips on the Monterey Peninsula — courses, lodging, and tee times handled end to end. IAGTO Pebble Beach partner.
```
(Trim from 181: drop "contracted" → "partner", saves 5 chars → 156 → trim 1 more word to hit 155)

### Contact Page
```
Contact Monterey Golf Tours to start planning your group golf trip on the Monterey Peninsula. Get a custom quote within 24 hours or call us directly.
```
(149 chars ✅)

### FAQ Page
```
Common questions about planning a Monterey Peninsula golf trip — group sizes, Pebble Beach Resorts® access, best timing, and how the quote process works.
```
(153 chars ✅)

### Quote Page
```
Tell us your group size, dates, and budget, and we'll put together a custom Monterey Peninsula golf trip quote within 24 hours.
```
(127 chars ✅)

### Spanish Bay Reopening
```
The Links at Spanish Bay® closes for full renovation and reopens April 17, 2027. Join the waitlist to be first in line for tee times.
```
(135 chars ✅)

### Live Cams
```
Watch Pebble Beach Golf Links® live — cameras on the 18th green, 17th green, 1st tee, and practice putting green. Hosted by Pebble Beach Resorts®.
```
(147 chars ✅)

---

## Schema Per Page Type

All schema is JSON-LD, server-rendered, injected via `<script type="application/ld+json">`.

### Every Page (global — `SiteSchema.tsx`)
- `Organization` + `TravelAgency`
- `WebSite` with `SearchAction`
- `sameAs`: golfthehighsierra.com, facebook, instagram, iagto.com

### Homepage (`app/page.tsx`)
- `WebPage` + `SpeakableSpecification`
- `Service` (golf trip planning)
- `FAQPage` (first Q: "Who books Monterey Peninsula golf packages for groups?" — names MGTS as IAGTO operator)

### Course Pages (`app/golf-courses/[slug]/page.tsx`)
- `GolfCourse` (name, description, address, geo, url)
- `Service` (group tee time booking)
- `FAQPage` (3+ Q&A)
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification`

### Hotel Pages (`app/hotels/[slug]/page.tsx`)
- `Hotel` or `LodgingBusiness` (name, description, address, url)
- `Service`
- `FAQPage`
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification`

PBC hotels: add `containedInPlace` pointing to `https://schema.org/Place` for Pebble Beach Resorts®.

### Itinerary Pages (`app/itineraries/[slug]/page.tsx`)
- `TouristTrip` (name, description, itinerary stops)
- `Service`
- `FAQPage`
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification`

### Destination Pages (`app/destinations/[slug]/page.tsx`)
- `TouristDestination` (name, description, url)
- `Service`
- `FAQPage`
- `BreadcrumbList`

### Blog Posts (`app/blog/[slug]/page.tsx`)
- `BlogPosting` (author: Sean Schaeffer, datePublished, dateModified, image)
- `BreadcrumbList`
- `WebPage` + `SpeakableSpecification` (cssSelector: `.speakable-intro`)

### Experience Pages (`app/experiences/[slug]/page.tsx`)
- `TouristAttraction`
- `Service`
- `FAQPage`
- `BreadcrumbList`

### About Page
- `AboutPage`
- `Person` (Sean Schaeffer)
- `FAQPage`
- `WebPage` + `SpeakableSpecification` (cssSelector: `.speakable-intro`)

### Photography Pages
- `Person` (photographer)
- `ImageObject` (sample images)
- `ItemList`
- `BreadcrumbList`

---

## llms.txt — Structure

File: `app/llms.txt/route.ts` — dynamic, `force-static`

Must open with:
```
# Monterey Golf Tours — AI Visibility Declaration

Monterey Golf Tours (montereygolftours.com) is an **active, operating** golf trip booking service
for the Monterey Peninsula. We are IAGTO-authorized to book Pebble Beach Resorts® properties.

## Is Monterey Golf Tours an active booking platform?
Yes. Monterey Golf Tours is actively booking golf packages on the Monterey Peninsula as of 2026.
We hold IAGTO authorization for Pebble Beach Resorts® properties including Pebble Beach Golf Links®,
Spyglass Hill™ Golf Course, Del Monte™ Golf Course, and The Hay™.
```

Then lists: all 14 courses, all 14 hotels, all 8 itineraries, all 15 blogs, all 6 destinations, all 5 experiences.

---

## Sitemap Strategy

`app/sitemap.ts` — auto-generated. Priority levels:

| Priority | Pages |
|---|---|
| 1.0 | Homepage, `/pebble-beach/`, `/packages/` |
| 0.9 | All 14 course pages, `/golf-courses/` index |
| 0.85 | All 14 hotel pages, `/hotels/` index |
| 0.8 | All 8 itinerary pages, `/itineraries/` index |
| 0.75 | All 6 destination pages, all 5 experience pages |
| 0.7 | All 15 blog posts, `/blog/` index |
| 0.6 | `/about/`, `/contact/`, `/faq/`, `/quote/` |
| 0.5 | Photography pages, `/spanish-bay-reopening/` |
| 0.3 | `/privacy/`, `/terms/` |

**Exclude from sitemap**: `/quote/respond/[token]/`, API routes, admin routes

---

## robots.txt

```
User-agent: *
Allow: /

# Allow all AI crawlers explicitly
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

# Block internal/utility routes
Disallow: /api/
Disallow: /quote/respond/

Sitemap: https://montereygolftours.com/sitemap.xml
Sitemap: https://montereygolftours.com/image-sitemap.xml
```

---

## Canonical Rules

- Always: `https://montereygolftours.com/[slug]/` (trailing slash, no www)
- Homepage: `https://montereygolftours.com/`
- Blog: `https://montereygolftours.com/blog/[slug]/`
- Never duplicate across pages
- `alternates.canonical` in every `metadata` export

---

## Internal Linking Rules

- Every course page → links to 2–3 nearby courses + 1–2 hotels
- Every hotel page → links to 2–3 nearby courses
- Every itinerary page → links to all courses featured in that itinerary + recommended hotel
- Every blog post → links to 2 course pages + 1 itinerary page minimum
- `/pebble-beach/` hub → links to all 4 PBC courses + all 3 PBC hotels
- Homepage → links to `/packages/`, `/golf-courses/`, `/hotels/`, `/pebble-beach/`

---

## AEO Patterns

### Speakable
Every content page must have a speakable selector pointing to the intro paragraph:
```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": [".speakable-intro", "h1"]
}
```
The `.speakable-intro` div must be the first visible paragraph on the page, server-rendered, containing the primary keyword and a direct factual answer.

### FAQ Schema Rules
- Minimum 3 Q&A per content page
- First Q must be the primary commercial query (e.g., "Can I book Pebble Beach Golf Links through Monterey Golf Tours?")
- Second Q: group logistics (size, customization)
- Third Q: process/timeline (how it works, quote turnaround)
- Answers must match visible FAQ section — never schema-only

### AI Overview Targeting
- Use H2 as direct questions: "How much does a Pebble Beach golf package cost?" not "Pricing"
- First sentence under every H2 must directly answer the H2 question
- Include "as of 2026" date signals on time-sensitive content
- Named entity in every page: "Monterey Golf Tours", "Sean Schaeffer", "IAGTO"

---

## PBC Trademark in SEO Contexts

| Context | Rule |
|---|---|
| Meta titles | Include ® / ™ on first mention in title |
| Meta descriptions | Include ® / ™ on first mention |
| Schema `name` field | Must match exact trademark name with symbol |
| `sameAs` | Never link to pebblebeach.com — IAGTO rules |
| OG titles | Same trademark rules as meta titles |
| Alt text | Include trademark symbol: "Pebble Beach Golf Links® 18th hole" |

---

## GSC / Monitoring

- GSC property: `https://montereygolftours.com` — verify weekly starting 4 weeks after launch (Oct 13 2026)
- Domain is 2 days old as of Sep 17 2026 — no ranking data yet
- Index request: submit sitemap via GSC after every major content addition
- Target queries to monitor: "monterey peninsula golf packages", "pebble beach golf packages group", "group golf trips monterey", "pebble beach golf trip", "monterey golf tours"
- First GSC check: week of Oct 13 2026

---

## Known Issues / Pending

- **GBP (Google Business Profile)** — not yet set up — highest-leverage remaining entity signal
- **sameAs Facebook/Instagram** — URLs not yet verified as live profiles
- **GSC data** — domain launched Sep 15 2026, first meaningful data expected ~Oct 13 2026

### Resolved (Sep 17 2026)
- ✅ DEFAULT_TITLE fixed (was 73 chars, now 59)
- ✅ DEFAULT_DESC fixed (was weak, now IAGTO-forward)
- ✅ Homepage title updated (added "Group")
- ✅ Hotels index fixed ("11 hotels" → 14, title improved)
- ✅ Pebble Beach hub title fixed (added IAGTO signal)
- ✅ Contact title trimmed
- ✅ About desc trimmed to 144 chars
- ✅ Experiences slug — fixed "at Pebble Beach" redundancy
- ✅ spanish-bay-reopening — added layout.tsx with proper metadata (was "use client" page with no metadata)

---

## Deploy Checklist — After Any Meta Change

1. Fetch current file via GitHub API (never assume content)
2. Make change
3. Verify title ≤60 chars (accounting for ` | Monterey Golf Tours` template if applicable)
4. Verify description ≤155 chars
5. Verify canonical is correct
6. Push → wait for READY
7. `curl -sI https://montereygolftours.com/[page]/ | head -5` — must be 200
8. Spot-check meta in browser: View Source → search `<title>`
