import { useState } from 'react'
import { certifications } from '../data/certifications'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { ScrollFillText } from './shared/ScrollFillText'
import { TiltCard } from './shared/TiltCard'
import { Lightbox } from './shared/Lightbox'

export function CertificationsSection() {
  const [viewer, setViewer] = useState<number | null>(null)

  return (
    <section id="certifications" className="relative scroll-mt-16 overflow-hidden border-t border-line px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="03" label="Certifications" />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
        <h2 className="display" style={{ fontSize: 'var(--text-step-4)' }}>
          <ScrollFillText text="Certified on Claude." />
        </h2>
        <Reveal delay={0.2} y={16}>
          <span className="mono-label text-faint">
            {certifications.length} certificates · Anthropic Academy
          </span>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <Reveal key={cert.title} delay={(i % 4) * 0.08} y={36}>
            <div className="flex flex-col gap-4">
              <TiltCard strength={7} className="overflow-hidden border border-line">
                <button
                  onClick={() => setViewer(i)}
                  data-cursor="VIEW"
                  aria-label={`Open certificate for ${cert.title} full size`}
                  className="block w-full"
                >
                  <img
                    src={cert.image}
                    alt={`Certificate for ${cert.title}`}
                    className="aspect-[313/240] w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              </TiltCard>
              <span className="text-[14px] leading-snug text-muted">{cert.title}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {viewer !== null && (
        <Lightbox
          images={certifications.map((cert) => ({ src: cert.image, alt: `Certificate for ${cert.title}` }))}
          index={viewer}
          onClose={() => setViewer(null)}
          onNavigate={setViewer}
        />
      )}
    </section>
  )
}
