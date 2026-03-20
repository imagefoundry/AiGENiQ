import { Outlet } from 'react-router-dom'
import Banner from './Banner'
import Navbar from './Navbar'
import { CalendarProvider } from '../contexts/CalendarContext'

export default function Layout() {
  return (
    <CalendarProvider>
      <Banner />
      <Navbar />
      <Outlet />
    </CalendarProvider>
  )
}
