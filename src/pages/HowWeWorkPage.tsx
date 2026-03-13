import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../styles/how-we-work.css'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import footerLogoSrc from '../assets/Footer-logo.svg'

const NAV_ITEMS = [
  {
    num: '01', label: 'The process', desc: 'Four steps. What happens at each one.', href: 'process',
    popup: { heading: 'Four steps. Zero surprises.', bullets: ['Assess — where AI genuinely helps', 'Plan — 90-day roadmap you can act on', 'Enable — your team using it for real', 'Implement — build only what earns its place'] },
  },
  {
    num: '02', label: "What you'll have", desc: 'The outcomes you can expect.', href: 'outcomes',
    popup: { heading: 'Concrete outcomes. Not deliverables.', bullets: ['A team using AI day-to-day — not just leadership', 'Automations you own completely', 'Time back in the places that matter most'] },
  },
  {
    num: '03', label: 'The work so far', desc: "What we've built and how.", href: 'proof',
    popup: { heading: 'Real results. Real businesses.', bullets: ['70% faster stock listing for a commercial vehicle dealer', 'Two AI systems live inside our own business', '3+ years hands-on since tools became genuinely usable'] },
  },
  {
    num: '04', label: 'Start the conversation', desc: '25 minutes. No obligation.', href: 'cta',
    popup: { heading: '25 minutes. Honest advice.', bullets: ["We'll tell you where AI earns its place", 'Useful whether you work with us or not', "Tell us where you are — we'll meet you there"] },
  },
]

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function ScrambleLabel({ text, trigger }: { text: string; trigger: number }) {
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!trigger) return
    let raf: number
    let t0: number | null = null
    const duration = 650
    const tick = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setOut(
        text.split('').map((ch, i) => {
          if (" '.,—-".includes(ch)) return ch
          if (p > i / text.length + 0.08) return ch
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        }).join('')
      )
      if (p < 1) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [trigger])
  return <>{out}</>
}

export default function HowWeWorkPage() {
  const [activeSection, setActiveSection] = useState('')
  const [passedSections, setPassedSections] = useState<Set<string>>(new Set())
  const [scrambleTriggers, setScrambleTriggers] = useState<Record<string, number>>({})
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    NAV_ITEMS.forEach((item, i) => {
      setTimeout(() => {
        setScrambleTriggers(prev => ({ ...prev, [item.href]: 1 }))
      }, 300 + i * 160)
    })
  }, [])

  useEffect(() => {
    const ids = NAV_ITEMS.map(i => i.href)
    const handleScroll = () => {
      const trigger = window.scrollY + window.innerHeight * 0.45
      let current = ''
      ids.forEach(id => {
        const el = document.getElementById(id)
        if (el && trigger >= el.getBoundingClientRect().top + window.scrollY) current = id
      })
      setActiveSection(current)
      const passed = new Set<string>()
      let found = false
      for (let i = ids.length - 1; i >= 0; i--) {
        if (ids[i] === current) { found = true; continue }
        if (found) passed.add(ids[i])
      }
      setPassedSections(passed)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="hww-page">
      <Banner />
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="hww-hero">
        <div className="hww-container">
          <div className="hww-hero-inner">

            {/* LEFT */}
            <div>
              <p className="hww-eyebrow">How We Work</p>
              <h1 className="hww-hero-headline">Real improvements.<br /><em>Measurable</em><br />from day one.</h1>
              <p className="hww-hero-sub">
                Here's exactly what working with us looks like — from the first conversation to a team that genuinely uses AI in their day-to-day work. No black box. No mystery. Just a clear process that's designed around how your business actually runs.
              </p>
              <div className="hww-hero-ctas">
                <a href="#cta" className="hww-btn-primary">Book a Clarity Call</a>
                <a href="#process" className="hww-btn-secondary">See the process →</a>
              </div>
            </div>

            {/* RIGHT — interactive page navigation card */}
            <div>
              <div className="hww-hero-nav-card">
                <p className="hww-card-label">What's on this page</p>
                <ul className="hww-page-steps-list">
                  {NAV_ITEMS.map(item => {
                    const isPassed = passedSections.has(item.href)
                    const isActive = activeSection === item.href
                    return (
                      <li
                        key={item.href}
                        className={isPassed ? 'hww-nav-item--passed' : isActive ? 'hww-nav-item--active' : ''}
                        onMouseEnter={() => {
                          setHoveredItem(item.href)
                          setScrambleTriggers(prev => ({ ...prev, [item.href]: (prev[item.href] ?? 0) + 1 }))
                        }}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span className="hww-step-num-sm">
                          {isPassed ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <circle cx="7" cy="7" r="7" fill="#A7F432"/>
                              <polyline points="3.5,7 6,9.5 10.5,4.5" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ) : item.num}
                        </span>
                        <a
                          href={`#${item.href}`}
                          className="hww-step-detail"
                          onClick={e => scrollTo(e, item.href)}
                        >
                          <strong><ScrambleLabel text={item.label} trigger={scrambleTriggers[item.href] ?? 0} /></strong>
                          <span>{item.desc}</span>
                        </a>
                        {hoveredItem === item.href && (
                          <div className="hww-item-popup">
                            <p className="hww-item-popup-heading">{item.popup.heading}</p>
                            <ul className="hww-item-popup-list">
                              {item.popup.bullets.map(b => <li key={b}>{b}</li>)}
                            </ul>
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
                <p className="hww-card-note">You don't have to start at Step 01. Tell us where you are and we'll meet you there.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <hr className="hww-section-divider" />

      {/* ═══════════════════════════════════════════════════════
          THE 4-STEP PROCESS
      ═══════════════════════════════════════════════════════ */}
      <section className="hww-process-section" id="process">
        <div className="hww-container">

          <div className="hww-process-header">
            <div>
              <p className="hww-eyebrow">The Process</p>
              <h2 className="hww-process-title">Four steps.<br />One principle:<br />no surprises.</h2>
            </div>
            <div>
              <p className="hww-process-intro">
                We follow a structured process — but it's not rigid. Every business is at a different stage, with different problems, different teams, and different ideas about what AI should do for them. The steps below are how we think. Where we start depends on where you are.
              </p>
              <div className="hww-non-linear-note">
                You don't have to start at Step 01. Tell us where you are and we'll meet you there.
              </div>
            </div>
          </div>

          <div className="hww-steps-grid">

            {/* STEP 01 */}
            <div className="hww-step-card">
              <div className="hww-step-number">Step 01</div>
              <div className="hww-step-name">Assess</div>
              <h3 className="hww-step-headline">Understand before we advise.</h3>
              <p className="hww-step-body">
                Before we recommend anything, we learn how your business actually works. Not the version from the org chart — the real version. Where time gets lost, where things fall through the cracks, what your team is actually doing hour to hour.
              </p>
              <p className="hww-step-body">
                We're looking for genuine opportunities — and just as importantly, the processes that aren't worth touching. Not everything benefits from automation. Getting this right at the start is what stops you from spending money on things that don't matter.
              </p>
              <ul className="hww-step-bullets">
                <li>Structured discovery with your leadership team</li>
                <li>Process mapping — how work actually flows</li>
                <li>Opportunity scoring: impact vs effort vs risk</li>
                <li>A clear picture of what AI can genuinely do for you</li>
              </ul>
            </div>

            {/* STEP 02 */}
            <div className="hww-step-card">
              <div className="hww-step-number">Step 02</div>
              <div className="hww-step-name">Plan</div>
              <h3 className="hww-step-headline">Build a roadmap that makes sense.</h3>
              <p className="hww-step-body">
                Once we know where the opportunities are, we build a plan that's actually executable. Quick wins — things that deliver results in weeks, not months. Longer plays that compound over time. And a clear list of what we're deliberately not doing.
              </p>
              <p className="hww-step-body">
                We work in 90-day sprints. No 3-year strategies. No 200-slide decks that gather dust. A plan you can act on, in a format your team can work from, with clear owners and measurable outcomes at every stage.
              </p>
              <ul className="hww-step-bullets">
                <li>Prioritised quick wins — value in weeks</li>
                <li>90-day roadmap with clear milestones</li>
                <li>Tool selection based on your needs, not what's fashionable</li>
                <li>Explicit list of what we're leaving alone and why</li>
              </ul>
            </div>

            {/* STEP 03 */}
            <div className="hww-step-card">
              <div className="hww-step-number">Step 03</div>
              <div className="hww-step-name">Enable</div>
              <h3 className="hww-step-headline">Get your team using AI properly.</h3>
              <p className="hww-step-body">
                This is the step most AI consultancies skip — and it's the reason most implementations fail. You can build the best automation in the world, but if your team doesn't trust it, doesn't understand it, or doesn't see how it fits their day, it won't stick.
              </p>
              <p className="hww-step-body">
                We don't do one-off training days. We build genuine capability — working with your team to identify advocates, embed good habits, and make sure AI becomes a natural part of how people work, not an extra thing on their to-do list.
              </p>
              <ul className="hww-step-bullets">
                <li>Role-specific enablement — relevant to each team member's job</li>
                <li>Internal AI advocates identified and supported</li>
                <li>Practical, not theoretical — tools your team will actually use</li>
                <li>Adoption tracked and reinforced, not assumed</li>
              </ul>
            </div>

            {/* STEP 04 */}
            <div className="hww-step-card">
              <div className="hww-step-number">Step 04</div>
              <div className="hww-step-name">Implement</div>
              <h3 className="hww-step-headline">Automate what earns its place.</h3>
              <p className="hww-step-body">
                When we build, we build only what's worth building. No vanity projects. No over-engineered solutions to simple problems. No automating chaos — if a process is broken, we fix the thinking first, then build what makes sense.
              </p>
              <p className="hww-step-body">
                Everything we build lives in your environment. You own it completely. When we're done, you don't need us to keep it running — that's a deliberate design choice, not an oversight. Capability, not dependency.
              </p>
              <ul className="hww-step-bullets">
                <li>Built in your environment — you own it fully</li>
                <li>No black boxes — your team understands what we've built</li>
                <li>Tested with real users before it goes live</li>
                <li>Documented so you can maintain and extend it yourself</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <hr className="hww-section-divider" />

      {/* ═══════════════════════════════════════════════════════
          OUTCOMES
      ═══════════════════════════════════════════════════════ */}
      <section className="hww-outcomes-section" id="outcomes">
        <div className="hww-container">
          <div className="hww-outcomes-header">
            <p className="hww-eyebrow" style={{ color: '#555' }}>What you'll have</p>
            <h2 className="hww-outcomes-title">What a good AI engagement actually leaves behind.</h2>
            <p className="hww-outcomes-sub">Not a report. Not a tool demo. These are the things you should be able to point to when it's done.</p>
          </div>

          <div className="hww-outcomes-grid">

            <div className="hww-outcome-card">
              <div className="hww-outcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="hww-outcome-headline">A team that genuinely uses AI — not just leadership.</h3>
              <p className="hww-outcome-body">Whole-team adoption, across every role that benefits. Not a tool installed on the MD's laptop. Real capability, distributed across your organisation — with the habits to sustain it.</p>
            </div>

            <div className="hww-outcome-card">
              <div className="hww-outcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 className="hww-outcome-headline">Automations you own, understand, and can extend yourself.</h3>
              <p className="hww-outcome-body">Nothing we build is a black box. You get documentation, a team that knows how it works, and no dependency on us to keep the lights on. What we build is yours — completely.</p>
            </div>

            <div className="hww-outcome-card">
              <div className="hww-outcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="hww-outcome-headline">Time back — in the places that matter most.</h3>
              <p className="hww-outcome-body">Not marginal gains. Hours recovered, every week, across your team. The kind of time that goes back into the work only your people can do — decisions, relationships, creative thinking.</p>
            </div>

            <div className="hww-outcome-card">
              <div className="hww-outcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="16"/>
                </svg>
              </div>
              <h3 className="hww-outcome-headline">A clear view of what's next — and what isn't worth doing.</h3>
              <p className="hww-outcome-body">You'll leave every engagement knowing where AI earns its place in your business and where it doesn't. That clarity has value on its own — even before anything gets built.</p>
            </div>

            <div className="hww-outcome-card">
              <div className="hww-outcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="hww-outcome-headline">Confidence that your data stays where it should.</h3>
              <p className="hww-outcome-body">We work inside your environment. Client data, commercially sensitive information, and internal processes stay under your control. We'll never suggest a tool that compromises that.</p>
            </div>

            <div className="hww-outcome-card">
              <div className="hww-outcome-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3 className="hww-outcome-headline">A return worth having — measured, not assumed.</h3>
              <p className="hww-outcome-body">Every engagement is anchored to ROI from the start. We define what success looks like before we begin — so there's no ambiguity about whether it worked when it's done.</p>
            </div>

          </div>
        </div>
      </section>

      <hr className="hww-section-divider" />

      {/* ═══════════════════════════════════════════════════════
          PROOF SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="hww-proof-section" id="proof">
        <div className="hww-container">

          <div className="hww-proof-header">
            <p className="hww-eyebrow">The Work So Far</p>
            <h2 className="hww-proof-title">We're a new practice.<br />The experience isn't.</h2>
            <p className="hww-proof-sub">We've been building and implementing AI for businesses since the tools became genuinely usable. Here's what that's looked like in practice.</p>
          </div>

          <div className="hww-proof-grid">

            {/* CASE 01: Malcolm Taylor */}
            <div className="hww-case-card">
              <p className="hww-case-sector">Commercial Vehicles</p>
              <p className="hww-case-client">Malcolm Taylor Commercials</p>
              <div className="hww-case-stat-row">
                <span className="hww-case-stat-num">70%</span>
                <span className="hww-case-stat-label">reduction in time to list new stock online</span>
              </div>
              <p className="hww-case-challenge-label">The problem</p>
              <p className="hww-case-challenge">"Every time a new truck came in, getting it on the website was work. So it didn't happen quickly."</p>
              <p className="hww-case-body">
                Stock listing was manual, time-consuming, and dependent on one person finding the time to sit down and write it up. New vehicles were sitting unlisted — invisible to buyers — while the admin queued up.
              </p>
              <p className="hww-case-body">
                We built a Telegram bot that removed the friction entirely. The team member photographs the vehicle, describes it conversationally in a message, and the system drafts the listing — formatted, ready to publish, with images attached — directly into WooCommerce as a draft. One approval step, then live. The same workflow pushes to Auto Trader automatically.
              </p>
              <p className="hww-case-body">
                The listing now happens at the vehicle, on a phone, in minutes. Not at a desk, later, when someone finds time.
              </p>
              <div className="hww-case-tags">
                <span className="hww-case-tag">Process automation</span>
                <span className="hww-case-tag">Telegram bot</span>
                <span className="hww-case-tag">WooCommerce integration</span>
                <span className="hww-case-tag">Auto Trader sync</span>
              </div>
            </div>

            {/* CASE 02: Image Foundry */}
            <div className="hww-case-card">
              <p className="hww-case-sector">Creative Agency</p>
              <p className="hww-case-client">Image Foundry <span style={{ fontSize: '13px', fontWeight: 500, color: '#999' }}>(our own business)</span></p>
              <div className="hww-case-stat-row">
                <span className="hww-case-stat-num">2</span>
                <span className="hww-case-stat-label">end-to-end AI systems built and embedded into live operations</span>
              </div>
              <p className="hww-case-challenge-label">The brief</p>
              <p className="hww-case-challenge">"Prove it in-house first. Then take it to clients."</p>
              <p className="hww-case-body">
                We implemented AI across two distinct areas of Image Foundry's operations — team capability and business development — and ran both through to live adoption before considering either complete.
              </p>
              <p className="hww-case-body">
                <strong>Team enablement:</strong> Embedded AI image and video generation directly into the production pipeline. Not as a novelty — as a real part of how creative output gets made. The whole team trained and using it day-to-day, within two weeks.
              </p>
              <p className="hww-case-body">
                <strong>Lead generation:</strong> Built an automated system that scrapes lead data, cross-references against the CRM to avoid duplicates, generates personalised outreach emails for each prospect, and queues them for a human to review and send. The business development function now runs faster with less manual effort — and a person still makes the final call on every email.
              </p>
              <div className="hww-case-tags">
                <span className="hww-case-own-tag">Own business — we practise what we preach</span>
              </div>
              <div className="hww-case-tags" style={{ marginTop: '8px' }}>
                <span className="hww-case-tag">Team enablement</span>
                <span className="hww-case-tag">AI image &amp; video</span>
                <span className="hww-case-tag">Lead generation</span>
                <span className="hww-case-tag">CRM automation</span>
                <span className="hww-case-tag">Outreach workflows</span>
              </div>
            </div>

          </div>

          {/* FOUNDER CREDIBILITY STRIP */}
          <div className="hww-credibility-strip">
            <div className="hww-cred-stat">
              <div className="hww-cred-stat-num">3+</div>
              <div className="hww-cred-stat-label">years applied<br />AI experience</div>
            </div>
            <div className="hww-cred-copy">
              <strong>The experience that matters here isn't theoretical.</strong>
              <p>
                AiGENiQ was founded by Anshul Kapoor, who has spent the past three years learning AI from a business owner's perspective — not from a textbook. That means understanding what actually works when a real team tries to adopt something new, what gets in the way, and why most implementations fail before they ever deliver value. The past three years — from the moment AI became genuinely accessible to businesses — is exactly the experience that's relevant here. That's when the real lessons happened.
              </p>
            </div>
          </div>

        </div>
      </section>

      <hr className="hww-section-divider" />

      {/* ═══════════════════════════════════════════════════════
          CTA STRIP
      ═══════════════════════════════════════════════════════ */}
      <section className="hww-cta-strip" id="cta">
        <div className="hww-container">
          <div className="hww-cta-strip-inner">
            <div>
              <h2 className="hww-cta-headline">Not sure where to start?<br />That's exactly what the call is for.</h2>
              <p className="hww-cta-sub">
                25 minutes. We'll listen to where you are, tell you honestly what we think, and give you something useful — whether you work with us or not. If we can't help, we'll tell you. Either way, you'll leave with more clarity than you arrived with.
              </p>
            </div>
            <div>
              <a href="#" className="hww-btn-dark">Book a Clarity Call</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════ */}
      <footer className="hww-footer">
        <div className="hww-container">
          <div className="hww-footer-inner">
            <div>
              <Link to="/" className="hww-footer-logo" aria-label="AiGENiQ — Home">
                <img src={footerLogoSrc} alt="AiGENiQ" width={120} height={34} />
              </Link>
              <p className="hww-footer-tagline">Making AI adoption stick.</p>
              <p className="hww-footer-contact">hello@aigeniq.ai<br />Colony, Jactin House<br />24 Hood St, Ancoats<br />Manchester M4 6WX</p>
            </div>
            <div className="hww-footer-col">
              <p className="hww-footer-col-title">What we do</p>
              <ul>
                <li><a href="#">How We Work</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Insights</a></li>
              </ul>
            </div>
            <div className="hww-footer-col">
              <p className="hww-footer-col-title">Get started</p>
              <ul>
                <li><a href="#">Book a Clarity Call</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="hww-footer-col">
              <p className="hww-footer-col-title">Company</p>
              <ul>
                <li><a href="#">AiGENiQ Ltd</a></li>
                <li><a href="#">Company No. 16587507</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="hww-footer-bottom">
            <p>© 2026 AiGENiQ Ltd. All rights reserved.</p>
            <p><a href="#">aigeniq.ai</a></p>
          </div>
        </div>
      </footer>

    </div>
  )
}
