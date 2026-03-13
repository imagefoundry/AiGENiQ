import { useCounterAnimation } from '../hooks/useCounterAnimation'

export default function StatsCard() {
  const { ref: numRef, value: numValue } = useCounterAnimation(70)
  const { ref: countRef, value: countValue } = useCounterAnimation(200, 1600)

  return (
    <article
      className="stats-card"
      aria-label="Client result: 70% reduction in listing time for UK automotive dealership"
    >
      <div className="sc-header">
        <span className="sc-header-label">Client Results — Automotive</span>
        <span className="sc-tag">Live</span>
      </div>

      <div className="sc-body">
        <div className="sc-main-stat" aria-label="70 percent reduction">
          <span
            className="sc-num"
            ref={numRef as React.RefObject<HTMLSpanElement>}
            aria-hidden="true"
          >
            {numValue}
          </span>
          <span className="sc-sym" aria-hidden="true">%</span>
        </div>

        <p className="sc-stat-label">
          Reduction in vehicle listing creation time — from manual data entry
          to voice-dictated AI workflow
        </p>
        <p className="sc-delivery">
          Delivered in under 90 days · UK used vehicle dealership
        </p>

        <dl className="sc-metrics">
          <div className="sc-row">
            <div className="sc-row-left">
              <span className="sc-dot d-lime" aria-hidden="true" />
              <dt className="sc-row-label">Time per listing</dt>
            </div>
            <dd className="sc-row-val">~40 min → 8 min</dd>
          </div>

          <div className="sc-row">
            <div className="sc-row-left">
              <span className="sc-dot d-cyan" aria-hidden="true" />
              <dt className="sc-row-label">Team adoption</dt>
            </div>
            <dd className="sc-row-val">Full team, week 2</dd>
          </div>

          <div className="sc-row">
            <div className="sc-row-left">
              <span className="sc-dot d-lime" aria-hidden="true" />
              <dt className="sc-row-label">Listings processed</dt>
            </div>
            <dd
              className="sc-row-val"
              ref={countRef as React.RefObject<HTMLElement>}
            >
              {countValue}+ in first month
            </dd>
          </div>

          <div className="sc-row">
            <div className="sc-row-left">
              <span className="sc-dot d-grey" aria-hidden="true" />
              <dt className="sc-row-label">Scope</dt>
            </div>
            <dd className="sc-row-val">Single dealership</dd>
          </div>
        </dl>
      </div>

      <footer className="sc-footer">
        This is one engagement. Every business is different — but this is the
        kind of result we plan for.
      </footer>
    </article>
  )
}
