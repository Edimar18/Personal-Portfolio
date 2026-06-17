import { profile } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-10 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px] w-full flex-1 flex flex-col">
        <ScrollReveal as="div" className="font-mono text-[11px] md:text-xs tracking-widest2 uppercase text-graphite">
          {profile.name} — {profile.role}
        </ScrollReveal>

        <div className="mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start flex-1">
          {/* Headline block */}
          <div className="lg:col-span-8">
            <ScrollReveal>
              <h1 className="font-display font-black lowercase leading-[0.86] tracking-tightest text-[18vw] lg:text-[10vw] -ml-1">
                Portfolio
                <span className="block text-[7vw] lg:text-[3.4vw] mt-2 lg:mt-4">.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={120} className="mt-8 md:mt-10 max-w-xl">
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed">
                {profile.statement}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={220} className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="font-mono text-[11px] tracking-widest2 uppercase px-5 py-3 bg-ink text-paper hover:bg-ink-soft transition-colors duration-300"
              >
                View Projects
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] tracking-widest2 uppercase px-5 py-3 border border-ink hover:bg-ink hover:text-paper transition-colors duration-300"
              >
                GitHub
              </a>
            </ScrollReveal>
          </div>

          {/* Portrait plate — swap with a real photo when ready */}
          <div className="lg:col-span-4 w-full">
            <ScrollReveal delay={180} className="relative w-full aspect-[4/5] border border-ink/80">
              <span className="absolute -top-px -left-px w-4 h-4 border-t border-l border-ink" />
              <span className="absolute -top-px -right-px w-4 h-4 border-t border-r border-ink" />
              <span className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-ink" />
              <span className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-ink" />

              <img
                src="/portrait.jpg"
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover"
                
              />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <ScrollReveal delay={260} className="mx-auto max-w-[1400px] w-full mt-16">
        <div className="hairline-solid" />
        <div className="flex flex-wrap justify-between gap-4 pt-4 font-mono text-[10px] md:text-[11px] tracking-widest2 uppercase text-graphite">
          <span>{profile.location}</span>
          <span>{profile.email}</span>
          <span className="hidden sm:inline">Scroll to explore ↓</span>
        </div>
      </ScrollReveal>
    </section>
  );
}
