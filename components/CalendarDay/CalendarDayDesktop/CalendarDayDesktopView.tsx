import dayjs from 'dayjs'
import { CalDayInterface } from '../../../types/CalDay.interface'
import { EventInterface } from '../../../types/Event.interface'
import eventTitleRender from '../../../utils/eventTitleRender'
import { EventShutter } from '../../events/event-shutter/event-shutter'

import classes from './CalendarDayDesktop.module.css'

interface props {
  readonly day: CalDayInterface
  readonly currentMonthNum: number
  readonly setPopin: Function
  readonly isAdmin: boolean
  readonly shutter: EventInterface
  readonly close: Function
  readonly open: Function
  readonly refetch: () => void
}

export default function CalendarDayDesktopView({
  day,
  setPopin,
  currentMonthNum,
  isAdmin,
  shutter,
  open,
  refetch,
  close
}: props) {
  return (
    <>
      <EventShutter
        event={shutter}
        url="/calendrier"
        reSync={refetch}
        setClose={() => close()}

      />
      <div
        className={classes.day}
        data-currentmonth={day.month === currentMonthNum}
      >
        <div
          onClick={() => setPopin(isAdmin ? day.date : undefined)}
          className={classes.dayNum}
          data-today={day.date.format('DD-MM-YY') == dayjs().format('DD-MM-YY')}
        >
          {day.date.format('D')}
        </div>
        <div className={classes.case}>
          <div className={classes.events}>
            {day.events.map((event) => (
              <div
                className={classes.event}
                onClick={() => open(event)}
                key={event._id}
              >
                {eventTitleRender(event)}
              </div>
            ))}
          </div>
          <div className={classes.click} onClick={() => setPopin(isAdmin ? day.date : undefined)} />
        </div>
      </div>
    </>
  )
}
