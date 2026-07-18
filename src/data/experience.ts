export interface Experience {
  index: string
  name: string
  context: string
  description: string
  roles: string[]
  stack: string
  images: string[]
  /** experiences without screenshots render an abstract panel instead */
  abstract?: { title: string; subtitle: string }
}

export const experiences: Experience[] = [
  {
    index: '01',
    name: 'VAMP',
    context: 'SINGAPORE · LIVE-MUSIC OPS',
    description:
      'Operations platform for a live-music booking agency running nightly shows across venues — lineup builder, musician suggestions, contracts, payments and role-scoped gig chats. Musicians confirm bookings straight from WhatsApp, where an AI assistant answers questions about their own gigs and pay.',
    roles: ['GHL AUTOMATION', 'INTEGRATION'],
    stack: 'Next.js · TypeScript · GoHighLevel · Express · Prisma · PostgreSQL',
    images: [
      '/assets/experience/vamp-master-portal.png',
      '/assets/experience/vamp-master-portal2.png',
      '/assets/experience/vamp-engineeringportal.png',
    ],
  },
  {
    index: '02',
    name: 'The Meridian',
    context: 'CONDOMINIUM PORTAL',
    description:
      'All-in-one portal connecting residents, management and the guardhouse — facility booking, deposits, QR visitor passes, maintenance reports, move-in/out tracking and messaging. Every action flows through a shared backend that keeps bookings, payments and records in sync automatically.',
    roles: ['BACKEND', 'SECURITY', 'GHL AUTOMATION'],
    stack: 'Node.js · Express · MongoDB · Mongoose · JWT · GoHighLevel · Railway',
    images: [
      '/assets/experience/themeridian-member.png',
      '/assets/experience/themeridian-management.png',
      '/assets/experience/themeridian-guard.png',
    ],
  },
  {
    index: '03',
    name: 'SRC',
    context: 'SINGAPORE RECREATION CLUB',
    description:
      'Club management platform — members book facilities, dining and events, register guests and check in by QR. Staff run the front desk; management sees live occupancy, booking analytics and no-show tracking. Background jobs mark no-shows, close finished bookings and release expired blocks, all synced to GoHighLevel CRM.',
    roles: ['FULL STACK', 'QA', 'GHL AUTOMATION'],
    stack: 'Node.js · Express · MongoDB · JWT · GoHighLevel · Railway',
    images: [
      '/assets/experience/src-member2.png',
      '/assets/experience/src-member3.png',
      '/assets/experience/src-member4.png',
    ],
  },
  {
    index: '04',
    name: 'Apexlynx',
    context: 'GOLF CONCIERGE · ASIA',
    description:
      'Golf concierge and booking platform for premium tee times across Asia, including bank credit-card golf programmes. Separate secure portals for card members, golf clubs, bank call centres and the ops team — with an automation engine handling WhatsApp and email conversations, and a local data copy keeping dashboards instant and every action logged.',
    roles: ['BACKEND', 'INTEGRATIONS', 'GHL AUTOMATION'],
    stack: 'Node.js · MySQL · Stripe · GoHighLevel · Google Calendar · Railway',
    images: [],
    abstract: { title: 'APEXLYNX', subtitle: 'PRIVATE CLIENT SYSTEM' },
  },
  {
    index: '05',
    name: 'Beeva',
    context: 'WINE & SPIRITS OPS · SG',
    description:
      'All-in-one operations hub pulling every WooCommerce, Lazada and Shopee order and stock level into one place. Three connected portals: office dashboard for orders, stock, deliveries and loyalty; a driver app with routes and proof-of-delivery photos; a warehouse portal for incoming stock — all synced automatically.',
    roles: ['FULL STACK', 'QA', 'GHL AUTOMATION'],
    stack: 'React · Vite · Express · PostgreSQL · Python · FastAPI · OR-Tools · Leaflet',
    images: [
      '/assets/experience/beeva-command.png',
      '/assets/experience/beeva-driver.png',
      '/assets/experience/beeva-stock.png',
    ],
  },
]
