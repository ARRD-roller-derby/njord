
import { ReactNode } from 'react'
import classes from './LabeledBlock.module.css'

interface props {
  children: ReactNode
  title: string
  warning?: boolean
}
export default function LabeledBlock({ children, title, warning }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title} data-warning={warning}>{title}</h2>
        <div className={classes.line} />
      </div>
      <div className={classes.children}>{children}</div>
    </div>
  )
}
