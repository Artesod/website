import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Icon } from '@iconify/react'
import { profile } from '../../data/profile'

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  })

  return (
    <section id="about" className="section-snap flex items-center relative px-6 overflow-y-auto">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-16">
        <div>
          <motion.p className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4" {...anim(0)}>
            &gt;_ ABOUT
          </motion.p>
          <motion.h2 className="text-5xl md:text-6xl font-black text-text-primary mb-8" {...anim(0.1)}>
            Who I Am
          </motion.h2>
          <motion.p className="text-text-secondary leading-relaxed mb-10 text-lg md:text-xl" {...anim(0.2)}>
            {profile.bio}
          </motion.p>

          <motion.div className="flex gap-12" {...anim(0.3)}>
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl font-black gradient-text">{stat.value}</div>
                <div className="text-text-muted text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div className="flex flex-col items-center gap-8" {...anim(0.2)}>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden glow-blue border border-border">
            <img
              src="/images/myProfile.jpg"
              alt="Joshua Canta"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full bg-surface border border-border rounded-2xl p-7">
            <p className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-3">&gt;_ EDUCATION</p>
            <p className="text-text-primary font-bold text-xl">{profile.education.school}</p>
            <p className="text-text-secondary text-base">{profile.education.degree}</p>
            <p className="text-text-muted text-sm mt-2">{profile.education.period} · {profile.education.location}</p>
          </div>

          <div className="flex items-center gap-2 text-text-muted text-base">
            <Icon icon="mdi:map-marker-outline" className="w-5 h-5" />
            {profile.location}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
