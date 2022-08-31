import classes from './TrainingCard.module.css'
import dayjs from 'dayjs'
import { EventInterface } from '../../../../types/Event.interface'
import EventPresenceButton from '../../EventPresenceButton/EventPresenceButton'
import eventTitleRender from '../../../../utils/eventTitleRender'
import dynamic from 'next/dynamic'

const MapForCard = dynamic(
  () => import('../../../_ui/Map/MapForCard/MapForCard'),
  {
    ssr: false,
  }
)

interface props {
  readonly training: EventInterface
  readonly isMobileDevice: boolean
  readonly reSync: Function
}

export default function TrainingCard({ training, isMobileDevice,reSync }: props) {
  return (
    <div className={classes.container} data-ismobile={isMobileDevice}>
      <div className={classes.containerDate}>
        <div className={classes.date}>
          <div className={classes.day}>
            {dayjs(training.start).format('DD')}
          </div>
          <div className={classes.month}>
            {dayjs(training.start).format('MMMM')}
          </div>
        </div>
        <div className={classes.relativeDate}>
          {dayjs(training.start).from(dayjs())}
        </div>
      </div>

      <div className={classes.hour}>
        {training.hourStart} - {training.hourEnd}
      </div>

      <div className={classes.typeContainer}>
        <div className={classes.type}>{eventTitleRender(training)}</div>
      </div>

      <div className={classes.map}>
        <MapForCard lat={training.address.lat} lon={training.address.lon} />
      </div>
      {training.address && (
        <div className={classes.address}>
          {training.address.street}
          {', '}
          {training.address.zipcode} {training.address.city}
        </div>
      )}
      <div className={classes.actions}>
        <p>Patins </p>
        <EventPresenceButton event={training} reSync={reSync}/>
      </div>
    </div>
  )
}
