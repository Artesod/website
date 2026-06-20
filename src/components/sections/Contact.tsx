import { useRef, useState, FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'
import emailjs from '@emailjs/browser'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'

const EMAILJS_SERVICE = 'service_o2audz8'
const EMAILJS_TEMPLATE = 'template_emt9njd'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const contactLinks = [
  {
    icon: 'mdi:github',
    label: 'GitHub',
    sublabel: 'Artesod',
    href: profile.social.github,
    hoverClass: 'hover:text-text-primary hover:border-text-primary',
  },
  {
    icon: 'mdi:linkedin',
    label: 'LinkedIn',
    sublabel: 'joshuacanta',
    href: profile.social.linkedin,
    hoverClass: 'hover:text-blue-light hover:border-blue-light',
  },
  {
    icon: 'mdi:email-outline',
    label: 'Email',
    sublabel: profile.email,
    href: profile.social.email,
    hoverClass: 'hover:text-emerald-accent hover:border-emerald-accent',
  },
]

export function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-20%' })
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

  const anim = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  })

  return (
    <section id="contact" className="section-snap flex items-center relative px-6 overflow-y-auto">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-accent/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-accent/6 rounded-full blur-[100px] pointer-events-none" />

      <div ref={sectionRef} className="w-full max-w-7xl mx-auto relative z-10 py-16">
        <motion.p
          className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4"
          {...anim(0)}
        >
          &gt;_ CONTACT
        </motion.p>
        <motion.h2
          className="text-5xl md:text-6xl font-black text-text-primary mb-3"
          {...anim(0.1)}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-text-secondary text-lg mb-10 max-w-xl"
          {...anim(0.2)}
        >
          Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: info panel */}
          <motion.div className="lg:col-span-2 flex flex-col gap-6" {...anim(0.25)}>
            <div className="bg-surface border border-border rounded-2xl p-6">
              <p className="font-mono text-emerald-accent text-xs tracking-widest uppercase mb-4">&gt;_ AVAILABILITY</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-accent animate-pulse" />
                <span className="text-text-primary text-sm font-medium">{profile.availabilityText}</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                I'm currently open to full-time roles, contract work, and interesting side projects. Typical response time is within 24–48 hours.
              </p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <p className="font-mono text-emerald-accent text-xs tracking-widest uppercase mb-4">&gt;_ FIND ME ON</p>
              <div className="flex flex-col gap-3">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-xl border border-border text-text-muted transition-all duration-200 ${link.hoverClass} hover:bg-base`}
                  >
                    <Icon icon={link.icon} className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium leading-none mb-0.5">{link.label}</div>
                      <div className="text-xs text-text-muted">{link.sublabel}</div>
                    </div>
                    <Icon icon="mdi:arrow-top-right" className="w-3.5 h-3.5 ml-auto opacity-40" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-6">
              <p className="font-mono text-emerald-accent text-xs tracking-widest uppercase mb-3">&gt;_ LOCATION</p>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <Icon icon="mdi:map-marker-outline" className="w-4 h-4 text-blue-light" />
                {profile.location}
              </div>
              <p className="text-text-muted text-xs mt-2">Open to remote opportunities</p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 flex flex-col gap-5 bg-surface border border-border rounded-2xl p-8"
            {...anim(0.35)}
          >
            <p className="font-mono text-blue-light text-xs tracking-widest uppercase mb-1">&gt;_ SEND A MESSAGE</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input
                name="from_name"
                type="text"
                placeholder="Your name"
                required
                className="bg-base border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base"
              />
              <input
                name="from_email"
                type="email"
                placeholder="Your email"
                required
                className="bg-base border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base"
              />
            </div>
            <input
              name="subject"
              type="text"
              placeholder="Subject (optional)"
              className="bg-base border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base"
            />
            <textarea
              name="message"
              placeholder="Tell me about your project, idea, or opportunity..."
              rows={7}
              required
              className="bg-base border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base resize-none"
            />

            <Button
              variant="primary"
              type="submit"
              disabled={status === 'sending'}
              className="w-full justify-center"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </Button>

            {status === 'sent' && (
              <p className="text-emerald-accent text-sm text-center flex items-center justify-center gap-2">
                <Icon icon="mdi:check-circle-outline" className="w-5 h-5" />
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
                <Icon icon="mdi:alert-circle-outline" className="w-5 h-5" />
                Something went wrong. Try emailing me directly.
              </p>
            )}
          </motion.form>
        </div>

        <motion.p
          className="text-text-muted text-xs text-center mt-10"
          {...anim(0.5)}
        >
          © {new Date().getFullYear()} {profile.name} · Built with React + Tailwind
        </motion.p>
      </div>
    </section>
  )
}
