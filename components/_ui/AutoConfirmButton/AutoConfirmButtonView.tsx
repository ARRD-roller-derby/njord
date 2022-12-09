import { CSSTransition } from 'react-transition-group'
import classes from './AutoConfirmButton.module.css'
import { useRef } from 'react'
import UserAgent from '../../../public/icons/user-secret.svg'
import Image from 'next/image'

interface props {
  readonly buttonText: string
  readonly textConfirm: string
  readonly showconfirm: boolean
  readonly loading?: boolean
  readonly clickAction: Function
  readonly submit: Function
  readonly isSpy?: boolean
}
export default function AutoConfirmButtonView({
  buttonText,
  showconfirm,
  clickAction,
  textConfirm,
  submit,
  loading,
  isSpy
}: props) {
  const ref = useRef(null)
  return (
    <div className={classes.container} >
      <button className={classes.button} onClick={() => clickAction()} disabled={loading}>
        {isSpy && <Image src={UserAgent} width={15} height={15} />}
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
        <div ref={ref} className={classes.confirm} onClick={() => submit()} >
          <button disabled={loading}>{textConfirm}</button>
        </div>
      </CSSTransition>
    </div>
  )
}
