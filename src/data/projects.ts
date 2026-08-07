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
    name: 'CortexVault',
    badge: 'AI · RAG',
    description:
      'A private knowledge base that answers questions about your own documents. Upload your notes and PDFs, ask something, and every answer comes back pointing at the exact paragraph it came from, so you can check it yourself. Nothing is made up. It searches two ways at once, by exact wording and by meaning, so it still finds the right thing when you only half remember how it was phrased. Sign-in has two-factor and locks itself down after failed attempts.',
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
    description:
      'An auto parts shop built around the one question that actually matters: will this fit my car? Tell it what you drive once and it remembers. After that, every listing, filter, search result and cart line gets checked against a real table of makes, models and years, so "fits your 2022 WRX" is something the site can prove instead of a spec sheet you have to decode yourself. Switch the filter on and 27 parts drop to the 11 that fit, with every count updating as it goes. Still in progress: you can browse the whole shop, but checkout takes no card details and sign-in is a demo. The site says so on the page.',
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
      "All in one app for running a modern residential community, with three logins that each see only their own job: residents book shared facilities and restaurant tables, invite guests with a QR pass, RSVP to events, and read notices; staff run the front desk from a live queue of bookings and check-ins; management gets analytics, the resident/staff directory, and full administrative control. Every rule is enforced on the server, not just hidden in the UI, and it's proven: a 151-case test matrix checks every route against every role, and 524 tests cover the parts that actually break systems like this, like two residents racing for the same pool slot. Sessions are revocable, passwords are locked out after repeated failures, and a caller who skips the edge in front of the API doesn't get to spoof its rate limits either.",
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
    name: 'The Lumina',
    badge: 'PROPERTY PLATFORM',
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
    description:
      "A devotional app for a youth ministry. It gives members a Bible verse to read every day, along with reading plans, a prayer wall, and community events, so they can build a habit of reading Scripture and stay connected to their church community.",
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
      "Turns a meeting recording into everything you'd otherwise spend twenty minutes typing up. Upload the audio and you get back a clean transcript, notes in plain English, a to-do list with names and due dates, a follow-up email ready to send, and calendar reminders for each deadline. All of it comes from what was actually said, and anything the AI had to guess is marked as a guess. The sign-in and the whole thing behind it are real, not a demo shell.",
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
      'Turns a PDF, slide deck or pile of notes into quizzes, flashcards and practice exams, all on your own device. The reading, storing, searching and working out when to show you a card again happen in your browser. The server only holds the API key and double-checks that every question quotes real text from your document, not just a real page number, before it reaches you. Get one wrong and it shows you the exact passage the right answer came from. Your settings follow you between devices, and you can back your study data up to the cloud whenever you want.',
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
      'A real cafe in Naga City that had no website at all. I built one so people stop guessing from Facebook photos: see the menu properly, build your own milk tea (flavor, size, series add-on, sinkers, price updating as you pick), and check the hours and directions before walking over. Ordering is one tap through to Messenger with the order already written out for you. No accounts, no pretend checkout. The menu and prices are copied straight off the board in the shop.',
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
