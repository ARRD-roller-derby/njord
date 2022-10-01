import dayjs from 'dayjs'
import { EventInterface } from '../../../types/Event.interface'
import classes from './EventCardDate.module.css'

type Props = {
  start: Date
  end: Date
  hourStart: string
  hourEnd: string
  setShutter: () => void
}

const EventCardDate = ({
  start,
  end,
  hourStart,
  hourEnd,
  setShutter,
}: Props) => {
  return (
    <div className={classes.date} onClick={setShutter}>
      {dayjs(start).format('YYYY-MM-DD') === dayjs(end).format('YYYY-MM-DD') ? (
        <div className={classes.top}>
          <div className={classes.containerDate}>
            <div className={classes.dayString}>
              {dayjs(start).format('dddd')}
            </div>
            <div className={classes.day}>{dayjs(start).format('DD')}</div>
            <div className={classes.month}>{dayjs(start).format('MMMM')}</div>
          </div>
          <div className={classes.times}>
            <div className={classes.relativeDate}>
              {dayjs(
                dayjs(start).format('YYYY-MM-DD') + 'T' + hourStart + ':00.000'
              ).from(dayjs())}
            </div>
            <div className={classes.hour}>
              {hourStart} {'-'} {hourEnd}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={classes.relativeDateLong}>
            {dayjs(
              dayjs(start).format('YYYY-MM-DD') + 'T' + hourStart + ':00.000'
            ).from(dayjs())}
          </div>

          <div className={classes.dates}>
            <div className={classes.containerDate}>
              <div className={classes.dayString}>
                {dayjs(start).format('dddd')}
              </div>
              <div className={classes.day}>{dayjs(start).format('DD')}</div>
              <div className={classes.month}>{dayjs(start).format('MMMM')}</div>
            </div>
            <div className="sep">{'/'}</div>
            <div className={classes.containerDate} data-type="end">
              <div className={classes.dayString}>
                {dayjs(end).format('dddd')}
              </div>
              <div className={classes.day}>{dayjs(end).format('DD')}</div>
              <div className={classes.month}>{dayjs(end).format('MMMM')}</div>
            </div>
          </div>
          <div className={classes.timeDetails}>
            <div className={classes.hour}>
              {hourStart} {'-'} {hourEnd}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default EventCardDate
