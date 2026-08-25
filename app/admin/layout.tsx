import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) redirect('/admin/login')

  return (
    <>
      <style>{`
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #f9fafb;
        }
        .admin-sidebar-wrap {
          display: flex;
        }
        .admin-main {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
        }
        /* Mobile: hide sidebar, show bottom nav, add bottom padding */
        @media (max-width: 767px) {
          .admin-sidebar-wrap {
            display: none;
          }
          .admin-main {
            padding-bottom: 72px;
          }
          .admin-bottom-nav {
            display: flex !important;
          }
        }
        /* Desktop: show sidebar, hide bottom nav */
        @media (min-width: 768px) {
          .admin-bottom-nav {
            display: none !important;
          }
        }
        /* Dashboard stats grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }
        @media (max-width: 767px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        /* Dashboard nav cards */
        .admin-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 767px) {
          .admin-cards-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
        }
        /* Page padding */
        .admin-page {
          padding: 40px 48px;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
        }
        @media (max-width: 767px) {
          .admin-page {
            padding: 20px 16px;
          }
        }
        /* Lead detail two-col */
        .admin-lead-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 767px) {
          .admin-lead-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        /* Field grid 3-col */
        .admin-field-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0 24px;
        }
        @media (max-width: 767px) {
          .admin-field-grid-3 {
            grid-template-columns: 1fr 1fr;
            gap: 0 16px;
          }
        }
        /* Field grid 2-col */
        .admin-field-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
        }
        @media (max-width: 767px) {
          .admin-field-grid-2 {
            grid-template-columns: 1fr;
          }
        }
        /* Dashboard header row */
        .admin-dash-header {
          margin-bottom: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        @media (max-width: 767px) {
          .admin-dash-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 24px;
          }
        }
        /* Leads table — hide on mobile, show cards */
        .admin-leads-table { display: block; }
        .admin-leads-cards { display: none; }
        @media (max-width: 767px) {
          .admin-leads-table { display: none; }
          .admin-leads-cards { display: flex; flex-direction: column; gap: 10px; }
        }
        /* Status tabs scroll on mobile */
        .admin-tabs {
          display: flex;
          gap: 2px;
          margin-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .admin-tabs::-webkit-scrollbar { display: none; }
        /* Sidebar nav hover */
        .admin-nav-item:hover {
          background: #f3f4f6 !important;
        }
        /* Bottom nav item */
        .admin-bottom-item:active {
          background: #f0fdf4;
        }
      `}</style>
      <div className="admin-shell">
        <div className="admin-sidebar-wrap">
          <AdminSidebar />
        </div>
        <main className="admin-main">
          {children}
        </main>
      </div>
      <AdminSidebar mobile />
    </>
  )
}
