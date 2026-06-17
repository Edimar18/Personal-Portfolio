import { projects } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

const plateClass = {
  circuit: 'plate-circuit',
  scanline: 'plate-scanline',
  wireframe: 'plate-wireframe',
  halftone: 'plate-halftone',
};

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 md:px-10 py-28 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="02" title="Projects" sub="Visual proof of creation" />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
          {projects.map((p, i) => (
            <ScrollReveal key={p.code} delay={i * 80} className="bg-paper">
              <article className="group relative h-[480px] md:h-[560px] overflow-hidden transition-transform duration-700 ease-plate hover:-translate-y-1.5">
                {/* Visual-proof plate — swap with a real screenshot / build photo */}
                <div className={`absolute inset-0 ${plateClass[p.plate]} transition-transform duration-[1200ms] ease-plate group-hover:scale-[1.04]`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                {/* Index code */}
                <span className="absolute top-5 left-5 font-mono text-[11px] tracking-widest2 text-paper/80">
                  {p.code}
                </span>
                <span className="absolute top-5 right-5 font-mono text-[10px] tracking-widest2 uppercase text-paper/60">
                  {p.plate} plate · replace image
                </span>

                {/* Info panel */}
                <div className="absolute left-0 right-0 bottom-0 px-6 pb-6 pt-10 max-h-none lg:max-h-[78px] lg:group-hover:max-h-[420px] overflow-hidden transition-all duration-500 ease-plate">
                  <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-paper tracking-tightest leading-none">
                    {p.name}
                  </h3>
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-paper/70 mt-1.5">
                    {p.role}
                  </p>

                  <div className="mt-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-paper/90 text-sm leading-relaxed max-w-md">
                      {p.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-wide px-2.5 py-1 border border-paper/40 text-paper/85"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-5 font-mono text-[11px] tracking-widest2 uppercase text-paper border-b border-paper/60 pb-1 hover:border-paper transition-colors"
                    >
                      View GitHub Link
                      <span aria-hidden>→</span>
                    </a>
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
