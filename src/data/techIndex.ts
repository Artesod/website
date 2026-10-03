import { projects } from './projects'
import { experiences } from './experience'
import { skillCategories } from './skills'

export interface TechUse {
  kind: 'project' | 'role'
  id: string
  title: string
  when: string
}

export interface TechEntry {
  name: string
  uses: TechUse[]
  inKit: boolean
}

const ALIASES: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  golang: 'go',
  postgres: 'postgresql',
  pg: 'postgresql',
  psql: 'postgresql',
  node: 'nodejs',
  rest: 'restapis',
  api: 'restapis',
  apis: 'restapis',
  tailwind: 'tailwindcss',
  gpt: 'openaiapi',
  openai: 'openaiapi',
  ai: 'openaiapi',
  mongo: 'mongodb',
  html: 'html5',
  css: 'css3',
  framer: 'framermotion',
}

export function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9+#]/g, '')
}

function buildIndex(): Map<string, TechEntry> {
  const index = new Map<string, TechEntry>()
  const entry = (name: string) => {
    const key = normalize(name)
    let e = index.get(key)
    if (!e) {
      e = { name, uses: [], inKit: false }
      index.set(key, e)
    }
    return e
  }

  for (const p of projects) {
    for (const t of p.tech) {
      entry(t).uses.push({ kind: 'project', id: p.id, title: p.title, when: String(p.year) })
    }
  }
  for (const x of experiences) {
    for (const t of x.tech) {
      entry(t).uses.push({ kind: 'role', id: x.id, title: `${x.role}, ${x.company}`, when: x.period })
    }
  }
  for (const c of skillCategories) {
    for (const s of c.skills) entry(s.name).inKit = true
  }
  return index
}

export const techIndex = buildIndex()

/** Best-first matches for what the visitor typed. Exact and alias hits beat prefix hits. */
export function searchTech(query: string, limit = 3): TechEntry[] {
  const q = normalize(query)
  if (q.length === 0) return []
  const target = ALIASES[q] ?? q
  const exact = techIndex.get(target)
  const results: TechEntry[] = exact ? [exact] : []
  if (q.length >= 2) {
    for (const [key, e] of techIndex) {
      if (e === exact) continue
      if (key.startsWith(target) || (target.length >= 3 && key.includes(target))) results.push(e)
    }
  }
  return results
    .sort((a, b) => (a === exact ? -1 : b === exact ? 1 : b.uses.length - a.uses.length))
    .slice(0, limit)
}

export function usesOf(name: string): TechUse[] {
  return techIndex.get(normalize(name))?.uses ?? []
}
