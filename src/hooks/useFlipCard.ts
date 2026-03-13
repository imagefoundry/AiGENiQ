import { useState, useCallback } from 'react'

/**
 * useFlipCard
 * Tracks which card (by index) is currently open in a group.
 * Clicking the same card again closes it.
 */
export function useFlipCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }, [])

  const closeAll = useCallback(() => setOpenIndex(null), [])

  return { openIndex, toggle, closeAll }
}
