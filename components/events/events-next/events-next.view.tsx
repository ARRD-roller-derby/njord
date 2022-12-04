import { EventsNextResult } from "./events-next.type";
import styles from "./events-next.module.css";
import LoaderWheel from "../../_ui/LoaderWheel/LoaderWheel";
import { EventCard } from "../event-card/event-card";
import Pagination from "../../pagination/pagination";

export const EventsNextView: React.FC<EventsNextResult> = ({
  data,
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
      {data?.events?.map((event) => (
        <EventCard key={event._id} event={event} reSync={reSync} />
      ))}
      <div className={styles.pagination}>
        <Pagination />
      </div>

    </div>
  );
};
