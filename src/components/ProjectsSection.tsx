import { projects, miniProjects, type Project } from '../data/projects'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { ScrollFillText } from './shared/ScrollFillText'
import { TiltCard } from './shared/TiltCard'

function Badge({ project }: { project: Project }) {
  if (project.badgeStyle === 'live') {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-green-400/40 bg-green-400/10 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-green-400">
        <span aria-hidden className="h-1 w-1 rounded-full bg-green-400" />
        {project.badge}
      </span>
    )
  }
  const tone = project.badgeStyle === 'cyan' ? 'border-cyan/30 text-cyan' : 'border-line-accent text-violet'
  return (
    <span className={`rounded-full border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] ${tone}`}>
      {project.badge}
    </span>
  )
}

function CardLinks({ project }: { project: Project }) {
  return (
    <div className="mt-1 flex items-center gap-5">
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN"
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-cyan transition-colors hover:text-ink"
        >
          VISIT LIVE SITE
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 9.5 9.5 2.5M4.5 2.5h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN"
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-muted transition-colors hover:text-ink"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
              fill="currentColor"
            />
          </svg>
          CODE
        </a>
      )}
    </div>
  )
}

function ShotLink({ project, className }: { project: Project; className: string }) {
  const image = (
    <img
      src={project.image}
      alt={`${project.name} screenshot`}
      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      loading="lazy"
      draggable={false}
    />
  )
  return project.link ? (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit the live site of ${project.name}`}
      data-cursor="VIEW"
      className={className}
    >
      {image}
    </a>
  ) : (
    <div className={className}>{image}</div>
  )
}

/** wide spotlight card for the flagship project */
function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal y={50}>
      <TiltCard strength={4} className="flex flex-col overflow-hidden rounded-[22px] border border-line-accent bg-surface lg:flex-row">
        <ShotLink project={project} className="relative block aspect-[16/9] w-full overflow-hidden bg-[#0a0a12] lg:aspect-auto lg:w-[58%] lg:shrink-0" />
        <div className="flex flex-1 flex-col justify-center gap-4 p-8 lg:p-10">
          <span className="font-mono text-[11px] tracking-[0.2em] text-cyan">FEATURED BUILD</span>
          <div className="flex items-center gap-4">
            <h3 className="font-display text-[30px] font-bold tracking-tight text-ink">{project.name}</h3>
            <Badge project={project} />
          </div>
          <p className="text-sm leading-[1.8] text-muted">{project.description}</p>
          <span className="font-mono text-[11px] text-faint">{project.stack}</span>
          <CardLinks project={project} />
        </div>
      </TiltCard>
    </Reveal>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay} className="flex-1" y={50}>
      <TiltCard strength={8} className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line-accent bg-surface">
        <ShotLink project={project} className="relative block aspect-[421/250] w-full overflow-hidden bg-[#0a0a12]" />
        <div className="flex flex-1 flex-col gap-3 p-7">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[22px] font-bold tracking-tight text-ink">{project.name}</h3>
            <Badge project={project} />
          </div>
          <p className="flex-1 text-[13px] leading-[1.7] text-muted">{project.description}</p>
          <span className="font-mono text-[11px] text-faint">{project.stack}</span>
          <CardLinks project={project} />
        </div>
      </TiltCard>
    </Reveal>
  )
}

export function ProjectsSection() {
  const featured = projects.find((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="relative scroll-mt-16 overflow-hidden border-t border-line px-6 py-24 sm:px-14 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-64 bottom-0 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_70%)]" />

      <div className="relative">
        <SectionHeader index="04" label="PERSONAL PROJECTS" />
        <h2 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          <ScrollFillText text="Built on my own time." />
        </h2>

        <div className="mt-14 flex flex-col gap-6">
          {featured && <FeaturedCard project={featured} />}
          <div className="flex flex-col gap-6 lg:flex-row">
            {rest.map((project, i) => (
              <ProjectCard key={project.name} project={project} delay={i * 0.12} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.2em] text-faint">MORE BUILDS</span>
          </Reveal>
          <div className="mt-4 flex flex-col">
            {miniProjects.map((mini, i) => (
              <Reveal key={mini.name} delay={i * 0.08}>
                <div className={`flex flex-col gap-1.5 py-5 sm:flex-row sm:items-center sm:justify-between ${i < miniProjects.length - 1 ? 'border-b border-line' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg font-semibold text-ink">{mini.name}</span>
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-faint">
                      {mini.tag}
                    </span>
                  </div>
                  <span className="max-w-[520px] text-[13px] leading-relaxed text-muted">{mini.description}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
