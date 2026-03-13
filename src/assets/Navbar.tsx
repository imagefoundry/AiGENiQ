import { useCallback } from 'react'
import { useNavScroll } from '../hooks/useNavScroll'
import { useMobileNav } from '../hooks/useMobileNav'
import logoSrc from '../assets/Logo.svg'

const NAV_LINKS = [
  { label: 'Benefits',    href: '#why-aigeniq' },
  { label: 'Resources',   href: '#resources'   },
  { label: 'Case Studies',href: '#proof'        },
  { label: 'Insights',    href: '#insights'     },
  { label: 'About',       href: '#who-its-for'  },
]

export default function Navbar() {
  const scrolled = useNavScroll()
  const { isOpen, open, close } = useMobileNav()

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href === '#') return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const delay = isOpen ? 380 : 0
      if (isOpen) close()
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, delay)
    },
    [isOpen, close]
  )

  return (
    <>
      {/* Mobile Drawer */}
      <nav
        className="mob-nav"
        id="mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal={true}
      >
        <button
          className="mob-close"
          type="button"
          aria-label="Close navigation menu"
          onClick={close}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} onClick={e => handleAnchorClick(e, href)}>
            {label}
          </a>
        ))}
        <a
          href="#cta"
          className="mob-cta-link"
          onClick={e => handleAnchorClick(e, '#cta')}
        >
          BOOK A CALL
        </a>
      </nav>

      {/* Overlay */}
      <div
        className={`mob-overlay${isOpen ? ' active' : ''}`}
        aria-hidden="true"
        onClick={close}
      />

      {/* Primary Nav */}
      <header>
        <nav
          className={`nav${scrolled ? ' scrolled' : ''}`}
          id="nav"
          aria-label="Primary navigation"
        >
          <div className="nav-inner">
            <a
              href="/"
              className="nav-logo"
              aria-label="AiGENiQ — Home"
              onClick={e => { e.preventDefault(); window.location.reload() }}
            >
              <img
                src={logoSrc}
                alt="AiGENiQ"
                className="nav-logo-img"
                width={120}
                height={34}
              />
            </a>

            {/* Hamburger */}
            <button
              className="nav-ham"
              id="nav-ham"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
              onClick={open}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <div className="nav-links">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={href} href={href} onClick={e => handleAnchorClick(e, href)}>
                  {label}
                </a>
              ))}
              <a
                href="#cta"
                className="nav-btn"
                onClick={e => handleAnchorClick(e, '#cta')}
              >
                BOOK A CALL
              </a>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
