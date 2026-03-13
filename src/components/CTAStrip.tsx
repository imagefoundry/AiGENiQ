export default function CTAStrip() {
  return (
    <section className="cta-strip" id="cta" aria-labelledby="cta-heading">
      <div className="cta-inner" data-reveal>
        <h2 id="cta-heading">
          The hardest part is usually just starting the conversation.
        </h2>
        <p className="cta-sub">
          Book a 25-minute call. No pitch. No agenda beyond understanding where you are.
        </p>
        <p className="cta-honest">If we can't help, we'll tell you.</p>
        <a
          href="https://calendly.com/aigeniq/clarity-call"
          className="btn-cta"
          rel="noopener noreferrer"
          target="_blank"
        >
          Book a Clarity Call
        </a>
      </div>
    </section>
  )
}
