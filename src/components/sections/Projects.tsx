import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { projects, type Project } from '../../data/projects'
import { KeyTray, Parallax, Reveal, Title, dropKey } from '../ui/motion'

interface Colorway {
  name: string
  mat: string
  caption: string
  caps: { cap: string; side: string; ink: string }[]
}

// Every project ships as its own keycap set.
const COLORWAYS: Record<string, Colorway> = {
  // Taken from Rebel Budget's own palette: red shell, LCD green, brass buttons, chrome keys.
  'rebel-budget': {
    name: 'Pocket Pet',
    mat: '#561014',
    caption: '#ecc463',
    caps: [
      { cap: '#b8c4a0', side: '#9dab87', ink: '#1d2320' },
      { cap: '#a3262a', side: '#7a1a1e', ink: '#e8ecef' },
      { cap: '#d9a93a', side: '#9c7420', ink: '#1d2320' },
      { cap: '#e8ecef', side: '#aeb6bb', ink: '#1d2320' },
    ],
  },
  'perfect-season': {
    name: 'Eighty-Two',
    mat: '#100f1a',
    caption: '#29d8f2',
    caps: [
      { cap: '#2a2742', side: '#1b1930', ink: '#f4f2fc' },
      { cap: '#ff2e97', side: '#c71a72', ink: '#100f1a' },
      { cap: '#29d8f2', side: '#159db2', ink: '#100f1a' },
    ],
  },
  'percipia-website': {
    name: 'Front Desk',
    mat: '#0b110b',
    caption: '#7ce36a',
    caps: [
      { cap: '#1e231e', side: '#121612', ink: '#e9f5e6' },
      { cap: '#6fd35d', side: '#4a9b3c', ink: '#0b110b' },
      { cap: '#e9f0e7', side: '#bfc8bd', ink: '#0b110b' },
    ],
  },
  'personal-website': {
    name: 'Olivia Dark',
    mat: '#2b252a',
    caption: '#e8a2a8',
    caps: [
      { cap: '#262226', side: '#171417', ink: '#f3d9d4' },
      { cap: '#e8a2a8', side: '#b9757c', ink: '#1a1518' },
      { cap: '#1d1a1d', side: '#0f0d0f', ink: '#e8a2a8' },
      { cap: '#efe6dc', side: '#c4b8ab', ink: '#1a1518' },
    ],
  },
}

const FALLBACK = COLORWAYS['personal-website']

export function Projects() {
  // Live work with real screenshots leads; projects without a public build follow.
  const ordered = [...projects].sort((a, b) => Number(Boolean(b.shots)) - Number(Boolean(a.shots)))
  return (
    <section id="projects" className="bg-ground text-blush">
      <div className="mx-auto max-w-page px-4 py-24 sm:px-8 sm:py-32">
        <header className="max-w-3xl">
          <Title className="text-[clamp(2.75rem,7vw,5.5rem)]">Projects</Title>
          <Reveal as="p" className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted" delay={0.1}>
            Each one gets its own colorway. The keys are the stack it actually runs on.
          </Reveal>
        </header>

        <div className="mt-16 space-y-28 sm:mt-24 sm:space-y-40">
          {ordered.map((p, i) => (
            <ProjectSet key={p.id} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectSet({ project: p, flip }: { project: Project; flip: boolean }) {
  const cw = COLORWAYS[p.id] ?? FALLBACK
  return (
    <article id={`project-${p.id}`} className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <Board project={p} colorway={cw} className={flip ? 'lg:order-2' : ''} />

      <Reveal>
        <h3 className={`display ${p.featured ? 'text-[clamp(2.5rem,5vw,4.25rem)]' : 'text-[clamp(2rem,4vw,3.25rem)]'}`}>
          {p.title}
        </h3>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-blush/90">{p.longDescription}</p>
        <ul className="mt-6 max-w-[60ch] space-y-2.5">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3 leading-relaxed text-muted">
              <span className="mt-[0.45em] h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: cw.caption }} aria-hidden />
              {h}
            </li>
          ))}
        </ul>
        {(p.liveUrl || p.githubUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="cap cap-rose legend">
                <span className="inline-flex items-center gap-1.5 px-1">
                  {p.id === 'perfect-season' ? 'Play it' : 'Visit live'}
                  <Icon icon="mdi:arrow-top-right" className="h-4 w-4" aria-hidden />
                </span>
              </a>
            )}
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="cap cap-alpha legend">
                <span className="inline-flex items-center gap-1.5 px-1">
                  <Icon icon="mdi:github" className="h-4 w-4" aria-hidden />
                  Source
                </span>
              </a>
            )}
          </div>
        )}
      </Reveal>
    </article>
  )
}

/** The project's desk: real screenshots on its colorway mat, its stack as keycaps in front. */
function Board({ project: p, colorway: cw, className = '' }: { project: Project; colorway: Colorway; className?: string }) {
  const [hero, behind] = p.shots ?? []
  return (
    <figure
      className={`relative overflow-hidden rounded-[24px] p-5 sm:p-8 ${className}`}
      style={{ background: cw.mat, boxShadow: `0 30px 60px -30px ${cw.caption}40` }}
    >
      {hero && (
        <div className="relative mb-[-0.75rem] pr-3 pt-3 sm:mb-[-1rem]">
          {behind && (
            <motion.img
              src={behind.src}
              alt={behind.alt}
              loading="lazy"
              className="absolute -right-4 -top-1 w-[62%] rounded-xl border border-white/10 shadow-[0_24px_50px_-10px_rgb(0_0_0/0.95)]"
              initial={{ rotate: 0, x: -30 }}
              whileInView={{ rotate: 4, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <Parallax distance={24} className="relative">
            <img
              src={hero.src}
              alt={hero.alt}
              loading="lazy"
              className="w-full rounded-xl border border-white/10 shadow-[0_24px_50px_-12px_rgb(0_0_0/0.9)]"
            />
          </Parallax>
        </div>
      )}

      <KeyTray className={`relative flex flex-wrap gap-2 sm:gap-3 ${hero ? 'pl-2' : 'py-6'}`}>
        {p.tech.map((t, i) => {
          const c = cw.caps[i % cw.caps.length]
          const style = { '--cap': c.cap, '--side': c.side, '--ink': c.ink } as CSSProperties
          return (
            <motion.span
              key={t}
              variants={dropKey}
              className={`cap legend min-w-[calc(var(--mw)*0.72)] sm:min-w-[var(--mw)] ${hero ? 'min-h-[2.75rem] text-xs sm:min-h-[3.75rem] sm:text-sm' : 'min-h-[3.75rem] text-sm sm:min-h-[5rem] sm:text-base'}`}
              style={{ ...style, '--mw': `${Math.max(3.25, t.length * 0.58 + 1.5)}rem` } as CSSProperties}
            >
              <span>{t}</span>
            </motion.span>
          )
        })}
      </KeyTray>

      <figcaption className="legend mt-7 flex items-baseline justify-between gap-4 text-xs" style={{ color: cw.caption }}>
        <span>
          {p.title} · Colorway “{cw.name}”
        </span>
        <span className="whitespace-nowrap tabular-nums">
          {p.year} · {p.tech.length} keys
        </span>
      </figcaption>
    </figure>
  )
}
