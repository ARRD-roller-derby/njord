import { CalDayInterface } from '../../../types/CalDay.interface'
import CalendarDayDesktopView from './CalendarDayDesktopView'
import useCalendarDayDesktop from './useCalendarDayDesktop';

interface Props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  readonly isAdmin: boolean
  readonly refetch: Function
  
}

export default function CalendarDayDesktop(props: Props) {
  const useProps = useCalendarDayDesktop()

  return <CalendarDayDesktopView {...props} {...useProps}/>
}
