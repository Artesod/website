import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { SETTLE } from './motion'

// The narrow-screen board: a 4x4 macropad with a rotary encoder. Every key fits,
// so nothing scrolls off the side the way the 65% board does on a phone.
const TECH_KEYS = [
  { code: 'pad-react', label: 'React', q: 'react' },
  { code: 'pad-go', label: 'Go', q: 'go' },
  { code: 'pad-ts', label: 'TS', q: 'typescript' },
  { code: 'pad-pg', label: 'Postgres', q: 'postgresql' },
]

const MACROS = [
  { code: 'pad-work', label: 'Work', icon: 'mdi:briefcase-outline', go: 'work' },
  { code: 'pad-projects', label: 'Projects', icon: 'mdi:package-variant-closed', go: 'projects' },
  { code: 'pad-about', label: 'About', icon: 'mdi:account-outline', go: 'about' },
  { code: 'pad-kit', label: 'Kit', icon: 'mdi:toolbox-outline', go: 'kit' },
]

interface MacropadProps {
  query: string
  down: Set<string>
  sound: boolean
  /** Visual + audible key travel for a code. */
  tap: (code: string, wide?: boolean) => void
  onTech: (q: string) => void
  onGo: (id: string) => void
  onClear: () => void
  onSound: () => void
  onKnob: (dir: 1 | -1) => void
}

export function Macropad({ query, down, sound, tap, onTech, onGo, onClear, onSound, onKnob }: MacropadProps) {
  const q = query.trim().toLowerCase()
  const rows = [
    // Row 0 is the encoder row; keys start at row 1.
    TECH_KEYS.map((k) => (
      <PadKey
        key={k.code}
        tone="alpha"
        isDown={down.has(k.code) || q === k.q}
        pressed={q === k.q}
        onClick={() => {
          tap(k.code)
          onTech(k.q)
        }}
      >
        <span className="pad-label">{k.label}</span>
      </PadKey>
    )),
    MACROS.map((k) => (
      <PadKey
        key={k.code}
        tone="cream"
        isDown={down.has(k.code)}
        label={`Go to ${k.label}`}
        onClick={() => {
          tap(k.code)
          onGo(k.go)
        }}
      >
        <Icon icon={k.icon} className="h-[1.35em] w-[1.35em]" aria-hidden />
        <span className="pad-label">{k.label}</span>
      </PadKey>
    )),
    [
      <PadKey
        key="pad-esc"
        tone="mod"
        isDown={down.has('pad-esc')}
        label="Clear search"
        onClick={() => {
          tap('pad-esc')
          onClear()
        }}
      >
        <span className="pad-label">Esc</span>
      </PadKey>,
      <PadKey
        key="pad-enter"
        tone="rose"
        span={3}
        isDown={down.has('pad-enter')}
        onClick={() => {
          tap('pad-enter', true)
          onGo('contact')
        }}
      >
        <span className="mt-auto flex w-full items-end justify-between">
          <span className="pad-label text-[1.35em]">Hire me</span>
          <Icon icon="mdi:keyboard-return" className="h-[1.6em] w-[1.6em]" aria-hidden />
        </span>
      </PadKey>,
    ],
  ]

  return (
    <div className="pad">
      <div
        className="pad-case"
        role="group"
        aria-label="Macropad. Turn the knob to browse the stack; labeled keys search or navigate."
      >
        <div className="pad-plate">
          <motion.div
            className="pad-row"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: SETTLE, delay: 0.25 }}
          >
            <div className="flex items-center justify-center">
              <Knob onStep={onKnob} />
            </div>
            <p className="legend col-span-2 flex items-center gap-2 self-center px-1 text-[12px] leading-snug text-muted">
              <Icon icon="mdi:rotate-right" className="h-5 w-5 shrink-0 text-rose" aria-hidden />
              Turn the knob to browse the stack
            </p>
            <PadKey
              tone="mod"
              isDown={down.has('pad-fn')}
              pressed={sound}
              label={`Key sound ${sound ? 'on' : 'off'}`}
              onClick={() => {
                tap('pad-fn')
                onSound()
              }}
            >
              <Icon icon={sound ? 'mdi:volume-high' : 'mdi:volume-off'} className="h-[1.35em] w-[1.35em]" aria-hidden />
              <span className="pad-label">Sound</span>
              <span className={`kb-led ${sound ? 'is-on' : ''}`} aria-hidden />
            </PadKey>
          </motion.div>
          {rows.map((row, r) => (
            <motion.div
              key={r}
              className="pad-row"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: SETTLE, delay: 0.32 + r * 0.07 }}
            >
              {row}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PadKey({
  tone,
  span = 1,
  isDown,
  pressed,
  label,
  onClick,
  children,
}: {
  tone: 'alpha' | 'mod' | 'rose' | 'cream'
  span?: number
  isDown: boolean
  pressed?: boolean
  label?: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className={`cap cap-${tone} pad-key legend ${isDown ? 'is-down' : ''}`}
      style={span > 1 ? { gridColumn: `span ${span}` } : undefined}
    >
      <span className="pad-legend">{children}</span>
    </button>
  )
}

const DETENT = 30

/** Rotary encoder. Drag around it to turn in 30° detents; tap or arrow keys step once. */
function Knob({ onStep }: { onStep: (dir: 1 | -1) => void }) {
  const [angle, setAngle] = useState(0)
  const drag = useRef<{ cx: number; cy: number; last: number; acc: number; moved: boolean } | null>(null)

  const step = (dir: 1 | -1) => {
    setAngle((a) => a + dir * DETENT)
    onStep(dir)
  }
  const pointerAngle = (d: { cx: number; cy: number }, e: PointerEvent) =>
    (Math.atan2(e.clientY - d.cy, e.clientX - d.cx) * 180) / Math.PI

  return (
    <button
      type="button"
      className="knob"
      aria-label="Encoder knob. Turn or tap to cycle through technologies."
      onPointerDown={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        const d = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, last: 0, acc: 0, moved: false }
        d.last = pointerAngle(d, e)
        drag.current = d
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d) return
        const a = pointerAngle(d, e)
        let delta = a - d.last
        if (delta > 180) delta -= 360
        if (delta < -180) delta += 360
        d.last = a
        d.acc += delta
        while (d.acc >= DETENT) {
          d.acc -= DETENT
          d.moved = true
          step(1)
        }
        while (d.acc <= -DETENT) {
          d.acc += DETENT
          d.moved = true
          step(-1)
        }
        if (Math.abs(d.acc) > 8) d.moved = true
      }}
      onPointerUp={() => {
        if (drag.current && !drag.current.moved) step(1)
        drag.current = null
      }}
      onPointerCancel={() => (drag.current = null)}
      onClick={(e) => {
        // Pointer taps are handled on pointerup; this catches Enter/Space.
        if (e.detail === 0) step(1)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault()
          step(1)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault()
          step(-1)
        }
      }}
    >
      <span className="knob-ring" style={{ transform: `rotate(${angle}deg)` }} aria-hidden>
        <span className="knob-face" />
      </span>
    </button>
  )
}
