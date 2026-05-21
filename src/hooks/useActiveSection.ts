import { useState, useEffect, useCallback } from 'react'

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  const handleScroll = useCallback(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return
    const scrollTop = container.scrollTop
    const viewportHeight = container.clientHeight

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      const { offsetTop } = el
      if (scrollTop >= offsetTop - viewportHeight / 2) {
        setActiveId(id)
      }
    }
  }, [sectionIds])

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return activeId
}
