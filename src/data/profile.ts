export const profile = {
  name: 'Brixsonn M. Romero',
  firstName: 'Brixsonn',
  lastName: 'Romero',
  role: 'Full Stack AI Web and App Developer — APIs, CRM and Workflow Automation, Conversational AI',
  roleShort: 'Full Stack AI Web and App Developer',
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
  resume: '/assets/me/resume.pdf',
  availability: 'Open for work: full time, part time, contracts',
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
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'pgvector'],
  },
  {
    label: 'Platform',
    items: ['Vercel', 'Railway', 'Render', 'Stripe', 'GoHighLevel', 'Git'],
  },
  {
    label: 'AI',
    items: ['Claude Code', 'Claude API', 'Groq', 'RAG / embeddings'],
  },
]
