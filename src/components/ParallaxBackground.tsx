import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'

/*
 * Subterranean scene stack. Four cave plates sit fixed behind the whole page
 * and cross-fade against document scroll, each drifting a few percent through
 * its own window — the background moves ~6% of the viewport while the content
 * moves its full height, which is what reads as depth.
 */
const scenes = [
  '/assets/bg/scene1.webp',
  '/assets/bg/scene2.webp',
  '/assets/bg/scene3.webp',
  '/assets/bg/scene4.webp',
]

const band = 1 / (scenes.length - 1)

function Scene({ src, index, progress }: { src: string; index: number; progress: MotionValue<number> }) {
  const center = index * band
  const isFirst = index === 0
  const isLast = index === scenes.length - 1

  /*
   * Every stop has to stay inside [0,1] and keep increasing: these feed
   * straight through to WAAPI keyframe offsets, which reject anything else and
   * take the whole render down with them. The end plates therefore ramp on one
   * side only instead of using a symmetric window around their centre.
   */
  const opacityStops = isFirst ? [0, band] : isLast ? [1 - band, 1] : [center - band, center, center + band]
  const opacityOut = isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 0]

  const opacity = useTransform(progress, opacityStops, opacityOut, { clamp: true })
  const y = useTransform(
    progress,
    [Math.max(0, center - band), Math.min(1, center + band)],
    ['-3%', '3%'],
    { clamp: true },
  )

  return (
    <motion.div
      aria-hidden
      className="absolute -inset-[8%] bg-cover bg-center"
      style={{ backgroundImage: `url(${src})`, opacity, y }}
    />
  )
}

export function ParallaxBackground() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {reduce ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${scenes[0]})`, opacity: 0.62 }}
        />
      ) : (
        <div className="absolute inset-0" style={{ opacity: 0.62 }}>
          {scenes.map((src, i) => (
            <Scene key={src} src={src} index={i} progress={scrollYProgress} />
          ))}
        </div>
      )}

      {/* scrim: the plates are dark already, but body copy still has to clear
          4.5:1 over the brightest mineral areas near the frame edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(11,10,10,0.78) 0%, rgba(11,10,10,0.58) 35%, rgba(11,10,10,0.58) 65%, rgba(11,10,10,0.88) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(11,10,10,0.42), transparent 75%)' }}
      />
    </div>
  )
}
