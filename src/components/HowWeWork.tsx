import { useFlipCard } from '../hooks/useFlipCard'

interface Step {
  num: string
  name: string
  title: string
  frontBody: string
  hoverBody: string
}

const STEPS: Step[] = [
  {
    num: '01',
    name: 'Assess',
    title: 'Understand before we advise',
    frontBody:
      "We map how your business actually works — where time disappears, where decisions get made, where the gaps are. No assumptions, no pre-built solutions.",
    hoverBody:
      "We spend time understanding your operations before we say a word about tools. We interview your team, map your workflows, and identify where AI would genuinely help versus where it would just add noise.",
  },
  {
    num: '02',
    name: 'Plan',
    title: "Prioritise what's worth building",
    frontBody:
      "We turn the assessment into a practical roadmap — sequenced, costed, and tied to real outcomes. Leadership aligned before we write a line of code.",
    hoverBody:
      "We don't just hand you a list of AI tools. We create a structured roadmap that sequences the right work in the right order — quick wins first, then the bigger changes.",
  },
  {
    num: '03',
    name: 'Implement',
    title: 'Build it so it actually sticks',
    frontBody:
      "We build within your environment, train your team properly, and don't leave until adoption is real — not just demonstrated in a handover call.",
    hoverBody:
      "We build everything inside your own environment — no lock-in, no black boxes. Your team is trained through the build, not after it. We measure adoption, not delivery.",
  },
]

export default function HowWeWork() {
  const { openIndex, toggle } = useFlipCard()

  return (
    <section className="hww" id="how-we-work" aria-labelledby="hww-heading">
      <div className="container">
        <div className="hww-head" data-reveal>
          <span className="sec-label" aria-hidden="true">How We Work</span>
          <h2 id="hww-heading">
            Structured.<br />But never rigid.
          </h2>
          <p>Every business is different. Some need the full journey — others just need the right piece.</p>
        </div>

        <div className="hww-grid">
          {STEPS.map((step, i) => (
            <article
              key={step.num}
              className={`hww-card${openIndex === i ? ' open' : ''}`}
              tabIndex={0}
              data-reveal
              data-delay={String(i + 1) as '1' | '2' | '3'}
              aria-label={`Step ${i + 1}: ${step.name} — ${step.title}. Activate for details.`}
              onClick={() => toggle(i)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) }
                if (e.key === 'Escape') toggle(i)
              }}
            >
              <div className="hww-front">
                <div className="hww-stepnum" aria-hidden="true">{step.num}</div>
                <div className="hww-stepname" aria-hidden="true">{step.name}</div>
                <h3>{step.title}</h3>
                <p>{step.frontBody}</p>
              </div>
              <div className="hww-hover" aria-hidden="true">
                <h4>{step.name}</h4>
                <p>{step.hoverBody}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="hww-note">
          You don't have to start at Step 01. Tell us where you are and we'll meet you there.
        </p>
        <p className="transp-note">
          For full transparency: all projects delivered within your own environment.
        </p>
      </div>
    </section>
  )
}
