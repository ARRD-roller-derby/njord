import Factory from '../../_layouts/Factory/Factory'
import { EventPresenceContext } from './EventPresence.context'
import { useState } from 'react'
import useEventPresence from './EventPresence.hook'
import EventPresenceView from './EventPresence.view'
import { useProps } from './EventPresence.type'
import { EventInterface } from '../../../types/Event.interface'

const EventPresenceContainer = Factory<unknown, useProps>(
  useEventPresence,
  EventPresenceView
)

const EventPresence = ({ event }: { event: EventInterface }) => {
  const state = useState(event)

  return (
    <EventPresenceContext.Provider value={state}>
      <EventPresenceContainer />
    </EventPresenceContext.Provider>
  )
}

export default EventPresence
