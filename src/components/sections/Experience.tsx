import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '../../data/experience'
import { Badge } from '../ui/Badge'

export function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section id="experience" className="section-snap flex items-center relative px-6 overflow-y-auto">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto w-full py-16">
        <motion.p
          className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          &gt;_ EXPERIENCE
        </motion.p>
        <motion.h2
          className="text-5xl md:text-6xl font-black text-text-primary mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Where I've Worked
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-accent via-emerald-accent to-transparent" />

          <div className="flex flex-col gap-10">
            {experiences.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.2 }}
                className="pl-10 relative"
              >
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-blue-accent -translate-x-[5px] ring-4 ring-base" />

                <div className="bg-surface border border-border rounded-2xl p-8 hover:border-blue-accent/50 transition-colors duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h3 className="text-text-primary font-bold text-2xl">{entry.company}</h3>
                    <span className="font-mono text-text-muted text-sm">{entry.period}</span>
                  </div>
                  <p className="text-blue-light text-base font-medium mb-1">{entry.role}</p>
                  <p className="text-text-muted text-sm mb-5">{entry.location}</p>

                  <ul className="flex flex-col gap-3 mb-5">
                    {entry.bullets.map((bullet) => (
                      <li key={bullet} className="text-text-secondary text-base leading-relaxed flex gap-3">
                        <span className="text-emerald-accent mt-1.5 flex-shrink-0">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    {entry.tech.map((t) => (
                      <Badge key={t} label={t} />
                    ))}
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
