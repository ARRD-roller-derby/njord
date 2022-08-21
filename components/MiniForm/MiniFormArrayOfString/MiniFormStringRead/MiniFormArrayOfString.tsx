import classes from './MiniFormArrayOfString.module.css'

interface props {
  readonly value?: Array<string>
}

export default function MiniFormArrayOfString({ value }: props) {
  return value.length === 0 ? (
    <span className={classes.empty}>{'(vide)'}</span>
  ) : (
    <div className={classes.container}>
      {value.map((o) => (
        <div key={o} className={classes.value}>{o}</div>
      ))}
    </div>
  )
}
