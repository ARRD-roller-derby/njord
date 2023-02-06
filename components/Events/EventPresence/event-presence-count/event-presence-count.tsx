import { useSession } from 'next-auth/react';
import { FC, useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { EventInterface } from '../../../../types/Event.interface';
import usePost from '../../../_hooks/usePost';
import Factory from '../../../_layouts/Factory/Factory';
import Info from '../../../_ui/Info/Info';
import { EventPresenceContext } from '../EventPresence';
import styles from './event-presence-count.module.css';


export interface EventPresenceCountresult {
  event: EventInterface;
  handleCountChange: (value: string | number) => void;
}

export const useEventPresence = (): EventPresenceCountresult => {
  const [event, setEvent] = useContext(EventPresenceContext)
  const { loading, post } = usePost('event/presence')

  const handleCountChange = (value: string | number) => {
    const number = typeof value === 'string' ? parseInt(value) : value
    if (number === 0) return
    if (loading) return
    const presence = { ...event?.presence }
    presence.guestNumber = number
    setEvent({ ...event, presence: { ...presence } })
    post({ type: presence.isPresent, eventId: event._id, guestNumber: number })

  }
  return {
    event,
    handleCountChange
  };
};

export const EventPresenceCountView: FC<EventPresenceCountresult> = ({ event, handleCountChange }) => {
  const ref = useRef(null)
  return <div ref={ref} className={styles.count} data-disabled={event?.presence?.isPresent}>
    <CSSTransition
      nodeRef={ref}
      in={event?.presence?.isPresent && !event?.type.match(/scrimmage|training|match|AG/)}
      timeout={300}
      classNames="fade"
      unmountOnExit
      mountOnEnter
    >
      <div className={styles.container}>

        <div className={styles.form}>
          <button className={styles.button} disabled={event?.presence?.guestNumber <= 1} onClick={() => handleCountChange(event?.presence?.guestNumber - 1)}>
            -
          </button>
          <input className={styles.input} type="number" value={event?.presence?.guestNumber || 1} onChange={(e) => handleCountChange(e.target.value)} />
          <button className={styles.button} onClick={() => handleCountChange((event?.presence?.guestNumber || 0) + 1)}>
            +
          </button>
        </div>
        <div className={styles.info}>Vous pouvez ajouter des invités</div>
      </div>
    </CSSTransition>
  </div>
}


export const EventPresenceCount = Factory<unknown, EventPresenceCountresult>(useEventPresence, EventPresenceCountView)