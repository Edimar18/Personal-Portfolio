'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdminAuth } from '../../lib/AdminAuthContext'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/personal', label: 'Personal Info', icon: '👤' },
  { href: '/admin/projects', label: 'Projects', icon: '⚡' },
  { href: '/admin/skills', label: 'Skills', icon: '⟨/⟩' },
  { href: '/admin/experience', label: 'Experience', icon: '★' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙' },
]

export default function AdminSidebar() {
  const { logout } = useAdminAuth()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: isCollapsed ? '80px' : '260px',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        transition: 'width 0.3s ease',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-start',
          gap: '12px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '24px',
            color: 'var(--text)',
          }}
        >
          EM<span style={{ color: 'var(--accent)' }}>.</span>
        </div>
        {!isCollapsed && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Admin
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: isCollapsed ? '16px' : '14px 24px',
                margin: '4px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                transition: 'all 0.2s',
                justifyContent: isCollapsed ? 'center' : 'flex-start',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--surface-2)'
                  e.currentTarget.style.color = 'var(--text)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--muted)'
                }
              }}
            >
              <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            color: 'var(--muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '13px',
            marginBottom: '12px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--text)'
            e.target.style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--border)'
            e.target.style.color = 'var(--muted)'
          }}
        >
          <span>{isCollapsed ? '→' : '←'}</span>
          {!isCollapsed && <span>Collapse</span>}
        </button>

        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '8px',
            padding: '12px',
            color: 'var(--muted)',
            textDecoration: 'none',
            fontSize: '13px',
            borderRadius: '8px',
            transition: 'all 0.2s',
            marginBottom: '12px',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--surface-2)'
            e.target.style.color = 'var(--text)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.color = 'var(--muted)'
          }}
        >
          <span>↗</span>
          {!isCollapsed && <span>View Site</span>}
        </Link>

        <button
          onClick={logout}
          style={{
            width: '100%',
            padding: '12px',
            background: 'transparent',
            border: '1px solid var(--red)',
            borderRadius: '8px',
            color: 'var(--red)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '8px',
            fontSize: '13px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 68, 68, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent'
          }}
        >
          <span>⏻</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
