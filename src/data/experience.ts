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
    context: 'SINGAPORE, LIVE MUSIC AGENCY',
    description:
      'Operations platform for a live music booking agency that runs nightly shows across many venues. It builds each night\'s lineup, suggests the best available musicians, and handles contracts, payments, and gig chats. Musicians confirm bookings straight from WhatsApp, where an AI assistant answers questions about their own gigs and pay.',
    roles: ['GHL AUTOMATION', 'INTEGRATION'],
    stack: 'Next.js, TypeScript, GoHighLevel, Express, Prisma, PostgreSQL',
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
      'One portal that connects residents, management, and the guardhouse. Residents book facilities, pay deposits, register visitors with QR passes, report maintenance issues, and message management. Staff approve requests and post announcements, and guards verify visitors at the gate. A shared backend keeps bookings, payments, and records in sync on its own.',
    roles: ['BACKEND', 'SECURITY', 'GHL AUTOMATION'],
    stack: 'Node.js, Express, MongoDB, Mongoose, JWT, GoHighLevel, Railway',
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
      'Club management platform where members book facilities, dining, and events, register their guests, and check in with a QR code. Staff run the front desk while management sees live occupancy, booking numbers, and no shows. The system also cleans up after itself by closing finished bookings and freeing expired slots, all synced with the club\'s CRM.',
    roles: ['FULL STACK', 'QA', 'GHL AUTOMATION'],
    stack: 'Node.js, Express, MongoDB, JWT, GoHighLevel, Railway',
    images: [
      '/assets/experience/src-member2.png',
      '/assets/experience/src-member3.png',
      '/assets/experience/src-member4.png',
    ],
  },
  {
    index: '04',
    name: 'Apexlynx',
    context: 'GOLF CONCIERGE, ASIA',
    description:
      'Golf concierge and booking platform for premium tee times across Asia, including golf programs that banks offer their credit card members. Card members, golf clubs, bank call centers, and the operations team each get their own secure portal. An automation engine handles WhatsApp and email conversations, and every booking action is logged.',
    roles: ['BACKEND', 'INTEGRATIONS', 'GHL AUTOMATION'],
    stack: 'Node.js, MySQL, Stripe, GoHighLevel, Google Calendar, Railway',
    images: [],
    abstract: { title: 'APEXLYNX', subtitle: 'PRIVATE CLIENT SYSTEM' },
  },
  {
    index: '05',
    name: 'Beeva',
    context: 'WINE AND SPIRITS, SINGAPORE',
    description:
      'One operations hub for a wine and spirits retailer. It pulls every order and stock level from WooCommerce, Lazada, and Shopee into one place. The office team manages orders, stock, deliveries, and a loyalty program. Drivers follow routes and snap proof of delivery photos. The warehouse logs new stock as it arrives. Everything stays in sync on its own.',
    roles: ['FULL STACK', 'QA', 'GHL AUTOMATION'],
    stack: 'React, Vite, Express, PostgreSQL, Python, FastAPI, OR-Tools, Leaflet',
    images: [
      '/assets/experience/beeva-command.png',
      '/assets/experience/beeva-driver.png',
      '/assets/experience/beeva-stock.png',
    ],
  },
]
