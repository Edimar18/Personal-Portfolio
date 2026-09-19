import { profile } from '@/lib/data';
import ScrollReveal from './ScrollReveal';

export default function Footer() {
  return (
    <footer id="contact" className="relative px-6 md:px-10 py-28 md:py-36 bg-ink text-paper">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/60">
              08 — Get in touch
            </span>
            <span className="px-2.5 py-0.5 bg-paper/10 border border-paper/20 font-mono text-[10px] tracking-wider uppercase text-paper/90">
              Open to Internship & Junior Roles
            </span>
          </div>
          <h2 className="font-display font-black uppercase text-[14vw] md:text-[7vw] tracking-tightest leading-[0.88] mt-4">
            Let&apos;s build
            <br />
            something.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120} className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg md:text-2xl border-b border-paper/40 pb-2 hover:border-paper transition-colors block w-fit"
            >
              {profile.email}
            </a>
            <p className="text-sm text-paper/70 font-mono max-w-md">
              4th-year BSIT student (IoT Track) with verified practical ICT competency (TOPCIT Level 3). Ready to contribute to hardware, AI vision, and full-stack software teams.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 font-mono text-[11px] tracking-widest2 uppercase text-paper/70">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-paper transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-paper transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="/topcit_certificate.pdf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-paper transition-colors underline"
            >
              TOPCIT Cert PDF ↗
            </a>
            <span>{profile.phone}</span>
          </div>
        </ScrollReveal>

        <div className="mt-20 pt-6 border-t border-paper/15 flex flex-wrap justify-between gap-2 font-mono text-[10px] tracking-widest2 uppercase text-paper/40">
          <span>{profile.name} — {profile.location}</span>
          <span>USTP BSIT (IoT Track) • 2026-2027</span>
        </div>
      </div>
    </footer>
  );
}
