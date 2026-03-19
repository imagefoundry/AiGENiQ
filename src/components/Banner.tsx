import { useCalendar } from '../contexts/CalendarContext'

export default function Banner() {
  const { openCalendar } = useCalendar()
  return (
    <div className="banner" role="note" aria-label="Site announcement">
      Wherever you are with AI — curious, stuck, or ready to move —&nbsp;
      <a href="https://calendly.com/rohit-loveimagefoundry" onClick={(e) => { e.preventDefault(); openCalendar() }}>book a 25-minute clarity call</a>
    </div>
  )
}
