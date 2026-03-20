import { Link } from 'react-router-dom'
import { useHeroCarousel, MESSAGES } from '../hooks/useHeroCarousel'
import StatsCard from './StatsCard'
import { useCalendar } from '../contexts/CalendarContext'

export default function Hero() {
  const activeIndex = useHeroCarousel()
  const { openCalendar } = useCalendar()

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-grid">

        {/* Left: text content */}
        <div className="hero-left">
          <div className="hero-eyebrow" data-reveal aria-hidden="true">
            <span />
             {/* className="eyebrow-dot" */}
            What We Do
          </div>

          <div className="hero-h1-wrap">
            <h1
              id="hero-heading"
              data-reveal
              data-delay="1"
              aria-live="polite"
              aria-atomic="true"
            >
              {MESSAGES.map((msg, i) => (
                <span
                  key={i}
                  className={`hero-msg${i === activeIndex ? ' active' : ''}`}
                >
                  {msg}
                </span>
              ))}
            </h1>
          </div>

          <p className="hero-sub" data-reveal data-delay="2">
            We help business leaders build AI into their operations properly —
            leadership aligned, teams actually using it, and automation that
            earns its place. Starting with clarity, not code.
          </p>

          <div className="hero-ctas" data-reveal data-delay="3">
            <a href="https://calendly.com/anshul-aigeniq/25-minute-discovery-call" className="btn-dark" onClick={(e) => { e.preventDefault(); openCalendar() }}>BOOK A CLARITY CALL</a>
            <Link to="/how-we-work" className="btn-ghost">SEE HOW WE WORK →</Link>
          </div>
        </div>

        {/* Right: stats card */}
        <div className="hero-right" data-reveal="right">
          <StatsCard />
        </div>

      </div>
    </section>
  )
}
