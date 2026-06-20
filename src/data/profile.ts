export const profile = {
  name: 'Joshua Canta',
  firstName: 'Joshua',
  lastName: 'Canta',
  title: 'Full Stack Software Engineer',
  typewriterTitles: [
    'React Engineer',
    'Go Developer',
    'Website Builder',
    'Full Stack Engineer',
    "Computer Builder"
  ],
  available: true,
  availabilityText: 'Open to new opportunities',
  bio: 'Full Stack Software Engineer with 5+ years building production systems for the hospitality industry. I specialize in ReactJS frontends and Go backends, with deep experience designing SQL schemas, RESTful APIs, and role-based access systems from the ground up.',
  bioExtended: 'I care about writing clean, maintainable code and building software that actually solves problems — whether that\'s an AI-powered financial tool, a CRM platform serving hotels and resorts, or an interactive web experience. Outside of work, I explore AI integrations, game dev, and building personal projects that keep my skills sharp.',
  location: 'San Marcos, TX',
  email: 'joshdc1288@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/1XPLcOIjzFGBdqmpkmLU7iiHVqMuC0bQr/view',
  social: {
    github: 'https://github.com/Artesod',
    linkedin: 'https://www.linkedin.com/in/joshuacanta/',
    email: 'mailto:joshdc1288@gmail.com',
  },
  stats: [
    { value: '5+', label: 'Years Experience' },
    { value: '10+', label: 'Projects Shipped' },
    { value: '20+', label: 'Technologies' },
    { value: '2', label: 'Industries' },
  ],
  education: {
    school: 'Stony Brook University',
    degree: 'B.S. Computer Science',
    period: '2017 – 2021',
    location: 'Stony Brook, NY',
  },
  interests: [
    { label: 'AI & LLM Tooling', icon: 'mdi:brain' },
    { label: 'System Design', icon: 'mdi:sitemap-outline' },
    { label: 'Game Development', icon: 'mdi:gamepad-variant-outline' },
    { label: 'Open Source', icon: 'mdi:source-branch' },
  ],
  currentlyBuilding: 'Rebel Budget — an AI-powered personal finance app with conversational analytics.',
} as const
