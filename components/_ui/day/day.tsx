import dayjs from "dayjs";
import styles from "./day.module.css";

type DayProps = {
  day: Date;
};

export const Day: React.FC<DayProps> = ({ day }) => (
  <div className={styles.container}>
    <div className={styles.day}>{dayjs(day).format("dddd")}</div>
    <div className={styles.num}>{dayjs(day).format("DD")}</div>
    <div className={styles.month}>{dayjs(day).format("MMMM")}</div>
  </div>
);
