import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { projects, type Project } from '../../data/projects'
import { Badge } from '../ui/Badge'

export function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-snap flex items-center relative px-6">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto w-full py-20">
        {/* Section header */}
        <div className="mb-10">
          <motion.p
            className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            &gt;_ PROJECTS
          </motion.p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <motion.h2
              className="text-5xl md:text-6xl font-black text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              What I've Built
            </motion.h2>
            <motion.p
              className="text-text-secondary text-base max-w-sm text-right hidden md:block"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A selection of personal and professional projects.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Featured project — full-width horizontal card */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface border border-border rounded-3xl p-8 hover:border-blue-accent/50 transition-colors duration-300 group"
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-emerald-accent text-xs tracking-widest uppercase block mb-1">★ Featured Project</span>
                  <h3 className="text-text-primary font-bold text-3xl md:text-4xl group-hover:text-blue-light transition-colors duration-300">
                    {featured.title}
                  </h3>
                  <span className="text-text-muted text-sm font-mono">{featured.year}</span>
                </div>
                <div className="flex gap-4 flex-shrink-0 items-center pt-1">
                  {featured.githubUrl && (
                    <a href={featured.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="text-text-muted hover:text-text-primary transition-colors duration-200 flex items-center gap-1.5 text-sm">
                      <Icon icon="mdi:github" className="w-5 h-5" />
                      <span className="hidden sm:inline">Source</span>
                    </a>
                  )}
                  {featured.liveUrl && (
                    <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="text-text-muted hover:text-emerald-accent transition-colors duration-200 flex items-center gap-1.5 text-sm">
                      <Icon icon="mdi:open-in-new" className="w-5 h-5" />
                      <span className="hidden sm:inline">Live</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Two-column body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                <div className="flex flex-col gap-4">
                  <p className="text-text-secondary text-base leading-relaxed">{featured.longDescription}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-border">
                    {featured.tech.map((t) => <Badge key={t} label={t} />)}
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {featured.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
                      <span className="text-emerald-accent mt-0.5 flex-shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Remaining projects — 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((project, idx) => project.theme === 'perfect-season' ? (
              <PerfectSeasonCard key={project.id} project={project} inView={inView} delay={0.35 + idx * 0.1} />
            ) : (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + idx * 0.1 }}
                className="bg-surface border border-border rounded-2xl p-6 hover:border-blue-accent/50 transition-colors duration-300 group flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-text-primary font-bold text-xl group-hover:text-blue-light transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-text-muted text-xs font-mono">{project.year}</span>
                  </div>
                  <div className="flex gap-3 flex-shrink-0 items-center">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors duration-200">
                        <Icon icon="mdi:github" className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="text-text-muted hover:text-emerald-accent transition-colors duration-200">
                        <Icon icon="mdi:open-in-new" className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed">{project.longDescription}</p>

                <ul className="flex flex-col gap-1.5">
                  {project.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex gap-2.5 text-text-muted text-xs leading-relaxed">
                      <span className="text-emerald-accent flex-shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-border">
                  {project.tech.map((t) => <Badge key={t} label={t} />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Mirrors the neon pink/cyan look of the Perfect Season app itself
function PerfectSeasonCard({ project, inView, delay }: { project: Project; inView: boolean; delay: number }) {
  const [first, ...restWords] = project.title.split(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="relative overflow-hidden rounded-2xl p-6 flex flex-col gap-4 border border-[#2a2742] bg-[#100f1a] text-[#c9c6da] hover:border-[#ff2e97] hover:shadow-[0_0_24px_#ff2e974d] transition-[border-color,box-shadow] duration-300"
      style={{
        background:
          'radial-gradient(500px 220px at 0% -10%, #ff2e9722, transparent), radial-gradient(500px 220px at 100% -10%, #29d8f21c, transparent), #100f1a',
        fontFamily: 'system-ui, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3
            className="uppercase tracking-[3px] text-xl text-[#f4f2fc]"
            style={{ fontFamily: '"Segoe UI Semibold", "Arial Narrow", system-ui, sans-serif' }}
          >
            {first}{' '}
            <span className="text-[#ff2e97] [text-shadow:0_0_16px_#ff2e9773]">{restWords.join(' ')}</span>
          </h3>
          <span className="text-[#29d8f2] text-xs uppercase tracking-[2px] font-semibold [text-shadow:0_0_10px_#29d8f273]">
            Go 82–0. Or go home.
          </span>
        </div>
        <div className="flex gap-3 flex-shrink-0 items-center">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#85819e] hover:text-[#f4f2fc] transition-colors duration-200">
              <Icon icon="mdi:github" className="w-5 h-5" />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-[#85819e] hover:text-[#ff2e97] transition-colors duration-200">
              <Icon icon="mdi:open-in-new" className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm leading-relaxed">{project.longDescription}</p>

      <ul className="flex flex-col gap-1.5">
        {project.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex gap-2.5 text-[#85819e] text-xs leading-relaxed">
            <span className="text-[#ff2e97] flex-shrink-0">▸</span>
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-[#2a2742]">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 rounded-xl bg-[#29d8f21f] text-[#29d8f2] text-xs font-semibold whitespace-nowrap"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
