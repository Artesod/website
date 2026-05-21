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
          className="text-5xl md:text-6xl font-black text-text-primary mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          What I Work With
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, catIdx) => (
            <div key={category.label}>
              <h3 className="text-text-muted text-sm font-mono uppercase tracking-wider mb-5 border-b border-border pb-3">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + catIdx * 0.1 + skillIdx * 0.04 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 bg-surface border border-border rounded-full text-text-secondary text-sm font-medium hover:border-blue-accent hover:text-text-primary transition-colors duration-200 cursor-default"
                  >
                    <Icon icon={skill.icon} className="w-5 h-5" />
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
