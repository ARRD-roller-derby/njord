import classes from './ShortAction.module.css'

interface props {
  readonly onClick: Function
  readonly text: string
  readonly loading: boolean
}

export default function ShortActionView({ onClick, text, loading }: props) {
  return (
    <span
      className={classes.action}
      data-loading={loading}
      onClick={() => onClick()}
    >
      {text}
    </span>
  )
}
