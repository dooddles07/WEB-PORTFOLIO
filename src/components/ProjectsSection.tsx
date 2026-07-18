import { projects, type Project } from '../data/projects'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal, RevealWords } from './shared/Reveal'
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

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const card = (
    <TiltCard
      strength={8}
      className={`flex h-full flex-col overflow-hidden rounded-[20px] border bg-surface transition-colors ${
        project.link ? 'border-line-accent' : 'border-line hover:border-line-accent'
      }`}
    >
      <div className="relative aspect-[421/250] w-full overflow-hidden bg-[#0a0a12]">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-[22px] font-bold tracking-tight text-ink">{project.name}</h3>
          <Badge project={project} />
        </div>
        <p className="flex-1 text-[13px] leading-[1.7] text-muted">{project.description}</p>
        <span className="font-mono text-[11px] text-faint">{project.stack}</span>
        {project.link && (
          <span className="mt-1 flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-cyan">
            VISIT LIVE SITE
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 9.5 9.5 2.5M4.5 2.5h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </TiltCard>
  )

  return (
    <Reveal delay={delay} className="flex-1" y={50}>
      {project.link ? (
        <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`} className="block h-full">
          {card}
        </a>
      ) : (
        card
      )}
    </Reveal>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-line px-6 py-24 sm:px-14 lg:py-28">
      <SectionHeader index="04" label="PERSONAL PROJECTS" />
      <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        <RevealWords text="Built on my own time." />
      </h2>

      <div className="mt-14 flex flex-col gap-6 lg:flex-row">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} delay={i * 0.12} />
        ))}
      </div>
    </section>
  )
}
