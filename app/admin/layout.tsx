import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) redirect('/admin/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      <AdminSidebar />
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
