'use client'

import Link from 'next/link'
import { usePortfolio } from '../lib/PortfolioContext'

export default function AdminDashboard() {
  const { data } = usePortfolio()

  const stats = [
    { label: 'Projects', value: data.projects.length, href: '/admin/projects' },
    { label: 'Skills', value: data.skills.reduce((acc, cat) => acc + cat.items.length, 0), href: '/admin/skills' },
    { label: 'Experience', value: data.experience.length, href: '/admin/experience' },
  ]

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: '36px',
          color: 'var(--text)',
          marginBottom: '8px',
        }}
      >
        Dashboard
      </h1>
      <p
        style={{
          fontSize: '15px',
          color: 'var(--muted)',
          marginBottom: '40px',
        }}
      >
        Manage your portfolio content and settings
      </p>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}
      >
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            style={{
              padding: '24px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: '48px',
                color: 'var(--accent)',
                marginBottom: '8px',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: '20px',
          color: 'var(--text)',
          marginBottom: '20px',
        }}
      >
        Quick Actions
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        <QuickActionCard
          href="/admin/personal"
          title="Edit Personal Info"
          description="Update your name, tagline, summary, and education"
          icon="👤"
        />
        <QuickActionCard
          href="/admin/projects"
          title="Manage Projects"
          description="Add, edit, or remove portfolio projects"
          icon="⚡"
        />
        <QuickActionCard
          href="/admin/skills"
          title="Update Skills"
          description="Modify skill categories and proficiency levels"
          icon="⟨/⟩"
        />
        <QuickActionCard
          href="/admin/experience"
          title="Edit Experience"
          description="Update work history and leadership roles"
          icon="★"
        />
      </div>

      {/* Preview */}
      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: '18px',
            color: 'var(--text)',
            marginBottom: '16px',
          }}
        >
          Current Preview
        </h3>
        <div
          style={{
            padding: '20px',
            background: 'var(--bg)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: '24px',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            {data.personal.name}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              marginBottom: '16px',
            }}
          >
            {data.personal.tagline}
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            {data.personal.summary.slice(0, 150)}...
          </p>
        </div>
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            padding: '12px 20px',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '8px',
            color: 'var(--bg)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)'
            e.target.style.boxShadow = '0 8px 24px rgba(200, 255, 0, 0.25)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = 'none'
          }}
        >
          View Full Site →
        </Link>
      </div>
    </div>
  )
}

function QuickActionCard({ href, title, description, icon }) {
  return (
    <Link
      href={href}
      style={{
        padding: '24px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <span style={{ fontSize: '28px' }}>{icon}</span>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: '16px',
            color: 'var(--text)',
            marginBottom: '4px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </Link>
  )
}
