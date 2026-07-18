import { profile } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'

export function EducationSection() {
  const { education } = profile

  return (
    <section id="education" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-14 lg:py-28">
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <div className="flex w-full flex-col gap-6 lg:w-[420px] lg:shrink-0">
          <SectionHeader index="06" label="EDUCATION" />
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Cum Laude,
              <br />
              Computer Science.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-1 flex-col">
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-7">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-[22px] font-semibold text-ink">{education.degree}</h3>
                <span className="text-sm text-muted">{education.school}</span>
              </div>
              <span className="font-mono text-xs tracking-[0.12em] text-cyan">{education.years}</span>
            </div>
          </Reveal>

          {education.honors.map((honor, i) => (
            <Reveal key={honor.title} delay={0.2 + i * 0.08}>
              <div
                className={`flex items-center justify-between py-5.5 ${
                  i < education.honors.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                <span className="text-[15px] font-medium text-ink">{honor.title}</span>
                <span className="font-mono text-xs text-faint">{honor.years}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
