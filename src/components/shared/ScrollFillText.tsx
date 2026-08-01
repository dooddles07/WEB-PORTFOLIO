import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Headline that inks in as it scrolls through the viewport: a dim base layer
 * sits under a full-strength copy revealed by clip-path.
 */
export function ScrollFillText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.38'] })
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])

  if (reduce) {
    return (
      <span className={className}>
        <span className="text-ink">{text}</span>
      </span>
    )
  }

  return (
    <span ref={ref} className={`relative inline-block ${className ?? ''}`}>
      <span className="text-ink/20">{text}</span>
      <motion.span aria-hidden className="absolute inset-0 text-ink" style={{ clipPath: clip }}>
        {text}
      </motion.span>
    </span>
  )
}
