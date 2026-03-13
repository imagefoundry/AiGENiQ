interface Principle {
  num: string
  titleParts: (string | { em: string })[]
  body: string
  tag: string
}

const PRINCIPLES: Principle[] = [
  {
    num: '01',
    titleParts: ['We think like the ', { em: 'owners' }, ' we serve.'],
    body: "We bring founder energy to every engagement. We treat your budget as if it were our own — which means we tell you when something isn't worth building, not just when it is.",
    tag: 'Value: Entrepreneurial by Nature',
  },
  {
    num: '02',
    titleParts: ["We're obsessed with ", { em: 'ROI' }, ', not innovation theatre.'],
    body: "Every tool we recommend has to justify itself in time saved, revenue protected, or decisions improved. We have no interest in impressive demos that don't survive the first month of real use.",
    tag: 'Value: Relentlessly Practical',
  },
  {
    num: '03',
    titleParts: ['We build AI that actually ', { em: 'sticks' }, '.'],
    body: "Adoption is the metric. We don't leave when the build is done — we leave when your team owns it and doesn't need us anymore. That's what making AI adoption stick means.",
    tag: 'Mission: Making AI Adoption Stick',
  },
]

export default function WhyAigeniq() {
  return (
    <section className="why" id="why-aigeniq" aria-labelledby="why-heading">
      <div className="container">
        <div className="why-head" data-reveal>
          <span className="sec-label" aria-hidden="true">Why AiGENiQ</span>
          <h2 id="why-heading">
            Three things that don't change,<br />no matter the project.
          </h2>
        </div>

        <div className="why-grid">
          {PRINCIPLES.map((p, i) => (
            <article key={p.num} className="why-card" data-reveal data-delay={String(i + 1) as '1' | '2' | '3'}>
              <div className="why-pnum" aria-label={`Principle ${i + 1}`}>{p.num}</div>
              <h3>
                {p.titleParts.map((part, pi) =>
                  typeof part === 'string'
                    ? <span key={pi}>{part}</span>
                    : <em key={pi}>{part.em}</em>
                )}
              </h3>
              <p>{p.body}</p>
              <span className="value-tag">{p.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
