export interface Skill {
  name: string
  icon: string
}

export interface SkillCategory {
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', icon: 'devicon:javascript' },
      { name: 'TypeScript', icon: 'devicon:typescript' },
      { name: 'Python', icon: 'devicon:python' },
      { name: 'Java', icon: 'devicon:java' },
      { name: 'Go', icon: 'devicon:go' },
      { name: 'C', icon: 'devicon:c' },
    ],
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React', icon: 'devicon:react' },
      { name: 'HTML5', icon: 'devicon:html5' },
      { name: 'CSS3', icon: 'devicon:css3' },
      { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
      { name: 'Sass', icon: 'devicon:sass' },
      { name: 'Angular', icon: 'devicon:angularjs' },
      { name: 'Flutter', icon: 'devicon:flutter' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'devicon:nodejs' },
      { name: 'FastAPI', icon: 'devicon:fastapi' },
      { name: 'PostgreSQL', icon: 'devicon:postgresql' },
      { name: 'MySQL', icon: 'devicon:mysql' },
      { name: 'MongoDB', icon: 'devicon:mongodb' },
      { name: 'Firebase', icon: 'devicon:firebase' },
      { name: 'SQLite', icon: 'devicon:sqlite' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', icon: 'devicon:git' },
      { name: 'Docker', icon: 'devicon:docker' },
      { name: 'OpenAI', icon: 'simple-icons:openai' },
      { name: 'Chart.js', icon: 'devicon:chartjs' },
      { name: 'Unity', icon: 'devicon:unity' },
      { name: 'Postman', icon: 'devicon:postman' },
    ],
  },
]
