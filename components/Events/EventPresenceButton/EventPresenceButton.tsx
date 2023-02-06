import Factory from '../../_layouts/Factory/Factory'
import usePost from '../../_hooks/usePost'
import { useContext } from 'react'
import { EventPresenceContext } from '../EventPresence/EventPresence'
import styles from './EventPresenceButton.module.css'

// INTERFACES ---------------------------------------------------------------
export type EventPresenceButtonResult = {
  handleSubmit: () => void
  loading: boolean,
  presence: boolean
}

// HOOKS ------------------------------------------------------------------
export const useEventPresenceButton = (): EventPresenceButtonResult => {
  const [event, setEvent] = useContext(EventPresenceContext)
  const { loading, post } = usePost('event/presence')

  function handleSubmit() {
    if (!loading) {
      const presence = { ...event?.presence },
        newPresence = !event?.presence?.isPresent
      presence.isPresent = newPresence
      setEvent({ ...event, presence: { ...presence } })
      post({ type: newPresence, eventId: event._id })
    }
  }

  return { handleSubmit, loading, presence: event.presence?.isPresent }
}

// VIEW -------------------------------------------------------------------
export const EventPresenceButtonView = ({
  handleSubmit,
  presence,
  loading,
}: EventPresenceButtonResult) => {
  return (
    <div
      className={styles.button}
      onClick={() => handleSubmit()}
      data-presence={presence ? 'oui' : 'non'}
      data-loading={loading}
    >
      <div className={styles.yes}>oui</div>
      <div className={styles.non}>non</div>
    </div>
  )
}

// COMPONENT --------------------------------------------------------------
export const EventPresenceButton = Factory<unknown, EventPresenceButtonResult>(
  useEventPresenceButton,
  EventPresenceButtonView
)