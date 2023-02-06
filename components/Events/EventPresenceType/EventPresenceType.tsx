import Factory from "../../_layouts/Factory/Factory";
import { useContext, useEffect, useState } from "react";
import { eventTypeSelectData } from "./eventTypeSelectData";
import usePost from "../../_hooks/usePost";
import { EventPresenceContext } from "../EventPresence/EventPresence";
import { useRef } from 'react'
import ReactSelect from 'react-select'
import { CSSTransition } from 'react-transition-group'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import { EventInterface } from "../../../types/Event.interface";

// INTERFACES ---------------------------------------------------------------
type option = {
  label: string
  value: string
}

export type EventPresenceTypeResults = {
  options: option[]
  loading: boolean
  onChange: (option: option) => void
  event: EventInterface
}


// HOOKS ------------------------------------------------------------------

export const useEventPresenceType = (): EventPresenceTypeResults => {
  const [event, setEvent] = useContext(EventPresenceContext)
  const [options, setOptions] =
    useState<Array<{ label: string; value: string }>>(),
    { loading, post } = usePost("event/presenceType");

  function onChange(choice: { label: string; value: string }) {
    if (!loading) {
      const newPresence = { ...event.presence };
      newPresence.type = choice.value;
      setEvent({ ...event, presence: { ...newPresence } });
      post({ type: choice.value, eventId: event._id });
    }
  }

  function handleOptions() {
    setOptions(
      eventTypeSelectData
        .filter((type) => type?.types.includes(event.type))
        .map((type) => ({
          label: type.label,
          value: type.label,
        }))
    );
  }

  useEffect(() => {
    handleOptions();
  }, [event]);

  return { onChange, options, loading, event };
};

// VIEW -------------------------------------------------------------------
export const EventPresenceTypeView = ({
  options,
  onChange,
  event,
}: EventPresenceTypeResults) => {
  const ref = useRef(null)

  return (
    <div ref={ref}>
      <CSSTransition
        nodeRef={ref}
        in={event?.presence?.isPresent && options?.length > 0}
        timeout={300}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <ReactSelect
          menuPlacement="top"
          styles={reactSelectStyle}
          options={options}
          value={
            event.presence.type
              ? { label: event.presence.type, value: event.presence.type }
              : eventTypeSelectData.at(0)
          }
          onChange={(choice: { label: string, value: string }) => onChange(choice)}
        />
      </CSSTransition>
    </div>
  )
}

// COMPONENT ----------------------------------------------------------------
export const EventPresenceType = Factory<unknown, EventPresenceTypeResults>(useEventPresenceType, EventPresenceTypeView)

