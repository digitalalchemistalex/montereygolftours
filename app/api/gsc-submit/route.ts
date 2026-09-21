import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

const CRON_SECRET = process.env.CRON_SECRET;
const SA_KEY_JSON = process.env.MGTS_GSC_SA_KEY;

const URLS = [
  'https://montereygolftours.com/',
  'https://montereygolftours.com/about/',
  'https://montereygolftours.com/blog/',
  'https://montereygolftours.com/blog/2027-us-open-pebble-beach-golf-trip/',
  'https://montereygolftours.com/blog/bayonet-golf-course-guide/',
  'https://montereygolftours.com/blog/bayonet-vs-black-horse-golf/',
  'https://montereygolftours.com/blog/best-golf-courses-monterey-peninsula/',
  'https://montereygolftours.com/blog/best-time-to-play-golf-monterey-peninsula/',
  'https://montereygolftours.com/blog/carmel-valley-ranch-golf-guide/',
  'https://montereygolftours.com/blog/how-to-plan-a-group-golf-trip-monterey/',
  'https://montereygolftours.com/blog/links-at-spanish-bay-reopening-2027/',
  'https://montereygolftours.com/blog/monterey-car-week-golf-guide/',
  'https://montereygolftours.com/blog/monterey-golf-first-time-guide/',
  'https://montereygolftours.com/blog/monterey-golf-group-size/',
  'https://montereygolftours.com/blog/monterey-golf-trip-on-a-budget/',
  'https://montereygolftours.com/blog/pacific-grove-golf-links-guide/',
  'https://montereygolftours.com/blog/pebble-beach-golf-cost/',
  'https://montereygolftours.com/blog/poppy-hills-golf-course-guide/',
  'https://montereygolftours.com/contact/',
  'https://montereygolftours.com/destinations/',
  'https://montereygolftours.com/destinations/carmel-valley/',
  'https://montereygolftours.com/destinations/carmel/',
  'https://montereygolftours.com/destinations/monterey/',
  'https://montereygolftours.com/destinations/pacific-grove/',
  'https://montereygolftours.com/destinations/pebble-beach-area/',
  'https://montereygolftours.com/destinations/seaside/',
  'https://montereygolftours.com/experiences/',
  'https://montereygolftours.com/experiences/17-mile-drive/',
  'https://montereygolftours.com/experiences/beach-and-tennis-club/',
  'https://montereygolftours.com/experiences/dining-at-pebble-beach/',
  'https://montereygolftours.com/experiences/pebble-beach-golf-academy/',
  'https://montereygolftours.com/experiences/the-spa-at-pebble-beach/',
  'https://montereygolftours.com/faq/',
  'https://montereygolftours.com/golf-courses/',
  'https://montereygolftours.com/golf-courses/bayonet/',
  'https://montereygolftours.com/golf-courses/black-horse/',
  'https://montereygolftours.com/golf-courses/carmel-valley-ranch/',
  'https://montereygolftours.com/golf-courses/del-monte-golf-course/',
  'https://montereygolftours.com/golf-courses/laguna-seca-golf-ranch/',
  'https://montereygolftours.com/golf-courses/links-at-spanish-bay/',
  'https://montereygolftours.com/golf-courses/pacific-grove-golf-links/',
  'https://montereygolftours.com/golf-courses/pasatiempo/',
  'https://montereygolftours.com/golf-courses/pebble-beach-golf-links/',
  'https://montereygolftours.com/golf-courses/pebble-beach-golf-links/live-cams/',
  'https://montereygolftours.com/golf-courses/poppy-hills/',
  'https://montereygolftours.com/golf-courses/quail-lodge/',
  'https://montereygolftours.com/golf-courses/spyglass-hill/',
  'https://montereygolftours.com/golf-courses/the-hay/',
  'https://montereygolftours.com/golf-courses/tpc-monterey-at-pasadera/',
  'https://montereygolftours.com/hotels/',
  'https://montereygolftours.com/hotels/bernardus-lodge/',
  'https://montereygolftours.com/hotels/carmel-valley-ranch/',
  'https://montereygolftours.com/hotels/casa-munras/',
  'https://montereygolftours.com/hotels/casa-palmero/',
  'https://montereygolftours.com/hotels/embassy-suites-monterey-bay-seaside/',
  'https://montereygolftours.com/hotels/hotel-abrego/',
  'https://montereygolftours.com/hotels/hyatt-regency-monterey/',
  'https://montereygolftours.com/hotels/inn-at-spanish-bay/',
  'https://montereygolftours.com/hotels/intercontinental-the-clement/',
  'https://montereygolftours.com/hotels/lodge-at-pebble-beach/',
  'https://montereygolftours.com/hotels/monterey-beach-hotel/',
  'https://montereygolftours.com/hotels/monterey-plaza/',
  'https://montereygolftours.com/hotels/portola-hotel/',
  'https://montereygolftours.com/hotels/quail-lodge/',
  'https://montereygolftours.com/itineraries/',
  'https://montereygolftours.com/itineraries/3-day-monterey-golf-weekend/',
  'https://montereygolftours.com/itineraries/4-day-monterey-peninsula-golf-trip/',
  'https://montereygolftours.com/itineraries/5-day-complete-monterey-golf-vacation/',
  'https://montereygolftours.com/itineraries/7-day-ultimate-monterey-golf-trip/',
  'https://montereygolftours.com/itineraries/carmel-valley-golf-getaway/',
  'https://montereygolftours.com/itineraries/monterey-corporate-golf-outing/',
  'https://montereygolftours.com/itineraries/monterey-golf-trip-best-value/',
  'https://montereygolftours.com/itineraries/pebble-beach-golf-package/',
  'https://montereygolftours.com/packages/',
  'https://montereygolftours.com/pebble-beach/',
  'https://montereygolftours.com/photography/',
  'https://montereygolftours.com/photography/christine-bush/',
  'https://montereygolftours.com/photography/jamie-alcala/',
  'https://montereygolftours.com/photography/jeff-marsh/',
  'https://montereygolftours.com/photography/joann-dost/',
  'https://montereygolftours.com/photography/kevin-merfeld/',
  'https://montereygolftours.com/photography/martin-miller/',
  'https://montereygolftours.com/photography/noah-webb/',
  'https://montereygolftours.com/photography/randy-tunnell/',
  'https://montereygolftours.com/photography/sherman-chu/',
  'https://montereygolftours.com/photography/taylor-mahon/',
  'https://montereygolftours.com/photography/tgo/',
  'https://montereygolftours.com/privacy/',
  'https://montereygolftours.com/quote/',
  'https://montereygolftours.com/terms/',
];

export async function POST(request: Request) {
  const auth = request.headers.get('x-cron-auth');
  if (auth !== CRON_SECRET) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  if (!SA_KEY_JSON) {
    return NextResponse.json({ error: 'MGTS_GSC_SA_KEY not set' }, { status: 500 });
  }

  const keyFile = JSON.parse(SA_KEY_JSON);
  const googleAuth = new GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  const client = await googleAuth.getClient();
  const token = await client.getAccessToken();
  const accessToken = token.token;

  const results: { url: string; status: number }[] = [];
  for (const url of URLS) {
    const res = await fetch(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      }
    );
    results.push({ url, status: res.status });
  }

  const ok = results.filter((r) => r.status === 200).length;
  const failed = results.filter((r) => r.status !== 200);
  return NextResponse.json({ submitted: ok, failed, total: URLS.length });
}
