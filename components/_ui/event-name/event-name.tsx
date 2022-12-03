import { EventInterface } from "../../../types/Event.interface";
import eventTitleRender from "../../../utils/eventTitleRender";
import styles from "./event-name.module.css";

type EventNameProps = {
  event: EventInterface;
};

export const EventName: React.FC<EventNameProps> = ({ event }) => {
  return (
    <div className={styles.container} data-type={event.type}>
      {eventTitleRender(event)}
    </div>
  );
};
