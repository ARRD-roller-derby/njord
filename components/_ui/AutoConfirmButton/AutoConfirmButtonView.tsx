import { CSSTransition } from 'react-transition-group'
import classes from './AutoConfirmButton.module.css'
import { useRef } from 'react'

interface props {
  readonly buttonText: string
  readonly textConfirm: string
  readonly showconfirm: boolean
  readonly loading?: boolean
  readonly clickAction: Function
  readonly submit: Function
}
export default function AutoConfirmButtonView({
  buttonText,
  showconfirm,
  clickAction,
  textConfirm,
  submit,
  loading,
}: props) {
  const ref = useRef(null)
  return (
    <button className={classes.container} disabled={loading}>
      <div className={classes.button} onClick={() => clickAction()}>
        {buttonText}
      </div>
      <CSSTransition
        nodeRef={ref}
        in={showconfirm}
        timeout={300}
        classNames="shutterSmall"
        unmountOnExit
        mountOnEnter
      >
        <button  ref={ref} className={classes.confirm} onClick={() => submit()}>
          {textConfirm}
        </button>
      </CSSTransition>
    </button>
  )
}
