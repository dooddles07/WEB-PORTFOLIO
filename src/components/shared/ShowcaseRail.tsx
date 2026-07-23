import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion, type PanInfo } from 'framer-motion'

/** wrap index into [0, count) */
function wrap(count: number, v: number) {
  return ((v % count) + count) % count
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useLayoutEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

const BASE_SPRING = { type: 'spring', stiffness: 300, damping: 30, mass: 1 } as const
const TAP_SPRING = { type: 'spring', stiffness: 450, damping: 20, mass: 1 } as const

interface ShowcaseRailProps {
  images: string[]
  name: string
  paused?: boolean
  onOpen: (index: number) => void
}

/**
 * 3D focus rail: center screenshot in a perspective stage, neighbors rotated
 * into depth with blur falloff. Drag, swipe, horizontal wheel, arrows, keys.
 * Autoplays gently while in view. Click center opens the lightbox.
 */
export function ShowcaseRail({ images, name, paused = false, onOpen }: ShowcaseRailProps) {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { amount: 0.4 })
  const reduced = useReducedMotion()
  const isSm = useMediaQuery('(max-width: 640px)')
  const lastWheel = useRef(0)

  const count = images.length
  const activeIndex = wrap(count, active)

  const prev = useCallback(() => setActive((p) => p - 1), [])
  const next = useCallback(() => setActive((p) => p + 1), [])

  // gentle autoplay: only while visible, untouched, and motion is welcome
  useEffect(() => {
    if (paused || hovering || !inView || reduced) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, hovering, inView, reduced, next])

  // horizontal wheel / trackpad swipe only — vertical stays with the page
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      const now = Date.now()
      if (now - lastWheel.current < 400 || Math.abs(e.deltaX) < 20) return
      lastWheel.current = now
      if (e.deltaX > 0) next()
      else prev()
    },
    [next, prev],
  )

  const onDragEnd = useCallback(
    (_: unknown, { offset, velocity }: PanInfo) => {
      const power = Math.abs(offset.x) * velocity.x
      if (power < -8000) next()
      else if (power > 8000) prev()
    },
    [next, prev],
  )

  const cfg = isSm
    ? { cardW: 'min(84vw, 350px)', stageH: 300, xStep: 240, rotY: -26, zStep: -110 }
    : { cardW: '580px', stageH: 440, xStep: 400, rotY: -22, zStep: -170 }

  const offsets = count >= 5 ? [-2, -1, 0, 1, 2] : [-1, 0, 1]

  return (
    <div
      className="relative outline-none"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${name} screenshots`}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onWheel={onWheel}
    >
      {/* ambient glow from the active screenshot */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -inset-y-10 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-0 blur-3xl saturate-150"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-bg" />
      </div>

      {/* stage */}
      <motion.div
        ref={stageRef}
        data-cursor="DRAG"
        className="relative flex w-full cursor-grab items-center justify-center active:cursor-grabbing"
        style={{ height: cfg.stageH, perspective: 1200 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={onDragEnd}
      >
        {offsets.map((offset) => {
          const absIndex = active + offset
          const index = wrap(count, absIndex)
          const dist = Math.abs(offset)
          const isCenter = offset === 0

          return (
            <motion.div
              key={absIndex}
              className={`absolute overflow-hidden rounded-2xl border bg-[#0a0a12] shadow-2xl ${
                isCenter ? 'z-20 border-line-accent shadow-[0_30px_80px_-20px_rgba(139,92,246,0.35)]' : 'z-10 border-line'
              }`}
              style={{ width: cfg.cardW, aspectRatio: '16/10', transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{
                x: offset * cfg.xStep,
                z: reduced ? 0 : dist * cfg.zStep,
                rotateY: reduced ? 0 : offset * cfg.rotY,
                scale: isCenter ? 1 : 0.85,
                opacity: isCenter ? 1 : Math.max(0.18, 1 - dist * 0.45),
                filter: `blur(${isCenter ? 0 : dist * 5}px) brightness(${isCenter ? 1 : 0.55})`,
              }}
              transition={{
                x: BASE_SPRING,
                z: BASE_SPRING,
                rotateY: BASE_SPRING,
                scale: TAP_SPRING,
                opacity: { duration: 0.3 },
                filter: { duration: 0.3 },
              }}
              onTap={() => {
                if (isCenter) onOpen(index)
                else setActive((p) => p + offset)
              }}
            >
              {/* blurred fill behind, sharp contain in front: no screenshot ever crops */}
              <img
                src={images[index]}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-40 blur-xl"
                draggable={false}
              />
              <img
                src={images[index]}
                alt={`${name} screenshot ${index + 1}`}
                className="relative h-full w-full object-contain"
                loading={isCenter ? 'eager' : 'lazy'}
                draggable={false}
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent" />
            </motion.div>
          )
        })}
      </motion.div>

      {/* controls */}
      <div className="relative z-20 mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous screenshot"
          data-cursor="PREV"
          className="glass flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-accent"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="glass flex items-center gap-3 rounded-full border border-line px-4 py-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive((p) => p + (i - activeIndex))}
              aria-label={`Go to screenshot ${i + 1}`}
              className="group flex h-4 items-center"
            >
              <span
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-7 bg-cyan' : 'w-3 bg-line group-hover:bg-line-accent'
                }`}
              />
            </button>
          ))}
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted">
            {activeIndex + 1}/{count}
          </span>
        </div>

        <button
          onClick={next}
          aria-label="Next screenshot"
          data-cursor="NEXT"
          className="glass flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-accent"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
