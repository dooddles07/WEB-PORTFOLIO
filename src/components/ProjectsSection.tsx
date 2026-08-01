import { useState } from 'react'
import { projects, type Project } from '../data/projects'
import { SectionHeader } from './shared/SectionHeader'
import { Reveal } from './shared/Reveal'
import { ScrollFillText } from './shared/ScrollFillText'
import { ShowcaseRail } from './shared/ShowcaseRail'
import { Lightbox } from './shared/Lightbox'

function Badge({ project }: { project: Project }) {
  return (
    <span className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-muted">
      {project.badge}
    </span>
  )
}

/** deployment state chip: green LIVE when shipped, amber IN PROGRESS while still building */
function StatusChip({ status }: { status: 'live' | 'in-progress' }) {
  const live = status === 'live'
  const tone = live
    ? 'border-green-400/40 bg-green-400/10 text-green-400'
    : 'border-amber-400/40 bg-amber-400/10 text-amber-400'
  const dot = live ? 'bg-green-400' : 'bg-amber-400'
  return (
    <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] ${tone}`}>
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`} />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dot}`} />
      </span>
      {live ? 'LIVE' : 'IN PROGRESS'}
    </span>
  )
}

function CardLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-5">
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          data-cursor="OPEN"
          className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.1em] text-accent transition-colors hover:text-ink"
        >
          {project.status === 'in-progress' ? 'VISIT PREVIEW' : 'VISIT LIVE SITE'}
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

/** immersive stage: 3D screenshot rail on top, project identity below */
function ProjectStage({
  project,
  onOpenGallery,
  galleryOpen,
}: {
  project: Project
  onOpenGallery: (project: Project, index: number) => void
  galleryOpen: boolean
}) {
  const shots = project.images ?? [project.image]

  return (
    <Reveal y={60}>
      <div className="relative">
        <ShowcaseRail
          images={shots}
          name={project.name}
          paused={galleryOpen}
          onOpen={(index) => onOpenGallery(project, index)}
        />

        <div className="mx-auto mt-12 max-w-5xl border-t border-line pt-8">
          {project.featured && (
            <span className="mono-label mb-4 block text-accent">Featured build</span>
          )}
          <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-14">
            <div className="flex max-w-2xl flex-col gap-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <h3 className="display leading-none text-ink" style={{ fontSize: 'var(--text-step-3)' }}>
                  {project.name}
                </h3>
                <Badge project={project} />
                {project.link && <StatusChip status={project.status ?? 'live'} />}
              </div>
              <p className="prose-body text-muted">{project.description}</p>
            </div>

            <div className="flex shrink-0 flex-col gap-4 lg:items-end lg:text-right">
              <span className="mono-label text-faint">
                {String(shots.length).padStart(2, '0')} screens · drag to explore
              </span>
              <CardLinks project={project} />
              <span className="max-w-[26ch] font-mono text-[11px] leading-relaxed text-faint">
                {project.stack}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function ProjectsSection() {
  const featured = projects.find((project) => project.featured)
  const rest = projects.filter((project) => !project.featured)
  const ordered = featured ? [featured, ...rest] : rest
  const [gallery, setGallery] = useState<{ project: Project; index: number } | null>(null)

  return (
    <section id="projects" className="relative scroll-mt-16 overflow-hidden border-t border-line px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
      <SectionHeader index="05" label="Personal projects" />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <h2 className="display lg:col-span-7" style={{ fontSize: 'var(--text-step-4)' }}>
          <ScrollFillText text="Built on my own time." />
        </h2>
        <Reveal delay={0.12} y={16} className="lg:col-span-5 lg:pt-3">
          <p className="prose-body text-muted">
            Nobody asked for these. I built them to find out whether I could, and where something
            is unfinished the site says so instead of hiding it.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 flex flex-col gap-28 lg:gap-36">
        {ordered.map((project) => (
          <ProjectStage
            key={project.name}
            project={project}
            galleryOpen={gallery?.project.name === project.name}
            onOpenGallery={(p, index) => setGallery({ project: p, index })}
          />
        ))}
      </div>

      {gallery && (
        <Lightbox
          images={(gallery.project.images ?? [gallery.project.image]).map((src, i) => ({
            src,
            alt: `${gallery.project.name} screenshot ${i + 1}`,
          }))}
          index={gallery.index}
          onClose={() => setGallery(null)}
          onNavigate={(index) => setGallery({ project: gallery.project, index })}
        />
      )}
    </section>
  )
}
