import { useFlipCard } from '../hooks/useFlipCard'
import curiousImg from '../assets/curious-but-cautious.jpg'
import clearImg from '../assets/clear-on-path.jpg'
import readyImg from '../assets/ready-to-implement.jpg'

interface AudienceItem {
  num: string
  img: string
  imgAlt: string
  title: string
  frontBody: string
  hoverTitle: string
  hoverBody: string
}

const ITEMS: AudienceItem[] = [
  {
    num: '01',
    img: curiousImg,
    imgAlt: 'Business leader thoughtfully considering where AI fits in their organisation',
    title: 'Curious But\nCautious',
    frontBody:
      "You know AI is changing things. You're watching competitors move. You just don't know what's real, what's hype, or where to start without wasting money.",
    hoverTitle: 'Curious But\nCautious',
    hoverBody:
      "You know AI is changing things. You're just not sure what's hype and what's real — or where the risks are. We'll give you clarity without the sales pitch.",
  },
  {
    num: '02',
    img: clearImg,
    imgAlt: 'Business team reviewing a strategy document and planning their AI roadmap',
    title: 'Clear On The\nProblem, Unclear On The Path',
    frontBody:
      "You've identified where AI could help. You've tried a few tools. But nothing has stuck and you don't have a plan your team will actually follow.",
    hoverTitle: 'Clear on the problem, not the path',
    hoverBody:
      "You've got a sense of where AI could help, but no roadmap. We'll help you prioritise what's worth building and create a plan your team will actually adopt.",
  },
  {
    num: '03',
    img: readyImg,
    imgAlt: 'Confident business leader with budget approved and team aligned, ready for AI implementation',
    title: 'Ready To\nImplement',
    frontBody:
      "You've done the thinking. Budget signed off. Leadership aligned. You need someone to build it right — no cutting corners, no over-engineering, no lock-in.",
    hoverTitle: 'Ready To\nImplement',
    hoverBody:
      "You've done the thinking. You need someone to build it without cutting corners or over-engineering — and without creating a dependency on an agency forever.",
  },
]

export default function Audience() {
  const { openIndex, toggle } = useFlipCard()

  return (
    <section className="audience" id="who-its-for" aria-labelledby="audience-heading">
      <div className="container">
        <div className="audience-head" data-reveal>
          <span className="sec-label" aria-hidden="true">Who It's For</span>
          <h2 id="audience-heading">Pick the description that fits.</h2>
          <p>We work with business leaders wherever they're starting from.</p>
        </div>

        <div className="audience-grid">
          {ITEMS.map((item, i) => (
            <article
              key={item.num}
              className={`aud-card${openIndex === i ? ' open' : ''}`}
              tabIndex={0}
              data-reveal
              data-delay={String(i + 1) as '1' | '2' | '3'}
              aria-label={`${item.num} — ${item.title.replace('\n', ' ')}. Activate to learn more.`}
              onClick={() => toggle(i)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) }
                if (e.key === 'Escape') toggle(i)
              }}
            >
              <span className="aud-num" aria-hidden="true">{item.num}</span>

              <div className="aud-img">
                <img
                  src={item.img}
                  alt={item.imgAlt}
                  width={400}
                  height={195}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="aud-front">
                <h3>
                  {item.title.split('\n').map((line, li) => (
                    <span key={li}>{line}{li < item.title.split('\n').length - 1 && <br />}</span>
                  ))}
                </h3>
                <span className="aud-arrow" aria-hidden="true">→</span>
              </div>

              <div className="aud-hover" aria-hidden="true">
                <h3>
                  {item.hoverTitle.split('\n').map((line, li) => (
                    <span key={li}>{line}{li < item.hoverTitle.split('\n').length - 1 && <br />}</span>
                  ))}
                </h3>
                <p>{item.hoverBody}</p>
                <span className="aud-check" aria-hidden="true">✓</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
