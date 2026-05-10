'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PortfolioProvider, usePortfolio } from '../lib/PortfolioContext'

// ─────────────────────────────────────────────────────
// PROJECTS PAGE
// ─────────────────────────────────────────────────────

function ProjectsPageContent() {
  const { data, isLoaded } = usePortfolio()
  const [activeCategory, setActiveCategory] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const projects = data?.projects || []
  const categories = data?.projectCategories || []

  // Filter projects by category and search
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory
    const matchesSearch = 
      project.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Get featured projects
  const featuredProjects = projects.filter(p => p.featured)

  // Get category counts
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.id] = projects.filter(p => p.category === cat.id).length
    return acc
  }, { all: projects.length })

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100,
        padding: '20px clamp(20px, 5vw, 80px)',
        background: 'rgba(8, 8, 8, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ 
            fontFamily: 'var(--font-syne)', 
            fontWeight: 800, 
            fontSize: '20px', 
            color: 'var(--text)', 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ color: 'var(--accent)' }}>◈</span>
            Edimar
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/#projects" className="nav-link">Featured</Link>
            <Link href="/admin" className="nav-link" style={{ color: 'var(--accent)' }}>Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        padding: '160px clamp(20px, 5vw, 80px) 80px',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '-20%', 
          right: '-10%', 
          width: '600px', 
          height: '600px', 
          background: 'radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 70%)', 
          pointerEvents: 'none' 
        }} />
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{ marginBottom: '24px' }}>Portfolio</div>
          <h1 style={{ 
            fontFamily: 'var(--font-syne)', 
            fontWeight: 800, 
            fontSize: 'clamp(40px, 6vw, 72px)', 
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            maxWidth: '800px'
          }}>
            All <span style={{ color: 'var(--accent)' }}>Projects</span>
          </h1>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '18px', 
            lineHeight: 1.7,
            maxWidth: '600px',
            marginBottom: '40px'
          }}>
            A complete collection of my work — from academic capstones to hobby experiments, 
            community initiatives to open source contributions.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '36px', color: 'var(--accent)' }}>{projects.length}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Projects</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '36px', color: 'var(--accent)' }}>{featuredProjects.length}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Featured</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '36px', color: 'var(--accent)' }}>{categories.length}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section style={{ 
        padding: '40px clamp(20px, 5vw, 80px)', 
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        position: 'sticky',
        top: '73px',
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              onClick={() => setActiveCategory('all')}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: activeCategory === 'all' ? 'var(--accent)' : 'var(--border)',
                background: activeCategory === 'all' ? 'var(--accent)15' : 'transparent',
                color: activeCategory === 'all' ? 'var(--accent)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>◈</span>
              All Projects
              <span style={{ 
                padding: '2px 8px', 
                background: activeCategory === 'all' ? 'var(--accent)25' : 'var(--surface-2)',
                borderRadius: '4px',
                fontSize: '11px'
              }}>
                {categoryCounts.all}
              </span>
            </button>
            
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: activeCategory === cat.id ? cat.color : 'var(--border)',
                  background: activeCategory === cat.id ? `${cat.color}15` : 'transparent',
                  color: activeCategory === cat.id ? cat.color : 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span style={{ 
                  padding: '2px 8px', 
                  background: activeCategory === cat.id ? `${cat.color}25` : 'var(--surface-2)',
                  borderRadius: '4px',
                  fontSize: '11px'
                }}>
                  {categoryCounts[cat.id] || 0}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 48px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text)',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <span style={{ 
              position: 'absolute', 
              left: '18px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: 'var(--muted)',
              fontSize: '18px'
            }}>
              🔍
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: '60px clamp(20px, 5vw, 80px)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {filteredProjects.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '80px 20px',
              background: 'var(--surface)',
              borderRadius: '16px',
              border: '1px dashed var(--border)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', marginBottom: '8px' }}>No projects found</h3>
              <p style={{ color: 'var(--muted)' }}>Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
              gap: '24px' 
            }}>
              {filteredProjects.map((project, index) => {
                const category = categories.find(c => c.id === project.category)
                const isHovered = hoveredProject === project.id
                
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    style={{
                      background: isHovered 
                        ? 'linear-gradient(145deg, var(--surface-2) 0%, var(--surface-3) 100%)' 
                        : 'linear-gradient(145deg, var(--surface) 0%, var(--surface-2) 100%)',
                      borderRadius: '16px',
                      border: `1px solid ${isHovered ? (category?.color || 'var(--accent)') + '40' : 'var(--border)'}`,
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow: isHovered 
                        ? `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${(category?.color || 'var(--accent)')}20` 
                        : '0 4px 20px rgba(0,0,0,0.2)',
                      cursor: 'default',
                      position: 'relative'
                    }}
                  >
                    {/* Top accent line */}
                    <div style={{
                      height: '3px',
                      background: `linear-gradient(90deg, ${category?.color || 'var(--accent)'} 0%, transparent 100%)`,
                      transform: isHovered ? 'scaleX(1)' : 'scaleX(0.3)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} />
                    
                    <div style={{ padding: '28px' }}>
                      {/* Header */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <div style={{
                          padding: '6px 12px',
                          background: `${category?.color || 'var(--accent)'}15`,
                          borderRadius: '6px',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: category?.color || 'var(--accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span>{category?.icon || '◈'}</span>
                          {category?.label || 'Project'}
                        </div>
                        
                        {project.featured && (
                          <div style={{
                            padding: '4px 10px',
                            background: 'var(--accent)20',
                            borderRadius: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: 'var(--accent)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            <span>★</span>
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 700,
                        fontSize: '22px',
                        marginBottom: '8px',
                        color: 'var(--text)'
                      }}>
                        {project.name}
                      </h3>
                      
                      <div style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        marginBottom: '16px',
                        fontStyle: 'italic'
                      }}>
                        {project.full}
                      </div>

                      {/* Role */}
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: category?.color || 'var(--accent)',
                        marginBottom: '16px',
                        letterSpacing: '0.05em'
                      }}>
                        {project.role}
                      </div>

                      {/* Description */}
                      <p style={{
                        fontSize: '14px',
                        lineHeight: 1.7,
                        color: 'var(--muted)',
                        marginBottom: '20px',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              padding: '6px 12px',
                              background: isHovered ? `${category?.color || 'var(--accent)'}15` : 'var(--bg)',
                              border: `1px solid ${isHovered ? (category?.color || 'var(--accent)') + '30' : 'var(--border)'}`,
                              borderRadius: '6px',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              color: isHovered ? category?.color || 'var(--accent)' : 'var(--text-secondary)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '10px 16px',
                              background: 'var(--bg)',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              color: 'var(--text-secondary)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '12px',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = 'var(--accent)'
                              e.currentTarget.style.color = 'var(--accent)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'var(--border)'
                              e.currentTarget.style.color = 'var(--text-secondary)'
                            }}
                          >
                            <span>⚡</span>
                            GitHub
                          </a>
                        )}
                        
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '10px 16px',
                              background: isHovered ? (category?.color || 'var(--accent)') : 'var(--bg)',
                              border: `1px solid ${isHovered ? (category?.color || 'var(--accent)') : 'var(--border)'}`,
                              borderRadius: '8px',
                              color: isHovered ? 'var(--bg)' : 'var(--text-secondary)',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '12px',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <span>↗</span>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '60px clamp(20px, 5vw, 80px)', 
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <Link href="/" style={{ 
            fontFamily: 'var(--font-syne)', 
            fontWeight: 800, 
            fontSize: '24px', 
            color: 'var(--text)', 
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <span style={{ color: 'var(--accent)' }}>◈</span>
            Edimar Mosquida
          </Link>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            © 2024 — Built with Next.js & passion
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <PortfolioProvider>
      <ProjectsPageContent />
    </PortfolioProvider>
  )
}
