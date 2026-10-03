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
  /** Real screenshots, first is the hero shot. */
  shots?: { src: string; alt: string }[]
  theme?: 'perfect-season'
}

export const projects: Project[] = [
  {
    id: 'rebel-budget',
    shots: [
      { src: '/images/portfolio/rebel-budget/dashboard.webp', alt: 'Rebel Budget dashboard: the pet on its LCD, weekly budget left, level and recent log (sample data)' },
      { src: '/images/portfolio/rebel-budget/analytics.webp', alt: 'Rebel Budget weekly spending report and category breakdown (sample data)' },
    ],
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
    id: 'perfect-season',
    shots: [
      { src: '/images/portfolio/perfect-season/draft.webp', alt: 'Perfect Season draft screen: round 1 player picks, cap sheet, and roster' },
      { src: '/images/portfolio/perfect-season/home.webp', alt: 'Perfect Season home screen with new-run settings and career badges' },
    ],
    title: 'Perfect Season',
    year: 2026,
    description: 'Roguelike NBA team-builder: draft a roster, chase 82–0 and a championship.',
    longDescription:
      'Browser-based roguelike where you draft an NBA roster, survive random season events, and chase a perfect 82–0 record and a championship.',
    highlights: [
      'Roguelike draft loop with player traits, badges, and random season events',
      'Seeded runs so friends can replay and challenge the same season',
      'Global leaderboard and shareable results backed by Supabase',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Zustand', 'Supabase', 'PostgreSQL'],
    liveUrl: 'https://artesod.github.io/perfect-season/',
    githubUrl: 'https://github.com/Artesod/perfect-season',
    featured: false,
    theme: 'perfect-season',
  },
  {
    id: 'percipia-website',
    shots: [
      { src: '/images/portfolio/percipia_website/welcome.webp', alt: 'Percipia homepage hero: We are Percipia' },
      { src: '/images/portfolio/percipia_website/news.webp', alt: 'Percipia news page' },
    ],
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
]
