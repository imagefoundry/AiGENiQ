import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'

const HowWeWorkPage    = lazy(() => import('./pages/HowWeWorkPage'))
const ServicesPage     = lazy(() => import('./pages/ServicesPage'))
const InsightsLanding  = lazy(() => import('./pages/InsightsLanding'))
const ArticlePage      = lazy(() => import('./pages/ArticlePage'))
const AdminDashboard   = lazy(() => import('./pages/AdminDashboard'))
const ExecCoachingPage = lazy(() => import('./pages/ExecCoachingPage'))
const AboutPage        = lazy(() => import('./pages/AboutPage'))
const ContactPage      = lazy(() => import('./pages/ContactPage'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-we-work" element={<HowWeWorkPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/ai-executive-coaching" element={<ExecCoachingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/insights" element={<InsightsLanding />} />
            <Route path="/insights/:slug" element={<ArticlePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </>
  )
}
