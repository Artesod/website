import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { projects } from '../../data/projects'
import { Badge } from '../ui/Badge'

export function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section id="projects" className="section-snap flex items-center relative px-6 overflow-y-auto">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-accent/8 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto w-full py-16">
        <motion.p
          className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          &gt;_ PROJECTS
        </motion.p>
        <motion.h2
          className="text-5xl md:text-6xl font-black text-text-primary mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What I've Built
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
              className={`bg-surface border border-border rounded-3xl p-8 flex flex-col gap-5 hover:border-blue-accent/50 transition-colors duration-300 group ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {project.featured && (
                <span className="font-mono text-emerald-accent text-sm tracking-widest uppercase">
                  Featured Project
                </span>
              )}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-text-primary font-bold text-2xl md:text-3xl group-hover:text-blue-light transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-text-muted text-sm font-mono">{project.year}</span>
                </div>
                <div className="flex gap-4 flex-shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-text-primary transition-colors duration-200"
                    >
                      <Icon icon="mdi:github" className="w-6 h-6" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-emerald-accent transition-colors duration-200"
                    >
                      <Icon icon="mdi:open-in-new" className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-text-secondary text-base md:text-lg leading-relaxed">{project.longDescription}</p>

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((t) => (
                  <Badge key={t} label={t} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
