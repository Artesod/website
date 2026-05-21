export interface ExperienceEntry {
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  tech: string[]
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'percipia',
    company: 'Percipia',
    role: 'Software Engineer',
    period: 'Nov 2021 – Present',
    location: 'Remote',
    bullets: [
      'Developed comprehensive CRM architecture for hospitality industry using ReactJS frontend and Go backend.',
      'Built RESTful API endpoints with JWT authentication for secure frontend and IoT device communication.',
      'Designed and implemented SQL database schemas and table structures for hospitality management systems.',
      'Created intuitive UI/UX designs tailored for hotels, resorts, and hospitality service providers.',
      'Refactored legacy services using Factory design pattern while maintaining system requirements.',
    ],
    tech: ['React', 'Go', 'JavaScript', 'SQL', 'JWT'],
  },
  {
    id: 'nasa',
    company: 'NASA Education Project',
    role: 'Programming Instructor',
    period: 'Jun 2020 – Aug 2020',
    location: 'CUNY York College',
    bullets: [
      'Created goal-oriented lesson plans to teach Python programming and game development.',
      'Mentored students in basic programming concepts and interactive game design principles.',
    ],
    tech: ['Python', 'Scratch'],
  },
]
