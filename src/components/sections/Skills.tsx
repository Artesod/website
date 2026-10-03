import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '../../data/skills'
import { usesOf } from '../../data/techIndex'
import { thockIfOn } from '../../lib/thock'
import { KeyTray, Reveal, Title, dropKey } from '../ui/motion'

// Each group ships as its own tray, kitted like a keycap set: alphas, mods, accents, novelties.
const TRAY_TONE = ['cap-alpha', 'cap-mod', 'cap-cream', 'cap-rose']

function keyWidth(name: string): number {
  if (name.length <= 3) return 1
  if (name.length <= 6) return 1.5
  if (name.length <= 9) return 2
  return 2.5
}

export function Skills() {
  const [picked, setPicked] = useState('Go')
  const uses = usesOf(picked)

  return (
    <section id="kit" className="bg-ground text-blush">
      <div className="mx-auto max-w-page px-4 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <header className="lg:sticky lg:top-28 lg:self-start">
            <Title className="text-[clamp(2.75rem,7vw,5.5rem)]">The kit</Title>
            <Reveal as="p" className="mt-5 max-w-[40ch] text-xl leading-relaxed text-muted" delay={0.1}>
              Everything on the desk, sorted into trays. Press a key to see where it's been used.
            </Reveal>
            <Reveal delay={0.15} className="mt-8 rounded-xl border border-line bg-well p-6">
              <div aria-live="polite">
                <motion.p
                  key={picked}
                  className="display text-3xl text-rose"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {picked}
                </motion.p>
                {uses.length === 0 ? (
                  <p className="mt-3 text-muted">In daily use; no public project lists it yet.</p>
                ) : (
                  <ul className="mt-3 space-y-1.5">
                    {uses.map((u) => (
                      <li key={u.kind + u.id}>
                        <a
                          href={u.kind === 'project' ? `#project-${u.id}` : `#role-${u.id}`}
                          className="underline decoration-blush/30 hover:decoration-rose"
                        >
                          {u.title}
                        </a>
                        <span className="ml-2 tabular-nums text-muted">{u.when}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </header>

          <div className="space-y-6">
            {skillCategories.map((cat, gi) => (
              <Reveal key={cat.label} className="rounded-2xl border border-line bg-[#2b252a] p-5 shadow-[inset_0_3px_12px_rgb(0_0_0/0.45)] sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-2xl font-bold">{cat.label}</h3>
                  <p className="text-base text-muted">{cat.description}</p>
                </div>
                <KeyTray className="mt-5 flex flex-wrap gap-2.5">
                  {cat.skills.map((s) => (
                    <motion.div key={s.name} variants={dropKey}>
                      <button
                        type="button"
                        aria-pressed={picked === s.name}
                        onClick={() => {
                          thockIfOn()
                          setPicked(s.name)
                        }}
                        className={`cap ${TRAY_TONE[gi % TRAY_TONE.length]} legend h-16 text-sm sm:h-[4.5rem] sm:text-base ${picked === s.name ? 'is-down' : ''}`}
                        style={{ width: `${keyWidth(s.name) * 4.5}rem` }}
                      >
                        <span>{s.name}</span>
                      </button>
                    </motion.div>
                  ))}
                </KeyTray>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
