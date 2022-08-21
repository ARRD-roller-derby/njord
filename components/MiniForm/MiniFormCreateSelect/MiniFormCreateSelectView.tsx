import Creatable from 'react-select/creatable';
import reactSelectStyle from '../../../styles/reactSelectStyle'
import classes from './MiniFormCreateSelect.module.css'

interface props {
  readonly value?: Object|Array<Object>
  readonly setValue?: Function
  readonly isMulti?: boolean
  readonly options: any
}
export default function MiniFormCreateSelectView({
  value,
  setValue,
  isMulti,
  options,
}: props) {
  return (
    <div className={classes.input}>
      <Creatable
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
