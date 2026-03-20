import { useEffect } from 'react'

/**
 * useScrollReveal
 * Attaches an IntersectionObserver to all [data-reveal] elements
 * and adds the 'in' class when they enter the viewport.
 * Call once at the page level after mount.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Skip on mobile — elements are always visible (CSS handles this)
    if (window.innerWidth < 769) return

    const setup = () => {
      const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')

      if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('in'))
        return
      }

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      elements.forEach(el => {
        if (!el.classList.contains('in')) observer.observe(el)
      })

      return () => observer.disconnect()
    }

    // Defer until browser is idle to avoid blocking initial render
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(setup, { timeout: 2000 })
      return () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(setup, 200)
      return () => clearTimeout(id)
    }
  }, [])
}
