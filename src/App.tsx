import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Preloader } from './components/Preloader'
import { CustomCursor } from './components/CustomCursor'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { TechStack } from './components/TechStack'
import { ExperienceSection } from './components/ExperienceSection'
import { ProjectsSection } from './components/ProjectsSection'
import { CertificationsSection } from './components/CertificationsSection'
import { EducationSection } from './components/EducationSection'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({ lerp: 0.1, anchors: true })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="grain">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Preloader onDone={() => setReady(true)} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      {/* sections mount only when the veil starts lifting, so entrance
          animations play in front of the visitor instead of behind the loader */}
      <main id="main" className="relative">
        {ready && (
          <>
            <Hero />
            <About />
            <TechStack />
            <ExperienceSection />
            <ProjectsSection />
            <CertificationsSection />
            <EducationSection />
            <Contact />
            <Footer />
          </>
        )}
      </main>
    </div>
  )
}
