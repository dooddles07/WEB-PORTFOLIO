import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'

const links = [
  { label: 'ABOUT', href: '#about', id: 'about' },
  { label: 'EXPERIENCE', href: '#experience', id: 'experience' },
  { label: 'PROJECTS', href: '#projects', id: 'projects' },
  { label: 'CERTIFICATIONS', href: '#certifications', id: 'certifications' },
  { label: 'CONTACT', href: '#contact', id: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))

  // watch section positions; the section crossing the upper third wins.
  // sections mount after the preloader, so keep retrying until they exist
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let retry = 0

    const connect = () => {
      const sections = links
        .map((link) => document.getElementById(link.id))
        .filter((el): el is HTMLElement => Boolean(el))
      if (sections.length < links.length) {
        retry = window.setTimeout(connect, 400)
        return
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(entry.target.id)
          }
        },
        { rootMargin: '-30% 0px -60% 0px' },
      )
      sections.forEach((section) => observer!.observe(section))
    }
    connect()

    return () => {
      clearTimeout(retry)
      observer?.disconnect()
    }
  }, [])

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-[80] border-b transition-colors duration-300 ${
        open ? 'border-line bg-[#07070d]' : scrolled ? 'glass border-line' : 'border-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <nav className="flex items-center justify-between px-6 py-5 sm:px-14">
        <a href="#top" aria-label="QUAN7UM, back to top">
          <img src="/assets/me/lettermark.png" alt="QUAN7UM" className="h-3.5 w-auto sm:h-[18px]" />
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={active === link.id ? 'true' : undefined}
              className={`group relative py-1 font-mono text-xs tracking-[0.16em] transition-colors hover:text-ink ${
                active === link.id ? 'text-ink' : 'text-muted'
              }`}
            >
              {link.label}
              {/* hover underline for inactive links */}
              <span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-muted/60 transition-transform duration-300 group-hover:scale-x-100"
              />
              {/* gradient underline slides between active links */}
              {active === link.id && (
                <motion.span
                  aria-hidden
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-gradient-to-r from-cyan to-violet"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </a>
          ))}
          <a
            href={profile.resume}
            download="Brixsonn-Romero-Resume.pdf"
            className="grad-bg flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-[13px] font-semibold text-white transition-transform hover:scale-105"
          >
            Resume
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M6 1v7M3 5.5 6 8.5 9 5.5M2 11h8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          className="flex flex-col gap-[5px] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 grad-bg transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-0.5 w-4 bg-muted transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-muted transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-line bg-[#07070d] lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 font-mono text-sm tracking-[0.16em] transition-colors hover:text-ink ${
                    active === link.id ? 'text-ink' : 'text-muted'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={profile.resume}
                download="Brixsonn-Romero-Resume.pdf"
                className="grad-bg mt-2 flex w-fit items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold text-white"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
