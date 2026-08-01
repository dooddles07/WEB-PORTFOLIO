import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  /** true, or a filename to save the download as */
  download?: boolean | string
  className?: string
  onClick?: () => void
  external?: boolean
  /** label the custom cursor morphs into over this control */
  'data-cursor'?: string
}

/** button that leans toward the cursor within its hover radius */
export function MagneticButton({
  children,
  href,
  download,
  className,
  onClick,
  external,
  'data-cursor': dataCursor,
}: MagneticButtonProps) {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  function handleMove(e: MouseEvent<HTMLElement>) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.28)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.28)
  }

  function handleLeave() {
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.button

  return (
    <Tag
      href={href}
      download={download}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      data-cursor={dataCursor}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </Tag>
  )
}
