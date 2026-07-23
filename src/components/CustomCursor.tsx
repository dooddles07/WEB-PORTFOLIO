import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Gradient dot + trailing ring. Over elements tagged data-cursor="VIEW|OPEN|COPY"
 * the ring morphs into a labelled pill; over plain links it just grows.
 * While active, index.css hides the native cursor via .has-custom-cursor.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 520, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 520, damping: 32, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    function onMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target as HTMLElement
      const labelled = target.closest('[data-cursor]') as HTMLElement | null
      setLabel(labelled?.dataset.cursor ?? null)
      setHovering(Boolean(labelled || target.closest('a, button')))
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full grad-bg"
        style={{ x, y }}
        animate={{ opacity: label ? 0 : 1 }}
        transition={{ duration: 0.1 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border border-violet/50"
        style={{ x: ringX, y: ringY }}
        animate={
          label
            ? { width: 64, height: 64, opacity: 1, backgroundColor: 'rgba(139,92,246,0.92)', borderColor: 'rgba(139,92,246,0)' }
            : {
                width: hovering ? 52 : 34,
                height: hovering ? 52 : 34,
                opacity: hovering ? 0.9 : 0.5,
                backgroundColor: 'rgba(139,92,246,0)',
                borderColor: 'rgba(139,92,246,0.5)',
              }
        }
        transition={{ duration: 0.14 }}
      >
        {label && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-white">{label}</span>
        )}
      </motion.div>
    </>
  )
}
