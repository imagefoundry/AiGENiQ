import { useEffect } from 'react'
import '../styles/contact.css'

const CALENDAR_URL = 'https://calendly.com/rohit-loveimagefoundry'

export default function CalendarModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="ct-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Book a clarity call">
      <div className="ct-modal" onClick={e => e.stopPropagation()}>
        <button className="ct-modal-close" onClick={onClose} aria-label="Close calendar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <iframe
          src={CALENDAR_URL}
          className="ct-modal-iframe"
          title="Book a 25-minute clarity call with AiGENiQ"
          loading="lazy"
          frameBorder="0"
        />
      </div>
    </div>
  )
}
