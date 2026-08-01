import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import { MagneticButton } from './shared/MagneticButton'
import { RotatingText } from './shared/RotatingText'

const shippedCount = experiences.length + projects.length

const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } },
}

const glyph = {
  hidden: { y: '108%' },
  show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
}

/** name set in the display serif, revealed letter by letter from a clipped baseline */
function NameLine({ text, italic }: { text: string; italic?: boolean }) {
  return (
    <motion.span
      variants={line}
      initial="hidden"
      animate="show"
      className={`flex ${italic ? 'display-italic text-accent' : 'display text-ink'}`}
      style={{ fontSize: 'var(--text-step-5)', lineHeight: 0.86 }}
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span variants={glyph} className="inline-block">
            {ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-8 pt-28 sm:px-10 lg:px-14 lg:pt-32"
    >
      {/* single soft wash, warm, low — replaces the old four-texture stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.10),transparent_65%)]"
      />

      <motion.div style={{ y: contentY, opacity: fade }} className="relative z-10 flex flex-1 flex-col justify-center py-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex items-center gap-2.5"
        >
          <span className="relative h-[6px] w-[6px] rounded-full bg-accent" aria-hidden>
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/70" />
          </span>
          <span className="mono-label text-muted">{profile.availability}</span>
        </motion.div>

        <h1 className="mt-7 flex flex-col">
          <NameLine text={profile.firstName} />
          <NameLine text={profile.lastName} italic />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10"
        >
          <div className="border-l border-line-strong pl-5 lg:col-span-6">
            <p className="font-mono text-[12px] leading-relaxed tracking-[0.08em] text-ink">
              {profile.roleShort}
              <br />
              <span className="text-accent">
                <RotatingText words={profile.specialties} />
              </span>
            </p>
            <p className="prose-body mt-5 text-muted">{profile.tagline}</p>
          </div>

          {/* marginalia: the facts a recruiter scans for, without a stat-card row */}
          <dl className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="flex justify-between gap-4 border-t border-line py-3">
              <dt className="mono-label text-faint">Based in</dt>
              <dd className="mono-label text-muted">{profile.locationShort}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-line py-3">
              <dt className="mono-label text-faint">Degree</dt>
              <dd className="mono-label text-muted">BS Computer Science</dd>
            </div>
            <div className="flex justify-between gap-4 border-y border-line py-3">
              <dt className="mono-label text-faint">Shipped</dt>
              <dd className="mono-label text-muted">{shippedCount} platforms</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
        >
          <MagneticButton
            href="#experience"
            className="group flex items-center gap-3 border-b border-ink pb-1.5 font-mono text-[12px] tracking-[0.14em] text-ink"
          >
            SEE THE WORK
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="border-b border-transparent pb-1.5 font-mono text-[12px] tracking-[0.14em] text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            GET IN TOUCH
          </MagneticButton>
          <div className="flex items-center gap-5">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor="OPEN"
              className="text-faint transition-colors hover:text-ink"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-cursor="OPEN"
              className="text-faint transition-colors hover:text-ink"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.16h4.56V23H.22V8.16Zm7.44 0h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.19h-4.55v-7.26c0-1.73-.03-3.96-2.41-3.96-2.42 0-2.79 1.89-2.79 3.84V23H7.66V8.16Z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* baseline marginalia: where he is, what this is */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 flex items-end justify-between gap-6 border-t border-line pt-5"
      >
        <span className="mono-label text-faint">{profile.locationShort}</span>
        <div className="flex items-center gap-3" aria-hidden>
          <span className="mono-label text-faint">SCROLL</span>
          <motion.span
            className="h-px w-14 origin-left bg-line-strong"
            animate={{ scaleX: [0.25, 1, 0.25] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
