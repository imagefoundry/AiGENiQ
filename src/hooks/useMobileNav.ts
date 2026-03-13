import { useState, useCallback, useEffect, useRef } from 'react'

/**
 * useMobileNav
 * Manages open/close state for the mobile drawer,
 * body scroll lock, and keyboard trap / Escape key.
 */
export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  const open = useCallback(() => {
    prevFocusRef.current = document.activeElement as HTMLElement
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
    prevFocusRef.current?.focus()
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, close])

  return { isOpen, open, close }
}
