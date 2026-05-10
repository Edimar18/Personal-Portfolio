'use client'

import { AdminAuthProvider, useAdminAuth } from '../lib/AdminAuthContext'
import { PortfolioProvider } from '../lib/PortfolioContext'
import AdminLogin from './components/AdminLogin'
import AdminSidebar from './components/AdminSidebar'
import '../globals.css'

function AdminLayoutContent({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth()

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '2px solid var(--border)',
              borderTopColor: 'var(--accent)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px',
            }}
          />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
            Loading...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        background: 'var(--bg)',
        color: 'var(--text)',
      }}
    >
      <AdminSidebar />
      <main
        style={{
          flex: 1,
          marginLeft: '260px',
          padding: '32px',
          overflowY: 'auto',
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: '900px' }}>{children}</div>
      </main>
    </div>
  )
}

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <PortfolioProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </PortfolioProvider>
    </AdminAuthProvider>
  )
}
