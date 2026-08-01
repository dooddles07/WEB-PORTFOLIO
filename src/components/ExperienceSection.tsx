import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { experiences, type Experience } from '../data/experience'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { ScrollFillText } from './shared/ScrollFillText'
import { Lightbox } from './shared/Lightbox'

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

function ShotViewer({ exp, onOpen }: { exp: Experience; onOpen: (index: number) => void }) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const many = exp.images.length > 1

  // slow auto cycle so the gallery shows itself; hover pauses it
  useEffect(() => {
    if (!many || paused || reduce) return
    const timer = setInterval(() => setActive((current) => (current + 1) % exp.images.length), 4000)
    return () => clearInterval(timer)
  }, [many, paused, reduce, exp.images.length])

  return (
    <div className="w-full overflow-hidden border border-line bg-surface">
      <div
        className="group/shot relative aspect-[8/5] w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {exp.abstract ? (
          <AbstractPanel {...exp.abstract} />
        ) : (
          <>
            <button
              onClick={() => onOpen(active)}
              data-cursor="VIEW"
              aria-label={`Open ${exp.name} screenshots full size`}
              className="absolute inset-0 z-10"
            />
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={exp.images[active]}
                alt={`${exp.name} screenshot ${active + 1}`}
                className="absolute inset-0 h-full w-full object-contain"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                loading="lazy"
                draggable={false}
              />
            </AnimatePresence>
            {many && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActive((active - 1 + exp.images.length) % exp.images.length) }}
                  aria-label={`Previous ${exp.name} screenshot`}
                  className="glass absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActive((active + 1) % exp.images.length) }}
                  aria-label={`Next ${exp.name} screenshot`}
                  className="glass absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}
          </>
        )}
      </div>
      {many && (
        <div className="flex items-center justify-center gap-2 border-t border-line py-3">
          {exp.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${exp.name} screenshot ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === active ? 'w-6 bg-accent' : 'w-1 bg-faint hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ExperienceRow({ exp, flip, onOpen }: { exp: Experience; flip: boolean; onOpen: (index: number) => void }) {
  return (
    <article className="border-t border-line pt-10">
      {/* masthead: oversized index in the margin, name set in the display serif */}
      <Reveal y={24}>
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="display leading-none text-faint" style={{ fontSize: 'var(--text-step-3)' }}>
            {exp.index}
          </span>
          <h3 className="display leading-none text-ink" style={{ fontSize: 'var(--text-step-3)' }}>
            {exp.name}
          </h3>
          <span className="mono-label text-faint">{exp.context}</span>
        </div>
      </Reveal>

      <div className={`mt-9 flex flex-col gap-9 lg:gap-14 ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
        <Reveal className="w-full lg:w-[58%] lg:shrink-0" y={40}>
          <ShotViewer exp={exp} onOpen={onOpen} />
        </Reveal>

        <Reveal className="flex flex-col gap-6 lg:flex-1" delay={0.1} y={28}>
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
        </Reveal>
      </div>
    </article>
  )
}

export function ExperienceSection() {
  const [viewer, setViewer] = useState<{ exp: Experience; index: number } | null>(null)

  return (
    <section id="experience" className="relative scroll-mt-16 border-t border-line px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="04" label="Client work" />

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

      <div className="mt-20 flex flex-col gap-20 lg:gap-28">
        {experiences.map((exp, i) => (
          <ExperienceRow
            key={exp.name}
            exp={exp}
            flip={i % 2 === 1}
            onOpen={(index) => setViewer({ exp, index })}
          />
        ))}
      </div>

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
