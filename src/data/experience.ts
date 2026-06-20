export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  location: string
  summary: string
  bullets: string[]
  achievements: string[]
  tech: string[]
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'percipia',
    company: 'Percipia',
    role: 'Software Engineer',
    period: 'Nov 2021 – Present',
    location: 'Remote',
    summary: 'Building full-stack software for the global hospitality industry — from CRM platforms to IoT device integrations.',
    bullets: [
      'Developed a comprehensive CRM architecture for hospitality clients using a ReactJS frontend and Go backend, serving hotels and resorts across multiple continents.',
      'Built and maintained 30+ RESTful API endpoints with JWT authentication for secure communication between frontend clients and IoT hardware devices.',
      'Designed and implemented normalized SQL database schemas for hospitality management systems, improving query performance and data integrity.',
      'Created an intuitive role-based admin panel with granular permission controls tailored to hotel operations staff.',
      'Refactored 5+ legacy services using the Factory design pattern, reducing code duplication and simplifying future feature additions.',
      'Collaborated directly with stakeholders to define requirements and ship features across quarterly release cycles.',
    ],
    achievements: [
      'Reduced API response times by ~40% through query optimization and caching strategies',
      'Owned end-to-end delivery of a new CMS module used by 15+ enterprise clients',
      'Shipped zero-downtime database migrations across production environments',
    ],
    tech: ['React', 'Go', 'JavaScript', 'PostgreSQL', 'MySQL', 'JWT', 'Docker', 'REST APIs'],
  },
  {
    id: 'nasa',
    company: 'NASA Education Project',
    role: 'Programming Instructor',
    period: 'Jun 2020 – Aug 2020',
    location: 'CUNY York College — New York, NY',
    summary: 'Taught Python programming and game development to high school students as part of a NASA-sponsored STEM initiative.',
    bullets: [
      'Designed and delivered 10+ goal-oriented lesson plans covering Python fundamentals, game logic, and interactive design.',
      'Mentored 20+ students in programming concepts ranging from variables and loops to event-driven game mechanics.',
      'Guided students through building their own playable games in Scratch and Python by the end of the program.',
    ],
    achievements: [
      '100% of students completed a working game project by end of session',
      'Received positive feedback from program coordinators for curriculum quality',
    ],
    tech: ['Python', 'Scratch', 'Curriculum Design'],
  },
]
