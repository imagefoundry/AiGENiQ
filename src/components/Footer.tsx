import { useNavigate } from 'react-router-dom'
import footerLogoSrc from '../assets/Footer-logo.svg'

export default function Footer() {
  const navigate = useNavigate()
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
            <a href="/services#adoption">AI Adoption &amp; Strategy</a>
            <a href="/services#automation">Workflow Automation</a>
            <a href="/services#automation">Custom Build</a>
            <a href="/services#coaching">AI Leadership Intensive</a>
          </nav>

          <nav className="foot-col" aria-label="Company">
            <h4>Company</h4>
            <a href="/how-we-work">How We Work</a>
            <a href="/#proof">Case Studies</a>
            <a href="/#who-its-for">About Us</a>
            <a href="/insights">Insights</a>
          </nav>

          <nav className="foot-col" aria-label="Get in Touch">
            <h4>Get in Touch</h4>
            <a href="#cta">Book a Clarity Call</a>
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
