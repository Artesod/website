import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { projects } from '../../data/projects'
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
            {rest.map((project, idx) => (
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
