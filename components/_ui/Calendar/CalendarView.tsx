import classes from './Calendar.module.css'
import { CalDayInterface } from '../../../types/CalDay.interface'
import dayjs from 'dayjs'

interface props {
  readonly cal: Array<any>
  readonly currentMonth: string
  readonly currentMonthNum: number
  readonly nextMonth: Function
  readonly previousMonth: Function
  readonly isMobile: boolean
  readonly isAdmin: boolean
}
export default function CalendarView({
  cal,
  currentMonthNum,
  nextMonth,
  currentMonth,
  previousMonth,
  isMobile,
  isAdmin
}: props) {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{currentMonth}</h1>
      <div className={classes.calendar} data-ismobile={isMobile}>
        {[
          'lundi',
          'mardi',
          'mercredi',
          'jeudi',
          'vendredi',
          'samedi',
          'dimanche',
        ].map((day) => (
          <div className={classes.header} key={day}>
            {isMobile ? day.slice(0, 3) + '.' : day}
          </div>
        ))}
        {cal.map((day: CalDayInterface) => (
          <div
            key={day.date.format('LL')}
            className={classes.day}
            data-currentmonth={day.month === currentMonthNum}
          >
            <div
              className={classes.dayNum}
              data-today={
                day.date.format('DD-MM-YY') == dayjs().format('DD-MM-YY')
              }
            >
              {day.date.format('D')}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        <button onClick={() => previousMonth()}>précedent</button>
        {isAdmin && <button onClick={() => console.log('this button is a component')}>+</button>}
        <button onClick={() => nextMonth()}>suivant</button>
      </div>
    </div>
  )
}
