import { useCounterAnimation } from '../hooks/useCounterAnimation'

export default function Proof() {
  const { ref: proofNumRef, value: proofNumValue } = useCounterAnimation(70)

  return (
    <section className="proof" id="proof" aria-labelledby="proof-quote">
      <div className="container">
        <div className="proof-grid" data-reveal>

          <div className="proof-left">
            <span className="proof-sec-label" aria-hidden="true">From Our Work</span>
            <div className="proof-stat" aria-label="70 percent reduction in listing creation time">
              <span
                className="proof-num"
                ref={proofNumRef as React.RefObject<HTMLSpanElement>}
                aria-hidden="true"
              >
                {proofNumValue}
              </span>
              <span className="proof-sym" aria-hidden="true">%</span>
            </div>
            <p className="proof-desc">
              Reduction in listing creation time — from manual data entry to
              voice-dictated automation. Delivered in under 90 days for a UK
              used vehicle dealership.
            </p>
            <span className="proof-source">AiGENiQ Case Study — Automotive</span>
          </div>

          <div className="proof-right">
            <span className="proof-qmark" aria-hidden="true">"</span>
            <blockquote>
              <p id="proof-quote" className="proof-quote">
                The businesses pulling ahead right now aren't the ones with
                the biggest budgets. They're the ones that made a decision and
                acted on it.
              </p>
              <footer className="proof-attr">
                <cite>Operations Director, Professional Services, Manchester</cite>
              </footer>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  )
}
