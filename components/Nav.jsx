'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/lib/data';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'TOPCIT Level 3', href: '#topcit', highlight: true },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Education', href: '#education' },
  { label: 'Certs', href: '#certificates' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-paper/95 backdrop-blur-md border-b border-hairline shadow-xs' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-[11px] tracking-widest2 uppercase border border-ink rounded-full w-9 h-9 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-300 font-bold"
          aria-label="Back to top"
        >
          EM
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`font-mono text-[11px] tracking-widest2 uppercase transition-colors duration-300 ${
                l.highlight
                  ? 'text-ink font-bold px-2 py-0.5 border border-ink/40 hover:bg-ink hover:text-paper'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block font-mono text-[11px] tracking-widest2 uppercase text-graphite hover:text-ink transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2 bg-ink text-paper hover:bg-ink-soft transition-colors duration-300 font-medium"
          >
            Hire / Internship
          </a>
        </div>
      </div>
    </header>
  );
}
