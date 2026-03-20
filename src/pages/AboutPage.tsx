import React, { useRef, useEffect } from 'react'
import Footer from '../components/Footer'
import '../styles/about.css'
import { useCalendar } from '../contexts/CalendarContext'
import anshulImg from '../assets/Anshul - Caricature - Clean.webp'

export default function AboutPage() {
  const { openCalendar } = useCalendar()
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
    <>
      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────── */}
        <section className="ab-hero">
          <div className="ab-wrap">
            <p className="ab-eyebrow">The Business</p>
            <div className="ab-hero-inner">

              {/* ── LEFT: copy ── */}
              <div className="ab-hero-left">
                <h1 className="ab-hero-headline">
                  A world where the size of your business never limits the scale of your ambition.
                </h1>
                <p className="ab-hero-sub">That's not a tagline. It's the reason AiGENiQ exists.</p>
                <div className="ab-hero-body">
                  <p>
                    AI is the great equaliser. When it's adopted well — by whole teams, in real
                    workflows, measured against real results — it gives an SME the speed and
                    capability to compete with organisations ten times its size. Not by replacing
                    people. By supercharging what people can do.
                  </p>
                  <p>That's the work we do.</p>
                </div>
              </div>

              {/* ── RIGHT: animated visual ── */}
              <div className="ab-hero-right" aria-hidden="true">
                <div className="ab-scene-outer">
                <div className="ab-scene" ref={sceneRef}>

                  {/* background glow blobs */}
                  <div className="ab-glow ab-glow-lime" data-speed="0.3" />
                  <div className="ab-glow ab-glow-cyan" data-speed="0.2" />

                  {/* ── main dashboard card ── */}
                  <div className="ab-dash" data-speed="0.5">

                    <div className="ab-dash-header">
                      <div className="ab-dash-dots">
                        <span /><span /><span />
                      </div>
                      <span className="ab-dash-title">AI Performance</span>
                      <div className="ab-dash-live">
                        <span className="ab-live-dot" />Live
                      </div>
                    </div>

                    <div className="ab-dash-metrics">
                      {([
                        { label: 'Team Output',    pct: 82, cls: ''            },
                        { label: 'Time Reclaimed', pct: 96, cls: 'ab-fill-cyan'},
                        { label: 'ROI Delivered',  pct: 71, cls: 'ab-fill-lime'},
                      ] as const).map((m, i) => (
                        <div className="ab-metric" key={m.label}>
                          <div className="ab-metric-row">
                            <span className="ab-metric-name">{m.label}</span>
                            <span className="ab-metric-pct">{m.pct}%</span>
                          </div>
                          <div className="ab-bar-track">
                            <div
                              className={`ab-bar-fill ${m.cls}`}
                              style={{ '--w': `${m.pct}%`, '--di': `${0.5 + i * 0.15}s` } as React.CSSProperties}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="ab-dash-stats">
                      {([
                        { num: '10×', label: 'Output'   },
                        { num: '3h',  label: 'Saved/day' },
                        { num: '100%',label: 'Team-wide' },
                      ] as const).map(s => (
                        <div className="ab-stat" key={s.label}>
                          <span className="ab-stat-num">{s.num}</span>
                          <span className="ab-stat-label">{s.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="ab-chart">
                      {[38, 62, 50, 78, 68, 92, 84].map((h, i) => (
                        <div
                          key={i}
                          className={`ab-bar-v${i === 5 ? ' ab-bar-v-peak' : ''}`}
                          style={{ '--h': `${h}%`, '--di': `${1.0 + i * 0.08}s` } as React.CSSProperties}
                        />
                      ))}
                    </div>
                    <p className="ab-chart-lbl">Weekly AI productivity gain</p>

                  </div>

                  {/* ── floating notification A ── */}
                  <div className="ab-notif ab-notif-a" data-speed="0.9">
                    <span className="ab-notif-icon">⚡</span>
                    <div>
                      <p className="ab-notif-title">Task automated</p>
                      <p className="ab-notif-sub">Report generation · 2s</p>
                    </div>
                  </div>

                  {/* ── floating notification B ── */}
                  <div className="ab-notif ab-notif-b" data-speed="1.1">
                    <span className="ab-notif-pulse" />
                    <div>
                      <p className="ab-notif-title">ROI checkpoint</p>
                      <p className="ab-notif-sub">+£12k this month</p>
                    </div>
                  </div>

                </div>
                </div>{/* ab-scene-outer */}
              </div>

            </div>
          </div>
        </section>

        {/* ── MISSION PILLARS (DARK) ────────────────────── */}
        <section className="ab-mission">
          <div className="ab-wrap">
            <p className="ab-eyebrow ab-eyebrow-dark">How We Work</p>
            <h2 className="ab-mission-headline">Four principles. Every engagement.</h2>
            <div className="ab-pillars">

              <div className="ab-pillar">
                <p className="ab-pillar-num">01</p>
                <h3 className="ab-pillar-title">Whole-team adoption</h3>
                <p className="ab-pillar-body">
                  Not a tool demo for the leadership team. Every role, every department —
                  genuinely using AI in day-to-day work. That's the only adoption that sticks.
                </p>
              </div>

              <div className="ab-pillar">
                <p className="ab-pillar-num">02</p>
                <h3 className="ab-pillar-title">ROI as the compass</h3>
                <p className="ab-pillar-body">
                  Every recommendation we make is held to one test: does this deliver a return
                  worth having? If it doesn't, we won't suggest it.
                </p>
              </div>

              <div className="ab-pillar">
                <p className="ab-pillar-num">03</p>
                <h3 className="ab-pillar-title">Humans at the centre</h3>
                <p className="ab-pillar-body">
                  AI amplifies people — it doesn't replace judgement. We build confidence
                  alongside competence.
                </p>
              </div>

              <div className="ab-pillar">
                <p className="ab-pillar-num">04</p>
                <h3 className="ab-pillar-title">Foundations before automation</h3>
                <p className="ab-pillar-body">
                  We never automate a broken process. We fix the thinking first, then build
                  what's worth building.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── FOUNDER ───────────────────────────────────── */}
        <section className="ab-founder">
          <div className="ab-wrap">
            <div className="ab-founder-inner">

              <div className="ab-founder-photo-col">
                <div className="ab-founder-photo">
                  <img src={anshulImg} alt="Anshul Kapoor, Founder of AiGENiQ" width="400" height="400" loading="lazy" />
                </div>
              </div>

              <div className="ab-founder-copy">
                <p className="ab-eyebrow">The Founder</p>
                <h2 className="ab-founder-name">Anshul Kapoor</h2>
                <p className="ab-founder-title">Founder, AiGENiQ</p>

                <div className="ab-founder-bio">
                  <p>
                    Anshul didn't come to AI through technology. He came to it through running
                    a business and hitting the same walls his clients now bring to him — too many
                    tools, too little time, and no clear picture of what was actually worth trying.
                  </p>
                  <p>
                    He's co-founder of Image Foundry, a creative agency delivering high-volume
                    CGI and marketing content for property and product brands. Over the past three
                    years, he's quietly rebuilt the way that business operates — using AI for sales
                    outreach, content generation, and workflow automation. Not as a side experiment.
                    As the way the agency runs.
                  </p>
                  <p>
                    AiGENiQ grew out of that experience. The same curiosity, the same bias for
                    what actually works, applied to other people's businesses. He maps where things
                    get stuck, figures out what's genuinely worth fixing, and builds it in a way
                    that the whole team can use — not just the person who asked for it.
                  </p>
                  <p className="ab-bio-standout">
                    He works with a small number of clients at a time. That's a choice, not a constraint.
                  </p>
                  <p>
                    He also puts a lot of what he knows on YouTube — practical, no-fluff videos
                    for business owners figuring out where AI fits. No agenda. Just useful.
                  </p>
                  <a
                    href="https://www.youtube.com/@AK-on-AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ab-yt-link"
                  >
                    Watch on YouTube <span className="ab-arrow" aria-hidden="true">→</span>
                  </a>
                </div>

                <div className="ab-trusted-network">
                  AiGENiQ is deliberately lean. For implementation, we draw on a trusted network
                  of developers, AI engineers, and automation practitioners — brought in when the
                  project calls for it. You get the rigour of a consultancy with the flexibility
                  of a team built around your project, not our headcount.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA STRIP ─────────────────────────────────── */}
        <section className="ab-cta">
          <div className="ab-wrap">
            <div className="ab-cta-inner">
              <h2 className="ab-cta-headline">Wherever you are with AI — let's talk.</h2>
              <div className="ab-cta-right">
                <p className="ab-cta-body">
                  A 25-minute call is enough to get clarity on where you are, what's worth doing,
                  and whether we're the right people to help.
                </p>
                <a href="https://calendly.com/anshul-aigeniq/25-minute-discovery-call" className="ab-cta-btn" onClick={(e) => { e.preventDefault(); openCalendar() }}>Book a Clarity Call</a>
                <p className="ab-cta-honest">
                  If we can't help, we'll tell you. Either way, you'll leave with more clarity
                  than you arrived with.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
