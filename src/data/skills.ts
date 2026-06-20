export interface Skill {
  name: string
  icon: string
}

export interface SkillCategory {
  label: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    description: 'Core languages I write production code in daily',
    skills: [
      { name: 'JavaScript', icon: 'devicon:javascript' },
      { name: 'TypeScript', icon: 'devicon:typescript' },
      { name: 'Go', icon: 'devicon:go' },
      { name: 'Python', icon: 'devicon:python' },
      { name: 'Java', icon: 'devicon:java' },
      { name: 'C', icon: 'devicon:c' },
      { name: 'SQL', icon: 'devicon:postgresql' },
      { name: 'Bash', icon: 'devicon:bash' },
    ],
  },
  {
    label: 'Frontend',
    description: 'UI frameworks, styling, and browser technologies',
    skills: [
      { name: 'React', icon: 'devicon:react' },
      { name: 'HTML5', icon: 'devicon:html5' },
      { name: 'CSS3', icon: 'devicon:css3' },
      { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
      { name: 'Sass', icon: 'devicon:sass' },
      { name: 'Angular', icon: 'devicon:angularjs' },
      { name: 'Flutter', icon: 'devicon:flutter' },
      { name: 'Framer Motion', icon: 'devicon:framermotion' },
    ],
  },
  {
    label: 'Backend & Data',
    description: 'Servers, APIs, and the databases behind them',
    skills: [
      { name: 'Node.js', icon: 'devicon:nodejs' },
      { name: 'FastAPI', icon: 'devicon:fastapi' },
      { name: 'PostgreSQL', icon: 'devicon:postgresql' },
      { name: 'MySQL', icon: 'devicon:mysql' },
      { name: 'MongoDB', icon: 'devicon:mongodb' },
      { name: 'Firebase', icon: 'devicon:firebase' },
      { name: 'Redis', icon: 'devicon:redis' },
      { name: 'SQLite', icon: 'devicon:sqlite' },
    ],
  },
  {
    label: 'Tools & DevOps',
    description: 'Infrastructure, tooling, and workflow essentials',
    skills: [
      { name: 'Git', icon: 'devicon:git' },
      { name: 'Docker', icon: 'devicon:docker' },
      { name: 'Linux', icon: 'devicon:linux' },
      { name: 'Postman', icon: 'devicon:postman' },
      { name: 'OpenAI', icon: 'simple-icons:openai' },
      { name: 'Chart.js', icon: 'devicon:chartjs' },
      { name: 'Vite', icon: 'devicon:vitejs' },
      { name: 'Unity', icon: 'devicon:unity' },
    ],
  },
]
