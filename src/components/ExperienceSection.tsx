import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experiences, type Experience } from '../data/experience'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal, RevealWords } from './shared/Reveal'
import { TiltCard } from './shared/TiltCard'

function AbstractPanel({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-surface">
      <div aria-hidden className="absolute -right-20 -top-28 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(94,200,242,0.2),transparent_70%)]" />
      <div aria-hidden className="absolute -bottom-32 -left-16 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.22),transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-[12%] inset-y-[18%] rounded-full border border-blue/25" />
      <div aria-hidden className="absolute inset-x-[22%] inset-y-[28%] rounded-full border border-cyan/20" />
      <div className="relative flex flex-col items-center gap-16">
        <span className="grad-text font-display text-3xl font-bold tracking-[0.08em] sm:text-4xl">{title}</span>
        <span className="font-mono text-[11px] tracking-[0.2em] text-faint">{subtitle}</span>
      </div>
    </div>
  )
}

function ShotViewer({ exp }: { exp: Experience }) {
  const [active, setActive] = useState(0)

  return (
    <TiltCard strength={4} className="w-full overflow-hidden rounded-[18px] border border-line-accent bg-surface">
      <div className="relative aspect-[8/5] w-full">
        {exp.abstract ? (
          <AbstractPanel {...exp.abstract} />
        ) : (
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
        )}
      </div>
      {exp.images.length > 1 && (
        <div className="flex items-center justify-center gap-2 border-t border-line py-3">
          {exp.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${exp.name} screenshot ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? 'w-6 grad-bg' : 'w-1.5 bg-faint hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </TiltCard>
  )
}

function ExperienceRow({ exp, flip }: { exp: Experience; flip: boolean }) {
  return (
    <div className={`flex flex-col gap-8 lg:items-center lg:gap-14 ${flip ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
      <Reveal className="w-full lg:w-[56%] lg:shrink-0" y={50}>
        <ShotViewer exp={exp} />
      </Reveal>

      <Reveal className="flex flex-col gap-4.5 lg:flex-1" delay={0.12} y={30}>
        <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
          <span className="font-mono text-[13px] text-cyan">{exp.index}</span>
          <h3 className="font-display text-[26px] font-bold tracking-tight text-ink sm:text-[32px]">{exp.name}</h3>
          <span className="font-mono text-[11px] tracking-[0.14em] text-faint">{exp.context}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted">{exp.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          {exp.roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-line-accent px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-violet"
            >
              {role}
            </span>
          ))}
        </div>
        <span className="font-mono text-xs text-faint">{exp.stack}</span>
      </Reveal>
    </div>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-line px-6 py-24 sm:px-14 lg:py-28">
      <SectionHeader index="03" label="FREELANCE EXPERIENCE" />
      <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        <RevealWords text="Systems shipped for real clients." />
      </h2>

      <div className="mt-16 flex flex-col gap-20 lg:gap-24">
        {experiences.map((exp, i) => (
          <ExperienceRow key={exp.name} exp={exp} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
