import classes from './MiniFormAddressEdit.module.css'
import Marker from '../../../../public/icons/marker.svg'
import Image from 'next/image'
import { addressInterface } from '../../../../types/address.interface'
import ReactSelect from 'react-select'
import reactSelectStyle from '../../../../styles/reactSelectStyle'
import { addressTypeChoices } from '../../../../utils/addressTypeChoices'

interface props {
  readonly search: string
  readonly label: string
  readonly onlyPersonal?: boolean
  readonly setLabel: Function
  readonly addresses: Array<addressInterface>
  readonly setSearch: Function
  readonly handleSelect: Function
  readonly setType: Function
}

export default function MiniFormAddressEditView({
  setSearch,
  label,
  search,
  setLabel,
  addresses,
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
      <div className={classes.search}>
        <input
          className={classes.input}
          value={search}
          placeholder="Rechercher une adresse"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image src={Marker} alt="location" width={20} height={20} />
      </div>
      {addresses && addresses.length > 0 && (
        <div className={classes.addresses}>
          {addresses.map((address: any) => (
            <div
              onClick={() => handleSelect(address)}
              key={address.address + address.importance}
              className={classes.address}
            >
              <div className={classes.street}>{address.address}</div>
              <div className={classes.city}>
                {address.zipcode} - {address.city}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
