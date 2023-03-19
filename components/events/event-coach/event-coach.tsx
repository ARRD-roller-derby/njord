import { EventInterface } from '../../../types/Event.interface'
import userNameRender from '../../../utils/userNameRender'
import styles from './event-coach.module.css'

interface EventCoachProps {
  event: EventInterface
}
export const EventCoach: React.FC<EventCoachProps> = ({ event }) => {

  if (!event.type.match(/match|training|scrimmage/) || !event.coach) return <div />
  return <div className={styles.container}>
    <div className={styles.label}>coach:</div>
    {userNameRender(event.coach, true)}
  </div>
}