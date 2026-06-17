import { education } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

export default function Education() {
  return (
    <section id="education" className="relative px-6 md:px-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="04" title="Education" />

        <div className="mt-16 flex flex-col">
          {education.map((e, i) => (
            <ScrollReveal key={e.institution} delay={i * 80}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-hairline items-baseline">
                <span className="md:col-span-2 font-mono text-[11px] tracking-widest2 text-graphite uppercase">
                  {e.period}
                </span>
                <div className="md:col-span-7">
                  <h3 className="font-display font-black uppercase text-2xl md:text-3xl tracking-tightest leading-tight">
                    {e.degree}
                  </h3>
                  <p className="text-graphite mt-1">{e.institution}</p>
                </div>
                <p className="md:col-span-3 text-sm text-ink-soft leading-relaxed">{e.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
