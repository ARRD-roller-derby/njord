import { useRef } from 'react'
import ReactSelect from 'react-select'
import { CSSTransition } from 'react-transition-group'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import { Props, useProps } from './EventPresenceType.type';

const EventPresenceTypeView = ({
  options,
  onChange,
  event,
}: Props & useProps) => {
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
          value={{ label: event.presence.type, value: event.presence.type }}
          onChange={(choice) => onChange(choice)}
        />
      </CSSTransition>
    </div>
  )
}

export default EventPresenceTypeView
