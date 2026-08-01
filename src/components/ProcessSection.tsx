import { workflow } from '../data/profile'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { ScrollFillText } from './shared/ScrollFillText'

/**
 * The answer to "did you actually build this, or did AI?". Speed comes from
 * step three; everything either side of it is why the output holds up.
 */
export function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-16 border-t border-line px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="03" label="How I work" />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <h2 className="display lg:col-span-7" style={{ fontSize: 'var(--text-step-4)' }}>
          <ScrollFillText text="Nothing ships because it looks finished." />
        </h2>
        <Reveal delay={0.12} y={16} className="lg:col-span-5 lg:pt-3">
          <p className="prose-body text-muted">
            Same nine steps on every build, client work or my own. The writing part is fast now.
            The deciding, checking and breaking parts are still mine, and they are what the job
            actually is.
          </p>
        </Reveal>
      </div>

      <ol className="mt-16 lg:mt-20">
        {workflow.map((step, i) => (
          <Reveal key={step.name} y={24} delay={(i % 3) * 0.06}>
            <li className="grid gap-3 border-t border-line py-7 lg:grid-cols-12 lg:items-baseline lg:gap-10">
              <div className="flex items-baseline gap-5 lg:col-span-4">
                <span className="display leading-none text-faint" style={{ fontSize: 'var(--text-step-2)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display leading-none text-ink" style={{ fontSize: 'var(--text-step-2)' }}>
                  {step.name}
                </h3>
              </div>
              <p className="max-w-[62ch] text-[15px] leading-[1.75] text-muted lg:col-span-8">
                {step.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
