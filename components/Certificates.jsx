'use client';

import { useState } from 'react';
import { certificates } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

const plateClass = {
  circuit: 'plate-circuit',
  scanline: 'plate-scanline',
  wireframe: 'plate-wireframe',
  halftone: 'plate-halftone',
};

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const slots = certificates.length > 0 ? certificates : [null, null, null];

  return (
    <section id="certificates" className="relative px-6 md:px-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="07" title="Certifications" sub="Verified Credentials & Training" />

        {certificates.length === 0 && (
          <ScrollReveal className="mt-8">
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-graphite max-w-2xl">
              No certificates were added yet — add them in lib/data.js as you earn them.
            </p>
          </ScrollReveal>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {slots.map((c, i) =>
            c ? (
              <ScrollReveal key={c.name} delay={i * 60} className="bg-paper">
                <article
                  className="relative p-7 h-full flex flex-col justify-between min-h-[300px] overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedCert(c)}
                >
                  {c.image ? (
                    <>
                      <img
                        src={c.image}
                        alt={c.name}
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.35] transition-transform duration-[1200ms] ease-plate group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 opacity-10 ${plateClass[c.plate] || 'plate-halftone'}`} />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className={`font-mono text-[10px] tracking-widest2 ${
                        c.image ? 'text-paper/70' : 'text-graphite'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {c.badge && (
                      <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 bg-paper text-ink font-bold shadow">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  <div className="relative z-10 mt-12">
                    <h3
                      className={`font-display font-black uppercase text-lg tracking-tightest leading-snug ${
                        c.image ? 'text-paper drop-shadow-md' : 'text-ink'
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p className={`text-xs mt-2 font-medium ${c.image ? 'text-paper/85' : 'text-graphite'}`}>
                      {c.org}
                    </p>
                    {c.description && (
                      <p className={`text-xs mt-2 line-clamp-2 ${c.image ? 'text-paper/70' : 'text-ink-soft'}`}>
                        {c.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-paper/15">
                      <span className={`font-mono text-[10px] tracking-widest2 uppercase ${c.image ? 'text-paper/60' : 'text-ash'}`}>
                        {c.date}
                      </span>
                      <span className={`font-mono text-[10px] tracking-widest2 uppercase underline ${c.image ? 'text-paper/80' : 'text-ink'}`}>
                        View Credential →
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ) : (
              <ScrollReveal key={`empty-${i}`} delay={i * 60} className="bg-paper">
                <div className="p-8 h-full flex flex-col justify-between min-h-[180px] border border-dashed border-hairline m-2">
                  <span className="font-mono text-[10px] tracking-widest2 text-ash">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-ash">
                    Add certificate
                  </p>
                </div>
              </ScrollReveal>
            )
          )}
        </div>
      </div>

      {/* Certificate Modal View */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-paper max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-hairline p-6 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-hairline gap-4">
              <div>
                <h3 className="font-display font-black uppercase text-xl text-ink leading-snug">
                  {selectedCert.name}
                </h3>
                <p className="text-xs text-graphite mt-1 font-mono">
                  {selectedCert.org} · {selectedCert.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="font-mono text-sm px-3 py-1 border border-ink hover:bg-ink hover:text-paper transition-colors shrink-0"
              >
                ✕ Close
              </button>
            </div>

            {selectedCert.image && (
              <div className="my-6 bg-ink/5 border border-hairline p-2 flex items-center justify-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="max-h-[60vh] w-auto object-contain shadow"
                />
              </div>
            )}

            {selectedCert.description && (
              <p className="text-sm text-ink-soft leading-relaxed mb-4">
                {selectedCert.description}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline">
              <span className="font-mono text-[11px] text-graphite">
                {selectedCert.badge || 'Verified Certification'}
              </span>
              <div className="flex gap-3">
                {selectedCert.file && (
                  <a
                    href={selectedCert.file}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2 bg-ink text-paper hover:bg-ink-soft transition-colors"
                  >
                    Open Document PDF ↗
                  </a>
                )}
                {selectedCert.image && (
                  <a
                    href={selectedCert.image}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2 border border-ink hover:bg-ink hover:text-paper transition-colors"
                  >
                    Full Image ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
