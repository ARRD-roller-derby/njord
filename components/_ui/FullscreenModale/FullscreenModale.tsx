import { ReactChild } from 'react'
import classes from './FullscreenModale.module.css'

interface props {
  readonly children: ReactChild
  readonly setClose: Function
}

export default function FullscreenModale({ children, setClose }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.modale}>
        <div className={classes.close} onClick={() => setClose()}>
          <div className="close" />
        </div>

        {children}
      </div>
    </div>
  )
}
