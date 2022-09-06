import classes from './Info.module.css'
import { ReactElement } from 'react';

interface props {
  readonly children: any
}

export default function Info({ children }: props) {
  return <div className={classes.container}>{children}</div>
}
