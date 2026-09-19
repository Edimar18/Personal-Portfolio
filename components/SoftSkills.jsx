import { softSkills } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

const marks = [
  // Technical Problem Solving — offset interlocking squares
  <svg key="m1" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="22" height="22" stroke="currentColor" strokeWidth="1.4" />
    <rect x="18" y="18" width="22" height="22" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  // Leadership & Initiative — apex with radiating lines
  <svg key="m2" viewBox="0 0 48 48" fill="none">
    <path d="M24 8 L40 38 H8 Z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="24" cy="20" r="2" fill="currentColor" />
  </svg>,
  // Clear Communication — two intersecting circles
  <svg key="m3" viewBox="0 0 48 48" fill="none">
    <circle cx="18" cy="24" r="13" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="30" cy="24" r="13" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  // Engineering Collaboration — linked rings
  <svg key="m4" viewBox="0 0 48 48" fill="none">
    <circle cx="17" cy="24" r="9" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="31" cy="24" r="9" stroke="currentColor" strokeWidth="1.4" />
    <line x1="22" y1="24" x2="26" y2="24" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  // Adaptability & Agility — rotated square morphing to diamond
  <svg key="m5" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="10" width="20" height="20" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
    <rect x="18" y="18" width="20" height="20" stroke="currentColor" strokeWidth="1.4" transform="rotate(45 28 28)" />
  </svg>,
  // End-to-End Ownership — checklist
  <svg key="m6" viewBox="0 0 48 48" fill="none">
    <line x1="10" y1="14" x2="38" y2="14" stroke="currentColor" strokeWidth="1.4" />
    <line x1="10" y1="24" x2="38" y2="24" stroke="currentColor" strokeWidth="1.4" />
    <line x1="10" y1="34" x2="28" y2="34" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="34" cy="34" r="4" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
];

export default function SoftSkills() {
  return (
    <section id="skills" className="relative px-6 md:px-10 py-28 md:py-36 bg-paper-dim">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading code="06" title="Core Strengths" sub="Professional & Leadership Competencies" />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline border border-hairline">
          {softSkills.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 60} className="bg-paper">
              <div className="p-8 h-full flex flex-col gap-6 transition-colors duration-300 hover:bg-paper-dim">
                <div className="w-12 h-12 text-ink">{marks[i % marks.length]}</div>
                <div>
                  <h3 className="font-display font-black uppercase text-xl tracking-tightest">
                    {s.name}
                  </h3>
                  <p className="text-sm text-graphite mt-2 leading-relaxed">{s.note}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
