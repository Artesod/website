const SECTIONS = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']

interface SideNavProps {
  activeId: string
}

export function SideNav({ activeId }: SideNavProps) {
  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${id}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeId === id
              ? 'bg-emerald-accent scale-125'
              : 'bg-border hover:bg-blue-light'
          }`}
        />
      ))}
    </div>
  )
}
