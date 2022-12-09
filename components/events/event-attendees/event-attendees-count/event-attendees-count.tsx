import styles from "./event-attendees-count.module.css";
import { EventAttendeesCountProps } from "../event-attendees.type";

type eventAttendeesCountProps = {
  count: EventAttendeesCountProps;
};

export const EventAttendeesCount: React.FC<eventAttendeesCountProps> = ({
  count,
}) => (
  <div className={styles.count} data-type={count.type}>
    {count.type}
    {": "}
    {count.count}
  </div>
);
