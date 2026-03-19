import { createContext, useContext, useState, ReactNode } from 'react'
import CalendarModal from '../components/CalendarModal'

const CalendarContext = createContext<{ openCalendar: () => void }>({ openCalendar: () => {} })

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <CalendarContext.Provider value={{ openCalendar: () => setOpen(true) }}>
      {children}
      {open && <CalendarModal onClose={() => setOpen(false)} />}
    </CalendarContext.Provider>
  )
}

export function useCalendar() {
  return useContext(CalendarContext)
}
