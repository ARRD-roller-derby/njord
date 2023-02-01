import { EventInterface } from '../../../types/Event.interface'
import ReactMarkdown from 'react-markdown'
import classes from './EventDetailsTab.module.css'
import dayjs from 'dayjs'
import validator from 'validator'
import dynamic from 'next/dynamic'
import EventPresence from '../EventPresence/EventPresence';

const MapForCard = dynamic(
  () => import('../../_ui/Map/MapForCard/MapForCard'),
  { ssr: false }
)

interface props {
  readonly event: EventInterface
  readonly reSync: Function
}

export default function EventDetailsTab({ event }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.date}>
        <div className={classes.day}>
          {event?.type.match(/training|match|scrimmage|AG/) ? (
            dayjs(event.start).format('LL')
          ) : (
            <div>
              <div>{`DU ${dayjs(event.start).format('LL')}`}</div>
              <div>{`au ${dayjs(event?.end).format('LL')}`}</div>
            </div>
          )}
        </div>
        <div className={classes.hour}>
          {event?.hourStart} {'-'} {event?.hourEnd}
        </div>
      </div>
      <div className={classes.box}>
        <div className={classes.main}>

          <div className={classes.details}>
            <ReactMarkdown>
              {validator.unescape(event?.description || '')}
            </ReactMarkdown>
          </div>
          {event?.address?.lon && (
            <div>
              <div className={classes.map}>
                <MapForCard lat={event.address.lat} lon={event.address.lon} />
              </div>
            </div>
          )}
          {event?.address?.city && (
            <div className={classes.address}>
              {`${event.address.address || event.address.street || ''}, ${event.address.zipcode
                } ${event.address.city}`}
            </div>
          )}

          <div className={classes.actions}>
            {!event.cancel && (<>
              <EventPresence event={event} />
            </>)}
          </div>

        </div>
      </div>
    </div>
  )
}
