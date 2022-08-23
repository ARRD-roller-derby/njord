import ReactSelect from 'react-select'
import classes from './MiniFormHourEdit.module.css'
import reactSelectStyle from '../../../../styles/reactSelectStyle'

interface props {
  readonly optionsHours: Array<{ label: string; value: string }>
  readonly optionsMinutes: Array<{ label: string; value: string }>  
  readonly hour: { label: string; value: string }
  readonly minute:{ label: string; value: string }
  readonly setMinute: Function
  readonly setHour: Function 
}

export default function MiniFormHourEditView({
  optionsHours,
  optionsMinutes,
  hour,minute,setMinute,setHour
}: props) {

  return (
    <div className={classes.container}>
      <ReactSelect
        styles={reactSelectStyle}
        value={hour}
        menuPlacement={'top'}
        options={optionsHours}
        onChange={(choice) => setHour(choice)}
      />
      <div>{":"}</div>
      <ReactSelect
        styles={reactSelectStyle}
        value={minute}
        menuPlacement={'top'}
        options={optionsMinutes}
        onChange={(choice) => setMinute(choice)}
      />
    </div>
  )
}
