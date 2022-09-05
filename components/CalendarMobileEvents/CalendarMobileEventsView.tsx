import classes from './CalendarMobileEvents.module.css'
import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'
import { EventInterface } from '../../types/Event.interface'
import dayjs from 'dayjs'
import eventTitleRender from '../../utils/eventTitleRender'
import EventShutter from '../Events/EventShutter/EventShutter'

interface Props {
  readonly events: Array<EventInterface>
  readonly close: Function
  readonly setPopin: Function
  readonly shutterEvent: EventInterface
  readonly setShutterEvent: Function
  readonly refetch: Function
}
export default function CalendarMobileEventsView({
  events,
  close,
  refetch,
  shutterEvent,
  setShutterEvent,
}: Props) {
  const ref = useRef(null)

  return (
    <>
      <EventShutter
        event={shutterEvent}
        setClose={setShutterEvent}
        url="/calendrier"
        reSync={refetch}
      />
      <CSSTransition
        nodeRef={ref}
        in={!!events}
        timeout={300}
        classNames="aside"
        unmountOnExit
        mountOnEnter
      >
        <div ref={ref} className={classes.container}>
          {events && (
            <>
              <div className={classes.title} onClick={() => close()}>
                <div className={classes.day} onClick={()=>setShutterEvent(events.at(0).start)}>
                  {dayjs(events.at(0).start).format('LL')}
                </div>
                <div className="close" />
              </div>

              <div className={classes.events}>
                {events.map((event) => (
                  <div
                    className={classes.event}
                    key={event._id}
                    onClick={() => setShutterEvent(event)}
                  >
                    {eventTitleRender(event)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </CSSTransition>
    </>
  )
}
