'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'top', code: '01', label: 'Overview' },
  { id: 'projects', code: '02', label: 'Projects' },
  { id: 'topcit', code: '03', label: 'TOPCIT Level 3' },
  { id: 'leadership', code: '04', label: 'Leadership' },
  { id: 'education', code: '05', label: 'Education' },
  { id: 'skills', code: '06', label: 'Strengths' },
  { id: 'certificates', code: '07', label: 'Certifications' },
  { id: 'contact', code: '08', label: 'Contact' },
];

export default function SectionIndex() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none">
      <div className="flex flex-col items-end gap-3 pointer-events-auto bg-paper/80 backdrop-blur-xs p-2 rounded-lg border border-hairline/50 shadow-sm">
        {sections.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-2.5"
              aria-label={s.label}
            >
              <span
                className={`font-mono text-[10px] tracking-widest2 uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-ink font-bold opacity-100 translate-x-0'
                    : 'text-graphite opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {s.code} · {s.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-ink ring-2 ring-ink/20'
                    : 'w-1.5 h-1.5 bg-ash group-hover:bg-graphite'
                }`}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
