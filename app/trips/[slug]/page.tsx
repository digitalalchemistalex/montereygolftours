import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const revalidate = 3600

interface ItineraryItem {
  day: number
  date: string
  time: string
  activity: string
  location: string
  notes: string
}

interface TripRecap {
  slug: string
  synopsis: string | null
  region: string | null
  year: number | null
  month: string | null
  nights: number | null
  rounds: number | null
  courses: string[] | null
  lodging: string | null
  image_url: string | null
  highlights: string[] | null
  price_per_person: number | null
  group_name: string | null
  itinerary: ItineraryItem[] | null
  raw_data: unknown
}

function formatPrice(price: number | null): string {
  if (price == null) return ''
  return `$${price.toLocaleString('en-US')} per person`
}

function getSupabase() {
  return createClient(
    process.env.MGTS_SUPABASE_URL!,
    process.env.MGTS_SUPABASE_SERVICE_KEY!
  )
}

export async function generateStaticParams() {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('trip_recaps')
    .select('slug')
    .eq('published', true)
  return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = getSupabase()
  const { data } = await supabase
    .from('trip_recaps')
    .select('synopsis, group_name, region, year')
    .eq('slug', slug)
    .single()

  if (!data) return {}

  const title = [data.group_name, data.region, data.year].filter(Boolean).join(' · ')
  return {
    title: `${title} | Monterey Golf Tours`,
    description: data.synopsis ?? undefined,
  }
}

export default async function TripRecapPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: trip } = await supabase
    .from('trip_recaps')
    .select(
      'slug, synopsis, region, year, month, nights, rounds, courses, lodging, image_url, highlights, price_per_person, group_name, itinerary, raw_data'
    )
    .eq('slug', slug)
    .single()

  if (!trip) notFound()

  const recap = trip as TripRecap
  const itinerary: ItineraryItem[] = Array.isArray(recap.itinerary) ? recap.itinerary : []

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero image */}
        {recap.image_url && (
          <div className="aspect-[16/7] rounded-xl overflow-hidden mb-8 bg-gray-100">
            <img
              src={recap.image_url}
              alt={recap.group_name ?? recap.region ?? 'Golf trip'}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          {recap.region && (
            <span className="text-sm font-semibold uppercase tracking-wide text-green-700">
              {recap.region}
            </span>
          )}
          <h1 className="text-3xl font-bold mt-1 mb-1">
            {recap.group_name ?? 'Golf Trip Recap'}
          </h1>
          {(recap.year || recap.month) && (
            <p className="text-gray-500 text-sm">
              {[recap.month, recap.year].filter(Boolean).join(' ')}
              {(recap.nights != null || recap.rounds != null) && (
                <span className="ml-3">
                  {[
                    recap.nights != null ? `${recap.nights} nights` : null,
                    recap.rounds != null ? `${recap.rounds} rounds` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Synopsis */}
        {recap.synopsis && (
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">{recap.synopsis}</p>
        )}

        {/* Highlights */}
        {recap.highlights && recap.highlights.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Highlights</h2>
            <ul className="space-y-2">
              {recap.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span className="text-green-600 mt-0.5 shrink-0">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Courses */}
        {recap.courses && recap.courses.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Courses Played</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recap.courses.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Lodging */}
        {recap.lodging && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Lodging</h2>
            <p className="text-gray-700">{recap.lodging}</p>
          </section>
        )}

        {/* Itinerary */}
        {itinerary.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-50 text-left">
                    <th className="px-3 py-2 font-semibold border border-gray-200">Day</th>
                    <th className="px-3 py-2 font-semibold border border-gray-200">Date</th>
                    <th className="px-3 py-2 font-semibold border border-gray-200">Time</th>
                    <th className="px-3 py-2 font-semibold border border-gray-200">Activity</th>
                    <th className="px-3 py-2 font-semibold border border-gray-200">Location</th>
                    <th className="px-3 py-2 font-semibold border border-gray-200">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {itinerary.map((item, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      <td className="px-3 py-2 border border-gray-200">{item.day ?? ''}</td>
                      <td className="px-3 py-2 border border-gray-200 whitespace-nowrap">{item.date ?? ''}</td>
                      <td className="px-3 py-2 border border-gray-200 whitespace-nowrap">{item.time ?? ''}</td>
                      <td className="px-3 py-2 border border-gray-200">{item.activity ?? ''}</td>
                      <td className="px-3 py-2 border border-gray-200">{item.location ?? ''}</td>
                      <td className="px-3 py-2 border border-gray-200 text-gray-500">{item.notes ?? ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Pricing */}
        {recap.price_per_person != null && (
          <section className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
            <p className="text-sm text-green-700 font-medium uppercase tracking-wide mb-1">
              Trip Investment
            </p>
            <p className="text-2xl font-bold text-green-900">{formatPrice(recap.price_per_person)}</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
