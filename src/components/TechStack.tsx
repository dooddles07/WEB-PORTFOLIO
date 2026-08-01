import { techGroups } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'

/**
 * Grouped, static, readable. The old scrolling marquee looked busy and clipped
 * chip labels mid-word at both edges; a reader scanning for "does he know Postgres"
 * can now actually find the answer.
 */
export function TechStack() {
  return (
    <section className="relative border-t border-line px-6 py-20 sm:px-10 lg:px-14 lg:py-24">
      <SectionHeader index="02" label="Stack" />

      <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {techGroups.map((group, i) => (
          <Reveal key={group.label} y={24} delay={i * 0.06}>
            <div className="flex flex-col gap-4 border-t border-line pt-5">
              <span className="mono-label text-accent">{group.label}</span>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[15px] leading-snug text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
