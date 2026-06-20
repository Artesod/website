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
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 scale-150 bg-blue-accent/20 rounded-full blur-3xl pointer-events-none" />

          {/* Sonar ring 1 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-accent/50 pointer-events-none"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.4, delay: 0.55, ease: 'easeOut' }}
          />

          {/* Sonar ring 2 */}
          <motion.div
            className="absolute inset-0 rounded-full border border-blue-accent/25 pointer-events-none"
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 0, scale: 3.0 }}
            transition={{ duration: 1.8, delay: 0.75, ease: 'easeOut' }}
          />

          <img
            src={logo}
            alt="JC"
            className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 filter invert"
          />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black text-text-primary leading-none mb-4"
          {...fadeUp(0.25)}
        >
          {profile.firstName}{' '}
          <span className="gradient-text">{profile.lastName}</span>
        </motion.h1>

        <motion.p
          className="font-mono text-text-secondary text-lg md:text-xl h-8 mb-8"
          {...fadeUp(0.4)}
        >
          {typed}
          <span className="animate-pulse text-emerald-accent">|</span>
        </motion.p>

        <motion.div className="flex flex-wrap items-center gap-5 mb-8" {...fadeUp(0.55)}>
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

        <motion.div className="flex items-center gap-6 mb-10" {...fadeUp(0.7)}>
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
          {...fadeUp(0.8)}
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
