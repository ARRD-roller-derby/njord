import { useProps } from './EventPresence.type'
import { useContext } from 'react'
import { EventPresenceContext } from './EventPresence.context'
import { EventInterface } from '../../../types/Event.interface'

const useEventPresence = (): useProps => {
  const [event, setEvent] =
    useContext<[EventInterface, (event: EventInterface) => void]>(
      EventPresenceContext
    )

  return {
    event,
    setEvent,
  }
}

export default useEventPresence
