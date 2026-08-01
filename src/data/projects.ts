export interface Project {
  name: string
  badge: string
  badgeStyle: 'cyan' | 'live' | 'violet'
  description: string
  stack: string
  image: string
  /** extra screenshots for a gallery/lightbox; omit for a single-shot card */
  images?: string[]
  link?: string
  repo?: string
  /** featured projects render as the wide spotlight card */
  featured?: boolean
}

export interface MiniProject {
  name: string
  description: string
  tag: string
}

export const projects: Project[] = [
  {
    name: 'CortexVault',
    badge: 'AI · RAG',
    badgeStyle: 'violet',
    description:
      'Private knowledge base that answers questions from your own documents. Upload notes and PDFs, and every answer streams back with a citation pointing at the exact chunk it came from — nothing is invented. Keyword and vector search run together, then an LLM re-ranks the fused results, so exact terms and fuzzy recall both land. Auth ships with session revocation, account lockout, and TOTP two-factor.',
    stack: 'Next.js, FastAPI, PostgreSQL, pgvector, Groq, Vercel',
    image: '/assets/projects/cortexvault.webp?v=2',
    images: [
      '/assets/projects/cortexvault.webp?v=2',
      '/assets/projects/cortexvault2.webp?v=2',
      '/assets/projects/cortexvault3.webp?v=2',
      '/assets/projects/cortexvault4.webp?v=2',
      '/assets/projects/cortexvault5.webp?v=2',
    ],
    link: 'https://cortex-vault-web.vercel.app',
    repo: 'https://github.com/dooddles07/Cortex-Vault',
    featured: true,
  },
  {
    name: 'North Star',
    badge: 'E-COMMERCE · FITMENT',
    badgeStyle: 'violet',
    description:
      'Auto parts storefront built around one hard problem: does this part actually fit my car? Tell it what you drive once and it stays in your garage — every listing, filter, product badge, search result and cart line is then checked against a real fitment table of makes, models and model-year ranges, so "fits your 2022 WRX" is a fact the site can prove, not a spec you have to decode. Turn on the fitment filter and 27 parts narrow to the 11 that fit, with every facet count recalculated. The storefront is complete and deployed; checkout collects no payment details and sign-in is a demo session by design, and both say so on the page.',
    stack: 'Next.js 16, React 19, TypeScript, Tailwind v4, Zustand, Motion, Vercel',
    image: '/assets/projects/northstar.webp',
    images: [
      '/assets/projects/northstar.webp',
      '/assets/projects/northstar2.webp',
      '/assets/projects/northstar3.webp',
      '/assets/projects/northstar4.webp',
      '/assets/projects/northstar5.webp',
      '/assets/projects/northstar6.webp',
      '/assets/projects/northstar7.webp',
      '/assets/projects/northstar8.webp',
      '/assets/projects/northstar9.webp',
      '/assets/projects/northstar10.webp',
      '/assets/projects/northstar11.webp',
      '/assets/projects/northstar12.webp',
    ],
    link: 'https://north-star-tan.vercel.app',
    repo: 'https://github.com/dooddles07/North-Star',
  },
  {
    name: 'StayFlow',
    badge: 'COMMUNITY APP',
    badgeStyle: 'cyan',
    description:
      'All in one app for running a modern residential community. Residents book shared facilities, reserve restaurant tables, invite guests with digital passes, join events, and read announcements. Staff and management each get their own secure login and dashboards.',
    stack: 'React, Tailwind, Node, Express, Prisma, PostgreSQL',
    image: '/assets/projects/stayflow.webp?v=2',
    images: [
      '/assets/projects/stayflow.webp?v=2',
      '/assets/projects/stayflow2.webp?v=2',
      '/assets/projects/stayflow3.webp?v=2',
      '/assets/projects/stayflow4.webp?v=2',
      '/assets/projects/stayflow5.webp?v=2',
      '/assets/projects/stayflow6.webp',
      '/assets/projects/stayflow7.webp',
      '/assets/projects/stayflow8.webp',
      '/assets/projects/stayflow9.webp',
      '/assets/projects/stayflow10.webp',
    ],
    link: 'https://stay-flow-alpha.vercel.app',
    repo: 'https://github.com/dooddles07/StayFlow',
  },
  {
    name: 'The Lumina',
    badge: 'PROPERTY PLATFORM',
    badgeStyle: 'violet',
    description:
      'Live property management platform with three connected portals. Residents book facilities, register guests, track parcels, report defects, and pay deposits through real Stripe checkout. Every action shows up instantly for managers and guards.',
    stack: 'JavaScript, Node, Express, MongoDB, Stripe, Vercel',
    image: '/assets/projects/lumina.webp',
    images: [
      '/assets/projects/lumina.webp',
      '/assets/projects/lumina2.webp',
      '/assets/projects/lumina3.webp',
      '/assets/projects/lumina4.webp',
    ],
    link: 'https://the-lumina.vercel.app',
    repo: 'https://github.com/dooddles07/The-Lumina',
  },
  {
    name: 'CYA Daily Verse',
    badge: 'DEVOTIONAL',
    badgeStyle: 'violet',
    description:
      'Devotional web app for a youth ministry. Members get a fresh Bible verse every day, plus reading plans, daily challenges, a prayer wall, and events. A mood finder suggests Scripture based on how you feel. Verses come live from public Bible sources.',
    stack: 'Next.js, React, TypeScript, Tailwind, MongoDB, Vercel',
    image: '/assets/projects/cya.webp?v=2',
    images: [
      '/assets/projects/cya.webp?v=2',
      '/assets/projects/cya1.webp?v=2',
      '/assets/projects/cya2.webp?v=2',
      '/assets/projects/cya3.webp?v=2',
      '/assets/projects/cya4.webp?v=2',
      '/assets/projects/cya5.webp?v=2',
    ],
    link: 'https://cya-dv.vercel.app',
    repo: 'https://github.com/dooddles07/CYA-DV',
  },
  {
    name: 'SyncMind',
    badge: 'AI MEETING ASSISTANT',
    badgeStyle: 'violet',
    description:
      "Turns a meeting recording into everything you'd normally spend twenty minutes writing by hand. Upload the audio and get back a clean transcript, plain-language notes, a to-do list with owners and due dates, a follow-up email ready to send, and calendar reminders for every deadline — all pulled from what was actually said, with anything AI had to guess clearly marked as a guess. Sign-in and the whole pipeline are real, not a demo shell.",
    stack: 'Next.js, Supabase, Groq, Vercel',
    image: '/assets/projects/syncmind.webp',
    images: [
      '/assets/projects/syncmind.webp',
      '/assets/projects/syncmind2.webp',
      '/assets/projects/syncmind3.webp',
      '/assets/projects/syncmind4.webp',
      '/assets/projects/syncmind5.webp',
    ],
    link: 'https://sync-mind-three.vercel.app',
    repo: 'https://github.com/dooddles07/SyncMind',
  },
  {
    name: 'ScholarForge AI',
    badge: 'AI · STUDY TOOL',
    badgeStyle: 'violet',
    description:
      'Turns a PDF, slide deck, or set of notes into quizzes, flashcards, and practice exams, entirely on-device. Parsing, storage, search, and FSRS spaced-repetition scheduling all run in the browser; the server only holds the API key and checks that every generated question quotes real text from the source document, not just a real page number, before it reaches you. Wrong answers show the exact passage the correct answer came from. Preferences sync live across devices via Firebase, and study data can be backed up to the cloud on demand.',
    stack: 'React, TypeScript, Vite, Dexie/IndexedDB, Firebase, Vercel, Groq',
    image: '/assets/projects/scholarforge.webp',
    images: [
      '/assets/projects/scholarforge.webp',
      '/assets/projects/scholarforge2.webp',
      '/assets/projects/scholarforge3.webp',
      '/assets/projects/scholarforge4.webp',
      '/assets/projects/scholarforge5.webp',
      '/assets/projects/scholarforge6.webp',
      '/assets/projects/scholarforge7.webp',
      '/assets/projects/scholarforge8.webp',
      '/assets/projects/scholarforge9.webp',
      '/assets/projects/scholarforge10.webp',
    ],
    link: 'https://scholar-forge-ai.vercel.app',
    repo: 'https://github.com/dooddles07/ScholarForgeAI',
  },
]

export const miniProjects: MiniProject[] = [
  {
    name: 'ResqYOU',
    description: 'Real time emergency response and locator system with shortest path routing.',
    tag: 'EMERGENCY',
  },
  {
    name: 'CYA FaithWear',
    description: 'Full stack e-commerce platform from catalog to checkout, built at Ateneo de Naga University.',
    tag: 'E-COMMERCE',
  },
  {
    name: 'NagaMed',
    description: 'Mobile clinic booking and nearby clinic discovery app driven by usage analytics.',
    tag: 'MOBILE',
  },
]
