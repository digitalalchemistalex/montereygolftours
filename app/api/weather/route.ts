import { NextResponse } from "next/server";

const LOCATIONS = [
  { name: "Monterey",      lat: 36.6002, lon: -121.8947 },
  { name: "Pebble Beach",  lat: 36.5685, lon: -121.9490 },
  { name: "Carmel Valley", lat: 36.4800, lon: -121.7300 },
];

const WMO: Record<number, string> = {
  0: "clear", 1: "mostly clear", 2: "partly cloudy", 3: "overcast",
  45: "fog", 48: "icy fog", 51: "light drizzle", 53: "drizzle",
  55: "heavy drizzle", 61: "light rain", 63: "rain", 65: "heavy rain",
  71: "light snow", 73: "snow", 75: "heavy snow", 80: "showers",
  95: "thunderstorm",
};

function wmoDesc(code: number) {
  return WMO[code] ?? WMO[Math.floor(code / 10) * 10] ?? "variable";
}

function fogIntel(humidity: number, clouds: number, code: number, month: number) {
  const fogSeason = [4, 5, 6, 7].includes(month);
  const isFogCode = [45, 48].includes(code);
  const chance = Math.min(
    100,
    Math.round(humidity * 0.35 + clouds * 0.45 + (fogSeason ? 12 : 0) + (isFogCode ? 25 : 0))
  );
  if (chance > 65)
    return { chance, clearTime: fogSeason ? "clears by 11am" : "clears by 10am", note: "Book coastal courses for afternoon — marine layer this morning" };
  if (chance > 35)
    return { chance, clearTime: "clears by 9am", note: "Light marine layer — coastal tee times after 9am are fine" };
  return { chance, clearTime: "clear all day", note: "No fog today — coastal courses play great morning to afternoon" };
}

let cache: { data: unknown; ts: number } | null = null;
const TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  if (cache && Date.now() - cache.ts < TTL) {
    return NextResponse.json(cache.data);
  }

  const month = new Date().getMonth();

  try {
    const results = await Promise.all(
      LOCATIONS.map(async (loc) => {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${loc.lat}&longitude=${loc.lon}` +
          `&current=temperature_2m,cloud_cover,relative_humidity_2m,weather_code` +
          `&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles`;
        const res = await fetch(url, { next: { revalidate: 600 } });
        const d = await res.json();
        const c = d.current;
        return {
          name: loc.name,
          temp: Math.round(c.temperature_2m),
          clouds: c.cloud_cover,
          humidity: c.relative_humidity_2m,
          code: c.weather_code,
          desc: wmoDesc(c.weather_code),
        };
      })
    );

    const primary = results[0];
    const fog = fogIntel(primary.humidity, primary.clouds, primary.code, month);

    const data = { locations: results, fog, ok: true };
    cache = { data, ts: Date.now() };
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
