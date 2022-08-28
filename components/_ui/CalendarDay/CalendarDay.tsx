import { CalDayInterface } from '../../../types/CalDay.interface'
import CalendarDayDesktop from './CalendarDayDesktop/CalendarDayDesktop'
import CalendarDayMobile from './CalendarDayMobile/CalendarDayMobile'
import useCalendarDay from './useCalendarDay'
interface Props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  readonly isAdmin: boolean
}
export default function CalendarDay(props: Props) {
  const { isMobile } = useCalendarDay()
  return isMobile ? (
    <CalendarDayMobile {...props} />
  ) : (
    <CalendarDayDesktop {...props} />
  )
}
