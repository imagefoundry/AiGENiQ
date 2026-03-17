import '../styles/exec-coaching.css'
import Footer from '../components/Footer'

export default function ExecCoachingPage() {
  return (
    <>
      <main id="main-content">

        {/* ── HERO (DARK) ───────────────────────────────── */}
        <section className="ec-hero">
          <div className="ec-hero-inner">

            <div>
              <p className="ec-hero-eyebrow">AI Executive Coaching</p>
              <h1 className="ec-hero-headline">
                What took you a year<br />
                to put off — done<br />
                in <em>a single day.</em>
              </h1>
              <p className="ec-hero-sub">
                A full-day, one-to-one coaching experience for founders and senior leaders
                who are ready to stop meaning to get on top of AI — and actually do it.
              </p>
              <div className="ec-hero-ctas">
                <a href="mailto:hello@aigeniq.ai" className="ec-btn-lime">Book Your Day →</a>
                <a href="#ec-process" className="ec-btn-ghost">Read how it works →</a>
              </div>
            </div>

            <div>
              <div className="ec-hero-card">
                <p className="ec-hero-card-label">At a Glance</p>
                <ul className="ec-hero-card-rows">
                  <li>
                    <span className="ec-card-key">Format</span>
                    <span className="ec-card-val">One-to-one, in person</span>
                  </li>
                  <li>
                    <span className="ec-card-key">Duration</span>
                    <span className="ec-card-val">Full day (or 2 × half-day)</span>
                  </li>
                  <li>
                    <span className="ec-card-key">Who it's for</span>
                    <span className="ec-card-val">Founders &amp; senior leaders</span>
                  </li>
                  <li>
                    <span className="ec-card-key">Preparation</span>
                    <span className="ec-card-val">Pre-session work — personalised to you</span>
                  </li>
                  <li>
                    <span className="ec-card-key">Follow-up</span>
                    <span className="ec-card-val">Included</span>
                  </li>
                  <li>
                    <span className="ec-card-key">Investment</span>
                    <span className="ec-card-val lime">£5,000</span>
                  </li>
                </ul>
                <p className="ec-hero-card-note">
                  Every session is built from scratch around the person in the room.
                  No standard curriculum. No slides you've seen before.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── CLARITY STRIP ─────────────────────────────── */}
        <div className="ec-clarity">
          <div className="ec-clarity-inner">
            <span className="ec-clarity-marker">Important</span>
            <div className="ec-clarity-divider" />
            <p className="ec-clarity-text">
              This is a one-to-one experience. Not a workshop. Not a group session.
              One leader, one day, built entirely around you.
            </p>
          </div>
        </div>

        {/* ── WHAT IT IS ────────────────────────────────── */}
        <section className="ec-what">
          <div className="ec-wrap">
            <div className="ec-what-inner">

              <div>
                <p className="ec-eyebrow">What It Is</p>
                <h2 className="ec-headline">A different kind of day.</h2>
                <p className="ec-body">
                  Most senior leaders have been meaning to properly get to grips with AI for the
                  best part of two years. They've tried tools. They've read articles. They've sat
                  in demos. But between running a business and managing a team, the space to
                  actually think it through never quite materialises.
                </p>
                <p className="ec-body">
                  AI Executive Coaching is a single, focused engagement that closes that gap.
                  One day with someone who has done this work across multiple businesses —
                  and who has prepared specifically for yours.
                </p>
                <p className="ec-body">
                  This isn't about learning features. It's about fundamentally changing how you
                  think, work, and operate — so you're getting more done in less time, and
                  getting to the strategic thinking that usually gets crowded out.
                </p>
              </div>

              <div>
                <ul className="ec-truths">
                  <li className="ec-truth">
                    <span className="ec-truth-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                      </svg>
                    </span>
                    <div>
                      <p className="ec-truth-title">Built around how you specifically work</p>
                      <p className="ec-truth-body">
                        Your tools. Your calendar. Your way of thinking. The prep work happens
                        before the day — so the day itself isn't generic.
                      </p>
                    </div>
                  </li>
                  <li className="ec-truth">
                    <span className="ec-truth-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                      </svg>
                    </span>
                    <div>
                      <p className="ec-truth-title">Voice is a bigger shift than people expect</p>
                      <p className="ec-truth-body">
                        A lot of this is thought-based work — and using voice instead of text
                        changes everything about how you capture ideas, brief people, and think out
                        loud. Small change. Enormous difference.
                      </p>
                    </div>
                  </li>
                  <li className="ec-truth">
                    <span className="ec-truth-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </span>
                    <div>
                      <p className="ec-truth-title">Designed for people who are always in meetings</p>
                      <p className="ec-truth-body">
                        Even if your days are back-to-back, we'll show you how to use the pockets
                        of time you do have — so AI works around your life, not the other way round.
                      </p>
                    </div>
                  </li>
                  <li className="ec-truth">
                    <span className="ec-truth-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                      </svg>
                    </span>
                    <div>
                      <p className="ec-truth-title">You leave with everything you need to keep going</p>
                      <p className="ec-truth-body">
                        Tools, workflows, prompts, a roadmap — all tailored to your context.
                        Not a reading list. Not a PDF of frameworks. Actual, working things.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── VIDEO SECTION ─────────────────────────────── */}
        <section className="ec-video">
          <div className="ec-wrap">
            <div className="ec-video-inner">

              <div>
                <div className="ec-video-placeholder">
                  <div className="ec-play-btn" />
                  <span className="ec-video-label">Watch: Anshul explains the day</span>
                </div>
              </div>

              <div>
                <p className="ec-eyebrow">From Anshul</p>
                <h2 className="ec-video-quote">
                  "Most leaders I meet have been sitting on this for over a year.{' '}
                  <em>Not because they're not smart enough — because they haven't had the right
                  guide for a single focused day.</em>"
                </h2>
                <p className="ec-video-body">
                  I built this because I kept having the same conversation. Brilliant people,
                  running serious businesses, watching AI happen around them — and never quite
                  getting the time to engage with it properly on their own terms.
                </p>
                <p className="ec-video-body">
                  This is the day I wish someone had given me when I started.
                  Honest, practical, built around how you actually work.
                </p>
                <p className="ec-video-caption">Anshul Kapoor — Founder, AiGENiQ</p>
              </div>

            </div>
          </div>
        </section>

        {/* ── THE PROCESS ───────────────────────────────── */}
        <section className="ec-process" id="ec-process">
          <div className="ec-wrap">
            <div className="ec-process-header">
              <div>
                <p className="ec-eyebrow">How It Works</p>
                <h2 className="ec-headline">Three stages. One outcome.</h2>
              </div>
              <div>
                <p className="ec-body" style={{ marginBottom: 0 }}>
                  The preparation is what makes the day work. And the follow-up is what makes it
                  stick. This isn't a day you book and turn up to — it's an engagement.
                </p>
              </div>
            </div>

            <div className="ec-process-steps">
              <div className="ec-step-col">
                <p className="ec-step-num">Before</p>
                <h3 className="ec-step-title">Preparation — done by us, tailored to you</h3>
                <p className="ec-step-body">
                  Before we meet, you complete a detailed questionnaire about how you work, where
                  your time goes, what tools you use, and what you're trying to achieve. We use
                  that to build a personalised session — not a standard agenda.
                </p>
                <div className="ec-step-details">
                  <div className="ec-step-detail-item">Detailed pre-session questionnaire</div>
                  <div className="ec-step-detail-item">Research into your business and context</div>
                  <div className="ec-step-detail-item">Personalised materials built specifically for your day</div>
                  <div className="ec-step-detail-item">Tool audit — what you have, what you may need</div>
                </div>
              </div>
              <div className="ec-step-col">
                <p className="ec-step-num">The Day</p>
                <h3 className="ec-step-title">One-to-one, in person, focused entirely on you</h3>
                <p className="ec-step-body">
                  A full day (or two half-days, depending on what works for you) working through
                  how AI can change the way you operate. Hands-on throughout. Every exercise,
                  every tool, every prompt — built around your actual work.
                </p>
                <div className="ec-step-details">
                  <div className="ec-step-detail-item">In-person, face-to-face session</div>
                  <div className="ec-step-detail-item">Practical exercises using your real workflows</div>
                  <div className="ec-step-detail-item">Voice, text, and thinking tools covered</div>
                  <div className="ec-step-detail-item">Personalised AI roadmap built during the session</div>
                </div>
              </div>
              <div className="ec-step-col">
                <p className="ec-step-num">After</p>
                <h3 className="ec-step-title">A follow-up session to make sure it sticks</h3>
                <p className="ec-step-body">
                  Two to four weeks later, we check in. What's working? What's not landed yet?
                  What needs adjusting? The follow-up is included — because the goal isn't a
                  good day, it's a permanent shift in how you work.
                </p>
                <div className="ec-step-details">
                  <div className="ec-step-detail-item">Follow-up session included in investment</div>
                  <div className="ec-step-detail-item">Review of what's changed in practice</div>
                  <div className="ec-step-detail-item">Adjustments to your roadmap if needed</div>
                  <div className="ec-step-detail-item">Pathway to a broader engagement if relevant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUTCOMES (DARK) ───────────────────────────── */}
        <section className="ec-outcomes">
          <div className="ec-wrap">
            <div className="ec-outcomes-inner">

              <div>
                <p className="ec-eyebrow" style={{ color: '#555' }}>What Changes</p>
                <h2 className="ec-outcomes-headline">
                  More brain space.<br />
                  More <em>strategic time.</em><br />
                  Every week.
                </h2>
                <p className="ec-outcomes-body">
                  We won't promise you a specific productivity percentage. What we can tell you
                  is what leaders consistently find after a day like this — and it usually starts
                  within the first week of putting it into practice.
                </p>
                <blockquote className="ec-outcomes-quote">
                  "The people I work with start getting to thinking they'd previously given up on —
                  the strategic stuff that kept getting pushed to next week, then next month.
                  That's not a small thing."
                </blockquote>
              </div>

              <div>
                <ul className="ec-outcomes-list">
                  <li className="ec-outcome-item">
                    <div className="ec-outcome-marker" />
                    <div>
                      <p className="ec-outcome-title">A personalised AI roadmap — yours to keep</p>
                      <p className="ec-outcome-body">
                        Built during the session. Specific to how you work and what your business
                        needs. Not a template with your name on it.
                      </p>
                    </div>
                  </li>
                  <li className="ec-outcome-item">
                    <div className="ec-outcome-marker" />
                    <div>
                      <p className="ec-outcome-title">A working toolkit — set up and ready to use</p>
                      <p className="ec-outcome-body">
                        The actual tools, prompts, and workflows we build during the day. You leave
                        using them, not planning to use them.
                      </p>
                    </div>
                  </li>
                  <li className="ec-outcome-item">
                    <div className="ec-outcome-marker" />
                    <div>
                      <p className="ec-outcome-title">A new way of thinking through problems</p>
                      <p className="ec-outcome-body">
                        Voice-first working. AI as a thinking partner. The ability to capture and
                        develop ideas faster than ever before.
                      </p>
                    </div>
                  </li>
                  <li className="ec-outcome-item">
                    <div className="ec-outcome-marker" />
                    <div>
                      <p className="ec-outcome-title">Time back — starting from the first week</p>
                      <p className="ec-outcome-body">
                        The repetitive, low-value thinking that fills up a senior leader's day
                        starts to shrink. What you do with that time is up to you.
                      </p>
                    </div>
                  </li>
                  <li className="ec-outcome-item">
                    <div className="ec-outcome-marker" />
                    <div>
                      <p className="ec-outcome-title">Confidence to lead AI adoption in your business</p>
                      <p className="ec-outcome-body">
                        You'll know enough to make good decisions, ask the right questions, and
                        guide your team — without being dependent on anyone to tell you what to do.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* ── INVESTMENT ────────────────────────────────── */}
        <section className="ec-investment">
          <div className="ec-wrap">
            <p className="ec-eyebrow" style={{ marginBottom: '24px' }}>Investment</p>
            <div className="ec-investment-inner">

              <div className="ec-inv-left">
                <div className="ec-inv-amount"><span>£</span>5,000</div>
                <p className="ec-inv-label">Per engagement — everything below is included</p>
                <ul className="ec-inv-includes">
                  <li>Pre-session preparation — research and personalised materials</li>
                  <li>Full-day one-to-one coaching session (or 2 × half-day)</li>
                  <li>Personalised AI roadmap built during the session</li>
                  <li>Working toolkit — tools, prompts, and workflows configured for you</li>
                  <li>Follow-up session (2–4 weeks post-day)</li>
                </ul>
                <div className="ec-inv-reframe">
                  <strong>A note on the number.</strong> £5,000 is less than most businesses spend
                  on a piece of software nobody uses, a strategy away-day that produces a PDF, or a
                  single bad hire. The difference is you leave with a genuinely new way of
                  operating — built around how you actually think and work.
                </div>
              </div>

              <div className="ec-inv-right">
                <p className="ec-inv-right-title">What happens when you get in touch</p>
                <ul className="ec-inv-steps">
                  <li className="ec-inv-step">
                    <span className="ec-inv-step-num">01</span>
                    <div className="ec-inv-step-text">
                      <strong>Short introductory call</strong>
                      We'll spend 20 minutes checking this is the right fit — for both of us.
                    </div>
                  </li>
                  <li className="ec-inv-step">
                    <span className="ec-inv-step-num">02</span>
                    <div className="ec-inv-step-text">
                      <strong>Pre-session questionnaire</strong>
                      You complete a detailed questionnaire. We use it to build your personalised session.
                    </div>
                  </li>
                  <li className="ec-inv-step">
                    <span className="ec-inv-step-num">03</span>
                    <div className="ec-inv-step-text">
                      <strong>We prepare — properly</strong>
                      Research, materials, tools. All tailored to you before we meet.
                    </div>
                  </li>
                  <li className="ec-inv-step">
                    <span className="ec-inv-step-num">04</span>
                    <div className="ec-inv-step-text">
                      <strong>The day itself</strong>
                      In person. One-to-one. Built around how you think and work.
                    </div>
                  </li>
                  <li className="ec-inv-step">
                    <span className="ec-inv-step-num">05</span>
                    <div className="ec-inv-step-text">
                      <strong>Follow-up session</strong>
                      Two to four weeks later. What's landed? What needs adjusting?
                    </div>
                  </li>
                </ul>
                <a href="mailto:hello@aigeniq.ai" className="ec-inv-book-cta">Book Your Day →</a>
                <p className="ec-inv-book-note">
                  Or{' '}
                  <a href="mailto:hello@aigeniq.ai">start with a 25-minute clarity call</a>
                  {' '}if you'd like to talk it through first.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── QUALIFIER ─────────────────────────────────── */}
        <section className="ec-qualifier">
          <div className="ec-wrap">
            <p className="ec-eyebrow" style={{ marginBottom: '32px' }}>Is This Right For You?</p>
            <div className="ec-qualifier-inner">

              <div>
                <p className="ec-qualifier-col-title">This is for you if —</p>
                <ul className="ec-qualifier-list">
                  <li className="yes">You run or lead a business and AI has been on your to-do list for too long</li>
                  <li className="yes">You've tried tools but never had the space to use them properly</li>
                  <li className="yes">You want a clear plan — not another article to read</li>
                  <li className="yes">You're in back-to-back meetings and want to maximise every pocket of time</li>
                  <li className="yes">You want to lead AI adoption in your business, not just support it</li>
                  <li className="yes">You're willing to be candid about how your business actually works</li>
                </ul>
              </div>

              <div>
                <p className="ec-qualifier-col-title muted">Probably not right if —</p>
                <ul className="ec-qualifier-list">
                  <li className="no">You're looking for a group workshop or team training session</li>
                  <li className="no">You want someone to implement AI without being involved yourself</li>
                  <li className="no">You're at the very early stages of exploring whether AI matters at all</li>
                  <li className="no">You need board-level sign-off before investing in your own development</li>
                </ul>
                <div className="ec-qualifier-hint">
                  Not sure?{' '}
                  <a href="mailto:hello@aigeniq.ai">Book a 25-minute clarity call.</a>
                  {' '}We'll tell you honestly whether this is the right fit — and if not, what probably is.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CTA STRIP ─────────────────────────────────── */}
        <section className="ec-cta-strip">
          <div className="ec-wrap">
            <div className="ec-cta-inner">
              <h2 className="ec-cta-headline">
                Ready to have the day<br />you've been putting off?
              </h2>
              <p className="ec-cta-sub">
                Book your place or start with a clarity call. Either way, you'll leave knowing
                exactly what to do next.
              </p>
              <a href="mailto:hello@aigeniq.ai" className="ec-cta-btn">
                Book Your Day — £5,000 →
              </a>
              <p className="ec-cta-honest">
                If we can't help, we'll tell you. Either way, you'll leave with more clarity than you arrived with.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
