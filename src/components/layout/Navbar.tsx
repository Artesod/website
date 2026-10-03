import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../../data/profile'

const NAV_LINKS = [
  { label: 'Projects', id: 'projects' },
  { label: 'Work', id: 'work' },
  { label: 'Kit', id: 'kit' },
  { label: 'Builds', id: 'builds' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || menuOpen ? 'bg-ground/90 backdrop-blur-sm shadow-[0_6px_20px_-12px_rgb(0_0_0/0.9)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-page items-center justify-between px-4 sm:px-8" aria-label="Main">
        <a href="#top" className="group flex items-center gap-3" aria-label="Joshua Canta, back to top">
          <span className="cap cap-rose h-12 w-12 items-center justify-center p-0 pb-1.5">
            <span className="logo-mark w-7" aria-hidden />
          </span>
          <span className="legend hidden text-sm text-blush sm:inline">Joshua Canta</span>
        </a>

        <ul className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className="cap cap-alpha legend text-sm">
                <span>{link.label}</span>
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="cap cap-rose legend text-sm">
              <span className="inline-flex items-center gap-1">
                Resume <Icon icon="mdi:arrow-top-right" className="h-4 w-4" aria-hidden />
              </span>
            </a>
          </li>
        </ul>

        <button
          className="cap cap-alpha legend text-sm md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="inline-flex items-center gap-1.5">
            <Icon icon={menuOpen ? 'mdi:close' : 'mdi:menu'} className="h-4 w-4" aria-hidden />
            Menu
          </span>
        </button>
      </nav>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-rose"
        style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
      />

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-line px-4 pb-5 pt-4">
          <ul className="grid grid-cols-3 gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={() => setMenuOpen(false)} className="cap cap-alpha legend w-full text-sm h-12">
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cap cap-rose legend w-full text-sm h-12"
              >
                <span>Resume</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
