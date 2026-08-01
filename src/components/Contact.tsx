import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { MagneticButton } from './shared/MagneticButton'

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // clipboard blocked: fall back to the mail app
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden border-t border-line px-6 pb-24 pt-24 sm:px-10 lg:px-14 lg:pt-32"
    >
      <SectionHeader index="07" label="Contact" />

      <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal y={40}>
            <h2 className="display" style={{ fontSize: 'var(--text-step-4)' }}>
              Let's build <span className="display-italic text-accent">something.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12} y={20}>
            <p className="prose-body mt-7 text-muted">
              Open for full time, part time, and contract work anywhere in the world. Email is the
              fastest way to reach me. I read everything and reply to anything that isn't a
              template.
            </p>
          </Reveal>

          <Reveal delay={0.2} y={20}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <MagneticButton
                onClick={copyEmail}
                data-cursor="COPY"
                className="group flex items-center gap-3 border-b border-ink pb-2 text-left"
              >
                <span className="display text-ink" style={{ fontSize: 'var(--text-step-2)' }}>
                  {profile.email}
                </span>
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-faint transition-colors group-hover:text-accent">
                  <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M9.5 4.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.28} y={16}>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <MagneticButton
                href={profile.resume}
                download="Brixsonn-Romero-Resume.pdf"
                className="group flex items-center gap-2.5 border-b border-line-strong pb-1.5 font-mono text-[12px] tracking-[0.14em] text-ink transition-colors hover:border-accent"
              >
                DOWNLOAD RESUME
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                  <path d="M7 1v9M3.5 6.5 7 10l3.5-3.5M2 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </MagneticButton>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-[12px] tracking-[0.14em] text-faint underline-offset-4 transition-colors hover:text-muted hover:underline"
              >
                OR OPEN YOUR MAIL APP
              </a>
            </div>
          </Reveal>
        </div>

        {/* every channel is its own link now: the old row named LinkedIn but only linked GitHub */}
        <Reveal delay={0.2} y={24} className="lg:col-span-4 lg:col-start-9">
          <dl className="flex flex-col">
            <div className="flex flex-col gap-1 border-t border-line py-5">
              <dt className="mono-label text-faint">Phone</dt>
              <dd className="font-mono text-[13px] text-muted">{profile.phone}</dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-line py-5">
              <dt className="mono-label text-faint">Based in</dt>
              <dd className="font-mono text-[13px] text-muted">{profile.location}</dd>
            </div>
            <div className="flex flex-col gap-1 border-t border-line py-5">
              <dt className="mono-label text-faint">GitHub</dt>
              <dd>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="font-mono text-[13px] text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  github.com/dooddles07
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1 border-y border-line py-5">
              <dt className="mono-label text-faint">LinkedIn</dt>
              <dd>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="font-mono text-[13px] break-all text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  linkedin.com/in/brixsonn-romero
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            role="status"
            className="glass fixed bottom-8 left-1/2 z-[97] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-line-strong px-5 py-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="m2.5 7.5 3 3 6-7" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm text-ink">Email copied</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
