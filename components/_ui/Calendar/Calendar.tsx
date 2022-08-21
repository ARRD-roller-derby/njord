import CalendarView from './CalendarView'
import useCalendar from './useCalendar'
export default function Calendar() {
  const useProps = useCalendar()

  return <CalendarView {...useProps} />
}
