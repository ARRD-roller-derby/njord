import { useEffect, useState } from 'react'
import usePost from '../../_hooks/usePost'
import { Props, useProps } from './EventPresenceButton.type'
import { EventInterface } from '../../../types/Event.interface'

const useEventPresenceButton = ({
  event,
  setEvent,
}: Props): useProps => {
  const { error, loading, post } = usePost('event/presence')

  function handleSubmit() {
    if (!loading) {
      const presence = getPresence(event)
      setEvent({ ...event, ...presence })
      post({ type: presence, eventId: event._id })
    }
  }

  function getPresence(ev: EventInterface): Pick<EventInterface, 'presence'> {
    const presence = { ...ev.presence },
      newPresence = !ev?.presence?.isPresent
    presence.isPresent = newPresence

    return { presence }
  }

  useEffect(() => {
    if (!error) {
      setEvent({ ...event, ...getPresence(event) })
    }
  }, [error])

  return { handleSubmit, loading, presence: event?.presence?.isPresent }
}

export default useEventPresenceButton