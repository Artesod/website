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

      <div ref={ref} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start py-20">
        {/* Left column */}
        <div>
          <motion.p className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4" {...anim(0)}>
            &gt;_ ABOUT
          </motion.p>
          <motion.h2 className="text-5xl md:text-6xl font-black text-text-primary mb-6" {...anim(0.1)}>
            Who I Am
          </motion.h2>
          <motion.p className="text-text-secondary leading-relaxed mb-4 text-lg" {...anim(0.2)}>
            {profile.bio}
          </motion.p>
          <motion.p className="text-text-secondary leading-relaxed mb-8 text-base" {...anim(0.25)}>
            {profile.bioExtended}
          </motion.p>

          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8" {...anim(0.3)}>
            {profile.stats.map((stat) => (
              <div key={stat.label} className="bg-surface border border-border rounded-2xl p-4 text-center">
                <div className="text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-text-muted text-xs mt-1 leading-snug">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div className="bg-surface border border-border rounded-2xl p-5" {...anim(0.35)}>
            <p className="font-mono text-blue-light text-xs tracking-widest uppercase mb-3">&gt;_ CURRENTLY BUILDING</p>
            <p className="text-text-secondary text-sm leading-relaxed">{profile.currentlyBuilding}</p>
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div className="flex flex-col gap-6" {...anim(0.2)}>
          <div className="w-full aspect-square max-w-xs mx-auto lg:mx-0 rounded-3xl overflow-hidden glow-blue border border-border">
            <img
              src="/images/myProfile.jpg"
              alt="Joshua Canta"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="font-mono text-emerald-accent text-xs tracking-widest uppercase mb-4">&gt;_ EDUCATION</p>
            <p className="text-text-primary font-bold text-lg">{profile.education.school}</p>
            <p className="text-text-secondary text-sm">{profile.education.degree}</p>
            <p className="text-text-muted text-xs mt-1">{profile.education.period} · {profile.education.location}</p>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <p className="font-mono text-emerald-accent text-xs tracking-widest uppercase mb-4">&gt;_ INTERESTS</p>
            <div className="grid grid-cols-2 gap-3">
              {profile.interests.map((interest) => (
                <div key={interest.label} className="flex items-center gap-2.5 text-text-secondary text-sm">
                  <Icon icon={interest.icon} className="w-4 h-4 text-blue-light flex-shrink-0" />
                  {interest.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-text-muted text-sm px-1">
            <Icon icon="mdi:map-marker-outline" className="w-4 h-4" />
            {profile.location}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
