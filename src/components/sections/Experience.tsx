import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { experiences } from '../../data/experience'
import { Badge } from '../ui/Badge'

export function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section id="experience" className="section-snap flex items-center relative px-6">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="w-full px-12 py-16">
        {/* Section header */}
        <div className="mb-8">
          <motion.p
            className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            &gt;_ EXPERIENCE
          </motion.p>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <motion.h2
              className="text-5xl md:text-6xl font-black text-text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Where I've Worked
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-accent via-emerald-accent to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {experiences.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.15 }}
                className="md:pl-10 relative"
              >
                <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-blue-accent -translate-x-[5px] ring-4 ring-base hidden md:block" />

                <div className="bg-surface border border-border rounded-2xl hover:border-blue-accent/50 transition-colors duration-300 overflow-hidden">
                  {/* Two-column interior */}
                  <div className="grid grid-cols-1 lg:grid-cols-7">

                    {/* Left: company meta */}
                    <div className="lg:col-span-2 p-6 lg:border-r border-border flex flex-col gap-3">
                      <div>
                        <h3 className="text-text-primary font-bold text-2xl">{entry.company}</h3>
                        <p className="text-blue-light text-sm font-medium mt-0.5">{entry.role}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="font-mono text-text-muted text-xs bg-base px-3 py-1 rounded-full border border-border">
                          {entry.period}
                        </span>
                        <span className="text-text-muted text-xs flex items-center gap-1 bg-base px-3 py-1 rounded-full border border-border">
                          <Icon icon="mdi:map-marker-outline" className="w-3 h-3" />
                          {entry.location}
                        </span>
                      </div>

                      <p className="text-text-secondary text-xs leading-relaxed italic border-l-2 border-blue-accent/40 pl-3">
                        {entry.summary}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-border">
                        {entry.tech.map((t) => (
                          <Badge key={t} label={t} />
                        ))}
                      </div>
                    </div>

                    {/* Right: bullets + achievements */}
                    <div className="lg:col-span-5 p-6 flex flex-col gap-5">
                      <ul className="flex flex-col gap-2.5">
                        {entry.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-text-secondary text-sm leading-relaxed">
                            <span className="text-emerald-accent mt-0.5 flex-shrink-0">▸</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {entry.achievements && entry.achievements.length > 0 && (
                        <div className="bg-base border border-border rounded-xl p-4">
                          <p className="font-mono text-emerald-accent text-xs tracking-widest uppercase mb-3">
                            &gt;_ KEY ACHIEVEMENTS
                          </p>
                          <ul className="flex flex-col gap-2">
                            {entry.achievements.map((a) => (
                              <li key={a} className="text-text-secondary text-sm flex gap-2.5">
                                <Icon icon="mdi:trophy-outline" className="w-4 h-4 text-blue-light flex-shrink-0 mt-0.5" />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
