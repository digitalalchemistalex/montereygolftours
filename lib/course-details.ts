// Source: mgts-course-intelligence.md (verified June 2 2026)
// Rating/slope fields are intentionally OMITTED wherever the source file
// flags them [VERIFY] — these must not be published until resolved.

export type CourseDetail = {
  slug: string;
  name: string;
  city: string;
  facility: string;
  par: number;
  yards: string;
  holes: number;
  designer: string;
  type: string;
  address: string;
  phone: string;
  website: string;
  hook: string;
  description: string[];
  highlights: { label: string; detail: string }[];
  bestFor: string[];
  lessIdealIf: string[];
  greenFeeEst: string;
  nearbySlugs: string[];
  faqs: { q: string; a: string }[];
};

export const COURSE_DETAILS: Record<string, CourseDetail> = {
  bayonet: {
    slug: "bayonet",
    name: "Bayonet",
    city: "Seaside, CA",
    facility: "Bayonet & Black Horse",
    par: 72,
    yards: "7,094 yards",
    holes: 18,
    designer: "Gen. Robert B. McClure (1954), redesigned by Gene Bates (2007)",
    type: "Semi-private / public",
    address: "1 McClure Way, Seaside, CA 93955",
    phone: "(831) 899-7271",
    website: "bayonetblackhorse.com",
    hook:
      "The military-heritage championship at former Fort Ord — one of California's most demanding public layouts.",
    description: [
      "Bayonet sits on the grounds of the former Fort Ord military base, purchased by the US Army in 1917. General Robert B. McClure, the post's commanding officer, designed the course in 1954 — reportedly to suit his own left-handed game, which is how the course got its famous \"Combat Corner\" doglegs on the back nine. The course is named for the 7th Infantry, the \"Bayonet Division.\"",
      "Fort Ord was decommissioned in the 1990s, and Bayonet opened to public play on January 16, 1997. A Gene Bates redesign completed in 2007 refreshed the layout while keeping the demanding, military-pedigree character intact.",
      "At 7,094 yards from the back tees, Bayonet is consistently ranked among California's hardest public-access courses. It's hosted PGA Tour qualifiers and players including Billy Andrade, Arnold Palmer, Jack Nicklaus, and Tom Watson, and a Nationwide Tour event (the Monterey Peninsula Classic) was held here from 2000 to 2003.",
    ],
    highlights: [
      {
        label: "Combat Corner",
        detail: "A run of sharp doglegs on the back nine, the course's signature stretch.",
      },
      {
        label: "Golf Digest recognition",
        detail: "Named to Golf Digest's Top 75 Affordable Courses in America (2016 ranking).",
      },
      {
        label: "Military heritage",
        detail: "Built on former Fort Ord land, designed by the post's commanding officer in 1954.",
      },
      {
        label: "5 miles from downtown",
        detail: "A short drive from downtown Monterey and Cannery Row.",
      },
    ],
    bestFor: [
      "Serious golfers and bucket-list players",
      "Scratch to mid-handicap groups",
      "Anyone wanting a genuine championship test",
    ],
    lessIdealIf: [
      "Your group is mostly high-handicap beginners",
      "You want a relaxed, low-pressure round",
    ],
    greenFeeEst: "~$195 with cart",
    nearbySlugs: ["black-horse"],
    faqs: [
      {
        q: "Is Bayonet open to the public?",
        a: "Yes. Bayonet is semi-private and open to public play, with group bookings accommodated through the facility.",
      },
      {
        q: "How difficult is Bayonet?",
        a: "It's regarded as one of California's hardest public-access courses, built for serious and scratch-to-mid-handicap players. High-handicap beginners may find it punishing.",
      },
      {
        q: "Who designed Bayonet?",
        a: "Gen. Robert B. McClure designed the original course in 1954. Gene Bates completed a redesign in 2007.",
      },
      {
        q: "What's the green fee at Bayonet?",
        a: "Estimated around $195 with cart, though rates vary seasonally — always verify current pricing before booking.",
      },
      {
        q: "Can groups book Bayonet?",
        a: "Yes, Bayonet accommodates group events. Contact the facility directly or work with Monterey Golf Tours to coordinate tee times as part of a planned trip.",
      },
    ],
  },
};
