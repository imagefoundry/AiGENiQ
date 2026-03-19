import { Link } from 'react-router-dom'
import '../styles/services.css'
import Footer from '../components/Footer'

export default function ServicesPage() {
  return (
    <>
      <main id="main-content">

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="svc-hero">
          <div className="svc-hero-inner">

            {/* LEFT */}
            <div>
              <p className="svc-hero-eyebrow">What We Do</p>
              <h1 className="svc-hero-headline">
                The right kind of help.<br />For wherever you are.
              </h1>
              <p className="svc-hero-sub">
                Some businesses come to us at the very start — curious about AI, not sure where to begin.
                Some come with a specific workflow they need built. Some want their senior leadership team
                to get clear and aligned, fast. We work with all three.
              </p>
              <div className="svc-hero-note">
                <strong>One rule applies across everything we do:</strong> we won't build something
                that isn't worth building. If a process needs fixing first, we say so. If AI isn't
                the right answer, we'll tell you.
              </div>
            </div>

            {/* RIGHT — self-selection panel */}
            <div>
              <div className="svc-entry-panel">
                <div className="svc-entry-panel-header">
                  <p className="svc-entry-label">Which describes you?</p>
                </div>

                <div className="svc-entry-row">
                  <div>
                    <p className="svc-entry-row-title">Not sure where AI fits yet</p>
                    <p className="svc-entry-row-desc">You know it matters. You haven't had the headspace to figure out what to do about it.</p>
                  </div>
                </div>

                <div className="svc-entry-row">
                  <div>
                    <p className="svc-entry-row-title">You've got ideas. No clear next step.</p>
                    <p className="svc-entry-row-desc">You can see where AI could help — a process, a bottleneck, a stretched team.</p>
                  </div>
                </div>

                <div className="svc-entry-row">
                  <div>
                    <p className="svc-entry-row-title">Ready to move. Want it done right.</p>
                    <p className="svc-entry-row-desc">You've done the thinking. You know what you want. You need a team who'll build it properly.</p>
                  </div>
                </div>

                <div className="svc-entry-panel-footer">
                  Not sure? <strong>Book a 25-minute clarity call</strong> — we'll figure it out together.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── SERVICE CARDS ───────────────────────────────── */}
        <section className="svc-grid-section" id="adoption">
          <div className="svc-grid-wrap">
            <div className="svc-services-header">
              <p className="svc-section-eyebrow">Our Services</p>
              <h2 className="svc-section-headline">Two ways to work with us.</h2>
              <p className="svc-section-sub">
                Different starting points, the same underlying standard. Every engagement is scoped
                honestly — and built only if it genuinely earns its place.
              </p>
            </div>

            <div className="svc-cards-grid">

              {/* Card 1 */}
              <div className="svc-card">
                <p className="svc-card-number">01</p>
                <div className="svc-card-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="19" stroke="#000" strokeWidth="1.5"/>
                    <path d="M12 20h16M20 12v16" stroke="#A7F432" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="svc-card-title">AI Adoption &amp; Strategy</h3>
                <p className="svc-card-desc">
                  For businesses at the start of the journey. We assess how you work, find where AI creates
                  genuine return, build a roadmap, enable your team, and implement what earns its place.
                  Not a one-off report — a live programme with 90-day sprints and real accountability.
                </p>
                <ul className="svc-card-list">
                  <li>Discovery &amp; business assessment</li>
                  <li>Prioritised AI roadmap</li>
                  <li>Team capability building</li>
                  <li>Implementation &amp; handoff</li>
                  <li>You own everything we build</li>
                </ul>
                <a href="/how-we-work" className="svc-card-cta">See How It Works →</a>
              </div>

              {/* Card 2 */}
              <div className="svc-card" id="automation">
                <p className="svc-card-number">02</p>
                <div className="svc-card-icon">
                  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="38" height="38" rx="3" stroke="#000" strokeWidth="1.5"/>
                    <path d="M10 20l6 6 14-14" stroke="#A7F432" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="svc-card-title">Workflow Automation &amp; Custom Build</h3>
                <p className="svc-card-desc">
                  You've identified a bottleneck, a repetitive process, or a system that could be smarter.
                  We'll scope it, sense-check it, and build it properly. One condition: if the process needs
                  fixing before it can be automated, that's step one.
                </p>
                <ul className="svc-card-list">
                  <li>Sales &amp; outreach automation</li>
                  <li>Document generation &amp; processing</li>
                  <li>Internal ops &amp; approvals</li>
                  <li>CRM-connected workflows</li>
                  <li>Custom AI tools &amp; mini applications</li>
                </ul>
                <a href="#contact" className="svc-card-cta">Talk to Us About a Build →</a>
              </div>

            </div>

            <p className="svc-integrity">
              <strong>Every service, the same standard:</strong> we only recommend what we'd do if it were our own business.
            </p>

            {/* Coaching callout */}
            <div className="svc-coaching" id="coaching">
              <div>
                <p className="svc-coaching-label">One-to-One</p>
                <h3 className="svc-coaching-title">Looking for something more personal?</h3>
                <p className="svc-coaching-body">
                  AI Executive Coaching is a different kind of engagement entirely — built around one leader,
                  one business, and the specific way you think and work. It's not a service. It's a
                  transformation.
                </p>
              </div>
              <div className="svc-coaching-right">
                <Link to="/services/ai-executive-coaching" className="svc-coaching-cta">Discover AI Executive Coaching →</Link>
                <p className="svc-coaching-hint">One-to-one · In person · Built around you</p>
              </div>
            </div>

          </div>
        </section>

        {/* ── AUTOMATION EXAMPLES ─────────────────────────── */}
        <section className="svc-automation">
          <div className="svc-automation-wrap">
            <div className="svc-automation-header">
              <div>
                <p className="svc-section-eyebrow">What We Build</p>
                <h2 className="svc-section-headline">A sense of what's possible.</h2>
              </div>
              <div>
                <p className="svc-section-sub">
                  These aren't the only things we build — but they give you a feel for the kinds of
                  problems we solve and the kind of work we take on.
                </p>
              </div>
            </div>

            <div className="svc-automation-grid">
              <div className="svc-auto-tile">
                <div className="svc-auto-tile-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#A7F432"/>
                    <path d="M10 13h16M10 18h10" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="26" cy="22" r="4" stroke="#000" strokeWidth="2"/>
                    <path d="M29 25l2.5 2.5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 className="svc-auto-tile-title">Sales Outreach Automation</h4>
                <p className="svc-auto-tile-desc">Personalised, sequenced outreach — built into your existing tools. Less manual effort, consistent follow-through, better conversion.</p>
              </div>
              <div className="svc-auto-tile">
                <div className="svc-auto-tile-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#A7F432"/>
                    <rect x="10" y="8" width="16" height="20" rx="2" stroke="#000" strokeWidth="2"/>
                    <path d="M14 14h8M14 18h8M14 22h5" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M21 8v4h5" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="svc-auto-tile-title">Document Generation</h4>
                <p className="svc-auto-tile-desc">Proposals, reports, contracts, summaries — generated in seconds from the data you already have. Accurate, on-brand, no copy-paste.</p>
              </div>
              <div className="svc-auto-tile">
                <div className="svc-auto-tile-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#A7F432"/>
                    <rect x="9" y="18" width="5" height="10" rx="1" fill="#000"/>
                    <rect x="16" y="13" width="5" height="15" rx="1" fill="#000"/>
                    <rect x="23" y="8" width="5" height="20" rx="1" fill="#000"/>
                    <path d="M9 22l5-5 5 3 5-8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3"/>
                  </svg>
                </div>
                <h4 className="svc-auto-tile-title">Reporting &amp; Data Processing</h4>
                <p className="svc-auto-tile-desc">Turn raw data into clear, formatted reports automatically. Dashboards, weekly digests, exception alerts — delivered without manual effort.</p>
              </div>
              <div className="svc-auto-tile">
                <div className="svc-auto-tile-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#A7F432"/>
                    <path d="M14 10h8l1.5 4h-11L14 10z" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
                    <rect x="10" y="14" width="16" height="12" rx="2" stroke="#000" strokeWidth="2"/>
                    <path d="M14 19h8M14 22h5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="26" cy="27" r="3" fill="#000"/>
                    <path d="M24.5 27h3M26 25.5v3" stroke="#A7F432" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 className="svc-auto-tile-title">Internal Ops &amp; Approvals</h4>
                <p className="svc-auto-tile-desc">Handoffs, approvals, notifications, escalations — the administrative glue that slows teams down. Automated properly, it disappears.</p>
              </div>
              <div className="svc-auto-tile">
                <div className="svc-auto-tile-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#A7F432"/>
                    <circle cx="12" cy="12" r="3" stroke="#000" strokeWidth="2"/>
                    <circle cx="24" cy="12" r="3" stroke="#000" strokeWidth="2"/>
                    <circle cx="18" cy="24" r="3" stroke="#000" strokeWidth="2"/>
                    <path d="M15 12h6M13.5 14.5l3 7M22.5 14.5l-3 7" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <h4 className="svc-auto-tile-title">CRM &amp; System Integrations</h4>
                <p className="svc-auto-tile-desc">Connect your tools so data flows correctly between them. No more re-keying, no more systems that don't talk to each other.</p>
              </div>
              <div className="svc-auto-tile">
                <div className="svc-auto-tile-icon">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="8" fill="#A7F432"/>
                    <rect x="8" y="8" width="20" height="14" rx="2" stroke="#000" strokeWidth="2"/>
                    <path d="M13 22v4M23 22v4M11 26h14" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M13 13l3 3-3 3M19 19h4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="svc-auto-tile-title">Custom AI Applications</h4>
                <p className="svc-auto-tile-desc">Mini applications built for your specific context — internal tools, client-facing assistants, or purpose-built solutions no off-the-shelf product covers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ENTRY STEPS (DARK) ──────────────────────────── */}
        <section className="svc-entry">
          <div className="svc-entry-wrap">
            <div>
              <p className="svc-entry-eyebrow">How It Works</p>
              <h2 className="svc-entry-headline">
                You don't have to start<br />at the <em>beginning.</em>
              </h2>
              <p className="svc-entry-body">
                Some clients come to us at Step 01. Some come at Step 04 with a brief in hand.
                Some come through the Leadership Intensive and move straight into a full engagement.
                Tell us where you are, and we'll meet you there.
              </p>
              <p className="svc-entry-body" style={{ marginTop: '16px', fontStyle: 'italic', color: '#555' }}>
                "If we can't help, we'll tell you. Either way, you'll leave with more clarity than you arrived with."
              </p>
            </div>
            <div>
              <div className="svc-steps">
                <div className="svc-step">
                  <span className="svc-step-num">01</span>
                  <div>
                    <p className="svc-step-title">Assess</p>
                    <p className="svc-step-desc">We learn how your business runs, where time gets lost, and what's genuinely worth improving.</p>
                  </div>
                </div>
                <div className="svc-step">
                  <span className="svc-step-num">02</span>
                  <div>
                    <p className="svc-step-title">Plan</p>
                    <p className="svc-step-desc">Quick wins, longer plays, the right tools — and, just as importantly, what to leave alone.</p>
                  </div>
                </div>
                <div className="svc-step">
                  <span className="svc-step-num">03</span>
                  <div>
                    <p className="svc-step-title">Enable</p>
                    <p className="svc-step-desc">Real capability building across your team — not a one-off demo. Advocates, adoption, traction.</p>
                  </div>
                </div>
                <div className="svc-step svc-step--highlight">
                  <span className="svc-step-num">04</span>
                  <div>
                    <p className="svc-step-title">Implement</p>
                    <p className="svc-step-desc">We build only what earns its place. No vanity projects. No automating chaos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ───────────────────────────────────── */}
        <section className="svc-cta-strip" id="contact">
          <div className="svc-cta-strip-wrap">
            <h2 className="svc-cta-headline">Not sure which service fits?</h2>
            <p className="svc-cta-sub">
              Book a 25-minute clarity call. Tell us where you are. We'll tell you honestly
              what makes sense — and what doesn't.
            </p>
            <a href="mailto:hello@aigeniq.ai" className="svc-cta-btn">Book a Clarity Call</a>
            <p className="svc-cta-honest">
              If we can't help, we'll tell you. Either way, you'll leave with more clarity than you arrived with.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
