import dayjs from 'dayjs'
import { CalDayInterface } from '../../../../types/CalDay.interface'

import classes from './CalendarDayDesktop.module.css'

interface props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  
}

export default function CalendarDayDesktop({
  day,
  setPopin,
  currentMonthNum,
}: props) {
  return (
    <div
      className={classes.day}
      data-currentmonth={day.month === currentMonthNum}
    >
      <div
        className={classes.dayNum}
        data-today={day.date.format('DD-MM-YY') == dayjs().format('DD-MM-YY')}
      >
        {day.date.format('D')}
      </div>
    </div>
  )
}
