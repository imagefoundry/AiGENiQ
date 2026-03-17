import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import HowWeWorkPage from './pages/HowWeWorkPage'
import ServicesPage from './pages/ServicesPage'
import InsightsLanding from './pages/InsightsLanding'
import ArticlePage from './pages/ArticlePage'
import AdminDashboard from './pages/AdminDashboard'
import ExecCoachingPage from './pages/ExecCoachingPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-we-work" element={<HowWeWorkPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ai-executive-coaching" element={<ExecCoachingPage />} />
        <Route path="/insights" element={<InsightsLanding />} />
        <Route path="/insights/:slug" element={<ArticlePage />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  )
}
