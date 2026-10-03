import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { experiences } from '../../data/experience'
import { profile } from '../../data/profile'
import { KeyTray, Reveal, Title, dropKey } from '../ui/motion'

export function Experience() {
  const logRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: logRef, offset: ['start 70%', 'end 60%'] })

  return (
    <section id="work" className="bg-panel text-blush">
      <div className="mx-auto max-w-page px-4 py-24 sm:px-8 sm:py-32">
        <header className="max-w-3xl">
          <Title className="text-[clamp(2.75rem,7vw,5.5rem)]">Work</Title>
          <Reveal as="p" className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted" delay={0.1}>
            The build log. Where the production hours went.
          </Reveal>
        </header>

        <div className="relative mt-16 sm:mt-24">
          {/* The log's spine fills in as you read down it. */}
          <div className="absolute bottom-0 left-0 top-0 hidden w-[2px] bg-line lg:block" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-rose" style={{ scaleY: scrollYProgress }} />
          </div>

          <ol ref={logRef} className="lg:pl-12">
            {experiences.map((x) => (
              <li
                key={x.id}
                id={`role-${x.id}`}
                className="grid gap-8 border-t border-line py-14 first:border-t-0 first:pt-0 lg:grid-cols-[16rem_1fr] lg:gap-14"
              >
                <Reveal className="lg:sticky lg:top-28 lg:self-start">
                  <p className="legend tabular-nums text-rose">{x.period}</p>
                  <p className="mt-3 text-2xl font-bold leading-tight">{x.company}</p>
                  <p className="mt-1 text-muted">{x.location}</p>
                </Reveal>

                <div>
                  <Reveal>
                    <h3 className="display text-[clamp(1.9rem,3.6vw,3rem)]">{x.role}</h3>
                    <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-blush/90">{x.summary}</p>
                  </Reveal>

                  <ul className="mt-8 max-w-[68ch] space-y-3">
                    {x.bullets.map((b, i) => (
                      <Reveal as="li" key={b} delay={i * 0.04} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-[0.5em] h-2 w-2 shrink-0 rounded-[2px] bg-rose/70" aria-hidden />
                        {b}
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal className="mt-10 rounded-xl bg-well p-6 sm:p-8">
                    <ul aria-label="Results" className="grid gap-4 sm:grid-cols-2">
                      {x.achievements.map((a) => (
                        <li key={a} className="flex gap-3 text-lg font-semibold leading-snug">
                          <span className="mt-[0.4em] h-2.5 w-2.5 shrink-0 rounded-[3px] bg-rose" aria-hidden />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  <KeyTray className="mt-8 flex flex-wrap gap-2">
                    {x.tech.map((t) => (
                      <motion.span key={t} variants={dropKey} className="cap cap-alpha legend text-sm">
                        <span>{t}</span>
                      </motion.span>
                    ))}
                  </KeyTray>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-6 grid gap-2 border-t border-line pt-14 lg:grid-cols-[16rem_1fr] lg:gap-14 lg:pl-12">
          <p className="legend tabular-nums text-rose">{profile.education.period}</p>
          <div>
            <p className="text-2xl font-bold">{profile.education.degree}</p>
            <p className="mt-1 text-muted">
              {profile.education.school} · {profile.education.location}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
