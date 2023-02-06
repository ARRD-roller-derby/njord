import Factory from '../../_layouts/Factory/Factory'
import { useState } from 'react'
import { EventInterface } from '../../../types/Event.interface'
import { useContext } from 'react'
import { EventPresenceButton } from '../EventPresenceButton/EventPresenceButton'
import { EventPresenceType } from '../EventPresenceType/EventPresenceType'
import classes from './EventPresence.module.css'

// INTERFACES ---------------------------------------------------------------
export type useProps = {
  event: EventInterface,
  setEvent: (event: EventInterface) => void
}

// CONTEXT ----------------------------------------------------------------
import { createContext } from 'react';
import { EventPresenceCount } from './event-presence-count/event-presence-count'
export const EventPresenceContext = createContext(null);


// HOOKS ------------------------------------------------------------------
export const useEventPresence = (): useProps => {
  const [event, setEvent] =
    useContext<[EventInterface, (event: EventInterface) => void]>(
      EventPresenceContext
    )

  return {
    event,
    setEvent,
  }
}

// VIEW -------------------------------------------------------------------
export const EventPresenceView = () => {
  return (
    <div className={classes.actions}>
      <EventPresenceCount />
      <EventPresenceType />
      <EventPresenceButton />
    </div>
  )
}

// COMPONENT --------------------------------------------------------------
const EventPresenceContainer = Factory<unknown, useProps>(
  useEventPresence,
  EventPresenceView
)

export const EventPresence = ({ event }: { event: EventInterface }) => {
  const state = useState(event)

  return (
    <EventPresenceContext.Provider value={state}>
      <EventPresenceContainer />
    </EventPresenceContext.Provider>
  )
}