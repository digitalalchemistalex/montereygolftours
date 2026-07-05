// GTHS API integration for MontereyGolfTours.com
// Source: mgts-gths-data-integration.md
// Region filter: 'Monterey' (strict equality)
// Image pattern: https://golfthehighsierra.com/trips-caddie/api/api-image.php?id={trip.id}
// Returns 403 from Claude sandbox — works fine from Vercel

export interface GHTSTrip {
  id:             string;
  slug:           string;
  groupName:      string;
  groupSize:      number;
  month:          string;
  year:           number;
  region:         string;
  courses:        string[];
  lodging:        string;
  nights:         number;
  rounds:         number;
  pricePerPerson: number;
  vibe:           string;
  synopsis:       string;
  whyItWorked:    string;
  highlights:     string[];
  dailyItinerary: { day: number; title: string; activities: string[] }[];
  logistics:      { transportType: string; passengerCount: number; specialRequests: string[] };
  canonicalUrl:   string;
  imageUrl:       string; // base64 — never use directly
}

export function getGHTSImageUrl(tripId: string): string {
  return `https://golfthehighsierra.com/trips-caddie/api/api-image.php?id=${tripId}`;
}

// Sanitise whyItWorked — may contain PB trademark violations
function sanitise(text: string): string {
  return text
    .replace(/Pebble Beach Golf Links(?![®®])/g, 'Pebble Beach Golf Links®')
    .replace(/Spyglass Hill Golf Course(?![®®])/g, 'Spyglass Hill® Golf Course')
    .replace(/The Links at Spanish Bay(?![®™®™])/g, 'The Links at Spanish Bay®');
}

export async function getMontereyTrips(): Promise<GHTSTrip[]> {
  try {
    const res = await fetch('https://golfthehighsierra.com/api/trips', {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const all: GHTSTrip[] = await res.json();
    return all
      .filter((t) => t.region === 'Monterey')
      .map((t) => ({ ...t, whyItWorked: sanitise(t.whyItWorked) }));
  } catch {
    return [];
  }
}
