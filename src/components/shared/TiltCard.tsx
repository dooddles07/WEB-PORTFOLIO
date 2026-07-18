import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** max tilt in degrees */
  strength?: number
}

/** 3D perspective tilt following the cursor, with a moving spotlight sheen */
export function TiltCard({ children, className, strength = 7 }: TiltCardProps) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 180, damping: 22 })
  const sy = useSpring(py, { stiffness: 180, damping: 22 })
  const rotateY = useTransform(sx, [0, 1], [-strength, strength])
  const rotateX = useTransform(sy, [0, 1], [strength, -strength])
  const sheenX = useTransform(sx, [0, 1], ['20%', '80%'])
  const sheenY = useTransform(sy, [0, 1], ['20%', '80%'])

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className="persp">
      <motion.div
        className={`group preserve-3d relative ${className ?? ''}`}
        style={reduce ? undefined : { rotateX, rotateY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [sheenX, sheenY],
              ([gx, gy]) =>
                `radial-gradient(420px circle at ${gx} ${gy}, rgba(139,92,246,0.14), transparent 65%)`,
            ),
          }}
        />
      </motion.div>
    </div>
  )
}
