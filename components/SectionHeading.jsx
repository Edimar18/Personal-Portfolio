import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ code, title, sub }) {
  return (
    <ScrollReveal>
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <span className="font-mono text-[11px] tracking-widest2 text-graphite">{code}</span>
          <h2 className="font-display font-black uppercase text-5xl md:text-7xl tracking-tightest leading-none mt-2">
            {title}
          </h2>
        </div>
        {sub && (
          <p className="font-mono text-[11px] md:text-xs tracking-widest2 uppercase text-graphite max-w-[22ch] text-right">
            {sub}
          </p>
        )}
      </div>
      <div className="hairline-solid mt-8" />
    </ScrollReveal>
  );
}
