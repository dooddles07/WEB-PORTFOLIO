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
    name: 'StayFlow',
    badge: 'COMMUNITY APP',
    badgeStyle: 'cyan',
    description:
      'All in one app for running a modern residential community. Residents book shared facilities, reserve restaurant tables, invite guests with digital passes, join events, and read announcements. Staff and management each get their own secure login and dashboards.',
    stack: 'React, Tailwind, Node, Express, Prisma, PostgreSQL',
    image: '/assets/projects/stayflow.webp',
    images: [
      '/assets/projects/stayflow.webp',
      '/assets/projects/stayflow2.webp',
      '/assets/projects/stayflow3.webp',
      '/assets/projects/stayflow4.webp',
      '/assets/projects/stayflow5.webp',
    ],
    link: 'https://stayflow-production-bc16.up.railway.app',
    repo: 'https://github.com/dooddles07/StayFlow',
  },
  {
    name: 'The Lumina',
    badge: 'LIVE',
    badgeStyle: 'live',
    description:
      'Live property management platform with three connected portals. Residents book facilities, register guests, track parcels, report defects, and pay deposits through real Stripe checkout. Every action shows up instantly for managers and guards.',
    stack: 'JavaScript, Node, Express, MongoDB, Stripe, Railway',
    image: '/assets/projects/lumina.webp',
    images: [
      '/assets/projects/lumina.webp',
      '/assets/projects/lumina2.webp',
      '/assets/projects/lumina3.webp',
      '/assets/projects/lumina4.webp',
    ],
    link: 'https://the-lumina-production.up.railway.app',
    repo: 'https://github.com/dooddles07/The-Lumina',
    featured: true,
  },
  {
    name: 'CYA Daily Verse',
    badge: 'DEVOTIONAL',
    badgeStyle: 'violet',
    description:
      'Devotional web app for a youth ministry. Members get a fresh Bible verse every day, plus reading plans, daily challenges, a prayer wall, and events. A mood finder suggests Scripture based on how you feel. Verses come live from public Bible sources.',
    stack: 'Next.js, React, TypeScript, Tailwind, Railway',
    image: '/assets/projects/cya.webp',
    images: [
      '/assets/projects/cya.webp',
      '/assets/projects/cya1.webp',
      '/assets/projects/cya2.webp',
      '/assets/projects/cya3.webp',
    ],
    link: 'https://cya-daily-verses-production.up.railway.app',
    repo: 'https://github.com/dooddles07/CYA-Daily-Verses',
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
