import classes from './LabeledBlock.module.css'

interface props {
  readonly children: JSX.Element | JSX.Element[]
  readonly title: string
}
export default function LabeledBlock({ children, title }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.titleContainer}>
        <h2 className={classes.title}>{title}</h2>
        <div className={classes.line} />
      </div>
      <div className={classes.children}>{children}</div>
    </div>
  )
}
