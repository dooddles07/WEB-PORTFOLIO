import { profile } from '../data/profile'
import { experiences } from '../data/experience'
import { projects } from '../data/projects'
import { certifications } from '../data/certifications'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal, RevealWords } from './shared/Reveal'

/** counted from the data itself so the numbers can never drift from the page */
const stats = [
  { value: experiences.length, label: 'Client platforms' },
  { value: projects.length, label: 'Personal builds' },
  { value: certifications.length, label: 'Anthropic certs' },
]

export function About() {
  return (
    <section id="about" className="paper relative scroll-mt-16 px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="01" label="About" tone="paper" />

      <div className="mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <h2 className="display lg:col-span-7" style={{ fontSize: 'var(--text-step-4)' }}>
          <RevealWords text={profile.aboutHeadline} />
        </h2>

        <div className="lg:col-span-5 lg:pt-3">
          <Reveal y={24}>
            <p className="prose-body text-paper-muted">{profile.summary}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid items-end gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <Reveal y={32} className="lg:col-span-4">
          <figure className="flex flex-col gap-4">
            <img
              src="/assets/me/profile.webp"
              alt="Portrait of Brixsonn Romero"
              className="portrait-treat w-full max-w-[340px]"
              draggable={false}
            />
            <figcaption className="mono-label text-paper-muted">
              Brixsonn M. Romero — {profile.locationShort}
            </figcaption>
          </figure>
        </Reveal>

        {/* the boast gets its own air instead of being buried at the end of a paragraph */}
        <Reveal y={28} className="lg:col-span-7 lg:col-start-6">
          <blockquote className="border-t border-paper-line pt-8">
            <p className="display-italic leading-[1.1]" style={{ fontSize: 'var(--text-step-3)' }}>
              {profile.pullQuote}
            </p>
          </blockquote>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 border-t border-paper-line sm:grid-cols-3 lg:mt-20">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} y={20} delay={i * 0.08}>
            <div className="flex items-baseline gap-4 border-b border-paper-line py-6 sm:flex-col sm:items-start sm:gap-2 sm:border-b-0">
              <span className="display leading-none" style={{ fontSize: 'var(--text-step-3)' }}>
                {String(stat.value).padStart(2, '0')}
              </span>
              <span className="mono-label text-paper-muted">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
