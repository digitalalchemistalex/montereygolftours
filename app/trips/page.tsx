import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE } from '@/lib/site'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Monterey Golf Trip Recaps | Monterey Golf Tours',
  description: `Browse past golf trip recaps from ${SITE.name}.`,
}

interface TripRecap {
  slug: string
  synopsis: string | null
  region: string | null
  year: number | null
  nights: number | null
  rounds: number | null
  lodging: string | null
  image_url: string | null
  highlights: string[] | null
  price_per_person: number | null
  group_name: string | null
}

function formatPrice(price: number | null): string {
  if (price == null) return ''
  return `$${price.toLocaleString('en-US')} per person`
}

export default async function TripsPage() {
  const supabase = createClient(
    process.env.MGTS_SUPABASE_URL!,
    process.env.MGTS_SUPABASE_SERVICE_KEY!
  )

  const { data: trips, error } = await supabase
    .from('trip_recaps')
    .select('slug, synopsis, region, year, nights, rounds, lodging, image_url, highlights, price_per_person, group_name')
    .eq('published', true)
    .order('year', { ascending: false })

  if (error) {
    console.error('Error fetching trip recaps:', error)
  }

  const recaps: TripRecap[] = trips ?? []

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Golf Trip Recaps</h1>
        <p className="text-gray-600 mb-10">
          Real stories from past Monterey golf groups — courses played, lodging, highlights, and pricing.
        </p>

        {recaps.length === 0 ? (
          <p className="text-gray-500 py-16 text-center">No trip recaps published yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recaps.map((trip) => (
              <Link
                key={trip.slug}
                href={`/trips/${trip.slug}/`}
                className="group rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                {trip.image_url && (
                  <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={trip.image_url}
                      alt={trip.group_name ?? trip.region ?? 'Golf trip'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  {trip.region && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-green-700">
                      {trip.region}
                    </span>
                  )}
                  {trip.group_name && (
                    <h2 className="text-lg font-semibold mt-1 mb-1 group-hover:text-green-700 transition-colors">
                      {trip.group_name}
                    </h2>
                  )}
                  {(trip.nights != null || trip.rounds != null) && (
                    <p className="text-sm text-gray-500 mb-2">
                      {[
                        trip.nights != null ? `${trip.nights} nights` : null,
                        trip.rounds != null ? `${trip.rounds} rounds` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                  {trip.synopsis && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">{trip.synopsis}</p>
                  )}
                  {trip.price_per_person != null && (
                    <p className="text-sm font-medium text-green-800">
                      {formatPrice(trip.price_per_person)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
