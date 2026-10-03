import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'

// One motion grammar for the whole page: things settle down into place,
// the way a keycap seats onto its switch.
export const SETTLE = [0.16, 1, 0.3, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'p' | 'li' | 'header' | 'figure'
}) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: SETTLE, delay }}
    >
      {children}
    </M>
  )
}

/** Section title that slides up out of its own baseline, masked by its line box. */
export function Title({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`display ${className}`}>
      {/* The observer sits on the unclipped mask; the clipped inner line only follows its variant. */}
      <motion.span
        className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: '105%' }, shown: { y: '0%', transition: { duration: 0.9, ease: SETTLE } } }}
        >
          {children}
        </motion.span>
      </motion.span>
    </h2>
  )
}

const tray: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.045 } },
}
export const dropKey: Variants = {
  hidden: { opacity: 0, y: -26, rotate: -4 },
  shown: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 520, damping: 26 } },
}

/** A group whose keycaps drop in one after another when it scrolls into view. */
export function KeyTray({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={tray} initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
      {children}
    </motion.div>
  )
}

/** Image that drifts against the scroll inside its frame. */
export function Parallax({ children, className = '', distance = 40 }: { children: ReactNode; className?: string; distance?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const rotateX = useTransform(scrollYProgress, [0, 0.35], [10, 0])
  const still = useReducedMotion()
  if (still) return <div className={className}>{children}</div>
  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ y, rotateX, transformOrigin: 'center bottom' }}>{children}</motion.div>
    </div>
  )
}
