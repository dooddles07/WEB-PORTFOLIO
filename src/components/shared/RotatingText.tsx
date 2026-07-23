import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/* Cycles through words with a spring slide-up, brand gradient on the active word. */
export function RotatingText({
  words,
  interval = 2600,
  className = '',
}: {
  words: string[]
  interval?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setIndex((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [reduce, words.length, interval])

  if (reduce) return <span className={className}>{words.join(', ')}</span>

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      <span className="sr-only">{words.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="grad-text col-start-1 row-start-1 whitespace-nowrap font-semibold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
