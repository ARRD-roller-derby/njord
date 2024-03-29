import { CalDayInterface } from '../../../types/CalDay.interface'
import CalendarDayDesktopView from './CalendarDayDesktopView'
import useCalendarDayDesktop from './useCalendarDayDesktop';

interface Props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  readonly isAdmin: boolean
  readonly refetch: ()=>void
  
}

export default function CalendarDayDesktop(props: Props) {
  const useProps = useCalendarDayDesktop(props?.day)

  return <CalendarDayDesktopView {...props} {...useProps}/>
}
