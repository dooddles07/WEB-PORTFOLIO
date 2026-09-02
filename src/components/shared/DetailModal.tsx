import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'

interface DetailModalProps {
  onClose: () => void
  /** id of the heading inside `children` that names the dialog */
  labelledBy?: string
  /** skip the Escape handler while a nested Lightbox owns the key */
  suppressEsc?: boolean
  children: ReactNode
}

/** centered scrollable card: esc or backdrop closes. sits below the Lightbox (z-96). */
export function DetailModal({ onClose, labelledBy, suppressEsc = false, children }: DetailModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !suppressEsc) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, suppressEsc])

  return createPortal(
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="glass relative flex max-h-full w-full max-w-3xl flex-col rounded-2xl border border-line bg-surface shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="glass absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent/40"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="m2 2 10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div
            data-lenis-prevent
            className="overflow-y-auto overscroll-contain rounded-2xl p-6 sm:p-10"
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
