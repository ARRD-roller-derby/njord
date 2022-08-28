import dayjs from 'dayjs'
import { CalDayInterface } from '../../../../types/CalDay.interface'
import classes from './CalendarDayMobile.module.css'

interface props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  readonly isAdmin: boolean
}

export default function CalendarDayMobile({
  currentMonthNum,
  day,
  setPopin,
  isAdmin,
}: props) {
  return (
    <div
      className={classes.day}
      data-currentmonth={day.month === currentMonthNum}
      onClick={
        day.events.length === 0
          ? () => setPopin(isAdmin ? day.date : undefined)
          : () => console.log('ouvre un SHUTTER avec les events')
      }
    >
      <div
        className={classes.dayNum}
        data-today={day.date.format('DD-MM-YY') == dayjs().format('DD-MM-YY')}
      >
        {day.date.format('D')}
      </div>
      {day.events.length > 0 && (
        <div className={classes.events}>{day.events.length}</div>
      )}
    </div>
  )
}
