export interface Project {
  id: string
  title: string
  year: number
  description: string
  longDescription: string
  highlights: string[]
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
    year: 2026,
    description: 'AI-powered financial management app with intelligent expense tracking and analytics.',
    longDescription:
      'Full-stack financial management application featuring an AI conversational assistant powered by OpenAI, interactive analytics dashboards, and secure multi-user authentication.',
    highlights: [
      'Conversational AI assistant answers natural language questions about spending habits and budget goals',
      'Interactive analytics dashboard with Chart.js — trends, breakdowns, and forecasts',
      'JWT authentication with bcrypt password hashing and refresh token rotation',
      'RESTful FastAPI backend with PostgreSQL and full Docker Compose orchestration',
      'Real-time expense categorization and monthly budget alerting',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'Chart.js', 'Docker', 'JWT'],
    featured: true,
  },
  {
    id: 'percipia-website',
    title: 'Percipia Website',
    year: 2026,
    description: 'Corporate website with comprehensive admin system for content and business management.',
    longDescription:
      'Public-facing corporate site with a role-based admin panel, real-time monitoring dashboard, secure session management with audit logging, and full SEO optimization.',
    highlights: [
      'Role-based admin panel with granular content permissions',
      'Real-time monitoring dashboard for site analytics',
      'Secure session auth with audit logging for all admin actions',
      'SEO-optimized static pages with structured data markup',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Go'],
    liveUrl: 'https://percipia.com/',
    featured: false,
  },
  {
    id: 'personal-website',
    title: 'Personal Website',
    year: 2026,
    description: 'This portfolio — a cinematic snap-scroll experience built from scratch.',
    longDescription:
      'Fully redesigned personal portfolio with a dark blue/emerald visual identity, cinematic scroll-snap navigation, and Framer Motion entrance animations throughout.',
    highlights: [
      'Scroll-snap layout with 6 full-viewport sections for a guided experience',
      'Framer Motion animations triggered on viewport entry',
      'Custom useTypewriter hook for the animated hero subtitle',
      'EmailJS-powered contact form with status feedback',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    liveUrl: 'https://joshuadcanta.com/',
    githubUrl: 'https://github.com/Artesod',
    featured: false,
  },
]
