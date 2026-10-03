import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Skills } from './components/sections/Skills'
import { Builds } from './components/sections/Builds'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Builds />
        <About />
        <Contact />
      </main>
    </MotionConfig>
  )
}
