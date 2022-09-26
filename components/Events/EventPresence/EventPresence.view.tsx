import EventPresenceButton from '../EventPresenceButton/EventPresenceButton'
import EventPresenceType from '../EventPresenceType/EventPresenceType'
import classes from './EventPresence.module.css'
import { useProps } from './EventPresence.type'

const EventPresenceView = ({ event, setEvent }: useProps) => {
  return (
    <div className={classes.actions}>
      <EventPresenceType event={event} setEvent={setEvent} />
      <EventPresenceButton event={event} setEvent={setEvent} />
    </div>
  )
}

export default EventPresenceView
