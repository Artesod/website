import { useRef, useState, type FormEvent } from 'react'
import { Icon } from '@iconify/react'
import emailjs from '@emailjs/browser'
import { profile } from '../../data/profile'
import { thockIfOn } from '../../lib/thock'
import { Reveal, Title } from '../ui/motion'

const EMAILJS_SERVICE = 'service_o2audz8'
const EMAILJS_TEMPLATE = 'template_emt9njd'
const EMAILJS_PUBLIC_KEY = 'xPkJW_xWB9tJ-s1zB'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const LINKS = [
  { icon: 'mdi:github', label: 'GitHub', href: profile.social.github },
  { icon: 'mdi:linkedin', label: 'LinkedIn', href: profile.social.linkedin },
  { icon: 'mdi:email-outline', label: profile.email, href: profile.social.email },
]

const field =
  'w-full rounded-xl border border-[#6b5a5e] bg-well px-5 py-4 text-lg text-blush placeholder:text-muted/80 shadow-[inset_0_2px_6px_rgb(0_0_0/0.6)] outline-none ring-rose/0 transition-[box-shadow,border-color] focus:border-rose focus:ring-2 focus:ring-rose'

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('sent')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-panel text-blush">
      <div className="mx-auto max-w-page px-4 pb-12 pt-24 sm:px-8 sm:pt-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <Title className="text-[clamp(2.75rem,7vw,5.5rem)]">
              Press
              <br />
              Enter.
            </Title>
            <Reveal as="p" className="mt-6 max-w-[42ch] text-lg leading-relaxed text-blush/85" delay={0.1}>
              Full-time roles, contract work, or a side project worth building. I usually reply within a day or two.
            </Reveal>
            <ul className="mt-10 flex flex-col items-start gap-3">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="cap cap-alpha legend text-base"
                  >
                    <span className="inline-flex items-center gap-2 px-1">
                      <Icon icon={l.icon} className="h-5 w-5" aria-hidden />
                      {l.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
          <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm text-muted">Name</span>
                <input name="from_name" type="text" required autoComplete="name" className={field} />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-muted">Email</span>
                <input name="from_email" type="email" required autoComplete="email" className={field} />
              </label>
            </div>
            <label className="grid gap-2">
              <span className="text-sm text-muted">Subject (optional)</span>
              <input name="subject" type="text" className={field} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-muted">Message</span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder="What are you building?"
                className={`${field} resize-y`}
              />
            </label>

            <div className="mt-3 flex flex-col-reverse gap-4">
              <p role="status" className="min-h-[1.5rem] text-base">
                {status === 'sent' && (
                  <span className="inline-flex items-center gap-2 text-cream">
                    <Icon icon="mdi:check-circle-outline" className="h-5 w-5" aria-hidden />
                    Sent. I'll get back to you soon.
                  </span>
                )}
                {status === 'error' && (
                  <span className="inline-flex items-center gap-2 text-rose">
                    <Icon icon="mdi:alert-circle-outline" className="h-5 w-5" aria-hidden />
                    Didn't send. Email me at {profile.email} instead.
                  </span>
                )}
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                onPointerDown={() => thockIfOn(true)}
                className="cap cap-rose h-32 w-full items-end justify-between p-5 pb-7 text-left sm:h-44 sm:p-7 sm:pb-9"
              >
                <span className="display text-[clamp(2.5rem,6vw,4.5rem)]">{status === 'sending' ? 'Sending…' : 'Send'}</span>
                <Icon icon="mdi:keyboard-return" className="h-12 w-12 sm:h-16 sm:w-16" aria-hidden />
              </button>
            </div>
          </form>
          </Reveal>
        </div>

        <footer className="mt-28 border-t border-line pt-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <a href="#top" aria-label="Back to top" className="text-rose transition-transform duration-300 hover:-translate-y-1">
              <span className="logo-mark w-28 sm:w-36" aria-hidden />
            </a>
            <div className="text-sm text-muted sm:text-right">
              <p>© {new Date().getFullYear()} {profile.name}</p>
              <p className="mt-1">
                Built by hand with React, TypeScript, Tailwind, and Framer Motion. Colorway “Olivia Dark”.
              </p>
              <p className="mt-1 max-w-[52ch] sm:ml-auto">
                The hero keyboard mirrors your real keystrokes, its search reads the same data files that render this page,
                and the switch sounds are CC0 recordings.{' '}
                <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-blush underline decoration-rose/50 hover:decoration-rose">
                  Source on GitHub
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
