'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { PortfolioProvider, usePortfolio } from './lib/PortfolioContext'
import { DEFAULT_DATA } from './lib/portfolioData'

// ─────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const observedElements = new Set()
    
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const delay = e.target.dataset.delay || 0
            setTimeout(() => e.target.classList.add('in-view'), Number(delay))
            observedElements.add(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    
    // Observe all current reveal elements
    const observeAll = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el) => {
        if (!observedElements.has(el)) {
          obs.observe(el)
        }
      })
    }
    
    observeAll()
    
    // Watch for new elements being added to the DOM
    const mutationObs = new MutationObserver(() => {
      observeAll()
    })
    
    mutationObs.observe(document.body, { childList: true, subtree: true })
    
    // Fallback: make elements visible after 2 seconds if observer doesn't trigger
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el) => {
        if (!el.classList.contains('in-view')) {
          el.classList.add('in-view')
        }
      })
    }, 2000)
    
    return () => {
      obs.disconnect()
      mutationObs.disconnect()
      clearTimeout(fallbackTimer)
    }
  }, [])
}

function useSkillBars() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
              bar.classList.add('animated')
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.skills-section').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function useScramble(text, trigger) {
  const [display, setDisplay] = useState(text)
  const textRef = useRef(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'
  
  useEffect(() => {
    textRef.current = text
  }, [text])
  
  useEffect(() => {
    if (!trigger) return
    let iteration = 0
    const interval = setInterval(() => {
      setDisplay(
        textRef.current
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' '
            if (idx < iteration) return textRef.current[idx]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      if (iteration >= textRef.current.length) clearInterval(interval)
      iteration += 0.5
    }, 30)
    return () => clearInterval(interval)
  }, [trigger])
  return display
}

const SECTIONS = ['about', 'skills', 'projects', 'experience', 'contact']

function useActiveSection() {
  const [active, setActive] = useState('')
  const sectionsRef = useRef(SECTIONS)
  
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sectionsRef.current.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

// ─────────────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────────────

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move, { passive: true })

    const follow = () => {
      if (ring.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
        ring.current.style.left = ringPos.current.x + 'px'
        ring.current.style.top = ringPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(follow)
    }
    rafRef.current = requestAnimationFrame(follow)

    return () => {
      window.removeEventListener('mousemove', move)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}

// ─────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────

function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const fn = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
      if (currentScrollY > 200) {
        setHidden(currentScrollY > lastScrollY.current)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = ['about', 'skills', 'projects', 'experience', 'contact']

  return (
    <>
      <nav style={{ position: 'fixed', top: hidden ? '-100px' : 0, left: 0, right: 0, zIndex: 8000, padding: scrolled ? '12px 24px' : '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none', borderBottom: scrolled ? '1px solid rgba(38,38,38,0.8)' : '1px solid transparent', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <a href="#" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: scrolled ? '18px' : '22px', color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.02em', transition: 'font-size 0.3s ease' }}>
          EM<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="hidden md:flex">
          {links.map((l) => (
            <a key={l} href={`#${l}`} className={`nav-link ${active === l ? 'active' : ''}`} aria-current={active === l ? 'page' : undefined}>
              {l}
            </a>
          ))}
        </div>

        <a href="mailto:edimar.mosquida@example.com" className="hidden md:inline-flex btn-primary" style={{ padding: '10px 20px', fontSize: '11px' }}>
          Hire Me
        </a>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '24px', padding: '8px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen }>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', zIndex: 7999, opacity: menuOpen ? 1 : 0, visibility: menuOpen ? 'visible' : 'hidden', transition: 'opacity 0.3s ease, visibility 0.3s ease' }}>
        <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', color: 'var(--text)', fontSize: '28px', cursor: 'pointer', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Close menu">
          ✕
        </button>
        {links.map((l, i) => (
          <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '32px', color: active === l ? 'var(--accent)' : 'var(--text)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '-0.02em', transition: 'color 0.2s, transform 0.2s', transform: menuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: menuOpen ? 1 : 0, transitionDelay: `${i * 50}ms` }}>
            {l}
          </a>
        ))}
        <a href="mailto:edimar.mosquida@example.com" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ marginTop: '20px' }}>
          Hire Me
        </a>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────

function Hero({ data }) {
  const [started, setStarted] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const personal = data?.personal || {}
  const nameValue = (personal.name || 'EDIMAR MOSQUIDA').toUpperCase()
  const name = useScramble(nameValue, started)

  useEffect(() => {
    setIsClient(true)
    const t = setTimeout(() => setStarted(true), 300)
    return () => clearTimeout(t)
  }, [])

  const floatTags = data?.floatTags || []
  
  // Don't render floating tags on server to avoid hydration mismatch
  const visibleFloatTags = isClient ? floatTags : []
  
  return (
    <section id="hero" className="dot-grid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(100px,12vw,180px) clamp(20px,5vw,80px) 80px', position: 'relative', overflow: 'hidden' }}>
      {visibleFloatTags.map((t) => (
        <span key={t.text} className="float-tag hidden lg:block" style={t.style}>{t.text}</span>
      ))}

      <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,255,0,0.2), transparent)', animation: 'scanDown 8s linear infinite', pointerEvents: 'none' }} />

      <div className="reveal" data-delay="0" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', display: 'block', animation: 'pulseGlow 2s ease-in-out infinite', boxShadow: '0 0 12px var(--accent)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          Open to Opportunities · {personal.location || 'CDO, Philippines'}
        </span>
      </div>

      <h1 className="reveal" data-delay="100" style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(32px, 7vw, 80px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '32px', maxWidth: '100%' }}>
        {name}
      </h1>

      <div className="reveal" data-delay="200" style={{ display: 'flex', flexWrap: 'wrap', gap: '0', marginBottom: '40px', maxWidth: '700px' }}>
        {(personal.tagline || 'IoT Developer · Full-Stack Engineer · AI Enthusiast').split(' · ').map((s, i, arr) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(12px, 1.8vw, 16px)', letterSpacing: '0.1em', color: i % 2 === 1 ? 'var(--border)' : 'var(--text-secondary)' }}>
            {s}{i < arr.length - 1 && <span style={{ margin: '0 8px', color: 'var(--border)' }}>·</span>}
          </span>
        ))}
      </div>

      <p className="reveal" data-delay="300" style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '560px', marginBottom: '48px' }}>
        {personal.summary || 'A passionate developer building innovative solutions.'}
      </p>

      <div className="reveal" data-delay="400" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <a href="#projects" className="btn-primary">View Projects →</a>
        <a href="#contact" className="btn-secondary">Contact Me</a>
      </div>

      <div className="reveal" data-delay="500" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll</span>
        <div className="scroll-indicator" style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--border), transparent)' }} />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────────────

function About({ data }) {
  const personal = data?.personal || {}
  const education = personal.education || {}
  const projects = data?.projects || []
  const experience = data?.experience || []
  const skills = data?.skills || []
  
  const stats = [
    { n: `${projects.length}+`, label: 'Projects Built' },
    { n: `${experience.length}+`, label: 'Leadership Roles' },
    { n: `${skills.reduce((acc, cat) => acc + (cat.items?.length || 0), 0)}+`, label: 'Tech Skills' },
    { n: '3rd', label: 'Year BSIT' },
  ]

  return (
    <section id="about" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label reveal" data-delay="0" style={{ marginBottom: '48px' }}>About Me</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(40px, 8vw, 80px)', alignItems: 'start' }}>
          <div>
            <h2 className="display-heading reveal" data-delay="100" style={{ fontSize: 'clamp(32px, 5vw, 56px)', marginBottom: '32px' }}>
              Building the <span style={{ color: 'var(--accent)' }}>future</span> one <span style={{ fontStyle: 'italic', WebkitTextStroke: '1px var(--text)', color: 'transparent' }}>sensor</span> at a time.
            </h2>

            <p className="reveal" data-delay="200" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px', marginBottom: '24px', maxWidth: '520px' }}>
              I'm a 3rd-year BSIT student at <span style={{ color: 'var(--text)' }}>{education.school || 'USTP'}</span>, focused on the Internet of Things track. My work spans embedded systems, full-stack mobile development, and edge AI — always grounded in solving real problems for real people.
            </p>

            <p className="reveal" data-delay="300" style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '16px', maxWidth: '520px', marginBottom: '40px' }}>
              Beyond code, I lead community organizations, manage esports events, and coordinate parish youth programs — because great technology needs great people behind it.
            </p>

            <div className="reveal hover-lift" data-delay="400" style={{ padding: '24px 28px', border: '1px solid var(--border)', background: 'var(--surface)', display: 'inline-block', borderRadius: '8px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>Education</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '16px', color: 'var(--text)', marginBottom: '6px' }}>{education.degree || 'BS Information Technology'}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)' }}>{education.school || 'University'}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>{education.campus || 'CDO Campus'}</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', marginBottom: '48px', borderRadius: '8px', overflow: 'hidden' }}>
              {stats.map((s, i) => (
                <div key={s.label} className="reveal-scale hover-lift" data-delay={i * 80} style={{ background: 'var(--surface)', padding: '32px 24px', position: 'relative', transition: 'background 0.2s' }}>
                  <div className="stat-number">{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginTop: '8px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="reveal" data-delay="200">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>Daily Drivers</div>
              {['Lenovo ThinkPad X1 Carbon Gen 6', 'ESP32 / ESP8266 Microcontrollers', 'Orange Pi Zero 3 (SBC)', 'Ubuntu Linux + Neovim'].map((hw) => (
                <div key={hw} className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', marginBottom: '8px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', borderRadius: '6px', transition: 'all 0.2s' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '14px' }}>▸</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{hw}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────

function Skills({ data }) {
  const skills = data?.skills || []
  
  return (
    <section id="skills" className="skills-section" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label reveal" style={{ marginBottom: '16px' }}>Technical Skills</div>
        <h2 className="display-heading reveal" data-delay="100" style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: '56px' }}>
          What I <span style={{ WebkitTextStroke: '1px var(--text)', color: 'transparent', fontStyle: 'italic' }}>build</span> with.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {skills.map((cat, ci) => (
            <div key={cat.category} className="reveal hover-lift" data-delay={ci * 100} style={{ 
              background: 'linear-gradient(145deg, var(--surface) 0%, var(--surface-2) 100%)', 
              padding: '32px 28px', 
              position: 'relative', 
              overflow: 'hidden',
              borderRadius: '12px',
              border: `1px solid ${cat.color}20`,
              boxShadow: `0 4px 24px ${cat.color}08, inset 0 1px 0 ${cat.color}10`,
              transition: 'all 0.3s ease'
            }}>
              {/* Top accent line */}
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                height: '2px', 
                background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}40 50%, transparent 100%)` 
              }} />
              
              {/* Icon and category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  borderRadius: '10px', 
                  background: `${cat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: cat.color,
                  border: `1px solid ${cat.color}25`
                }}>{cat.icon}</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', color: 'var(--text)', textTransform: 'uppercase' }}>{cat.category}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {cat.items.map((skill) => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)' }}>{skill.name}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: cat.color, background: `${cat.color}15`, padding: '2px 8px', borderRadius: '4px' }}>{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track" style={{ background: 'var(--surface-3)', height: '4px', borderRadius: '2px' }}>
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}dd 100%)`, height: '100%', borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Corner decoration */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '6px', height: '6px', borderRadius: '50%', background: cat.color, opacity: 0.6 }} />
            </div>
          ))}
        </div>

        <div className="reveal" data-delay="300" style={{ marginTop: '56px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '20px' }}>Also Comfortable With</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Ubuntu Linux', 'Neovim', 'OBS Studio', 'Kdenlive', 'Wireshark', 'sqlmap', 'Burp Suite', 'aircrack-ng', 'Node-RED', 'PostgreSQL', 'JASP', 'Git'].map((tool) => (
              <span key={tool} className="tag-chip">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────

function Projects({ data }) {
  const [hovered, setHovered] = useState(null)
  const projects = data?.projects || []

  return (
    <section id="projects" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-label reveal" style={{ marginBottom: '16px' }}>Selected Projects</div>
        <h2 className="display-heading reveal" data-delay="100" style={{ fontSize: 'clamp(32px, 5vw, 64px)', marginBottom: '16px' }}>
          Things I've <span style={{ color: 'var(--accent)' }}>shipped</span>.
        </h2>
        <p className="reveal" data-delay="150" style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '56px', maxWidth: '520px' }}>
          Community-focused solutions at the intersection of hardware, AI, and software.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--muted)', fontSize: '15px' }}>No projects yet. Add some in the admin panel!</p>
            </div>
          ) : projects.map((p, i) => (
            <div key={p.id} className="reveal project-card" data-delay={i * 100} onMouseEnter={() => setHovered(p.id)} onMouseLeave={() => setHovered(null)} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '0', alignItems: 'stretch', background: hovered === p.id ? 'var(--surface-2)' : 'var(--surface)', borderRadius: '12px', cursor: 'default' }}>
              <div style={{ padding: '28px 24px', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '36px', lineHeight: 1, color: hovered === p.id ? p.accent : 'var(--border)', transition: 'color 0.3s' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div style={{ padding: '28px 32px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: p.accent, marginBottom: '8px' }}>{p.role}</div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '6px' }}>{p.name}</h3>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--muted)', marginBottom: '14px', fontStyle: 'italic' }}>{p.full}</div>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '640px', marginBottom: '18px' }}>{p.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag-chip" style={{ borderColor: hovered === p.id ? `${p.accent}40` : 'var(--border)', color: hovered === p.id ? p.accent : 'var(--text-secondary)', transition: 'all 0.3s' }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '28px 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: hovered === p.id ? p.accent : 'var(--border)', transition: 'all 0.3s', transform: hovered === p.id ? 'translate(4px, -4px)' : 'translate(0,0)' }}>↗</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────

function Experience({ data }) {
  const experience = data?.experience || []
  
  return (
    <section id="experience" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 'clamp(40px, 6vw, 80px)' }}>
          <div>
            <div className="section-label reveal" style={{ marginBottom: '40px' }}>Leadership & Experience</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {experience.length === 0 ? (
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>No experience entries yet.</p>
              ) : experience.map((e, i) => (
                <div key={e.id || `exp-${i}`} className="reveal" data-delay={i * 120} style={{ 
                  padding: '24px', 
                  background: 'var(--bg)', 
                  borderRadius: '10px', 
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--accent)',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>{e.period}</div>
                  <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '17px', color: 'var(--text)', marginBottom: '6px' }}>{e.title}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', fontStyle: 'italic' }}>{e.org}</div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{e.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-label reveal" style={{ marginBottom: '40px' }}>Beyond the Screen</div>

            <div className="reveal" data-delay="100" style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>Soft Skills</div>
              {['Leadership & Team Management', 'Event Planning & Organization', 'Project Pitching & Presentation', 'Cross-functional Collaboration'].map((s) => (
                <div key={s} className="hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', marginBottom: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)', transition: 'all 0.2s' }}>
                  <span style={{ width: 8, height: 8, background: 'var(--accent)', flexShrink: 0, borderRadius: '2px' }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{s}</span>
                </div>
              ))}
            </div>

            <div className="reveal" data-delay="200">
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>Hobbies & Interests</div>
              {[{ icon: '🎧', text: 'Audio Tuning — IEMs, Parametric EQ, AutoEQ' }, { icon: '🎮', text: 'E-sports — Mobile Legends: Bang Bang' }, { icon: '🇯🇵', text: 'Learning Japanese — Romaji & Conversational Grammar' }].map((h) => (
                <div key={h.text} className="hover-lift" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', marginBottom: '10px', border: '1px solid var(--border)', background: 'var(--bg)', borderRadius: '8px', transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{h.icon}</span>
                  <span style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{h.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────────────

function Contact({ data }) {
  const personal = data?.personal || {}
  
  return (
    <section id="contact" style={{ padding: 'clamp(80px,10vw,140px) clamp(20px,5vw,80px)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="section-label reveal" style={{ marginBottom: '40px' }}>Get In Touch</div>

        <h2 className="display-heading reveal" data-delay="100" style={{ fontSize: 'clamp(36px, 7vw, 80px)', marginBottom: '24px', maxWidth: '800px' }}>
          Let's build something <span style={{ color: 'var(--accent)' }}>remarkable</span>.
        </h2>

        <p className="reveal" data-delay="200" style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.8, maxWidth: '520px', marginBottom: '48px' }}>
          Whether you're a recruiter, a collaborator, or someone with a wild IoT idea — I'd love to hear from you.
        </p>

        <div className="reveal" data-delay="300" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}>
          <a href={`mailto:${personal.email || 'edimar.mosquida@example.com'}`} className="btn-primary" style={{ animation: 'pulseGlow 3s ease-in-out infinite' }}>
            ✉ Email Me
          </a>
          <a href={`https://${personal.github || 'github.com/Edimar18'}`} target="_blank" rel="noreferrer" className="btn-secondary">
            ⌥ GitHub
          </a>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '20px', color: 'var(--text)', letterSpacing: '-0.02em' }}>
            EM<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            © 2025 {personal.name || 'Edimar Mosquida'} · {personal.location || 'CDO, Philippines'}
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['About', 'Skills', 'Projects', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ fontSize: '11px' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────
// PAGE CONTENT
// ─────────────────────────────────────────────────────

function PageContent() {
  const { data, isLoaded } = usePortfolio()
  const [forceShow, setForceShow] = useState(false)
  const active = useActiveSection()
  useReveal()
  useSkillBars()

  // Force show content after 1 second even if data isn't loaded
  useEffect(() => {
    const timer = setTimeout(() => setForceShow(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Use DEFAULT_DATA as fallback until data is loaded from localStorage
  const renderData = isLoaded && data ? data : DEFAULT_DATA

  // Ensure data has all required properties
  const safeData = {
    personal: renderData?.personal || {},
    skills: renderData?.skills || [],
    projects: renderData?.projects || [],
    experience: renderData?.experience || [],
    floatTags: renderData?.floatTags || [],
  }

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Cursor />
      <Navbar active={active} />
      <main>
        <Hero data={safeData} />
        <About data={safeData} />
        <Skills data={safeData} />
        <Projects data={safeData} />
        <Experience data={safeData} />
        <Contact data={safeData} />
      </main>
    </>
  )
}

// ─────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────

export default function Home() {
  return (
    <PortfolioProvider>
      <PageContent />
    </PortfolioProvider>
  )
}
