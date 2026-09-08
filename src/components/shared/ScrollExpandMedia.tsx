import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { lenisRef } from '../../lenis'

interface ScrollExpandMediaProps {
  mediaSrc: string
  alt: string
  title: string
  eyebrow?: string
  hint?: string
}

/*
 * Scroll-expand intro. The plate starts as a small portrait card and grows to
 * fill the viewport as the wheel is turned, while the two halves of the title
 * slide apart around it.
 *
 * This pins the page instead of scrolling it, which makes it the one place on
 * the site that has to take scroll away from the visitor. Two consequences are
 * handled here rather than left to the caller: Lenis is paused for the
 * duration (it drives scrollY from its own rAF loop and would otherwise fight
 * the preventDefault below), and anyone on reduced motion or navigating by
 * keyboard is handed the finished state immediately rather than being made to
 * perform a gesture they may not be able to perform.
 */
export function ScrollExpandMedia({ mediaSrc, alt, title, eyebrow, hint }: ScrollExpandMediaProps) {
  const reduce = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // handlers read these so the listeners below can register once, instead of
  // being torn down and rebuilt on every wheel tick
  const progressRef = useRef(0)
  const expandedRef = useRef(false)
  const touchStartY = useRef(0)

  useEffect(() => {
    if (!reduce) return
    progressRef.current = 1
    expandedRef.current = true
    setProgress(1)
    setExpanded(true)
  }, [reduce])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // hand scroll back to Lenis the moment the plate is open, and on unmount
  useEffect(() => {
    if (expanded || reduce) {
      lenisRef.current?.start()
      return
    }
    lenisRef.current?.stop()
    return () => lenisRef.current?.start()
  }, [expanded, reduce])

  useEffect(() => {
    if (reduce) return

    const commit = (next: number) => {
      const clamped = Math.min(Math.max(next, 0), 1)
      progressRef.current = clamped
      setProgress(clamped)
      if (clamped >= 1) {
        expandedRef.current = true
        setExpanded(true)
      }
    }

    const collapse = () => {
      expandedRef.current = false
      setExpanded(false)
    }

    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          collapse()
          e.preventDefault()
        }
        return
      }
      e.preventDefault()
      commit(progressRef.current + e.deltaY * 0.0009)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return
      const y = e.touches[0].clientY
      const delta = touchStartY.current - y

      if (expandedRef.current) {
        if (delta < -20 && window.scrollY <= 5) {
          collapse()
          e.preventDefault()
        }
        return
      }
      e.preventDefault()
      // scrolling back up wants more sensitivity than scrolling down, or the
      // plate feels stuck once it is most of the way open
      commit(progressRef.current + delta * (delta < 0 ? 0.008 : 0.005))
      touchStartY.current = y
    }

    const onTouchEnd = () => {
      touchStartY.current = 0
    }

    // the page is pinned rather than scrolled while the plate is opening
    const onScroll = () => {
      if (!expandedRef.current) window.scrollTo(0, 0)
    }

    // keyboard bypass: the first Tab, Enter, Space or downward key opens the
    // plate outright, so nobody is trapped behind a wheel gesture
    const onKeyDown = (e: KeyboardEvent) => {
      if (expandedRef.current) return
      if (['Tab', 'Enter', ' ', 'ArrowDown', 'PageDown', 'End'].includes(e.key)) commit(1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [reduce])

  const width = 300 + progress * (isMobile ? 650 : 1250)
  const height = 400 + progress * (isMobile ? 200 : 400)
  const shift = progress * (isMobile ? 180 : 150)

  const [firstWord, ...rest] = title.split(' ')

  return (
    <section
      aria-label={title}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-x-hidden"
    >
      <div
        className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '95vw', maxHeight: '85vh' }}
      >
        <img src={mediaSrc} alt={alt} className="h-full w-full object-cover" draggable={false} />
        <motion.div
          className="absolute inset-0 bg-bg"
          initial={false}
          animate={{ opacity: 0.55 - progress * 0.3 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center gap-4 text-center mix-blend-difference">
        <h2 className="display leading-none text-ink" style={{ fontSize: 'var(--text-step-4)', transform: `translateX(-${shift}vw)` }}>
          {firstWord}
        </h2>
        <h2
          className="display-italic leading-none text-ink"
          style={{ fontSize: 'var(--text-step-4)', transform: `translateX(${shift}vw)` }}
        >
          {rest.join(' ')}
        </h2>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2">
        {eyebrow && (
          <span className="mono-label text-faint" style={{ transform: `translateX(-${shift}vw)` }}>
            {eyebrow}
          </span>
        )}
        {hint && (
          <motion.span
            className="mono-label text-muted"
            style={{ transform: `translateX(${shift}vw)` }}
            animate={{ opacity: expanded ? 0 : 1 }}
          >
            {hint}
          </motion.span>
        )}
      </div>
    </section>
  )
}
