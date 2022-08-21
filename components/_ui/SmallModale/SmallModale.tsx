import { useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import clickOutside from '../../../utils/clickOutside'
import classes from './SmallModale.module.css'

interface props {
  readonly setShow: Function
  readonly parentRef: any
  readonly show: boolean
  readonly children: JSX.Element | Array<JSX.Element>
}

export default function SmallModale({
  setShow,
  show,
  parentRef,
  children,
}: props) {
  const ref = useRef(null)

  useEffect(
    () =>
      clickOutside([parentRef], () => {
        setShow()
      }),
    []
  )

  return (
    <CSSTransition
      nodeRef={ref}
      in={show}
      timeout={300}
      classNames="alert"
      unmountOnExit
      mountOnEnter
    >
      <div className={classes.container} ref={ref}>
        {children}
      </div>
    </CSSTransition>
  )
}
