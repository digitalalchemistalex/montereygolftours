import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')
  if (!token) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-stone-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Monterey Golf Tours</h1>
            <p className="text-stone-400 text-sm mt-0.5">Admin Portal</p>
          </div>
          <form action="/api/admin/auth/logout" method="POST">
            <button className="text-sm text-stone-400 hover:text-white transition-colors">
              Sign out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/leads" className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-emerald-700 transition-colors">
            <div className="text-emerald-400 text-2xl mb-2">📋</div>
            <h2 className="font-semibold text-white">Leads</h2>
            <p className="text-stone-400 text-sm mt-1">View and manage quote requests</p>
          </a>
          <a href="/admin/quotes" className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-emerald-700 transition-colors">
            <div className="text-emerald-400 text-2xl mb-2">💼</div>
            <h2 className="font-semibold text-white">Quotes</h2>
            <p className="text-stone-400 text-sm mt-1">Build and send trip quotes</p>
          </a>
          <a href="/admin/health" className="bg-stone-900 border border-stone-800 rounded-xl p-6 hover:border-emerald-700 transition-colors">
            <div className="text-emerald-400 text-2xl mb-2">🟢</div>
            <h2 className="font-semibold text-white">Health</h2>
            <p className="text-stone-400 text-sm mt-1">System status and checks</p>
          </a>
        </div>
      </div>
    </div>
  )
}
