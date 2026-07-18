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
    badge: 'RESIDENTIAL OS',
    badgeStyle: 'cyan',
    description:
      'All-in-one app for a modern residential community — facility booking, restaurant reservations, guest passes, events and announcements, with role-scoped logins for residents, staff and management.',
    stack: 'React · Tailwind · Node · Express · Prisma · PostgreSQL',
    image: '/assets/projects/stayflow.png',
    link: 'https://stayflow-production-bc16.up.railway.app',
  },
  {
    name: 'The Lumina',
    badge: 'LIVE',
    badgeStyle: 'live',
    description:
      'Live property management platform with three connected portals — residents book facilities, register guests, track parcels, report defects and pay deposits through real Stripe checkout, instantly visible to managers and guards.',
    stack: 'JavaScript · Node · Express · MongoDB · Stripe · Railway',
    image: '/assets/projects/lumina.png',
    link: 'https://the-lumina-production.up.railway.app',
  },
  {
    name: 'CYA Daily Verse',
    badge: 'DEVOTIONAL',
    badgeStyle: 'violet',
    description:
      'Devotional web app for a youth ministry — daily Bible verse, reading plans, faith challenges, prayer wall and events, plus a mood finder suggesting Scripture by feeling. Verses pull live from public Bible APIs.',
    stack: 'Next.js · React · TypeScript · Tailwind · Railway',
    image: '/assets/projects/cya.png',
    link: 'https://cya-daily-verses-production.up.railway.app',
  },
]
