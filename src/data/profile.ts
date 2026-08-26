export const profile = {
  name: 'Brixsonn M. Romero',
  firstName: 'Brixsonn',
  lastName: 'Romero',
  role: 'AI Native Developer & Automation Developer — APIs, CRM and Workflow Automation, Conversational AI',
  roleShort: 'AI Native Developer & Automation Developer',
  specialties: ['APIs', 'CRM and Workflow Automation', 'Conversational AI'],
  tagline:
    'I build web and mobile apps fast. AI agents write the code, and software engineering fundamentals like system architecture, data modelling and security are what catch the things they get wrong.',
  aboutHeadline:
    'AI writes the code with me. Engineering decides what ships.',
  summary:
    "Every product on this site was built the same way. AI agents write the code. I decide what actually ships. I run Claude Code across the whole thing, from the database up to the buttons, then check its work the way any engineer would: is the system structured right, is the data modelled properly, what happens when someone hits it who isn't me. That checking is the real job. AI will happily hand you something that looks finished and falls over the first time it meets a real user. Day to day I work in JavaScript and TypeScript, React on the front, Node and Postgres behind it. Seven certificates from Anthropic.",
  /** the one line that earns the boast, kept separate so it can breathe */
  pullQuote: 'This is how one developer ships platforms that used to need a team.',
  location: 'Naga City, Camarines Sur, Philippines 4400',
  locationShort: 'Naga City, Camarines Sur',
  email: 'brixdodd07@gmail.com',
  phone: '+63 948 571 6293',
  github: 'https://github.com/dooddles07',
  linkedin: 'https://www.linkedin.com/in/brixsonn-romero-0b18b9327',
  facebook: 'https://www.facebook.com/brix.dodd',
  resume: '/assets/me/resume.pdf?v=3',
  availability: 'Open for remote work: full time, part time, contracts',
  education: {
    degree: 'B.S. Computer Science, Cum Laude',
    school: 'Naga College Foundation, Inc.',
    years: '2022 to 2026',
    honors: [
      { title: "Dean's Lister", years: '2022 to 2026' },
      { title: 'CCS Start-Up Bootcamp with LGU', years: '2024' },
      { title: 'Idea2Startup Bootcamp', years: '2023' },
    ],
  },
}

/** the same pass every build goes through, in order */
export const workflow = [
  {
    name: 'Brainstorm',
    detail:
      'Work out what the thing actually needs to do before any code exists. Who uses it, what breaks if it gets this wrong, and what is deliberately out of scope.',
  },
  {
    name: 'Plan',
    detail:
      'Write it down: the data model, the screens, and the order things get built in. If I cannot explain the plan in plain words, I do not understand the problem yet.',
  },
  {
    name: 'Implement + TDD',
    detail:
      'AI agents write the code against that plan, tests written alongside it, not after. Wrong inputs, dead connection, double taps, the back button at the worst moment, each a case before it ships. Small pieces, because a change I cannot read in one sitting is a change I cannot check.',
  },
  {
    name: 'Code review',
    detail:
      'I read every diff. Looking for logic that is subtly wrong, code that repeats itself, and anything that quietly does more than it claims to.',
  },
  {
    name: 'Security review',
    detail:
      'Anything touching sign-in, permissions, payments or personal data gets a second pass. Who can reach this, and what happens when someone reaches it who should not.',
  },
  {
    name: 'Refine',
    detail:
      'Fix what those two passes turned up, then read the whole thing again with fresh eyes, as one system instead of a stack of separate changes. Problems hide in the seams between good parts.',
  },
  {
    name: 'Ship',
    detail:
      'Deploy it, then keep using it in production and watch what real people actually do. That is where the last round of fixes comes from.',
  },
]

/** grouped so the reader can see shape, not just an alphabet soup of chips */
export const techGroups = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
  },
  {
    label: 'Frontend',
    items: ['React', 'React Native', 'Next.js', 'Vite', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Laravel', 'REST APIs', 'JWT / OAuth'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'pgvector', 'Redis'],
  },
  {
    label: 'Platform',
    items: ['Vercel', 'Railway', 'Render', 'Cloudflare Workers', 'Stripe', 'GoHighLevel', 'Git'],
  },
  {
    label: 'AI',
    items: ['Claude Code', 'Claude API', 'Groq', 'Gemini', 'RAG / embeddings'],
  },
]
