import classes from './MiniFormStringEdit.module.css'

interface props {
  readonly value?: string
  readonly setValue?: Function
}
export default function MiniFormStringEdit({ value, setValue }: props) {
  return (
    <input
      type="text"
      autoFocus
      className={classes.input}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}