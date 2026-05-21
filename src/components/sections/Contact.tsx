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

  return (
    <section id="contact" className="section-snap flex flex-col items-center justify-center relative px-6">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div ref={sectionRef} className="w-full max-w-2xl relative z-10">
        <motion.p
          className="font-mono text-emerald-accent text-sm tracking-widest uppercase mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          &gt;_ CONTACT
        </motion.p>
        <motion.h2
          className="text-5xl md:text-6xl font-black text-text-primary mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-text-secondary text-center mb-10 text-lg"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Have a project in mind or just want to say hello? Drop me a message.
        </motion.p>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col gap-5"
        >
          <input
            name="from_name"
            type="text"
            placeholder="Your name"
            required
            className="bg-surface border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base"
          />
          <input
            name="from_email"
            type="email"
            placeholder="Your email"
            required
            className="bg-surface border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={6}
            required
            className="bg-surface border border-border rounded-xl px-5 py-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-blue-accent transition-colors duration-200 text-base resize-none"
          />

          <Button
            variant="primary"
            type="submit"
            disabled={status === 'sending'}
            className="w-full justify-center"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </Button>

          {status === 'sent' && (
            <p className="text-emerald-accent text-base text-center">
              Message sent! I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-base text-center">
              Something went wrong. Try emailing directly.
            </p>
          )}
        </motion.form>

        <motion.div
          className="flex justify-center gap-8 mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors duration-200 flex items-center gap-2 text-base"
          >
            <Icon icon="mdi:github" className="w-6 h-6" />
            GitHub
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-blue-light transition-colors duration-200 flex items-center gap-2 text-base"
          >
            <Icon icon="mdi:linkedin" className="w-6 h-6" />
            LinkedIn
          </a>
          <a
            href={profile.social.email}
            className="text-text-muted hover:text-emerald-light transition-colors duration-200 flex items-center gap-2 text-base"
          >
            <Icon icon="mdi:email-outline" className="w-6 h-6" />
            Email
          </a>
        </motion.div>

        <p className="text-text-muted text-sm text-center mt-10">
          © {new Date().getFullYear()} {profile.name} · Built with React + Tailwind
        </p>
      </div>
    </section>
  )
}
