import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  words: readonly string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseMs?: number
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseMs = 2000,
}: UseTypewriterOptions): string {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = words[wordIndex % words.length]

    if (!isDeleting && displayed === current) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs)
      return
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false)
      setWordIndex((i) => (i + 1) % words.length)
      return
    }

    const delta = isDeleting ? deleteSpeed : typeSpeed
    timeoutRef.current = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      )
    }, delta)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs])

  return displayed
}
