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
    "Keyboard Enthusiast"
  ],
  available: true,
  availabilityText: 'Open to new opportunities',
  bio: 'Full Stack Software Engineer with 5+ years building production systems for the hospitality industry. I specialize in ReactJS frontends and Go backends, with deep experience designing SQL schemas, RESTful APIs, and role-based access systems from the ground up.',
  bioExtended: 'I care about writing clean, maintainable code and building software that actually solves problems — whether that\'s an AI-powered financial tool, a CRM platform serving hotels and resorts, or an interactive web experience. Outside of work, I explore AI integrations, game dev, and building personal projects that keep my skills sharp.',
  location: 'Austin, TX',
  email: 'joshuadcanta@gmail.com',
  resumeUrl: 'https://drive.google.com/file/d/179FmyTN0SVi7tWNnPi_cpgk0M90B35eF/view?usp=sharing',
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
    { label: 'Gaming', icon: 'mdi:controller' },
    { label: 'PC Building', icon: 'mdi:desktop-tower' },
    { label: 'Basketball', icon: 'mdi:basketball' },
    { label: 'Trying New Food Spots', icon: 'mdi:silverware-fork-knife' },
  ],
  currentlyBuilding: 'Rebel Budget — an AI-powered personal finance app with conversational analytics.',
} as const
