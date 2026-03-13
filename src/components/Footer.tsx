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

          <nav className="foot-col" aria-label="Sitemap">
            <h4>Sitemap</h4>
            <a href="#who-its-for">About</a>
            <a href="#why-aigeniq">Benefits</a>
            <a href="#proof">Case Studies</a>
            <a href="#how-we-work">How We Work</a>
          </nav>

          <nav className="foot-col" aria-label="Contact">
            <h4>Contact</h4>
            <a href="#cta">Book a Clarity Call</a>
            <a href="mailto:hello@aigeniq.ai">hello@aigeniq.ai</a>
            <a href="tel:+441618706424" aria-label="Phone: +44 161 870 6424">
              +44 (0)161 870 6424
            </a>
          </nav>

          <nav className="foot-col" aria-label="Social media">
            <h4>Follow</h4>
            <a
              href="https://www.linkedin.com/company/aigeniq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AiGENiQ on LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@aigeniq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AiGENiQ on YouTube (opens in new tab)"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/aigeniq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AiGENiQ on Instagram (opens in new tab)"
            >
              Instagram
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
