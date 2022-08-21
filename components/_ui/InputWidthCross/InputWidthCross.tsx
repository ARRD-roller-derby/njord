import classes from './InputWidthCross.module.css'

interface props {
  readonly value: string
  readonly setValue: Function
  readonly placeholder?: string
}

export default function InputWidthCross({
  value,
  setValue,
  placeholder = '',
}: props) {
  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <div
        className={classes.cross}
        onClick={() => setValue('')}
        data-disabled={!value}
      />
    </div>
  )
}
