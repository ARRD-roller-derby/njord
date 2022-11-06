import { EventsNextResult } from "./events-next.type";
import styles from "./events-next.module.css";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";
import { EventCard } from "../event-card/event-card";

export const EventsNextView: React.FC<EventsNextResult> = ({
  data: events,
  loading,
  reSync,
}) => {
  if (loading)
    return (
      <div className={styles.loading}>
        <LoaderWheel />
      </div>
    );
  return (
    <div className={styles.container}>
      {events?.map((event) => (
        <EventCard key={event._id} event={event} reSync={reSync} />
      ))}
    </div>
  );
};
