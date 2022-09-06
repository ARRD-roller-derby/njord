import { useRef } from 'react'
import ReactSelect from 'react-select'
import { CSSTransition } from 'react-transition-group'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import { EventInterface } from '../../../types/Event.interface'

interface props {
  readonly event: EventInterface
  readonly options: Array<{ label: string; value: string }>
  readonly onChange: Function
}

export default function EventPresenceTypeView({
  options,
  onChange,
  event,
}: props) {
  const ref = useRef(null)

  return (
    <div ref={ref}>
      <CSSTransition
        nodeRef={ref}
        in={event?.presence.isPresent && options?.length > 0}
        timeout={300}
        classNames="fade"
        unmountOnExit
        mountOnEnter
      >
        <ReactSelect
          menuPlacement="top"
          styles={reactSelectStyle}
          options={options}
          value={{ label: event.presence.type, value: event.presence.type }}
          onChange={(choice) => onChange(choice)}
        />
      </CSSTransition>
    </div>
  )
}
