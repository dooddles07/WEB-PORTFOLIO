import { useState } from 'react'
import { experiences, type Experience } from '../data/experience'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { ScrollFillText } from './shared/ScrollFillText'
import { Lightbox } from './shared/Lightbox'
import { DetailModal } from './shared/DetailModal'
import { ScreenViewer } from './shared/ScreenViewer'

/** stand-in for the one client platform with no shareable screenshots */
function AbstractPanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-surface">
      <div
        aria-hidden
        className="absolute -right-20 -top-28 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_70%)]"
      />
      <div aria-hidden className="absolute inset-x-[12%] inset-y-[18%] rounded-full border border-line" />
      <div aria-hidden className="absolute inset-x-[24%] inset-y-[30%] rounded-full border border-line" />
      <div className="relative flex flex-col items-center gap-12">
        <span className="display text-accent" style={{ fontSize: 'var(--text-step-3)' }}>
          {title}
        </span>
        <span className="mono-label text-faint">{subtitle}</span>
      </div>
    </div>
  )
}

/** collapsed list row: index + name + client context; click opens the detail modal */
function ExperienceListRow({ exp, onOpen }: { exp: Experience; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      data-cursor="OPEN"
      className="group flex w-full items-baseline justify-between gap-6 border-b border-line py-6 text-left transition-colors hover:bg-surface-2/50"
    >
      <span className="flex min-w-0 items-baseline gap-4">
        <span className="display leading-none text-faint" style={{ fontSize: 'var(--text-step-2)' }}>
          {exp.index}
        </span>
        <span className="display leading-none text-ink" style={{ fontSize: 'var(--text-step-2)' }}>
          {exp.name}
        </span>
        <span className="mono-label hidden text-faint sm:inline">{exp.context}</span>
      </span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden
        className="shrink-0 self-center text-accent transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M3 9h11M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

/** everything about one client platform, opened from a row */
function ExperienceModal({
  exp,
  viewerOpen,
  onOpenViewer,
  onClose,
}: {
  exp: Experience
  viewerOpen: boolean
  onOpenViewer: (index: number) => void
  onClose: () => void
}) {
  return (
    <DetailModal onClose={onClose} labelledBy="em-title" suppressEsc={viewerOpen}>
      <div className="flex flex-col gap-7 pt-6 sm:pt-2">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="display leading-none text-faint" style={{ fontSize: 'var(--text-step-3)' }}>
            {exp.index}
          </span>
          <h3 id="em-title" className="display leading-none text-ink" style={{ fontSize: 'var(--text-step-3)' }}>
            {exp.name}
          </h3>
          <span className="mono-label text-faint">{exp.context}</span>
        </div>

        {exp.abstract ? (
          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-line">
            <AbstractPanel {...exp.abstract} />
          </div>
        ) : (
          <ScreenViewer images={exp.images} name={exp.name} onOpen={onOpenViewer} />
        )}

        {exp.fact && (
          <p className="display-italic leading-snug text-accent" style={{ fontSize: 'var(--text-step-1)' }}>
            {exp.fact}
          </p>
        )}
        <p className="prose-body text-muted">{exp.description}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {exp.roles.map((role) => (
            <span key={role} className="mono-label text-faint">
              {role}
            </span>
          ))}
        </div>
        <span className="border-t border-line pt-4 font-mono text-[11px] leading-relaxed text-faint">
          {exp.stack}
        </span>
      </div>
    </DetailModal>
  )
}

export function ExperienceSection() {
  const [active, setActive] = useState<Experience | null>(null)
  const [viewer, setViewer] = useState<{ exp: Experience; index: number } | null>(null)

  return (
    <section id="experience" className="relative scroll-mt-16 border-t border-line px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="01" label="Client work" />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <h2 className="display lg:col-span-7" style={{ fontSize: 'var(--text-step-4)' }}>
          <ScrollFillText text="Systems shipped for real clients." />
        </h2>
        <Reveal delay={0.12} y={16} className="lg:col-span-5 lg:pt-3">
          <p className="prose-body text-muted">
            Products I built for clients of Digital Benefits Pte. Ltd., Singapore.
          </p>
        </Reveal>
      </div>

      <Reveal y={24} className="mt-16 block border-t border-line">
        {experiences.map((exp) => (
          <ExperienceListRow key={exp.name} exp={exp} onOpen={() => setActive(exp)} />
        ))}
      </Reveal>

      {active && (
        <ExperienceModal
          exp={active}
          viewerOpen={viewer?.exp.name === active.name}
          onOpenViewer={(index) => setViewer({ exp: active, index })}
          onClose={() => {
            setActive(null)
            setViewer(null)
          }}
        />
      )}

      {viewer && (
        <Lightbox
          images={viewer.exp.images.map((src, i) => ({ src, alt: `${viewer.exp.name} screenshot ${i + 1}` }))}
          index={viewer.index}
          onClose={() => setViewer(null)}
          onNavigate={(index) => setViewer({ ...viewer, index })}
        />
      )}
    </section>
  )
}
