import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { profile } from '../data/profile'
import { MagneticButton } from './shared/MagneticButton'
import { RotatingText } from './shared/RotatingText'
import { TiltCard } from './shared/TiltCard'

const nameLine = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const letter = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

function KineticName({ text, gradient }: { text: string; gradient?: boolean }) {
  return (
    <motion.span
      variants={nameLine}
      initial="hidden"
      animate="show"
      className={`flex font-display text-[15vw] font-bold leading-[0.92] tracking-tight sm:text-[96px] xl:text-[118px] ${
        gradient ? 'grad-text' : 'text-ink'
      }`}
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
          <motion.span variants={letter} className="inline-block">
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
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-28 sm:px-14 lg:pt-0">
      <div aria-hidden className="grid-texture absolute inset-0" />
      <div aria-hidden className="absolute -right-36 -top-44 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(91,124,250,0.22),transparent_68%)]" />
      <div aria-hidden className="absolute -bottom-56 -left-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_68%)]" />

      <div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <motion.div style={{ y: contentY, opacity: fade }} className="flex max-w-[780px] flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2.5 rounded-full border border-line-accent bg-violet/5 px-4 py-2"
          >
            <span className="relative h-[7px] w-[7px] rounded-full bg-green-400" aria-hidden>
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400/70" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-muted">{profile.availability}</span>
          </motion.div>

          <h1 className="mt-8 flex flex-col">
            <KineticName text={profile.firstName} />
            <KineticName text={profile.lastName} gradient />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-7 flex items-center gap-3.5"
          >
            <span aria-hidden className="h-px w-11 shrink-0 bg-gradient-to-r from-cyan to-violet" />
            <p className="font-body text-base font-medium text-ink sm:text-lg">
              {profile.roleShort} — <RotatingText words={profile.specialties} />
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-muted"
          >
            {profile.tagline} {profile.location.split(',').slice(0, 2).join(',')}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#experience"
              className="grad-bg flex items-center gap-2.5 rounded-full px-8 py-4 font-display text-[15px] font-semibold text-white shadow-[0_0_36px_rgba(139,92,246,0.35)]"
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 11 11 3M5 3h6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="flex items-center rounded-full border border-line-accent px-8 py-4 font-display text-[15px] font-medium text-ink transition-colors hover:bg-violet/10"
            >
              Get in Touch
            </MagneticButton>
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                data-cursor="OPEN"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-line-accent hover:bg-violet/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                    fill="currentColor"
                    className="text-muted"
                  />
                </svg>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                data-cursor="OPEN"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line transition-colors hover:border-line-accent hover:bg-violet/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-muted" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.22 8.16h4.56V23H.22V8.16Zm7.44 0h4.37v2.02h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.19h-4.55v-7.26c0-1.73-.03-3.96-2.41-3.96-2.42 0-2.79 1.89-2.79 3.84V23H7.66V8.16Z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: portraitY, opacity: fade }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto shrink-0 lg:mx-0"
        >
          <div aria-hidden className="absolute -inset-3 rounded-[36px] bg-[radial-gradient(circle,rgba(94,200,242,0.34),rgba(139,92,246,0.2)_55%,transparent_78%)] blur-lg" />
          <TiltCard strength={6} className="relative h-[420px] w-[330px] overflow-hidden rounded-[28px] border border-line-accent bg-surface sm:h-[470px] sm:w-[370px]">
            <img
              src="/assets/me/profile.webp"
              alt="Portrait of Brixsonn Romero"
              className="h-full w-full object-cover"
              draggable={false}
            />
            {/* melt the white studio backdrop into the void */}
            <div aria-hidden className="absolute inset-0 bg-violet/[0.07] mix-blend-multiply" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/85 via-bg/25 to-transparent" />
            <div className="glass absolute bottom-4 left-4 flex items-center gap-2.5 rounded-[14px] border border-line-accent px-4 py-3">
              <img src="/assets/me/lettermark.png" alt="" aria-hidden className="h-3 w-auto" />
              <span className="font-mono text-[11px] tracking-[0.14em] text-muted">AI NATIVE · FULL STACK</span>
            </div>
          </TiltCard>
          <span aria-hidden className="absolute -right-2 top-20 h-2.5 w-2.5 rounded-full bg-cyan" />
          <span aria-hidden className="absolute -left-3 top-40 h-1.5 w-1.5 rounded-full bg-violet" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="relative z-10 flex items-center gap-3 pb-8 pt-6"
        aria-hidden
      >
        <span className="font-mono text-[10px] tracking-[0.24em] text-faint">SCROLL</span>
        <motion.span
          className="h-px w-16 origin-left bg-gradient-to-r from-violet to-transparent"
          animate={{ scaleX: [0.3, 1, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
