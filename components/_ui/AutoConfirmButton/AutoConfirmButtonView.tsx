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
    <div className={classes.container} >
      <button className={classes.button} onClick={() => clickAction()} disabled={loading}>
        {buttonText}
      </button>
      <CSSTransition
        nodeRef={ref}
        in={showconfirm}
        timeout={300}
        classNames="shutterSmall"
        unmountOnExit
        mountOnEnter
      >
        <div  ref={ref} className={classes.confirm} onClick={() => submit()} >
          <button disabled={loading}>{textConfirm}</button>
        </div>
      </CSSTransition>
    </div>
  )
}
