import ReactSelect from 'react-select'
import reactSelectStyle from '../../../styles/reactSelectStyle'
import classes from './MiniFormSelect.module.css'

interface props {
  readonly value?: string
  readonly setValue?: Function
  readonly isMulti?: boolean
  readonly options: any
}
export default function MiniFormSelectView({
  value,
  setValue,
  isMulti,
  options,
}: props) {
  return (
    <div className={classes.input}>
      <ReactSelect
        autoFocus
        isMulti={isMulti}
        options={options}
        styles={reactSelectStyle}
        className={classes.input}
        value={value}
        onChange={(select) => setValue(select)}
      />
    </div>
  )
}
