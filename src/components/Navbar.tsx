import { useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useNavScroll } from '../hooks/useNavScroll'
import { useMobileNav } from '../hooks/useMobileNav'
import logoSrc from '../assets/Logo.svg'

const NAV_LINKS: Array<{ label: string; href?: string; to?: string }> = [
  { label: 'How We Work', to: '/how-we-work' },
  { label: 'Case Studies', href: '#proof' },
  { label: 'About',        href: '#who-its-for' },
  { label: 'Insights',     href: '#insights' },
]

export default function Navbar() {
  const scrolled = useNavScroll()
  const { isOpen, open, close } = useMobileNav()
  const { pathname } = useLocation()
  const navigate = useNavigate()

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

  function renderLink(link: typeof NAV_LINKS[number], className?: string) {
    if (link.to) {
      const isActive = pathname === link.to
      const cls = [className, isActive ? 'active' : ''].filter(Boolean).join(' ') || undefined
      return (
        <Link key={link.to} to={link.to} className={cls} onClick={isOpen ? close : undefined}>
          {link.label}
        </Link>
      )
    }
    return (
      <a key={link.href} href={link.href} className={className} onClick={e => handleAnchorClick(e, link.href!)}>
        {link.label}
      </a>
    )
  }

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

        {NAV_LINKS.map(link => renderLink(link))}
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
      <header className="site-header">
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
              onClick={e => { e.preventDefault(); pathname === '/' ? window.location.reload() : navigate('/') }}
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
              {NAV_LINKS.map(link => renderLink(link))}
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
