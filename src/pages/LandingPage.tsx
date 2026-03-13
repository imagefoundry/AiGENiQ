import { useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Banner from '../components/Banner'
import Navbar from '../assets/Navbar'
import Hero from '../components/Hero'
import Audience from '../components/Audience'
import Proof from '../components/Proof'
import HowWeWork from '../components/HowWeWork'
import WhyAigeniq from '../components/WhyAigeniq'
import CTAStrip from '../components/CTAStrip'
import Footer from '../components/Footer'

export default function LandingPage() {
  // Kick off scroll-reveal after the page mounts
  useScrollReveal()

  // Close flip cards when clicking outside of them
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('.aud-card') && !target.closest('.hww-card')) {
        document.querySelectorAll('.aud-card.open, .hww-card.open').forEach(el => {
          el.classList.remove('open')
        })
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Banner />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Audience />
        <Proof />
        <HowWeWork />
        <WhyAigeniq />
        <CTAStrip />
      </main>
      <Footer />
    </>
  )
}
