import dayjs from 'dayjs'
import classes from './EventCard.module.css'
import dynamic from 'next/dynamic'
import { EventInterface } from '../../../types/Event.interface'
import EventPresenceButton from '../EventPresenceButton/EventPresenceButton'
import EventTitle from '../EventTitle/EventTitle'
import EventPresenceType from '../EventPresenceType/EventPresenceType'
import EventShutter from '../EventShutter/EventShutter'

const MapForCard = dynamic(
  () => import('../../_ui/Map/MapForCard/MapForCard'),
  {
    ssr: false,
  }
)

interface props {
  readonly event: EventInterface
  readonly isMobileDevice?: boolean
  readonly reSync: Function
  readonly shutter: EventInterface
  readonly setShutter: Function
}

export default function EventCardView({
  event,
  isMobileDevice,
  reSync,
  setShutter,
  shutter,
}: props) {
  return (
    <>
      {' '}
      <EventShutter
        event={shutter}
        reSync={reSync}
        setClose={() => setShutter(null)}
        url={`/`}
      />
      <div className={classes.container} data-ismobile={isMobileDevice}>
        {event.cancel && <div className={classes.cancel}>Annulé</div>}
        <div className={classes.containerDate}>
          <div className={classes.date} onClick={() => setShutter(event)}>
            <div className={classes.day}>{dayjs(event.start).format('DD')}</div>
            <div className={classes.month}>
              {dayjs(event.start).format('MMMM')}
            </div>
          </div>
          <div className={classes.relativeDate}>
            {dayjs(event.start).from(dayjs())}
          </div>
        </div>

        <div className={classes.hour}>
          {event.hourStart} {"-"} {event.hourEnd}
        </div>
        <EventTitle event={event} onClick={() => setShutter(event)} />
        <div className={classes.map}>
          <MapForCard lat={event.address.lat} lon={event.address.lon} />
        </div>
        {event.address && (
          <div className={classes.address}>
            {event.address.street}
            {', '}
            {event.address.zipcode} {event.address.city}
          </div>
        )}
        <div className={classes.actions}>
          <EventPresenceType event={event} reSync={reSync} />
          <EventPresenceButton event={event} reSync={reSync} />
        </div>
      </div>
    </>
  )
}
