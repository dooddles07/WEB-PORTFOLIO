export interface Project {
  name: string
  badge: string
  badgeStyle: 'cyan' | 'live' | 'violet'
  description: string
  stack: string
  image: string
  link?: string
}

export const projects: Project[] = [
  {
    name: 'StayFlow',
    badge: 'COMMUNITY APP',
    badgeStyle: 'cyan',
    description:
      'All in one app for running a modern residential community. Residents book shared facilities, reserve restaurant tables, invite guests with digital passes, join events, and read announcements. Staff and management each get their own secure login and dashboards.',
    stack: 'React, Tailwind, Node, Express, Prisma, PostgreSQL',
    image: '/assets/projects/stayflow.png',
    link: 'https://stayflow-production-bc16.up.railway.app',
  },
  {
    name: 'The Lumina',
    badge: 'LIVE',
    badgeStyle: 'live',
    description:
      'Live property management platform with three connected portals. Residents book facilities, register guests, track parcels, report defects, and pay deposits through real Stripe checkout. Every action shows up instantly for managers and guards.',
    stack: 'JavaScript, Node, Express, MongoDB, Stripe, Railway',
    image: '/assets/projects/lumina.png',
    link: 'https://the-lumina-production.up.railway.app',
  },
  {
    name: 'CYA Daily Verse',
    badge: 'DEVOTIONAL',
    badgeStyle: 'violet',
    description:
      'Devotional web app for a youth ministry. Members get a fresh Bible verse every day, plus reading plans, daily challenges, a prayer wall, and events. A mood finder suggests Scripture based on how you feel. Verses come live from public Bible sources.',
    stack: 'Next.js, React, TypeScript, Tailwind, Railway',
    image: '/assets/projects/cya.png',
    link: 'https://cya-daily-verses-production.up.railway.app',
  },
]
