import dayjs from 'dayjs'
import classes from './EventCard.module.css'
import EventTitle from '../EventTitle/EventTitle'
import EventShutter from '../EventShutter/EventShutter'
import validator from 'validator'
import ReactMarkdown from 'react-markdown'
import EventPresence from '../EventPresence/EventPresence'
import { Props, useProps } from './EventCard.type'

const EventCardView = ({
  event,
  isMobileDevice,
  reSync,
  setShutter,
  shutter,
}: useProps & Props) => {
  return (
    <>
      <EventShutter
        event={shutter}
        reSync={reSync}
        setClose={() => setShutter(null)}
        url={`/`}
      />
      <div
        className={classes.container}
        data-ismobile={isMobileDevice}
        data-cancel={event.cancel}
      >
        {event.cancel && <div className={classes.cancel}>Annulé</div>}
        <div className={classes.containerDate}>
          <div className={classes.date} onClick={() => setShutter(event)}>
            <div className={classes.dayString}>
              {dayjs(event.start).format('dddd')}
            </div>
            <div className={classes.day}>{dayjs(event.start).format('DD')}</div>
            <div className={classes.month}>
              {dayjs(event.start).format('MMMM')}
            </div>
          </div>
          <div className={classes.times}>
            <div className={classes.relativeDate}>
              {dayjs(
                dayjs(event.start).format('YYYY-MM-DD') +
                  'T' +
                  event.hourStart +
                  ':00.000'
              ).from(dayjs())}
            </div>
            <div className={classes.hour}>
              {event.hourStart} {'-'} {event.hourEnd}
            </div>
          </div>
        </div>

        <div className={classes.type}>
          <EventTitle event={event} onClick={() => setShutter(event)} />
        </div>
        <div className={classes.description}>
          <ReactMarkdown>
            {validator.unescape(event?.description || '')}
          </ReactMarkdown>
        </div>

        <div className={classes.address}>
          {event.address && (
            <>
              {event.address.address || event.address.street}
              {', '}
              {event.address.zipcode} {event.address.city}
            </>
          )}
        </div>

        {!event.cancel && (
          <div className={classes.actions}>
            <EventPresence event={event} />
          </div>
        )}
      </div>
    </>
  )
}

export default EventCardView