import { Outlet } from 'react-router-dom'
import Banner from './Banner'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Banner />
      <Navbar />
      <Outlet />
    </>
  )
}
