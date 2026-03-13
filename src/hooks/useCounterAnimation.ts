import { useEffect, useRef, useState } from 'react'

/**
 * useCounterAnimation
 * Counts up from 0 to `target` when the ref element enters the viewport.
 * Respects prefers-reduced-motion.
 */
export function useCounterAnimation(target: number, duration = 1800) {
  const ref = useRef<HTMLElement | null>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return
    }

    if (!('IntersectionObserver' in window)) {
      setValue(target)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          observer.unobserve(el)

          let start: number | null = null
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(eased * target))
            if (progress < 1) {
              requestAnimationFrame(step)
            } else {
              setValue(target)
            }
          }
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, value }
}
