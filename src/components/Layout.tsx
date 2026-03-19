import { Outlet } from 'react-router-dom'
import Banner from './Banner'
import Navbar from './Navbar'
import { CalendarProvider } from '../contexts/CalendarContext'

export default function Layout() {
  return (
    <CalendarProvider>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Banner />
      <Navbar />
      <Outlet />
    </CalendarProvider>
  )
}
