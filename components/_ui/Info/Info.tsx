import classes from './Info.module.css'

interface props {
  readonly children: string | JSX.Element | Array<JSX.Element>
}

export default function Info({ children }: props) {
  return <div className={classes.container}>{children}</div>
}
