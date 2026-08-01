import { profile } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'

export function EducationSection() {
  const { education } = profile

  return (
    <section id="education" className="scroll-mt-16 border-t border-line px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="06" label="Education" />

      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.1} className="lg:col-span-5">
          <h2 className="display" style={{ fontSize: 'var(--text-step-4)' }}>
            Cum Laude,
            <br />
            <span className="display-italic text-accent">Computer Science.</span>
          </h2>
        </Reveal>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7 lg:pt-2">
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-start justify-between gap-3 border-t border-line py-6">
              <div className="flex flex-col gap-1.5">
                <h3 className="display leading-tight text-ink" style={{ fontSize: 'var(--text-step-2)' }}>
                  {education.degree}
                </h3>
                <span className="text-sm text-muted">{education.school}</span>
              </div>
              <span className="mono-label shrink-0 text-accent">{education.years}</span>
            </div>
          </Reveal>

          {education.honors.map((honor, i) => (
            <Reveal key={honor.title} delay={0.2 + i * 0.08}>
              <div className="flex items-center justify-between gap-4 border-t border-line py-5">
                <span className="text-[15px] text-ink">{honor.title}</span>
                <span className="mono-label shrink-0 text-faint">{honor.years}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
