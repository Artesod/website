import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { skillCategories } from '../../data/skills'

export function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section id="skills" className="section-snap flex items-center relative px-6 overflow-y-auto">
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-blue-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto w-full py-16">
        <motion.p
          className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          &gt;_ SKILLS
        </motion.p>
        <motion.h2
          className="text-5xl md:text-6xl font-black text-text-primary mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What I Work With
        </motion.h2>
        <motion.p
          className="text-text-secondary text-lg mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Technologies I've shipped production code with across frontend, backend, and infrastructure.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.1 }}
              className="bg-surface border border-border rounded-2xl p-6 hover:border-blue-accent/30 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-text-primary text-base font-bold">{category.label}</h3>
                <span className="text-text-muted font-mono text-xs">{category.skills.length} skills</span>
              </div>
              <p className="text-text-muted text-xs mb-5">{category.description}</p>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + catIdx * 0.1 + skillIdx * 0.035 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-base border border-border rounded-full text-text-secondary text-sm font-medium hover:border-blue-accent hover:text-text-primary transition-colors duration-200 cursor-default"
                  >
                    <Icon icon={skill.icon} className="w-4 h-4" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
