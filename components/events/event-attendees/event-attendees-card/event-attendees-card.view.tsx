import { FC } from "react";
import Avatar from "../../../_ui/Avatar/Avatar";
import { EventAttendeeCardProps, EventAttendeeCardResult } from "./event-attendees-card";
import styles from './event-attendees-card.module.css'

export const EventAttendeesCardView: FC<
  EventAttendeeCardProps &
  EventAttendeeCardResult
> = ({ user, type }) => (
  <div className={styles.container}>
    <div className={styles.avatar}>
      <Avatar src={user.avatar} />
    </div>
    <div className={styles.nameContainer}>
      <div className={styles.name}>

        {user.name}
      </div>
      {type && (
        <div className={styles.type} data-type={type}>
          {type}
        </div>
      )}
      {user.guestNumber > 1 && (
        <div className={styles.type} data-type={type}>
          {user.guestNumber - 1} invité{user.guestNumber > 2 && 's'}
        </div>
      )}
    </div>
  </div>

)