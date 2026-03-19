import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import HowWeWorkPage from './pages/HowWeWorkPage'
import ServicesPage from './pages/ServicesPage'
import InsightsLanding from './pages/InsightsLanding'
import ArticlePage from './pages/ArticlePage'
import AdminDashboard from './pages/AdminDashboard'
import ExecCoachingPage from './pages/ExecCoachingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
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
    </>
  )
}
