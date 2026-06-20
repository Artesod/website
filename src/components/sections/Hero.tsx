import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import logo from '../../assets/logo.png'
import { profile } from '../../data/profile'
import { useTypewriter } from '../../hooks/useTypewriter'
import { Button } from '../ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export function Hero() {
  const typed = useTypewriter({ words: profile.typewriterTitles })

  return (
    <section id="hero" className="section-snap flex flex-col items-center justify-center text-center relative px-6">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl">
        <motion.div className="relative mb-8" {...fadeUp(0.1)}>
          <div className="absolute inset-0 scale-150 bg-blue-accent/20 rounded-full blur-3xl pointer-events-none" />
          <img
            src={logo}
            alt="JC"
            className="relative w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 filter invert"
          />
        </motion.div>

        {profile.available && (
          <motion.div className="mb-6" {...fadeUp(0.15)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-accent/10 border border-emerald-accent/30 rounded-full text-emerald-accent text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
              {profile.availabilityText}
            </span>
          </motion.div>
        )}

        <motion.p
          className="font-mono text-emerald-accent text-sm md:text-base tracking-widest uppercase mb-4"
          {...fadeUp(0.25)}
        >
          &gt;_ Full Stack Software Engineer
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black text-text-primary leading-none mb-4"
          {...fadeUp(0.4)}
        >
          {profile.firstName}{' '}
          <span className="gradient-text">{profile.lastName}</span>
        </motion.h1>

        <motion.p
          className="font-mono text-text-secondary text-lg md:text-xl h-8 mb-8"
          {...fadeUp(0.55)}
        >
          {typed}
          <span className="animate-pulse text-emerald-accent">|</span>
        </motion.p>

        <motion.div className="flex flex-wrap items-center gap-5 mb-8" {...fadeUp(0.7)}>
          <Button
            variant="primary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Projects ↓
          </Button>
          <Button variant="outline" href={profile.resumeUrl}>
            Resume
          </Button>
        </motion.div>

        <motion.div className="flex items-center gap-6 mb-10" {...fadeUp(0.85)}>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <Icon icon="mdi:github" className="w-7 h-7" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-blue-light transition-colors duration-200"
          >
            <Icon icon="mdi:linkedin" className="w-7 h-7" />
          </a>
          <a
            href={profile.social.email}
            className="text-text-muted hover:text-emerald-light transition-colors duration-200"
          >
            <Icon icon="mdi:email-outline" className="w-7 h-7" />
          </a>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-text-muted text-sm font-mono"
          {...fadeUp(0.95)}
        >
          <span className="flex items-center gap-1.5">
            <Icon icon="mdi:map-marker-outline" className="w-4 h-4 text-emerald-accent" />
            {profile.location}
          </span>
          <span className="hidden sm:block w-px h-3 bg-border" />
          <span className="flex items-center gap-1.5">
            <Icon icon="mdi:briefcase-outline" className="w-4 h-4 text-blue-light" />
            {profile.stats[0].value} {profile.stats[0].label}
          </span>
          <span className="hidden sm:block w-px h-3 bg-border" />
          <span className="flex items-center gap-1.5">
            <Icon icon="mdi:code-braces" className="w-4 h-4 text-emerald-accent" />
            {profile.stats[2].value} Technologies
          </span>
        </motion.div>
      </div>
    </section>
  )
}
