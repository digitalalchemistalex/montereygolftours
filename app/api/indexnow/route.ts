// app/api/indexnow/route.ts
// Pings Bing + Yandex via IndexNow on demand (call after new content deploys)
// GET /api/indexnow — submit all sitemap URLs instantly

import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const KEY = "mgts1789002022monterey2026";
const HOST = "montereygolftours.com";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/golf-courses/`,
  `https://${HOST}/hotels/`,
  `https://${HOST}/itineraries/`,
  `https://${HOST}/packages/`,
  `https://${HOST}/destinations/`,
  `https://${HOST}/blog/`,
  `https://${HOST}/faq/`,
  `https://${HOST}/about/`,
  `https://${HOST}/quote/`,
  `https://${HOST}/contact/`,
];

export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  };

  const results = await Promise.allSettled([
    fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    }),
    fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    }),
  ]);

  const statuses = results.map((r, i) => ({
    engine: i === 0 ? "indexnow.org" : "bing",
    ok: r.status === "fulfilled" && r.value.ok,
    status: r.status === "fulfilled" ? r.value.status : "rejected",
  }));

  return NextResponse.json({ submitted: URLS.length, results: statuses });
}
