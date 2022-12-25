import { ReactChild, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

interface Props {
  readonly field: string
  readonly current?: string
  readonly children: ReactChild
}

export default function Tab({ children, current, field }: Props) {
  const ref = useRef()
  return (
    <CSSTransition
      nodeRef={ref}
      in={field === current}
      timeout={300}
      classNames="tab"
      unmountOnExit
      mountOnEnter

    >
      <div ref={ref}>{children}</div>
    </CSSTransition>
  )
}
