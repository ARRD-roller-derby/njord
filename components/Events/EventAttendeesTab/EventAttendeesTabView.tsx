import classes from './EventAttendeesTab.module.css'
import EventAttendessBuy from '../EventAttendessBuy/EventAttendessBuy'
import EventAttendeeCard from '../EventAttendeeCard/EventAttendeeCard'
import { AttendeeInterface } from '../../../types/attendee.interface'

interface Props {
  refetch: Function
  attendees: Array<AttendeeInterface>
  eventType: string
  counts: Array<{ type: string; count: number }>
  IcantSee: boolean
}

export default function EventAttendeesTabView({
  attendees,
  refetch,
  eventType,
  counts,
  IcantSee
}: Props) {

  return (
    <div className={classes.container}>
     <div className={classes.grid}>
     <EventAttendessBuy reSync={refetch} />
      <div className={classes.counts}>
        {counts && counts.map((count) => (
          <div className={classes.count} key={count.type}>
            {count.type}
            {': '}
            {count.count}
          </div>
        ))}
      </div>
      <div className={classes.box}>
      <div className={classes.attendeesBox}>
        <div className={classes.attendees}>
          {attendees &&
            attendees.filter(attendee=>attendee.isPresent).map((attendee) => (
              <EventAttendeeCard
                key={attendee.id}
                user={attendee}
                eventType={eventType}
              />
            ))}
            {!IcantSee && attendees.length === 0 && <p>Aucun participant</p>}
        </div>
      </div>
      </div>
     </div>
    </div>
  )
}
