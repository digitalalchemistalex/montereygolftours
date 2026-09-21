import { NextResponse } from 'next/server';

const INDEXNOW_KEY = 'b7d4f1e8a3c6b9d2e5f8a1c4b7d0e3f6';
const HOST = 'montereygolftours.com';

export async function GET() {
  return NextResponse.json({ key: INDEXNOW_KEY });
}

export async function POST(request: Request) {
  const auth = request.headers.get('x-indexnow-auth');
  if (auth !== INDEXNOW_KEY) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const urls = [
    `https://${HOST}/`,
    `https://${HOST}/about/`,
    `https://${HOST}/blog/`,
    `https://${HOST}/blog/2027-us-open-pebble-beach-golf-trip/`,
    `https://${HOST}/blog/bayonet-golf-course-guide/`,
    `https://${HOST}/blog/bayonet-vs-black-horse-golf/`,
    `https://${HOST}/blog/best-golf-courses-monterey-peninsula/`,
    `https://${HOST}/blog/best-time-to-play-golf-monterey-peninsula/`,
    `https://${HOST}/blog/carmel-valley-ranch-golf-guide/`,
    `https://${HOST}/blog/how-to-plan-a-group-golf-trip-monterey/`,
    `https://${HOST}/blog/links-at-spanish-bay-reopening-2027/`,
    `https://${HOST}/blog/monterey-car-week-golf-guide/`,
    `https://${HOST}/blog/monterey-golf-first-time-guide/`,
    `https://${HOST}/blog/monterey-golf-group-size/`,
    `https://${HOST}/blog/monterey-golf-trip-on-a-budget/`,
    `https://${HOST}/blog/pacific-grove-golf-links-guide/`,
    `https://${HOST}/blog/pebble-beach-golf-cost/`,
    `https://${HOST}/blog/poppy-hills-golf-course-guide/`,
    `https://${HOST}/contact/`,
    `https://${HOST}/destinations/`,
    `https://${HOST}/destinations/carmel-valley/`,
    `https://${HOST}/destinations/carmel/`,
    `https://${HOST}/destinations/monterey/`,
    `https://${HOST}/destinations/pacific-grove/`,
    `https://${HOST}/destinations/pebble-beach-area/`,
    `https://${HOST}/destinations/seaside/`,
    `https://${HOST}/experiences/`,
    `https://${HOST}/experiences/17-mile-drive/`,
    `https://${HOST}/experiences/beach-and-tennis-club/`,
    `https://${HOST}/experiences/dining-at-pebble-beach/`,
    `https://${HOST}/experiences/pebble-beach-golf-academy/`,
    `https://${HOST}/experiences/the-spa-at-pebble-beach/`,
    `https://${HOST}/faq/`,
    `https://${HOST}/golf-courses/`,
    `https://${HOST}/golf-courses/bayonet/`,
    `https://${HOST}/golf-courses/black-horse/`,
    `https://${HOST}/golf-courses/carmel-valley-ranch/`,
    `https://${HOST}/golf-courses/del-monte-golf-course/`,
    `https://${HOST}/golf-courses/laguna-seca-golf-ranch/`,
    `https://${HOST}/golf-courses/links-at-spanish-bay/`,
    `https://${HOST}/golf-courses/pacific-grove-golf-links/`,
    `https://${HOST}/golf-courses/pasatiempo/`,
    `https://${HOST}/golf-courses/pebble-beach-golf-links/`,
    `https://${HOST}/golf-courses/pebble-beach-golf-links/live-cams/`,
    `https://${HOST}/golf-courses/poppy-hills/`,
    `https://${HOST}/golf-courses/quail-lodge/`,
    `https://${HOST}/golf-courses/spyglass-hill/`,
    `https://${HOST}/golf-courses/the-hay/`,
    `https://${HOST}/golf-courses/tpc-monterey-at-pasadera/`,
    `https://${HOST}/hotels/`,
    `https://${HOST}/hotels/bernardus-lodge/`,
    `https://${HOST}/hotels/carmel-valley-ranch/`,
    `https://${HOST}/hotels/casa-munras/`,
    `https://${HOST}/hotels/casa-palmero/`,
    `https://${HOST}/hotels/embassy-suites-monterey-bay-seaside/`,
    `https://${HOST}/hotels/hotel-abrego/`,
    `https://${HOST}/hotels/hyatt-regency-monterey/`,
    `https://${HOST}/hotels/inn-at-spanish-bay/`,
    `https://${HOST}/hotels/intercontinental-the-clement/`,
    `https://${HOST}/hotels/lodge-at-pebble-beach/`,
    `https://${HOST}/hotels/monterey-beach-hotel/`,
    `https://${HOST}/hotels/monterey-plaza/`,
    `https://${HOST}/hotels/portola-hotel/`,
    `https://${HOST}/hotels/quail-lodge/`,
    `https://${HOST}/itineraries/`,
    `https://${HOST}/itineraries/3-day-monterey-golf-weekend/`,
    `https://${HOST}/itineraries/4-day-monterey-peninsula-golf-trip/`,
    `https://${HOST}/itineraries/5-day-complete-monterey-golf-vacation/`,
    `https://${HOST}/itineraries/7-day-ultimate-monterey-golf-trip/`,
    `https://${HOST}/itineraries/carmel-valley-golf-getaway/`,
    `https://${HOST}/itineraries/monterey-corporate-golf-outing/`,
    `https://${HOST}/itineraries/monterey-golf-trip-best-value/`,
    `https://${HOST}/itineraries/pebble-beach-golf-package/`,
    `https://${HOST}/packages/`,
    `https://${HOST}/pebble-beach/`,
    `https://${HOST}/photography/`,
    `https://${HOST}/photography/christine-bush/`,
    `https://${HOST}/photography/jamie-alcala/`,
    `https://${HOST}/photography/jeff-marsh/`,
    `https://${HOST}/photography/joann-dost/`,
    `https://${HOST}/photography/kevin-merfeld/`,
    `https://${HOST}/photography/martin-miller/`,
    `https://${HOST}/photography/noah-webb/`,
    `https://${HOST}/photography/randy-tunnell/`,
    `https://${HOST}/photography/sherman-chu/`,
    `https://${HOST}/photography/taylor-mahon/`,
    `https://${HOST}/photography/tgo/`,
    `https://${HOST}/privacy/`,
    `https://${HOST}/quote/`,
    `https://${HOST}/terms/`,
  ];

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  return NextResponse.json({ submitted: urls.length, status: res.status });
}
