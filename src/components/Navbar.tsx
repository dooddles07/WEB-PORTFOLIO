import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'
import { profile } from '../data/profile'

// labels mirror the section eyebrows exactly so the nav and the page agree
const links = [
  { label: 'CLIENT WORK', index: '01', href: '#experience', id: 'experience' },
  { label: 'PROJECTS', index: '02', href: '#projects', id: 'projects' },
  { label: 'CERTIFICATIONS', index: '03', href: '#certifications', id: 'certifications' },
  { label: 'CONTACT', index: '04', href: '#contact', id: 'contact' },
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
      className={`fixed inset-x-0 top-0 z-[80] border-b transition-colors duration-500 ${
        open
          ? 'border-line bg-bg'
          : scrolled
            ? 'border-line bg-bg/80 backdrop-blur-md'
            : 'border-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <nav className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
        <a
          href="#top"
          aria-label="Brixsonn Romero, back to top"
          className="display shrink-0 text-[22px] leading-none text-ink transition-colors hover:text-accent sm:text-[26px]"
        >
          Brixsonn <span className="display-italic">Romero</span>
        </a>

        <div className="hidden items-center gap-7 xl:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-current={active === link.id ? 'true' : undefined}
              className={`group relative flex items-baseline gap-1.5 py-1 font-mono text-[11px] tracking-[0.16em] transition-colors hover:text-ink ${
                active === link.id ? 'text-ink' : 'text-muted'
              }`}
            >
              <span className={active === link.id ? 'text-accent' : 'text-faint'}>{link.index}</span>
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-line-strong transition-transform duration-300 group-hover:scale-x-100"
              />
              {active === link.id && (
                <motion.span
                  aria-hidden
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 h-px w-full bg-accent"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </a>
          ))}
          <a
            href={profile.resume}
            download="Brixsonn-Romero-Resume.pdf"
            className="ml-1 flex items-center gap-2 rounded-full border border-line-strong px-5 py-2 font-mono text-[11px] tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            RESUME
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M6 1v7M3 5.5 6 8.5 9 5.5M2 11h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          className="flex flex-col gap-[5px] xl:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-line bg-bg xl:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col px-6 py-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-3 border-b border-line py-4 transition-colors last:border-0 hover:text-ink ${
                    active === link.id ? 'text-ink' : 'text-muted'
                  }`}
                >
                  <span className="mono-label text-accent">{link.index}</span>
                  <span className="display text-[clamp(1.6rem,7vw,2rem)]">{link.label}</span>
                </a>
              ))}
              <a
                href={profile.resume}
                download="Brixsonn-Romero-Resume.pdf"
                onClick={() => setOpen(false)}
                className="mt-5 mb-2 flex w-fit items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-mono text-[11px] tracking-[0.16em] text-ink"
              >
                RESUME
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M6 1v7M3 5.5 6 8.5 9 5.5M2 11h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
