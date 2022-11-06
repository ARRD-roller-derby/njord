import Image from "next/image";
import styles from "./schedule.module.css";

type ScheduleProps = {
  direction?: "vertical" | "horizontal";
  start: string;
  end: string;
};
export const Schedule: React.FC<ScheduleProps> = ({
  direction = "horizontal",
  start,
  end,
}) => (
  <div className={styles.container} data-direction={direction}>
    <div className={styles.time}>{start.replace(":", "h")}</div>
    <div className={styles.separate}>
      {direction === "horizontal" ? (
        "-"
      ) : (
        <Image
          className={styles.arrow}
          src="/icons/right-duotone.svg"
          width={10}
          height={10}
          alt="fleche"
        />
      )}
    </div>
    <div className={styles.time}>{end.replace(":", "h")}</div>
  </div>
);
