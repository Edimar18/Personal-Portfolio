import { education } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" className="relative px-6 md:px-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="05" title="Education" sub="Academic Track & Key Coursework" />

        <div className="mt-16 flex flex-col">
          {education.map((e, i) => (
            <ScrollReveal key={e.institution} delay={i * 80}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-10 border-b border-hairline items-start">
                <div className="lg:col-span-3">
                  <span className="font-mono text-[11px] tracking-widest2 text-graphite uppercase block">
                    {e.period}
                  </span>
                  <span className="inline-block mt-3 px-2.5 py-1 bg-paper-dim border border-hairline font-mono text-[10px] tracking-wider uppercase text-ink font-semibold">
                    Internship Ready
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-display font-black uppercase text-2xl md:text-3xl tracking-tightest leading-tight">
                    {e.degree}
                  </h3>
                  <p className="text-graphite font-medium mt-2 text-base">{e.institution}</p>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">{e.detail}</p>
                </div>

                <div className="lg:col-span-4 bg-paper-dim/50 border border-hairline p-6">
                  <span className="font-mono text-[10px] tracking-widest2 uppercase text-graphite block mb-3">
                    Academic & Technical Milestones:
                  </span>
                  {e.highlights ? (
                    <ul className="space-y-2.5">
                      {e.highlights.map((h) => (
                        <li key={h} className="text-xs text-ink-soft flex items-start gap-2 leading-relaxed">
                          <span className="text-ink font-bold mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-ink-soft">{e.detail}</p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
