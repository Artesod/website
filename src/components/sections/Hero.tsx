import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { profile } from '../../data/profile'
import { searchTech } from '../../data/techIndex'
import { loadThock, setSoundOn, thock, thockIfOn } from '../../lib/thock'
import { motion } from 'framer-motion'
import { SETTLE } from '../ui/motion'

type Tone = 'alpha' | 'mod' | 'rose' | 'cream'

interface KeyDef {
  code: string
  label: string
  shift?: string
  w?: number
  tone?: Tone
  icon?: string
  /** Section id the key scrolls to, or a special action. */
  go?: string
  action?: 'sound' | 'clear' | 'back' | 'space'
  logo?: boolean
  wide?: boolean
}

const letters = (s: string): KeyDef[] => s.split('').map((c) => ({ code: `Key${c}`, label: c }))
const SHIFTED = '!@#$%^&*()'

const ROWS: KeyDef[][] = [
  [
    { code: 'Escape', label: 'Esc', tone: 'rose', action: 'clear' },
    ...'1234567890'.split('').map((d, i) => ({ code: `Digit${d}`, label: d, shift: SHIFTED[i] })),
    { code: 'Minus', label: '-', shift: '_' },
    { code: 'Equal', label: '=', shift: '+' },
    { code: 'Backspace', label: 'Backspace', w: 2, tone: 'mod', action: 'back', wide: true },
    { code: 'Home', label: 'Work', tone: 'cream', icon: 'mdi:briefcase-outline', go: 'work' },
  ],
  [
    { code: 'Tab', label: 'Tab', w: 1.5, tone: 'mod', wide: true },
    ...letters('QWERTYUIOP'),
    { code: 'BracketLeft', label: '[', shift: '{' },
    { code: 'BracketRight', label: ']', shift: '}' },
    { code: 'Backslash', label: '\\', shift: '|', w: 1.5 },
    { code: 'PageUp', label: 'Projects', tone: 'cream', icon: 'mdi:package-variant-closed', go: 'projects' },
  ],
  [
    { code: 'CapsLock', label: 'Caps', w: 1.75, tone: 'mod', wide: true },
    ...letters('ASDFGHJKL'),
    { code: 'Semicolon', label: ';', shift: ':' },
    { code: 'Quote', label: "'", shift: '"' },
    { code: 'Enter', label: 'Hire me', w: 2.25, tone: 'rose', icon: 'mdi:keyboard-return', go: 'contact', wide: true },
    { code: 'PageDown', label: 'About', tone: 'cream', icon: 'mdi:account-outline', go: 'about' },
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', w: 2.25, tone: 'mod', wide: true },
    ...letters('ZXCVBNM'),
    { code: 'Comma', label: ',', shift: '<' },
    { code: 'Period', label: '.', shift: '>' },
    { code: 'Slash', label: '/', shift: '?' },
    { code: 'ShiftRight', label: 'Shift', w: 1.75, tone: 'mod', wide: true },
    { code: 'ArrowUp', label: '', icon: 'mdi:arrow-up', tone: 'mod' },
    { code: 'End', label: 'Kit', tone: 'cream', icon: 'mdi:toolbox-outline', go: 'kit' },
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', w: 1.25, tone: 'mod', wide: true },
    { code: 'MetaLeft', label: '', w: 1.25, tone: 'rose', logo: true, wide: true },
    { code: 'AltLeft', label: 'Alt', w: 1.25, tone: 'mod', wide: true },
    { code: 'Space', label: 'Joshua Canta', w: 6.25, action: 'space', wide: true },
    { code: 'AltRight', label: 'Alt', tone: 'mod' },
    { code: 'Fn', label: 'Sound', tone: 'mod', action: 'sound', icon: 'mdi:volume-high' },
    { code: 'ControlRight', label: 'Ctrl', tone: 'mod' },
    { code: 'ArrowLeft', label: '', icon: 'mdi:arrow-left', tone: 'mod' },
    { code: 'ArrowDown', label: '', icon: 'mdi:arrow-down', tone: 'mod' },
    { code: 'ArrowRight', label: '', icon: 'mdi:arrow-right', tone: 'mod' },
  ],
]

const QUICK_PICKS = ['React', 'Go', 'TypeScript', 'PostgreSQL', 'Docker', 'Python']
const DEMO_WORD = 'react'

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Hero() {
  const [query, setQuery] = useState('')
  const [down, setDown] = useState<Set<string>>(() => new Set())
  const [sound, setSound] = useState(false)
  const touched = useRef(false)
  const inView = useRef(true)
  const sectionRef = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const soundRef = useRef(sound)
  soundRef.current = sound

  const matches = useMemo(() => searchTech(query), [query])

  const press = useCallback((code: string, wide = false) => {
    setDown((d) => new Set(d).add(code))
    if (soundRef.current) thock(wide)
  }, [])
  const release = useCallback((code: string) => {
    setDown((d) => {
      if (!d.has(code)) return d
      const n = new Set(d)
      n.delete(code)
      return n
    })
  }, [])
  const tap = useCallback(
    (code: string, wide = false) => {
      press(code, wide)
      window.setTimeout(() => release(code), 110)
    },
    [press, release],
  )

  // Only listen for typing while the keyboard is on screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Mirror physical keystrokes onto the board and route typing into the query.
  useEffect(() => {
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))

    const onDown = (e: KeyboardEvent) => {
      if (!inView.current || e.repeat) return
      touched.current = true
      const code = e.code === 'MetaRight' ? 'MetaLeft' : e.code
      press(code, code === 'Space' || code === 'Enter' || code === 'Backspace')
      if (isField(e.target) || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key.length === 1 && /[\w+#. -]/.test(e.key)) {
        if (e.key === ' ') e.preventDefault()
        setQuery((q) => (q + e.key).slice(0, 24))
      } else if (e.key === 'Backspace') {
        setQuery((q) => q.slice(0, -1))
      } else if (e.key === 'Escape') {
        setQuery('')
      }
    }
    const onUp = (e: KeyboardEvent) => release(e.code === 'MetaRight' ? 'MetaLeft' : e.code)
    const onBlur = () => setDown(new Set())
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [press, release])

  // One idle demo: if nobody has touched the board, it types a word by itself.
  useEffect(() => {
    const timers: number[] = []
    const start = window.setTimeout(() => {
      if (touched.current) return
      if (prefersReducedMotion()) {
        setQuery(DEMO_WORD)
        return
      }
      DEMO_WORD.split('').forEach((ch, i) => {
        timers.push(
          window.setTimeout(() => {
            if (touched.current && i === 0) return
            tap(`Key${ch.toUpperCase()}`)
            setQuery((q) => q + ch)
          }, i * 170),
        )
      })
    }, 1800)
    return () => {
      window.clearTimeout(start)
      timers.forEach(window.clearTimeout)
    }
  }, [tap])

  function onKeyClick(k: KeyDef) {
    touched.current = true
    tap(k.code, k.wide)
    if (k.go) return scrollToId(k.go)
    switch (k.action) {
      case 'sound':
        setSound((s) => {
          setSoundOn(!s)
          if (!s) void loadThock().then(() => thock())
          return !s
        })
        return
      case 'clear':
        return setQuery('')
      case 'back':
        return setQuery((q) => q.slice(0, -1))
      case 'space':
        return setQuery((q) => (q + ' ').slice(0, 24))
    }
    if (k.code.startsWith('Key') || k.code.startsWith('Digit')) setQuery((q) => (q + k.label.toLowerCase()).slice(0, 24))
  }

  return (
    <section ref={sectionRef} id="top" className="relative bg-ground pt-24 pb-16 sm:pb-24 overflow-hidden">
      <div className="mx-auto max-w-page px-4 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 items-end">
          <div className="min-w-0">
            <div className="flex items-center gap-5 sm:gap-8">
              <LogoCap />
              <h1 className="display text-blush text-[clamp(3rem,8.5vw,6rem)]">
                Joshua
                <br />
                Canta
              </h1>
            </div>
            <p className="mt-6 max-w-[34ch] text-lg sm:text-xl leading-snug text-blush/85">
              Full stack engineer. React on the front, Go on the back, five years shipping software for hotels and resorts.
            </p>
            {profile.available && (
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-rose">
                <span className="h-2 w-2 rounded-full bg-rose" aria-hidden />
                {profile.availabilityText}
              </p>
            )}
          </div>

          <form
            role="search"
            className="w-full min-w-0"
            onSubmit={(e) => {
              e.preventDefault()
              const first = matches[0]?.uses[0]
              if (first) scrollToId(first.kind === 'project' ? `project-${first.id}` : `role-${first.id}`)
            }}
          >
            <label htmlFor="tech-query" className="block text-base text-blush/80">
              Type a technology. See where I've shipped it.
            </label>
            <div className="mt-3 flex items-center gap-3 rounded-xl bg-well px-4 py-3 shadow-[inset_0_2px_6px_rgb(0_0_0/0.5)]">
              <Icon icon="mdi:magnify" className="h-6 w-6 shrink-0 text-rose" aria-hidden />
              <input
                id="tech-query"
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  touched.current = true
                  setQuery(e.target.value.slice(0, 24))
                }}
                autoComplete="off"
                spellCheck={false}
                placeholder="react, go, postgres…"
                className="legend min-w-0 flex-1 bg-transparent text-2xl text-blush placeholder:text-muted/70 outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    touched.current = true
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                  className="cap cap-alpha text-xs legend"
                >
                  <span>Esc</span>
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Quick picks">
              {QUICK_PICKS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    touched.current = true
                    setQuery(t.toLowerCase())
                  }}
                  className="cap cap-alpha legend text-sm"
                >
                  <span>{t}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-pressed={sound}
              onClick={() => {
                touched.current = true
                const next = !sound
                setSound(next)
                setSoundOn(next)
                if (next) void loadThock().then(() => thock())
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted hover:text-blush"
            >
              <Icon icon={sound ? 'mdi:volume-high' : 'mdi:volume-off'} className="h-4 w-4 text-rose" aria-hidden />
              {sound ? 'Switch sounds on' : 'Turn on switch sounds'}
            </button>
            <Readout query={query} matches={matches} />
          </form>
        </div>

        <Keyboard down={down} sound={sound} onKey={onKeyClick} />
      </div>
    </section>
  )
}

function Readout({ query, matches }: { query: string; matches: ReturnType<typeof searchTech> }) {
  return (
    <div aria-live="polite" className="mt-5 min-h-[7.5rem] text-[0.95rem]">
      {!query.trim() ? (
        <p className="text-muted">Or just mash keys. The board below listens to your real keyboard.</p>
      ) : matches.length === 0 ? (
        <p className="text-muted">
          Nothing shipped with “<span className="text-blush">{query.trim()}</span>” yet. Try Go or TypeScript.
        </p>
      ) : (
        <ul className="space-y-3">
          {matches.map((m) => (
            <li key={m.name}>
              <p className="legend text-blush">
                {m.name}
                <span className="ml-2 font-normal text-muted">
                  {m.uses.length > 0
                    ? `${m.uses.length} ${m.uses.length === 1 ? 'place' : 'places'}`
                    : 'in the kit, nothing public yet'}
                </span>
              </p>
              {m.uses.length > 0 && (
                <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  {m.uses.map((u) => (
                    <a
                      key={u.kind + u.id}
                      href={u.kind === 'project' ? `#project-${u.id}` : `#role-${u.id}`}
                      className="text-rose underline decoration-rose/40 hover:decoration-rose"
                    >
                      {u.title}
                    </a>
                  ))}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function Keyboard({ down, sound, onKey }: { down: Set<string>; sound: boolean; onKey: (k: KeyDef) => void }) {
  return (
    <div className="kb-scroll mt-12 sm:mt-16 [container-type:inline-size]">
      <div
        className="kb-case mx-auto rounded-[clamp(10px,2cqw,22px)] bg-[#3a3238] p-[clamp(6px,1.6cqw,18px)] shadow-[0_30px_50px_-20px_rgb(0_0_0/0.7),0_2px_0_rgb(255_255_255/0.07)_inset]"
        aria-label="Keyboard. Keys mirror what you type; labeled keys navigate the page."
        role="group"
      >
        <div className="rounded-[clamp(6px,1.2cqw,14px)] bg-[#2b252a] p-[clamp(3px,0.8cqw,9px)]">
          {ROWS.map((row, r) => (
            <motion.div
              key={r}
              className="kb-row"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SETTLE, delay: 0.25 + r * 0.07 }}
            >
              {row.map((k) => (
                <Key key={k.code} k={k} isDown={down.has(k.code)} sound={sound} onKey={onKey} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Key({ k, isDown, sound, onKey }: { k: KeyDef; isDown: boolean; sound: boolean; onKey: (k: KeyDef) => void }) {
  const tone = k.tone ?? 'alpha'
  const isNav = Boolean(k.go)
  const name = k.go ? `Go to ${k.label}` : k.action === 'sound' ? `Key sound ${sound ? 'on' : 'off'}` : undefined
  return (
    <button
      type="button"
      tabIndex={isNav || k.action === 'sound' ? 0 : -1}
      aria-label={name}
      aria-pressed={k.action === 'sound' ? sound : undefined}
      aria-hidden={isNav || k.action === 'sound' ? undefined : true}
      onClick={() => onKey(k)}
      className={`cap cap-${tone} kb-key ${isDown ? 'is-down' : ''} ${k.wide ? 'kb-wide' : ''}`}
      style={{ ['--w' as string]: k.w ?? 1 }}
    >
      <span className="kb-legend legend">
        {k.shift && <span className="kb-shift">{k.shift}</span>}
        {k.icon && <Icon icon={k.icon} className="kb-icon" aria-hidden />}
        {k.logo && <span className="logo-mark kb-logo" aria-hidden />}
        {k.label && <span className={k.icon ? 'kb-word' : ''}>{k.label}</span>}
      </span>
      {k.action === 'sound' && <span className={`kb-led ${sound ? 'is-on' : ''}`} aria-hidden />}
    </button>
  )
}

/** Oversized artisan keycap carrying the JC mark. Press it. */
function LogoCap() {
  const [down, setDown] = useState(false)
  return (
    <motion.div
      className="shrink-0"
      initial={{ opacity: 0, y: -40, rotate: -14 }}
      animate={{ opacity: 1, y: 0, rotate: -6 }}
      whileHover={{ rotate: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
    >
      <button
        type="button"
        aria-label="JC logo key"
        onPointerDown={() => {
          setDown(true)
          thockIfOn(true)
        }}
        onPointerUp={() => setDown(false)}
        onPointerLeave={() => setDown(false)}
        className={`cap cap-rose items-center justify-center rounded-[22px] p-0 ${down ? 'is-down' : ''}`}
        style={{ width: 'clamp(5.5rem, 13vw, 10rem)', height: 'clamp(5.5rem, 13vw, 10rem)', paddingBottom: '0.9rem' }}
      >
        <span className="logo-mark w-[62%]" aria-hidden />
      </button>
    </motion.div>
  )
}
