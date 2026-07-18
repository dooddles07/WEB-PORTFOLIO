import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

const COLORS = ['94,200,242', '91,124,250', '139,92,246']

/**
 * 3D particle field: points live in a z-depth volume, projected onto the
 * canvas with perspective. Mouse steers the camera for parallax depth.
 */
export function ParticleField({ density = 110 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    const mouse = { x: 0, y: 0 }
    const cam = { x: 0, y: 0 }
    const FOV = 340
    const DEPTH = 600

    const particles: Particle[] = Array.from({ length: density }, () => ({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 1000,
      z: Math.random() * DEPTH,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      vz: (Math.random() - 0.5) * 0.35,
    }))

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function onMouse(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    function frame() {
      ctx!.clearRect(0, 0, width, height)
      // camera eases toward the cursor — the whole volume parallaxes in 3D
      cam.x += (mouse.x * 60 - cam.x) * 0.04
      cam.y += (mouse.y * 40 - cam.y) * 0.04

      const cx = width / 2
      const cy = height / 2

      for (const p of particles) {
        if (!reduce) {
          p.x += p.vx
          p.y += p.vy
          p.z += p.vz
          if (p.z < 0) p.z += DEPTH
          if (p.z > DEPTH) p.z -= DEPTH
          if (p.x < -800) p.x += 1600
          if (p.x > 800) p.x -= 1600
          if (p.y < -500) p.y += 1000
          if (p.y > 500) p.y -= 1000
        }

        const scale = FOV / (FOV + p.z)
        const sx = cx + (p.x - cam.x * (1 - p.z / DEPTH)) * scale
        const sy = cy + (p.y - cam.y * (1 - p.z / DEPTH)) * scale
        if (sx < -20 || sx > width + 20 || sy < -20 || sy > height + 20) continue

        const near = 1 - p.z / DEPTH
        const r = 0.6 + near * 1.7
        const alpha = 0.12 + near * 0.5
        const color = COLORS[Math.floor((p.z / DEPTH) * COLORS.length) % COLORS.length]

        ctx!.beginPath()
        ctx!.arc(sx, sy, r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${color},${alpha})`
        ctx!.fill()
      }

      raf = requestAnimationFrame(frame)
    }

    resize()
    frame()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
