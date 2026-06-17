'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'top', code: '01', label: 'Portfolio' },
  { id: 'projects', code: '02', label: 'Projects' },
  { id: 'leadership', code: '03', label: 'Leadership' },
  { id: 'education', code: '04', label: 'Education' },
  { id: 'skills', code: '05', label: 'Skills' },
  { id: 'certificates', code: '06', label: 'Certificates' },
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
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
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
              className={`font-mono text-[10px] tracking-widest2 uppercase transition-all duration-400 ${
                isActive ? 'text-ink opacity-100 translate-x-0' : 'text-graphite opacity-0 translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
              }`}
            >
              {s.code} · {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-400 ${
                isActive ? 'w-2.5 h-2.5 bg-ink' : 'w-1.5 h-1.5 bg-ash group-hover:bg-graphite'
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}
