'use client';

import { useState } from 'react';
import { topcit } from '@/lib/data';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

export default function TopcitCompetency() {
  const [activeModalDoc, setActiveModalDoc] = useState(null);

  return (
    <section id="topcit" className="relative px-6 md:px-10 py-28 md:py-36 bg-paper-dim border-t border-b border-hairline">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          code="03"
          title="TOPCIT Level 3"
          sub="Standardized Practical ICT Competency Benchmark"
        />

        {/* Hero Banner / Summary Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Scorecard */}
          <div className="lg:col-span-7 bg-paper p-8 md:p-10 border border-hairline flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-widest2 uppercase px-3 py-1 bg-ink text-paper font-semibold">
                  {topcit.level} QUALIFIED
                </span>
                <span className="font-mono text-[11px] tracking-widest2 uppercase text-graphite">
                  Cert #{topcit.certificateNo}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-4">
                <span className="font-display font-black text-6xl md:text-7xl tracking-tightest leading-none text-ink">
                  {topcit.score}
                </span>
                <span className="font-mono text-xl md:text-2xl text-graphite">
                  / {topcit.maxScore} pts
                </span>
                <span className="font-mono text-xs uppercase px-2.5 py-1 bg-paper-dim border border-hairline text-ink font-semibold">
                  {topcit.percentage}% Total Score
                </span>
              </div>

              <p className="mt-6 text-ink-soft leading-relaxed text-base md:text-lg">
                {topcit.summary}
              </p>

              {/* Key Benchmark Comparisons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-hairline">
                <div>
                  <span className="font-mono text-[10px] tracking-widest2 uppercase text-graphite block">
                    Cohort Average
                  </span>
                  <p className="font-display font-black text-2xl tracking-tight mt-1 text-ink">
                    {topcit.cohortAverage} <span className="text-xs font-mono font-normal text-graphite">pts</span>
                  </p>
                  <p className="font-mono text-[10px] text-ink font-medium mt-0.5">
                    +{(topcit.score - topcit.cohortAverage).toFixed(1)} pts above avg
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] tracking-widest2 uppercase text-graphite block">
                    Questions Accuracy
                  </span>
                  <p className="font-display font-black text-2xl tracking-tight mt-1 text-ink">
                    {topcit.questionsCorrect} <span className="text-xs font-mono font-normal text-graphite">/ {topcit.totalQuestions}</span>
                  </p>
                  <p className="font-mono text-[10px] text-ink font-medium mt-0.5">
                    {topcit.accuracy} overall accuracy
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] tracking-widest2 uppercase text-graphite block">
                    Administering Body
                  </span>
                  <p className="font-display font-black text-lg tracking-tight mt-1 text-ink uppercase">
                    IITP
                  </p>
                  <p className="font-mono text-[10px] text-graphite mt-0.5">
                    Test Date: {topcit.testDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification & Action links */}
            <div className="mt-8 pt-6 border-t border-hairline flex flex-wrap gap-3">
              <a
                href="/topcit_certificate.pdf"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2.5 bg-ink text-paper hover:bg-ink-soft transition-colors inline-flex items-center gap-2"
              >
                <span>View Official Certificate (PDF)</span>
                <span aria-hidden>↗</span>
              </a>
              <button
                type="button"
                onClick={() => setActiveModalDoc(topcit.documents[0])}
                className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2.5 border border-ink hover:bg-ink hover:text-paper transition-colors"
              >
                Quick Preview
              </button>
            </div>
          </div>

          {/* Certificate Visual Preview Card */}
          <div className="lg:col-span-5 bg-paper border border-hairline p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <span className="font-mono text-[10px] tracking-widest2 uppercase text-graphite">
                  Official Credential Verification
                </span>
                <span className="font-mono text-[10px] tracking-widest2 uppercase text-ink font-semibold">
                  IITP Certified
                </span>
              </div>

              <div
                className="relative mt-4 aspect-[4/3] w-full border border-hairline overflow-hidden group cursor-pointer bg-ink"
                onClick={() => setActiveModalDoc(topcit.documents[0])}
              >
                <img
                  src="/topcit_certificate.png"
                  alt="TOPCIT Score Certificate"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2 bg-paper text-ink font-medium shadow-lg">
                    Click to Zoom
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-graphite">Examinee ID:</span>
                  <span className="font-semibold text-ink">{topcit.examineeNo}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-graphite">Certificate No:</span>
                  <span className="font-semibold text-ink">{topcit.certificateNo}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-graphite">Institution:</span>
                  <span className="font-semibold text-ink">USTP CDO</span>
                </div>
              </div>
            </div>

            {/* Document Download & Report Links */}
            <div className="mt-6 pt-4 border-t border-hairline space-y-2">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-graphite">
                Official Assessment Reports:
              </p>
              <div className="flex flex-col gap-1.5">
                {topcit.documents.slice(1).map((doc) => (
                  <a
                    key={doc.title}
                    href={doc.file}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-ink-soft hover:text-ink hover:underline flex items-center justify-between py-1 px-2 bg-paper-dim/60 border border-hairline/60"
                  >
                    <span>{doc.title}</span>
                    <span className="text-graphite text-[10px]">PDF ↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Domain-by-Domain Analysis Cards */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="font-mono text-[11px] tracking-widest2 uppercase text-graphite">
                Performance Diagnostics
              </span>
              <h3 className="font-display font-black uppercase text-2xl md:text-3xl tracking-tightest mt-1">
                Competency Breakdown by Area
              </h3>
            </div>
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-graphite">
              Standardized Assessment Breakdown
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline">
            {topcit.domains.map((domain, index) => {
              const isTopDomain = domain.status.includes('Top 30%') || domain.status.includes('+52%');
              return (
                <ScrollReveal key={domain.code} delay={index * 80} className="bg-paper p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] tracking-widest2 text-graphite">
                        {domain.code}
                      </span>
                      <span
                        className={`font-mono text-[10px] tracking-widest2 uppercase px-2 py-0.5 border ${
                          isTopDomain
                            ? 'bg-ink text-paper border-ink font-semibold'
                            : 'bg-paper-dim text-ink border-hairline'
                        }`}
                      >
                        {domain.status}
                      </span>
                    </div>

                    <h4 className="font-display font-black uppercase text-xl md:text-2xl tracking-tightest mt-3">
                      {domain.name}
                    </h4>

                    {/* Score Bar & Numeric Metric */}
                    <div className="mt-4">
                      <div className="flex items-baseline justify-between font-mono text-xs mb-1.5">
                        <span className="font-bold text-ink text-base">
                          {domain.score} <span className="text-xs text-graphite font-normal">/ {domain.maxScore} pts</span>
                        </span>
                        <span className="text-graphite font-medium">
                          {domain.highlight}
                        </span>
                      </div>

                      {/* Visual progress track */}
                      <div className="w-full h-2 bg-paper-dim border border-hairline overflow-hidden">
                        <div
                          className="h-full bg-ink transition-all duration-1000 ease-out"
                          style={{ width: `${domain.percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between font-mono text-[10px] text-graphite mt-1.5">
                        <span>Cohort Avg: {domain.cohortAvg} pts</span>
                        <span>Top 30% Benchmark: {domain.top30} pts</span>
                      </div>
                    </div>

                    <p className="mt-5 text-ink-soft text-sm leading-relaxed">
                      {domain.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Recruiter / Industry Value Proposition Banner */}
        <ScrollReveal delay={150} className="mt-12 bg-ink text-paper p-8 md:p-10 border border-ink">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <span className="font-mono text-[11px] tracking-widest2 uppercase text-paper/70 block">
                Why TOPCIT Level 3 Matters for Your Team
              </span>
              <h4 className="font-display font-black uppercase text-2xl md:text-3xl tracking-tightest mt-2 leading-tight">
                Verified Technical Readiness for Real-World Systems
              </h4>
              <p className="mt-3 text-paper/85 text-sm md:text-base leading-relaxed max-w-3xl">
                Unlike purely academic transcripts, TOPCIT measures applied competency under real-world problem-solving conditions. Level 3 signifies independent execution capability across embedded hardware, system architecture, database design, and software implementation—ready to deliver immediate impact during internship and junior engineering roles.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end justify-center">
              <a
                href={`mailto:mosquida.edimar.18@gmail.com?subject=${encodeURIComponent(
                  'Internship / Engineering Opportunity — Edimar Mosquida'
                )}`}
                className="font-mono text-[11px] tracking-widest2 uppercase px-6 py-3.5 bg-paper text-ink hover:bg-paper-dim transition-colors text-center font-bold"
              >
                Inquire for Internship
              </a>
              <a
                href="/topcit_certificate.pdf"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] tracking-widest2 uppercase px-6 py-3.5 border border-paper/40 text-paper hover:bg-paper hover:text-ink transition-colors text-center"
              >
                Download Credential
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox / Preview Modal */}
      {activeModalDoc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
          onClick={() => setActiveModalDoc(null)}
        >
          <div
            className="relative bg-paper max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-hairline p-6 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <h3 className="font-display font-black uppercase text-xl text-ink">
                  {activeModalDoc.title}
                </h3>
                <p className="font-mono text-[10px] tracking-widest2 uppercase text-graphite mt-0.5">
                  {activeModalDoc.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalDoc(null)}
                className="font-mono text-sm px-3 py-1.5 border border-ink hover:bg-ink hover:text-paper transition-colors"
                aria-label="Close modal"
              >
                ✕ Close
              </button>
            </div>

            <div className="my-6 flex-1 flex items-center justify-center bg-ink/5 border border-hairline p-2">
              <img
                src={activeModalDoc.preview}
                alt={activeModalDoc.title}
                className="max-h-[65vh] w-auto object-contain shadow-md"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-hairline">
              <span className="font-mono text-[11px] text-graphite">
                Official IITP Assessment Credential
              </span>
              <div className="flex gap-3">
                <a
                  href={activeModalDoc.file}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] tracking-widest2 uppercase px-4 py-2 bg-ink text-paper hover:bg-ink-soft transition-colors"
                >
                  Open Original PDF ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
