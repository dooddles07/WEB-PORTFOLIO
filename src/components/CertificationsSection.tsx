import { certifications } from '../data/certifications'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal, RevealWords } from './shared/Reveal'
import { TiltCard } from './shared/TiltCard'

export function CertificationsSection() {
  return (
    <section id="certifications" className="border-t border-line px-6 py-24 sm:px-14 lg:py-28">
      <SectionHeader index="05" label="CERTIFICATIONS — ANTHROPIC" />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          <RevealWords text="Certified on Claude." />
        </h2>
        <Reveal delay={0.2} y={16}>
          <span className="font-mono text-xs tracking-[0.14em] text-faint">7 CERTIFICATES · ANTHROPIC ACADEMY</span>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={(i % 4) * 0.09} y={40}>
            <div className="flex flex-col gap-3">
              <TiltCard strength={9} className="overflow-hidden rounded-[14px] border border-line">
                <img
                  src={cert.image}
                  alt={`Certificate — ${cert.title}`}
                  className="aspect-[313/240] w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </TiltCard>
              <span className="text-[13px] font-medium text-ink">{cert.title}</span>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.27} y={40}>
          <div className="flex aspect-[313/240] flex-col items-center justify-center gap-2.5 rounded-[14px] border border-dashed border-line-accent bg-violet/[0.04]">
            <span className="grad-text font-display text-3xl font-bold">10/10</span>
            <span className="font-mono text-[11px] tracking-[0.16em] text-muted">AI FLUENCY SCORE</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
