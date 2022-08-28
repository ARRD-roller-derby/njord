import dayjs from 'dayjs'
import { CalDayInterface } from '../../../../types/CalDay.interface'
import eventTitleRender from '../../../../utils/eventTitleRender'

import classes from './CalendarDayDesktop.module.css'

interface props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  readonly isAdmin: boolean
  
}

export default function CalendarDayDesktop({
  day,
  setPopin,
  currentMonthNum,
  isAdmin
}: props) {

  return (
    <div
      className={classes.day}
      data-currentmonth={day.month === currentMonthNum}
      onClick={()=>setPopin(isAdmin ? day.date:undefined)}
    >
      <div
        className={classes.dayNum}
        data-today={day.date.format('DD-MM-YY') == dayjs().format('DD-MM-YY')}
      >
        {day.date.format('D')}
      </div>
      <div className={classes.events}>
        {day.events.map((event)=><div className={classes.event} key={event._id}>{eventTitleRender(event)}</div>)}
      </div>
    </div>
  )
}
