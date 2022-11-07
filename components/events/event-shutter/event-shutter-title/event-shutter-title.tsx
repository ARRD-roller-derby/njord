import Image from "next/image";
import Link from "next/link";
import { EventInterface } from "../../../../types/Event.interface";
import eventTitleRender from "../../../../utils/eventTitleRender";
import styles from "./event-shutter-title.module.css";
import ArrowUpRightFromSquare from "../../../../public/icons/arrow-up-right-from-square.svg";

type eventShutterTitleProps = {
  event: EventInterface;
};

export const EventShutterTitle: React.FC<eventShutterTitleProps> = ({
  event,
}) => {
  if (!event) return null;
  return (
    <Link href={`/event/${event._id}`} passHref>
      <h2 className={styles.title}>
        <div>{eventTitleRender(event)}</div>
        <Image
          src={ArrowUpRightFromSquare}
          width={20}
          height={20}
          alt="icon link"
        />
      </h2>
    </Link>
  );
};
