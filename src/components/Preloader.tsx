import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const DURATION = 1100

/** counter 0→100 driven by elapsed time, then the veil slides away */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)
  const [gone, setGone] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (reduce) {
      setCount(100)
      setGone(true)
      doneRef.current()
      return
    }
    const start = performance.now()
    let raf = 0
    let exitTimer = 0
    const frame = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION)
      // ease-out so the last digits land softly
      setCount(Math.round((1 - Math.pow(1 - p, 2.2)) * 100))
      if (p < 1) {
        raf = requestAnimationFrame(frame)
      } else {
        exitTimer = window.setTimeout(() => {
          setGone(true)
          doneRef.current()
        }, 300)
      }
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(exitTimer)
    }
  }, [reduce])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-between bg-bg px-6 pb-6 sm:px-14 sm:pb-10"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col gap-3">
            <motion.img
              src="/assets/me/lettermark.png"
              alt="QUAN7UM"
              className="h-3.5 w-auto sm:h-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            />
            <span className="mono-label text-faint">PORTFOLIO — 2026</span>
          </div>
          <span className="font-display text-7xl font-bold tabular-nums leading-none tracking-tight text-ink sm:text-9xl">
            {count}
            <span className="grad-text">%</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
