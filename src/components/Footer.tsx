import { useNavigate, Link } from 'react-router-dom'
import footerLogoSrc from '../assets/Footer-logo.svg'
import { useCalendar } from '../contexts/CalendarContext'

export default function Footer() {
  const navigate = useNavigate()
  const { openCalendar } = useCalendar()
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div>
            <a
              href="/"
              className="foot-logo"
              aria-label="AiGENiQ — Home"
              onClick={e => { e.preventDefault(); navigate('/'); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0) }}
            >
              <img
                src={footerLogoSrc}
                alt="AiGENiQ"
                className="foot-logo-img"
                width={120}
                height={34}
              />
            </a>
            <p className="foot-tagline">Making AI adoption stick.</p>
            <address className="foot-addr">
              Colony, Jactin House<br />
              24 Hood St, Ancoats<br />
              Manchester, M4 6WX
            </address>
          </div>

          <nav className="foot-col" aria-label="Services">
            <h4>Services</h4>
            <Link to="/services#adoption">AI Adoption &amp; Strategy</Link>
            <Link to="/services#automation">Workflow Automation</Link>
            <Link to="/services#automation">Custom Build</Link>
            <Link to="/services#coaching">AI Leadership Intensive</Link>
          </nav>

          <nav className="foot-col" aria-label="Company">
            <h4>Company</h4>
            <Link to="/how-we-work">How We Work</Link>
            <Link to="/#proof">Case Studies</Link>
            <Link to="/about">About Us</Link>
            <Link to="/insights">Insights</Link>
          </nav>

          <nav className="foot-col" aria-label="Get in Touch">
            <h4>Get in Touch</h4>
            <a href="https://calendly.com/anshul-aigeniq/25-minute-discovery-call" onClick={(e) => { e.preventDefault(); openCalendar() }}>Book a Clarity Call</a>
            <a href="mailto:hello@aigeniq.ai">hello@aigeniq.ai</a>
            <a
              href="https://www.linkedin.com/company/aigeniq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AiGENiQ on LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="footer-bottom">
          <small className="foot-legal">
            &copy; {year} AiGENiQ Limited. All rights reserved. Company No: 16587507
          </small>
          <small className="foot-legal" style={{ color: '#1e1e1e' }}>aigeniq.ai</small>
        </div>
      </div>
    </footer>
  )
}
