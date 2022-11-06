import { EventInterface } from "../../../types/Event.interface";
import styles from "./event-date.module.css";
import dayjs from "dayjs";
import { Day } from "../../_ui/day/day";
import Image from "next/image";

type EventDateProps = {
  event: EventInterface;
};
export const EventDate: React.FC<EventDateProps> = ({ event }) => {
  if (dayjs(event.start).diff(event.end, "day") < 0)
    return (
      <div className={styles.container}>
        <Day day={event.start} />
        <Image
          className={styles.arrow}
          src="/icons/right-duotone.svg"
          width={15}
          height={15}
          alt="fleche"
        />
        <Day day={event.end} />
      </div>
    );

  return <Day day={event.start} />;
};
