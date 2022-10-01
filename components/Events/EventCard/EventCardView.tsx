import dayjs from 'dayjs'
import classes from './EventCard.module.css'
import EventTitle from '../EventTitle/EventTitle'
import EventShutter from '../EventShutter/EventShutter'
import validator from 'validator'
import ReactMarkdown from 'react-markdown'
import EventPresence from '../EventPresence/EventPresence'
import { Props, useProps } from './EventCard.type'
import EventCardDate from '../EventCardDate/EventCardDate'

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
            <EventCardDate {...event} setShutter={() => setShutter(event)}/>

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