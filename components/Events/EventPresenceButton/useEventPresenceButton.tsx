import usePost from '../../_hooks/usePost'
import { Props, useProps } from './EventPresenceButton.type'
import { EventInterface } from '../../../types/Event.interface'

const useEventPresenceButton = ({ event, setEvent }: Props): useProps => {
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

  function getPresence(ev: EventInterface): Pick<EventInterface, 'presence'> {
    const presence = { ...ev.presence },
      newPresence = !ev?.presence?.isPresent
    presence.isPresent = newPresence

    return { presence }
  }

  return { handleSubmit, loading, presence: event.presence?.isPresent }
}

export default useEventPresenceButton
