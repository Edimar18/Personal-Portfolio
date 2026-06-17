'use client';

import { useEffect, useState } from 'react';

const links = [
  { label: 'GitHub', href: 'https://github.com/Edimar18' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edimar-mosquida-a02228347/' },
  { label: 'Email', href: 'mailto:mosquida.edimar.18@gmail.com' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid ? 'bg-paper/90 backdrop-blur-sm border-b border-hairline' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-[11px] tracking-widest2 uppercase border border-ink rounded-full w-9 h-9 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors duration-300"
          aria-label="Back to top"
        >
          EM
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
              className="font-mono text-[11px] tracking-widest2 uppercase text-graphite hover:text-ink transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2 border border-ink hover:bg-ink hover:text-paper transition-colors duration-300"
        >
          Contact
        </a>
      </div>
    </header>
  );
}
