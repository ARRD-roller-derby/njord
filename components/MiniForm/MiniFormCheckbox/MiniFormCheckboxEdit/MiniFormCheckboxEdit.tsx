import classes from './MiniFormCheckboxEdit.module.css'

interface props {
  readonly value?: string|boolean
  readonly setValue?: Function
  readonly label?: string
}
export default function MiniFormCheckboxEdit({ value, setValue,label }: props) {
  return (
    <div className={classes.container} onClick={()=>setValue(!value)}>
      <div className={classes.checkbox} data-checked={value}/>
      <div className={classes.label}>{label || 'oui'}</div>
    </div>
  )
}