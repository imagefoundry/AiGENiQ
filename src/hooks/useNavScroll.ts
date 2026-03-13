import { useEffect, useState } from 'react'

/**
 * useNavScroll
 * Returns true when the user has scrolled past 20px,
 * used to add a shadow to the sticky nav.
 */
export function useNavScroll(): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return scrolled
}
