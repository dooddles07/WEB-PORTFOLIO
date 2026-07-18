import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface LightboxProps {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

/** full screen viewer: esc or backdrop closes, arrows and keys navigate */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const count = images.length
  const current = images[index]

  const prev = useCallback(() => onNavigate((index - 1 + count) % count), [index, count, onNavigate])
  const next = useCallback(() => onNavigate((index + 1) % count), [index, count, onNavigate])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && count > 1) prev()
      if (e.key === 'ArrowRight' && count > 1) next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next, count])

  if (!current) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={current.alt}
        className="fixed inset-0 z-[96] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="max-h-full max-w-full rounded-xl border border-line-accent object-contain shadow-[0_0_80px_rgba(139,92,246,0.25)]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        />

        <button
          onClick={onClose}
          aria-label="Close viewer"
          className="glass absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-accent"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="m2 2 10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {count > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous image"
              className="glass absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-accent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next image"
              className="glass absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-accent"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="glass absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-line px-4 py-1.5 font-mono text-xs text-muted">
              {index + 1} / {count}
            </span>
          </>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
