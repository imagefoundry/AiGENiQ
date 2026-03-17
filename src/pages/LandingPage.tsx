import { useScrollReveal } from '../hooks/useScrollReveal'
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

  return (
    <>
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
