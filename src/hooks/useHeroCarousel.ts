import { useState, useEffect } from 'react'

const MESSAGES = [
  "You know AI matters — you just haven't had time to act on it.",
  'Get your business AI-ready before your competitors do.',
  'Leadership aligned. Teams actually using it. Automation that earns its place.',
  'Starting with clarity, not code.',
]

const INTERVAL_MS = 5200

/**
 * useHeroCarousel
 * Cycles through hero messages every 5.2 seconds.
 * Respects prefers-reduced-motion by staying on the first message.
 */
export function useHeroCarousel(): number {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || MESSAGES.length <= 1) return

    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % MESSAGES.length)
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [])

  return index
}

export { MESSAGES }
