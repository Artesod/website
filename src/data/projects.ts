export interface Project {
  id: string
  title: string
  year: number
  description: string
  longDescription: string
  tech: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  image?: string
}

export const projects: Project[] = [
  {
    id: 'rebel-budget',
    title: 'Rebel Budget',
    year: 2025,
    description: 'AI-powered financial management app with intelligent expense tracking and analytics.',
    longDescription:
      'Full-stack application featuring an AI conversational financial assistant powered by OpenAI, interactive analytics dashboard with Chart.js visualizations, JWT authentication, bcrypt password hashing, and Docker containerization.',
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'Chart.js', 'Docker', 'JWT'],
    featured: true,
  },
  {
    id: 'percipia-website',
    title: 'Percipia Website',
    year: 2025,
    description: 'Corporate website with comprehensive admin system for content and business management.',
    longDescription:
      'Website with a role-based admin panel featuring granular permissions, real-time monitoring dashboard, secure authentication with session management and audit logging, and SEO optimization.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Go'],
    liveUrl: 'https://percipia.com/',
    featured: false,
  },
  {
    id: 'personal-website',
    title: 'Personal Website',
    year: 2023,
    description: 'This portfolio site — a cinematic snap-scroll experience built from scratch.',
    longDescription:
      'Fully redesigned personal portfolio with Vite + React + TypeScript, Tailwind CSS, Framer Motion animations, and a dark blue/emerald visual identity.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    liveUrl: 'https://joshuadcanta.com/',
    githubUrl: 'https://github.com/Artesod',
    featured: false,
  },
]
