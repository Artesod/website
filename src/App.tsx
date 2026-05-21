import { Navbar } from './components/layout/Navbar'
import { SideNav } from './components/layout/SideNav'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'
import { useActiveSection } from './hooks/useActiveSection'

const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

export default function App() {
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <>
      <Navbar />
      <SideNav activeId={activeId} />
      <div id="scroll-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </>
  )
}
