import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { MagneticButton } from './shared/MagneticButton'

function ContactMeta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-mono text-xs text-muted">{text}</span>
    </div>
  )
}

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
    <section id="contact" className="relative scroll-mt-16 overflow-hidden border-t border-line px-6 pb-24 pt-28 sm:px-14 lg:pt-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(91,124,250,0.14),transparent_70%)]"
      />

      <div className="relative flex flex-col items-center gap-7 text-center">
        <SectionHeader index="07" label="CONTACT" />

        <Reveal y={60}>
          <h2 className="font-display text-[13vw] font-bold leading-[1.05] tracking-tight sm:text-7xl lg:text-[84px]">
            <span className="text-ink">Let's build</span>
            <br />
            <span className="grad-text">something.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="max-w-[520px] text-base leading-relaxed text-muted">
            Open to full time roles, freelance projects, and automation work anywhere in the world.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <MagneticButton
              onClick={copyEmail}
              className="grad-bg flex items-center gap-2.5 rounded-full px-9 py-4 font-display text-base font-semibold text-white shadow-[0_0_40px_rgba(139,92,246,0.35)]"
            >
              {profile.email}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="#fff" strokeWidth="1.3" />
                <path d="M9.5 4.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" stroke="#fff" strokeWidth="1.3" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href={profile.resume}
              download
              className="flex items-center gap-2.5 rounded-full border border-line-accent px-9 py-4 font-display text-base font-medium text-ink transition-colors hover:bg-violet/10"
            >
              Download Resume
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 1v9M3.5 6.5 7 10l3.5-3.5M2 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs text-faint underline-offset-4 transition-colors hover:text-muted hover:underline"
          >
            or open your mail app instead
          </a>
        </Reveal>

        <AnimatePresence>
          {copied && (
            <motion.div
              role="status"
              className="glass fixed bottom-8 left-1/2 z-[97] flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-line-accent px-5 py-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="m2.5 7.5 3 3 6-7" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body text-sm text-ink">Email copied</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3 pt-5">
            <ContactMeta
              icon={
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2.5 3.5h9a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z" stroke="#8a90a8" strokeWidth="1.2" />
                  <path d="m2 4 5 3.5L12 4" stroke="#8a90a8" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              }
              text={profile.phone}
            />
            <ContactMeta
              icon={
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M7 13s4.5-3.8 4.5-7A4.5 4.5 0 0 0 2.5 6c0 3.2 4.5 7 4.5 7Z" stroke="#8a90a8" strokeWidth="1.2" />
                  <circle cx="7" cy="6" r="1.6" stroke="#8a90a8" strokeWidth="1.2" />
                </svg>
              }
              text="Naga City, Camarines Sur, PH 4400"
            />
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              <ContactMeta
                icon={
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <circle cx="7" cy="7" r="5.5" stroke="#8a90a8" strokeWidth="1.2" />
                    <path d="M1.5 7h11M7 1.5c1.8 1.6 2.6 3.4 2.6 5.5S8.8 11.4 7 12.5C5.2 10.9 4.4 9.1 4.4 7S5.2 3.1 7 1.5Z" stroke="#8a90a8" strokeWidth="1.2" />
                  </svg>
                }
                text="github.com/dooddles07 and linkedin.com/in/brixsonn-romero"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
