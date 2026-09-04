export interface Project {
  name: string
  badge: string
  description: string
  stack: string
  image: string
  /** deployment state; defaults to 'live' when a link exists */
  status?: 'live' | 'in-progress'
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
    name: 'Stockpile',
    badge: 'INVENTORY · RBAC',
    description:
      'Built a full inventory management system for tracking stock across multiple warehouses, with purchase orders, transfers, adjustments, cycle counts and role-based access across five permission levels.',
    stack: 'Next.js 16, React 19, TypeScript, Neon Postgres, Drizzle ORM, Better Auth, Tailwind CSS v4, Vercel',
    image: '/assets/projects/stockpile.png',
    images: [
      '/assets/projects/stockpile.png',
      '/assets/projects/stockpile2.png',
      '/assets/projects/stockpile3.png',
    ],
    link: 'https://stockpile-peach.vercel.app',
    repo: 'https://github.com/dooddles07/Inventory-Management-System',
  },
  {
    name: 'SchoolPulse',
    badge: 'SAAS · MULTI-TENANT',
    description:
      "Built a system that keeps a school's admissions, grades, attendance and fees in one place, with each person only seeing the part that's theirs.",
    stack: 'Next.js 16, TypeScript, PostgreSQL, Prisma 7, better-auth, Tailwind CSS v4, Vercel Blob',
    image: '/assets/projects/schoolpulse.webp',
    images: [
      '/assets/projects/schoolpulse.webp',
      '/assets/projects/schoolpulse2.webp',
      '/assets/projects/schoolpulse3.webp',
      '/assets/projects/schoolpulse4.webp',
      '/assets/projects/schoolpulse5.webp',
      '/assets/projects/schoolpulse6.webp',
      '/assets/projects/schoolpulse7.webp',
      '/assets/projects/schoolpulse8.webp',
      '/assets/projects/schoolpulse9.webp',
    ],
    link: 'https://school-management-system-black-three.vercel.app',
    repo: 'https://github.com/dooddles07/School-Management-System',
    featured: true,
  },
  {
    name: 'CortexVault',
    badge: 'AI · RAG',
    description:
      'Built a private tool for asking questions about your own notes and files that points you to the exact line each answer came from.',
    stack: 'Next.js, TypeScript, FastAPI, PostgreSQL, pgvector, Groq, Vercel, Render',
    image: '/assets/projects/cortexvault.webp?v=3',
    images: [
      '/assets/projects/cortexvault.webp?v=3',
      '/assets/projects/cortexvault2.webp?v=3',
      '/assets/projects/cortexvault3.webp?v=3',
      '/assets/projects/cortexvault4.webp?v=3',
      '/assets/projects/cortexvault5.webp?v=3',
      '/assets/projects/cortexvault6.webp?v=3',
    ],
    link: 'https://cortex-vault-web.vercel.app',
    repo: 'https://github.com/dooddles07/Cortex-Vault',
  },
  {
    name: 'Marram',
    badge: 'WEDDING · FULL-STACK',
    description:
      'Built a wedding planning site with a venue search, a budget calculator, a guest list, RSVP tracking and a page you can share with guests.',
    stack: 'Next.js, TypeScript, Neon Postgres, Drizzle ORM, NextAuth, Zustand, Tailwind CSS, Framer Motion, Upstash Redis, Resend, Vercel',
    image: '/assets/projects/marram.webp',
    images: [
      '/assets/projects/marram.webp',
      '/assets/projects/marram2.webp',
      '/assets/projects/marram3.webp',
      '/assets/projects/marram4.webp',
      '/assets/projects/marram5.webp',
      '/assets/projects/marram6.webp',
    ],
    link: 'https://wedding-planner-jet-seven.vercel.app',
  },
  {
    name: 'North Star',
    badge: 'E-COMMERCE · FITMENT',
    description:
      'Built an online shop for car parts that only shows the ones that fit your car, with the checkout and sign-in still to come.',
    stack: 'Next.js 16, React 19, TypeScript, Tailwind v4, Zustand, Motion, Vercel',
    image: '/assets/projects/northstar.webp',
    status: 'in-progress',
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
    // repo omitted: github.com/dooddles07/North-Star is private or unpushed and 404s.
    // Add `repo` back once it is public.
  },
  {
    name: 'StayFlow',
    badge: 'COMMUNITY APP',
    description:
      'Built an app for running a residential community, covering facility bookings, guest passes, events and the front desk, with its own view for residents, staff and management.',
    stack: 'React, TanStack Start, Tailwind, Node, Express, Prisma, PostgreSQL',
    image: '/assets/projects/stayflow.webp?v=3',
    images: [
      '/assets/projects/stayflow.webp?v=3',
      '/assets/projects/stayflow2.webp?v=3',
      '/assets/projects/stayflow3.webp?v=3',
      '/assets/projects/stayflow4.webp?v=3',
      '/assets/projects/stayflow5.webp?v=3',
      '/assets/projects/stayflow6.webp?v=3',
      '/assets/projects/stayflow7.webp?v=3',
      '/assets/projects/stayflow8.webp?v=3',
      '/assets/projects/stayflow9.webp?v=3',
      '/assets/projects/stayflow10.webp?v=3',
      '/assets/projects/stayflow11.webp?v=3',
      '/assets/projects/stayflow12.webp?v=3',
    ],
    link: 'https://stay-flow-alpha.vercel.app',
    repo: 'https://github.com/dooddles07/StayFlow',
  },
  {
    name: 'CareFlow CRM',
    badge: 'HEALTHCARE CRM · RBAC',
    description:
      'Built a tool for a clinic to keep track of follow-up calls, where new patients come from and which complaints are running late, while keeping patient details private and logging every look.',
    stack: 'Next.js 16, TypeScript, Neon Postgres, Drizzle ORM, Better Auth, pg-boss, Resend, Vercel Blob, Groq',
    image: '/assets/projects/careflow.webp',
    images: [
      '/assets/projects/careflow.webp',
      '/assets/projects/careflow2.webp',
      '/assets/projects/careflow3.webp',
      '/assets/projects/careflow4.webp',
      '/assets/projects/careflow5.webp',
      '/assets/projects/careflow6.webp',
      '/assets/projects/careflow7.webp',
      '/assets/projects/careflow8.webp',
      '/assets/projects/careflow9.webp',
      '/assets/projects/careflow10.webp',
      '/assets/projects/careflow11.webp',
      '/assets/projects/careflow12.webp',
      '/assets/projects/careflow13.webp',
      '/assets/projects/careflow14.webp',
      '/assets/projects/careflow15.webp',
      '/assets/projects/careflow16.webp',
      '/assets/projects/careflow17.webp',
      '/assets/projects/careflow18.webp',
      '/assets/projects/careflow19.webp',
      '/assets/projects/careflow20.webp',
      '/assets/projects/careflow21.webp',
      '/assets/projects/careflow22.webp',
      '/assets/projects/careflow23.webp',
      '/assets/projects/careflow24.webp',
      '/assets/projects/careflow25.webp',
      '/assets/projects/careflow26.webp',
      '/assets/projects/careflow27.webp',
      '/assets/projects/careflow28.webp',
    ],
    link: 'https://crm-dashboard-beta-ebon.vercel.app',
    repo: 'https://github.com/dooddles07/CRM-Dashboard',
  },
  {
    name: 'The Lumina',
    badge: 'PROPERTY PLATFORM',
    description:
      'Built a platform where residents book facilities, sign in guests, track parcels, report problems and pay deposits by card, with staff seeing it all right away.',
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
    description:
      'Built an app that sends out a Bible verse every day along with reading plans, a prayer wall and a list of church events.',
    stack: 'Next.js 16, React 19, TypeScript, Tailwind v4, MongoDB, Resend, Vercel',
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
    description:
      'Built a tool that takes a meeting recording and gives back a transcript, a short set of notes, a to-do list with names and dates, and a follow-up email ready to send.',
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
    description:
      "Built a study tool that turns a PDF, some slides or your notes into quizzes, flashcards and practice exams drawn from what's actually in the file.",
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
  {
    name: 'Liters Cafe',
    badge: 'MARKETING · MENU SITE',
    description:
      'Built a website for a cafe that never had one, with the full menu, a build-your-own milk tea that prices as you go, opening hours, directions and ordering through Messenger.',
    stack: 'Next.js, TypeScript, Tailwind, Vercel',
    image: '/assets/projects/liters.webp',
    status: 'in-progress',
    images: [
      '/assets/projects/liters.webp',
      '/assets/projects/liters2.webp',
      '/assets/projects/liters3.webp',
      '/assets/projects/liters4.webp',
      '/assets/projects/liters5.webp',
      '/assets/projects/liters6.webp',
      '/assets/projects/liters7.webp',
    ],
    link: 'https://liters-cafe.vercel.app',
    repo: 'https://github.com/dooddles07/Liters-Cafe',
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
