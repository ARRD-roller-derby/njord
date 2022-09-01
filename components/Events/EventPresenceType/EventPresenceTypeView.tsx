import { useRef } from 'react'
import ReactSelect from 'react-select'
import { CSSTransition } from 'react-transition-group'
import reactSelectStyle from '../../../styles/reactSelectStyle'

interface props {
  readonly options: Array<{ label: string; value: string }>
  readonly value: { label: string; value: string }
  readonly onChange: Function
  readonly show: boolean
}

export default function EventPresenceTypeView({
  options,
  value,
  onChange,
  show,
}: props) {
  const ref = useRef(null)

  return (
    <div    ref={ref}>
    <CSSTransition
      nodeRef={ref}
      in={show && options?.length > 0}
      timeout={300}
      classNames="fade"
      unmountOnExit
      mountOnEnter
    >
      <ReactSelect
      menuPlacement='top'
        styles={reactSelectStyle}
        options={options}
        value={value}
        onChange={(choice) => onChange(choice)}
      />
    </CSSTransition>
    </div>
  )
}
