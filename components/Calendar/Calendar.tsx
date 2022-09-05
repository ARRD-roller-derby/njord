import { EventInterface } from '../../types/Event.interface'
import CalendarView from './CalendarView'
import useCalendar from './useCalendar'

interface Props {
  readonly refetch: Function
  readonly events: Array<EventInterface>
  readonly setBetween: Function 
}

export default function Calendar(props:Props) {
  const useProps = useCalendar(props)

  return <CalendarView {...props} {...useProps} />
}
