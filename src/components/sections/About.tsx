import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { profile } from '../../data/profile'
import { KeyTray, Reveal, Title, dropKey } from '../ui/motion'

// Novelty caps on the desk, deliberately not uniform.
const ARTISANS = [
  { tone: 'cap-rose', size: 'h-28' },
  { tone: 'cap-alpha', size: 'h-24' },
  { tone: 'cap-cream', size: 'h-24' },
  { tone: 'cap-rose', size: 'h-28' },
]

export function About() {
  return (
    <section id="about" className="bg-ground text-blush">
      <div className="mx-auto max-w-page px-4 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end lg:gap-16">
          <Title className="text-[clamp(2.75rem,7vw,5.5rem)]">About</Title>
          <Reveal as="p" className="max-w-[62ch] text-xl leading-relaxed" delay={0.1}>
            {profile.bio}
          </Reveal>
        </div>

        {/* The desk mat: the person, the current build, and what's off the clock. */}
        <Reveal className="mt-14 rounded-[28px] border border-line bg-panel p-5 shadow-[0_24px_40px_-24px_rgb(0_0_0/0.9)] sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14">
            <motion.div
              className="self-start lg:mt-4"
              initial={{ rotate: 6, y: 40, opacity: 0 }}
              whileInView={{ rotate: -3, y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            >
              <figure className="cap cap-cream block w-full max-w-sm p-2.5 pb-5">
                <img
                  src="/images/myProfile.jpg"
                  alt="Joshua Canta"
                  className="aspect-[4/5] w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <figcaption className="legend mt-3 inline-flex items-center gap-1.5 px-1 text-sm">
                  <Icon icon="mdi:map-marker-outline" className="h-4 w-4" aria-hidden />
                  {profile.location} · open to remote
                </figcaption>
              </figure>
            </motion.div>

            <div className="flex flex-col gap-10">
              <p className="max-w-[60ch] text-lg leading-relaxed text-muted">{profile.bioExtended}</p>

              <p className="display max-w-[22ch] text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight">
                Currently building <span className="text-rose">{profile.currentlyBuilding}</span>
              </p>

              <div>
                <h3 className="text-xl font-bold">Off the clock</h3>
                <KeyTray className="mt-5 grid grid-cols-2 items-end gap-3 xl:grid-cols-4">
                  {profile.interests.map((it, i) => {
                    const a = ARTISANS[i % ARTISANS.length]
                    return (
                      <motion.div
                        key={it.label}
                        variants={dropKey}
                        className={`cap ${a.tone} legend ${a.size} w-full flex-col justify-between`}
                      >
                        <Icon icon={it.icon} className="h-8 w-8" aria-hidden />
                        <span className="text-base leading-tight">{it.label}</span>
                      </motion.div>
                    )
                  })}
                </KeyTray>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
