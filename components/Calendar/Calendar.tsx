import { EventInterface } from '../../types/Event.interface'
import CalendarView from './CalendarView'
import useCalendar from './useCalendar'

interface Props {
  readonly refetch: ()=>void
  readonly events: Array<EventInterface>
  readonly setBetween: Function 
}

export default function Calendar(props:Props) {
  const useProps = useCalendar(props)

  return <CalendarView {...props} {...useProps} />
}
