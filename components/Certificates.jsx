import { certificates } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

export default function Certificates() {
  const slots = certificates.length > 0 ? certificates : [null, null, null];

  return (
    <section id="certificates" className="relative px-6 md:px-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="06" title="Certificates" />

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
                <div className="p-8 h-full flex flex-col justify-between min-h-[180px]">
                  <span className="font-mono text-[10px] tracking-widest2 text-graphite">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display font-black uppercase text-lg tracking-tightest leading-snug">
                      {c.name}
                    </h3>
                    <p className="text-sm text-graphite mt-2">{c.org}</p>
                    <p className="font-mono text-[10px] tracking-widest2 uppercase text-ash mt-1">{c.date}</p>
                  </div>
                </div>
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
    </section>
  );
}
