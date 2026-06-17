import { leadership } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

export default function Leadership() {
  return (
    <section id="leadership" className="relative px-6 md:px-10 py-28 md:py-36 bg-paper-dim">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="03" title="Leadership Experience" sub="Proof in images" />

        <div className="mt-16 flex flex-col gap-px bg-hairline border border-hairline">
          {leadership.map((l, i) => (
            <ScrollReveal key={l.org} delay={i * 100} className="bg-paper">
              <article className="grid grid-cols-1 md:grid-cols-12">
                {/* Photo-proof plate */}
                <div className="md:col-span-5 relative h-72 md:h-auto min-h-[280px] plate-halftone overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/45" />
                  <span className="absolute top-5 left-5 font-mono text-[10px] tracking-widest2 text-paper/85">
                    FIG. {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="absolute bottom-5 left-5 right-5 font-mono text-[9px] tracking-widest2 uppercase text-paper/70">
                    Replace with a photo from this role — workshop, meeting, or event
                  </div>
                </div>

                {/* Dossier */}
                <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-graphite">
                    {l.period} · {l.location}
                  </p>
                  <h3 className="font-display font-black uppercase text-3xl md:text-4xl tracking-tightest mt-2">
                    {l.role}
                  </h3>
                  <p className="text-graphite font-medium mt-1">{l.org}</p>

                  <p className="mt-5 text-ink-soft leading-relaxed max-w-lg">{l.summary}</p>

                  <ul className="mt-5 space-y-2">
                    {l.achievements.map((a) => (
                      <li key={a} className="text-sm text-ink-soft flex gap-3">
                        <span className="text-graphite mt-1">—</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {l.skills.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 border border-ink/30 text-ink-soft"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
