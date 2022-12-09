import EventAttendeeCard from "../../Events/EventAttendeeCard/EventAttendeeCard";
import EventAttendessBuy from "../../Events/EventAttendessBuy/EventAttendessBuy";
import {
  EventAttendeesResult,
  EventAttendeesProps,
} from "./event-attendees.type";
import styles from "./event-attendees.module.css";
import { EventAttendeesCount } from "./event-attendees-count/event-attendees-count";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";

export const EventAttendeesView: React.FC<
  EventAttendeesProps & EventAttendeesResult
> = ({ event, refetch, IcantSee, loading, counts, attendees }) => {
  if (loading)
    return (
      <div className={styles.loading}>
        <LoaderWheel />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <EventAttendessBuy reSync={refetch} eventId={event._id} />
        <div className={styles.counts}>
          {counts &&
            counts.map((count) => (
              <EventAttendeesCount key={count.type} count={count} />
            ))}
        </div>
        <div className={styles.box}>
          <div className={styles.attendeesBox}>
            <div className={styles.attendees}>
              {attendees &&
                attendees
                  .filter((attendee) => attendee.isPresent)
                  .map((attendee) => (
                    <EventAttendeeCard
                      key={attendee.id}
                      user={attendee}
                      eventType={event.type}
                    />
                  ))}
              {!IcantSee && attendees?.length === 0 && <p>Aucun participant</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
