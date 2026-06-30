// Source: mgts-course-intelligence.md + MGTS_Fact_Verification_Tracker.xlsx
// (verified directly against bayonetblackhorse.com by Raza, June 2026)

export type CourseDetail = {
  slug: string;
  name: string;
  city: string;
  facility: string;
  par: number;
  yards: string;
  rating?: string;
  slope?: string;
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
    yards: "7,024 yards",
    rating: "74.8",
    slope: "139",
    holes: 18,
    designer: "Gen. Robert B. McClure (1954), redesigned by Gene Bates (2007)",
    type: "Semi-private / public",
    address: "1 McClure Way, Seaside, CA 93955",
    phone: "(831) 899-7271",
    website: "bayonetblackhorse.com",
    hook:
      "The military-heritage championship at former Fort Ord — one of the toughest public courses in the country.",
    description: [
      "Bayonet sits on the grounds of the former Fort Ord military base, purchased by the US Army in 1917. General Robert B. McClure, the post's commanding officer, designed the course in 1954 — reportedly to suit his own left-handed game. Hole 15, part of a demanding stretch that runs holes 11 through 15, carries the course's famous \"Combat Corner\" nickname. The course is named for the 7th Infantry, the \"Bayonet Division.\"",
      "Fort Ord was decommissioned in the 1990s, and Bayonet opened to public play on January 16, 1997. A Gene Bates redesign completed in 2007 refreshed the layout while keeping the demanding, military-pedigree character intact.",
      "At 7,024 yards from the back tees (rating 74.8, slope 139), Bayonet is ranked among the toughest public courses in the country — Golf Digest placed it No. 35 nationwide on its list of the toughest courses in America, and GolfPass ranked it No. 17 nationally among the most grueling public layouts. It's hosted PGA Tour qualifiers and players including Billy Andrade, Arnold Palmer, Jack Nicklaus, and Tom Watson, and a Nationwide Tour event (the Monterey Peninsula Classic) was held here from 2000 to 2003.",
    ],
    highlights: [
      {
        label: "Combat Corner",
        detail: "Hole 15, the signature hole in a demanding stretch running holes 11 through 15.",
      },
      {
        label: "Nationally ranked",
        detail: "Golf Digest No. 35 and GolfPass No. 17 on their toughest public courses in America lists.",
      },
      {
        label: "Military heritage",
        detail: "Built on former Fort Ord land, designed by the post's commanding officer in 1954.",
      },
      {
        label: "14 minutes from the Hyatt Regency",
        detail: "A short drive from Monterey via General Jim Moore Blvd.",
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
        a: "It's ranked among the toughest public courses in the country — No. 35 nationally by Golf Digest and No. 17 by GolfPass. Built for serious and scratch-to-mid-handicap players; high-handicap beginners may find it punishing.",
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
