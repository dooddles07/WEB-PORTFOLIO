import { techStack, techStack2 } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'

const dotColors = ['bg-cyan', 'bg-blue', 'bg-violet']

function Chip({ label, highlight, index }: { label: string; highlight?: boolean; index: number }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-3 ${
        highlight ? 'border-line-accent bg-violet/5' : 'border-line bg-surface'
      }`}
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dotColors[index % 3]}`} />
      <span className="font-display text-sm font-medium text-ink">{label}</span>
    </div>
  )
}

/** two counter-scrolling infinite rows; duplicated lists make the loop seamless */
export function TechMarquee() {
  return (
    <section className="overflow-hidden pb-24 lg:pb-28">
      <div className="px-6 sm:px-14">
        <SectionHeader index="02" label="TECH STACK" />
      </div>

      <div className="marquee-track marquee-mask mt-10 flex flex-col gap-4" aria-label="Technologies I work with">
        <div className="flex w-max gap-4 marquee-left">
          {techStack.map((tech, i) => (
            <Chip key={tech} label={tech} index={i} />
          ))}
          {/* clone half only exists to make the loop seamless */}
          <div aria-hidden className="flex gap-4">
            {techStack.map((tech, i) => (
              <Chip key={`clone-${tech}`} label={tech} index={i} />
            ))}
          </div>
        </div>
        <div className="flex w-max gap-4 marquee-right">
          {techStack2.map((tech, i) => (
            <Chip key={tech} label={tech} highlight={tech === 'Claude Code'} index={i} />
          ))}
          <div aria-hidden className="flex gap-4">
            {techStack2.map((tech, i) => (
              <Chip key={`clone-${tech}`} label={tech} highlight={tech === 'Claude Code'} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
