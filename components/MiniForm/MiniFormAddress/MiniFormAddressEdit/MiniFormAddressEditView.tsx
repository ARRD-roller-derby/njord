import classes from './MiniFormAddressEdit.module.css'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../../styles/reactSelectStyle'
import { addressTypeChoices } from '../../../../utils/addressTypeChoices'
import MiniFormAddressSearch from '../MiniFormAddressSearch/MiniFormAddressEdit'

interface props {
  readonly label: string
  readonly onlyPersonal?: boolean
  readonly setLabel: Function
  readonly handleSelect: Function
  readonly setType: Function
}

export default function MiniFormAddressEditView({
  label,
  setLabel,
  handleSelect,
  onlyPersonal,
  setType,
}: props) {
  return (
    <div className={classes.container}>
      {!onlyPersonal && (
        <>
        <label>Type {"d'adresse"}</label>
        <div className={classes.input}>
          <ReactSelect
            styles={reactSelectStyle}
            defaultValue={addressTypeChoices.at(0)}
            options={addressTypeChoices}
            onChange={(choice) => setType(choice.value)}
          />
        </div>
        </>
      )}
       <label>Libellé</label>
      <input
        className={classes.input}
        value={label}
        placeholder="Label"
        onChange={(e) => setLabel(e.target.value)}
      />
      <label>Adresse</label>
      <MiniFormAddressSearch setValue={handleSelect}/>
    </div>
  )
}
