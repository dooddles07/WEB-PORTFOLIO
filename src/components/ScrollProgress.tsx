import { motion, useScroll, useSpring } from 'framer-motion'

/** gradient hairline pinned to the top edge, tracking scroll depth */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[85] h-[2px] origin-left bg-gradient-to-r from-cyan via-blue to-violet"
      style={{ scaleX }}
    />
  )
}
