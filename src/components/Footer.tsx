import { useEffect, useState } from 'react'

function useNagaTime() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-PH', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    const tick = () => setTime(format.format(new Date()))
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])
  return time
}

export function Footer() {
  const time = useNagaTime()

  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-line px-6 py-7 lg:flex-row sm:px-14">
      <div className="flex items-center gap-5">
        <img src="/assets/me/lettermark.png?v=2" alt="QUAN7UM" className="h-3 w-auto" />
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted" aria-label="Local time in Naga City">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
          NAGA CITY {time} GMT+8
        </span>
      </div>
      <span className="font-mono text-[11px] tracking-[0.1em] text-faint">
        © 2026 BRIXSONN M. ROMERO. BUILT WITH REACT AND CLAUDE CODE
      </span>
      <a
        href="#top"
        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted transition-colors hover:text-ink"
      >
        BACK TO TOP
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </footer>
  )
}
