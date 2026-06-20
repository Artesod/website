import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return
    const onScroll = () => setScrolled(container.scrollTop > 60)
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-base/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-center">
        <ul className="hidden md:flex items-center gap-7">
          <li>
            <button onClick={() => scrollTo('hero')} className="flex items-center flex-shrink-0 mr-2">
              <img src={logo} alt="JC" className="h-8 w-8 filter invert opacity-90" />
            </button>
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-text-secondary hover:text-emerald-accent text-base font-medium transition-colors duration-200"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-base/95 backdrop-blur-md border-b border-border">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                  className="text-text-secondary hover:text-text-primary text-sm font-medium w-full text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
