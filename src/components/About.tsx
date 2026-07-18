import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal, RevealWords } from './shared/Reveal'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-16 overflow-hidden border-t border-line px-6 py-24 sm:px-14 lg:py-28">
      {/* the brand 7, hollow, anchoring the quiet corner of the section */}
      <span
        aria-hidden
        className="stroke-text pointer-events-none absolute -bottom-24 left-2 hidden select-none font-display text-[420px] font-bold leading-none lg:block"
      >
        7
      </span>

      <SectionHeader index="01" label="ABOUT" />

      <div className="relative mt-12 flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-20">
        <h2 className="max-w-[560px] shrink-0 font-display text-[28px] font-semibold leading-[1.3] tracking-tight text-ink sm:text-[34px]">
          <RevealWords text={profile.aboutHeadline} />
        </h2>

        <div className="flex max-w-[640px] flex-col gap-10">
          <Reveal delay={0.15}>
            <p className="text-[15px] leading-[1.8] text-muted">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="flex border-t border-line">
              {profile.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col gap-1.5 pt-6 ${i === 0 ? 'pr-4 sm:pr-8' : 'border-l border-line px-4 sm:px-8'}`}
                >
                  <motion.span
                    className="grad-text font-display text-4xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
