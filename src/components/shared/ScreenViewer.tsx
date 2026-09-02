import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

interface ScreenViewerProps {
  images: string[]
  name: string
  onOpen: (index: number) => void
}

/**
 * Contained screenshot viewer: fits its column, cross-fades through the set,
 * hover reveals prev/next, click opens the full-size Lightbox. Used inside the
 * project and client-work detail modals.
 */
export function ScreenViewer({ images, name, onOpen }: ScreenViewerProps) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const many = images.length > 1

  useEffect(() => {
    if (!many || paused || reduce) return
    const timer = setInterval(() => setActive((current) => (current + 1) % images.length), 4000)
    return () => clearInterval(timer)
  }, [many, paused, reduce, images.length])

  return (
    <div
      role="region"
      aria-label={`${name} screenshots`}
      className="w-full overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div
        className="group/shot relative aspect-[16/10] w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          onClick={() => onOpen(active)}
          data-cursor="VIEW"
          aria-label={`Open ${name} screenshots full size`}
          className="absolute inset-0 z-10"
        />
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${name} screenshot ${active + 1}`}
            className="absolute inset-0 h-full w-full object-contain"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>
        {many && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length) }}
              aria-label={`Previous ${name} screenshot`}
              className="glass absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length) }}
              aria-label={`Next ${name} screenshot`}
              className="glass absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
      {many && (
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-line py-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show ${name} screenshot ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === active ? 'w-6 bg-accent' : 'w-1 bg-faint hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
