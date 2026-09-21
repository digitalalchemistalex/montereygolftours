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
    `https://${HOST}/golf-courses/`,
    `https://${HOST}/hotels/`,
    `https://${HOST}/itineraries/`,
    `https://${HOST}/pebble-beach/`,
    `https://${HOST}/experiences/`,
    `https://${HOST}/about/`,
    `https://${HOST}/faq/`,
    `https://${HOST}/llms.txt`,
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
