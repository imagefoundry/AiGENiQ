import { useState, useEffect, useRef } from 'react'
import Footer from '../components/Footer'
import '../styles/contact.css'

const CALENDAR_URL = ''

function ContactScene() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    let rafId: number
    let targetX = 0, targetY = 0
    let curX = 0, curY = 0
    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect()
      targetX = (e.clientX - (rect.left + rect.width  * 0.5)) / (rect.width  * 0.5)
      targetY = (e.clientY - (rect.top  + rect.height * 0.5)) / (rect.height * 0.5)
    }
    const tick = () => {
      curX += (targetX - curX) * 0.07
      curY += (targetY - curY) * 0.07
      scene.querySelectorAll<HTMLElement>('[data-speed]').forEach(el => {
        const s = parseFloat(el.dataset.speed ?? '0') * 18
        el.style.setProperty('--px', `${curX * s}px`)
        el.style.setProperty('--py', `${curY * s}px`)
      })
      rafId = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <div className="ct-vis" ref={sceneRef}>

      <div className="ct-glow ct-glow-lime" data-speed="0.3" />
      <div className="ct-glow ct-glow-cyan" data-speed="0.2" />

      {/* ── journey card (parallax wrapper keeps it a block) ── */}
      <div className="ct-journey-wrap" data-speed="0.5">
        <div className="ct-journey">

          <div className="ct-journey-top">
            <span className="ct-journey-eyebrow">What happens when you reach out</span>
            <div className="ct-journey-live"><span className="ct-live-dot" />Active</div>
          </div>

          <div className="ct-journey-progress-wrap">
            <div className="ct-journey-progress-bar" />
            <span className="ct-journey-progress-label">Step 2 of 4</span>
          </div>

          <div className="ct-steps">

            <div className="ct-step ct-step-done">
              <div className="ct-step-left">
                <span className="ct-step-num">01</span>
                <div className="ct-step-line" />
              </div>
              <div className="ct-step-body">
                <span className="ct-step-title">You send a message</span>
                <span className="ct-step-sub">No agenda needed. Any time.</span>
              </div>
              <span className="ct-step-badge ct-badge-done">Done</span>
            </div>

            <div className="ct-step ct-step-active">
              <div className="ct-step-left">
                <span className="ct-step-num">02</span>
                <div className="ct-step-line" />
              </div>
              <div className="ct-step-body">
                <span className="ct-step-title">Anshul reads it personally</span>
                <span className="ct-step-sub">Not a bot. Not a team member.</span>
              </div>
              <span className="ct-step-badge ct-badge-active">&lt; 24h</span>
            </div>

            <div className="ct-step">
              <div className="ct-step-left">
                <span className="ct-step-num">03</span>
                <div className="ct-step-line" />
              </div>
              <div className="ct-step-body">
                <span className="ct-step-title">You get a straight reply</span>
                <span className="ct-step-sub">Honest. No pressure. No pitch.</span>
              </div>
              <span className="ct-step-badge ct-badge-pending">Next</span>
            </div>

            <div className="ct-step ct-step-last">
              <div className="ct-step-left">
                <span className="ct-step-num">04</span>
              </div>
              <div className="ct-step-body">
                <span className="ct-step-title">Clarity — whatever comes next</span>
                <span className="ct-step-sub">If we're a fit, we'll say so.</span>
              </div>
              <span className="ct-step-badge ct-badge-pending">100%</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── floating tags ── */}
      <div className="ct-tag ct-tag-a" data-speed="0.85">
        <span className="ct-live-dot" />
        Reply within 24h
      </div>
      <div className="ct-tag ct-tag-b" data-speed="1.05">
        25 min clarity call
      </div>

    </div>
  )
}

function CalendarModal({ onClose }: { onClose: () => void }) {
  // Close on Escape key
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
          frameBorder="0"
        />
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [calendarOpen, setCalendarOpen] = useState(false)

  function openCalendar() {
    if (CALENDAR_URL) {
      setCalendarOpen(true)
    } else {
      window.location.href = 'mailto:hello@aigeniq.ai?subject=Clarity Call Request'
    }
  }

  return (
    <>
      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────── */}
        <section className="ct-hero">
          <div className="ct-wrap">
            <div className="ct-hero-inner">

              {/* LEFT: copy */}
              <div className="ct-hero-left">
                <p className="ct-eyebrow">Get in touch</p>
                <h1 className="ct-hero-h1">Tell us what's on your mind.</h1>
                <p className="ct-hero-p">No pitch. No pressure. Just a conversation about where you are with AI and whether we can help.</p>
                <p className="ct-hero-p">Fill in the form below and we'll be back to you within one working day.</p>
              </div>

              {/* RIGHT: contact scene */}
              <div className="ct-hero-right">
                <ContactScene />
              </div>

            </div>
          </div>
        </section>

        {/* ── REASSURANCE STRIP ────────────────────────── */}
        <section className="ct-reassurance">
          <div className="ct-wrap">
            <div className="ct-reassurance-grid">

              <div className="ct-r-item">
                <span className="ct-r-label">What to expect</span>
                <span className="ct-r-headline">A response, not an auto-reply.</span>
                <span className="ct-r-body">Anshul will respond personally. You won't hear from a sales team — or wait a week.</span>
              </div>

              <div className="ct-r-item">
                <span className="ct-r-label">What we'll talk about</span>
                <span className="ct-r-headline">Where you are. What's worth doing.</span>
                <span className="ct-r-body">We'll listen first. If we're the right fit, we'll say so. If we're not, we'll tell you that too.</span>
              </div>

              <div className="ct-r-item">
                <span className="ct-r-label">What we won't do</span>
                <span className="ct-r-headline">Pressure you into anything.</span>
                <span className="ct-r-body">No timed offers. No urgency tricks. Just a straight conversation — whenever you're ready.</span>
              </div>

            </div>
          </div>
        </section>

        {/* ── MAIN CONTACT BODY ────────────────────────── */}
        <section className="ct-body">
          <div className="ct-wrap">
            <div className="ct-grid">

              {/* ── FORM COLUMN ── */}
              <div className="ct-form-col">
                <p className="ct-form-eyebrow">Send a message</p>
                <h2 className="ct-form-heading">Start with the form.<br />We'll take it from there.</h2>
                <p className="ct-form-subhead">A few lines is fine. Tell us what's going on and what prompted you to get in touch. We'll pick up from there.</p>

                <form className="ct-form" onSubmit={e => e.preventDefault()}>

                  <div className="ct-form-row">
                    <div className="ct-form-group">
                      <label htmlFor="ct-name">Your name</label>
                      <input type="text" id="ct-name" placeholder="Jane Smith" />
                    </div>
                    <div className="ct-form-group">
                      <label htmlFor="ct-business">Business name</label>
                      <input type="text" id="ct-business" placeholder="Acme Ltd" />
                    </div>
                  </div>

                  <div className="ct-form-group">
                    <label htmlFor="ct-email">Email address</label>
                    <input type="email" id="ct-email" placeholder="jane@yourbusiness.co.uk" />
                  </div>

                  <div className="ct-form-group">
                    <label htmlFor="ct-stage">Where are you with AI right now?</label>
                    <select id="ct-stage" defaultValue="">
                      <option value="" disabled>Pick the one that fits best</option>
                      <option>Not sure where to start — just exploring</option>
                      <option>I've got an idea and need a sense-check</option>
                      <option>I know what I want — I need someone to build it</option>
                      <option>I'm interested in the Executive Coaching programme</option>
                      <option>Something else entirely</option>
                    </select>
                  </div>

                  <div className="ct-form-group">
                    <label htmlFor="ct-message">What's prompted you to get in touch?</label>
                    <textarea id="ct-message" placeholder="Tell us what's going on. The more context, the more useful the reply." />
                  </div>

                  <p className="ct-privacy">
                    Your details are used only to respond to your enquiry. We don't add you to mailing lists without permission. Read our <a href="#">privacy policy</a>.
                  </p>

                  <button type="submit" className="ct-submit">
                    Send your message <span className="ct-arrow">→</span>
                  </button>

                </form>
              </div>

              {/* ── SIDEBAR ── */}
              <div className="ct-sidebar">

                <div className="ct-call-card">
                  <p className="ct-call-eyebrow">25-minute clarity call</p>
                  <h3>Prefer to talk first?</h3>
                  <p>If you'd rather pick a time and talk through things directly, use the link below. Slots are limited — we keep calls small in number so each one gets proper attention.</p>
                  <ul>
                    <li>25 minutes, no agenda required</li>
                    <li>You'll leave with more clarity than you arrived with</li>
                    <li>Anshul-led — not delegated to a junior</li>
                    <li>If we can't help, we'll tell you</li>
                  </ul>
                  <button className="ct-calendly-btn" onClick={openCalendar}>
                    Pick a time <span className="ct-arrow">→</span>
                  </button>
                  <p className="ct-calendly-note">Opens a scheduling calendar. A few slots available each week.</p>
                </div>

                <div className="ct-expect">
                  <h4>After you send the form</h4>
                  <ul>
                    <li>Anshul reads every message personally</li>
                    <li>You'll hear back within one working day</li>
                    <li>If we're a fit, we'll suggest a call</li>
                    <li>If we're not, we'll point you somewhere useful</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT DETAILS STRIP ─────────────────────── */}
        <section className="ct-details">
          <div className="ct-wrap">
            <div className="ct-details-grid">

              <div className="ct-detail-item">
                <div className="ct-d-label">Email</div>
                <div className="ct-d-value"><a href="mailto:hello@aigeniq.ai">hello@aigeniq.ai</a></div>
                <div className="ct-d-sub">Best for non-urgent enquiries</div>
              </div>

              <div className="ct-detail-item">
                <div className="ct-d-label">Based in</div>
                <div className="ct-d-value">Manchester, UK</div>
                <div className="ct-d-sub">Colony, Jactin House, Ancoats, M4 6WX<br />We work with businesses across the UK</div>
              </div>

              <div className="ct-detail-item">
                <div className="ct-d-label">Company</div>
                <div className="ct-d-value">AiGENiQ Ltd</div>
                <div className="ct-d-sub">Company No. 16587507<br />Registered in England &amp; Wales</div>
              </div>

            </div>
          </div>
        </section>

        {/* ── HONEST CLOSER CTA ─────────────────────────── */}
        <section className="ct-cta">
          <div className="ct-wrap">
            <div className="ct-cta-inner">
              <h2>Not sure if we're the right fit?</h2>
              <p>That's exactly why the call exists. If we can't help, we'll tell you. Either way, you'll leave with more clarity than you arrived with.</p>
              <button className="ct-cta-btn" onClick={openCalendar}>
                Book a Clarity Call <span className="ct-arrow">→</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* ── CALENDAR MODAL ── */}
      {calendarOpen && <CalendarModal onClose={() => setCalendarOpen(false)} />}
    </>
  )
}
