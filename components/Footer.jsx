import { profile } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 md:px-10 py-28 md:py-36 bg-ink text-paper">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/60">
            07 — Get in touch
          </span>
          <h2 className="font-display font-black uppercase text-[14vw] md:text-[7vw] tracking-tightest leading-[0.88] mt-4">
            Let&apos;s build
            <br />
            something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-lg md:text-2xl border-b border-paper/40 pb-2 hover:border-paper transition-colors w-fit"
          >
            {profile.email}
          </a>

          <div className="flex gap-8 font-mono text-[11px] tracking-widest2 uppercase text-paper/70">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-paper transition-colors">
              LinkedIn
            </a>
            <span>{profile.phone}</span>
          </div>
        </ScrollReveal>

        <div className="mt-20 pt-6 border-t border-paper/15 flex flex-wrap justify-between gap-2 font-mono text-[10px] tracking-widest2 uppercase text-paper/40">
          <span>{profile.name} — {profile.location}</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
