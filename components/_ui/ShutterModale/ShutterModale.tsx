import { ReactChild, useRef } from 'react'
import classes from './ShutterModale.module.css'
import { CSSTransition } from 'react-transition-group'

interface props {
  readonly children: ReactChild
  readonly setClose: Function
  readonly show: boolean
}

export default function ShutterModale({ children, setClose, show }: props) {
  const ref = useRef(null)
  return (
    <CSSTransition
      nodeRef={ref}
      in={show}
      timeout={300}
      classNames="shutter"
      unmountOnExit
      mountOnEnter
    >
      <div className={classes.container} ref={ref}>
        <div className={classes.box}>
          <div className={classes.close} onClick={() => setClose()}>
            <div className="close" />
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
