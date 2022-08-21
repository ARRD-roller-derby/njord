import classes from './MiniFormDateEdit.module.css'
import DatePicker from "react-datepicker";

interface props {
  readonly value: Date
  readonly setValue: Function
}

export default function MiniFormDateEditView({
  value,
  setValue,
}: props) {
  return (
    <div className={classes.input}>
      <DatePicker
        selected={value}
        showYearDropdown
        yearDropdownItemNumber={15}
        scrollableYearDropdown
        onChange={(select)=>setValue(select)}
        popperClassName="datepicker"
      />
    </div>
  )
}
