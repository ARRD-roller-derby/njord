import classes from './MiniFormAddressSearch.module.css'
import Marker from '../../../../public/icons/marker.svg'
import Image from 'next/image'
import { addressInterface } from '../../../../types/address.interface'

interface props {
  readonly search: string
  readonly addresses: Array<addressInterface>
  readonly setSearch: Function
  readonly handleSelect: Function
  readonly loading: boolean
}

export default function MiniFormAddressSearchView({
  setSearch,
  search,
  addresses,
  handleSelect,
  loading,
}: props) {
  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <input
          className={classes.input}
          value={search}
          placeholder="Rechercher une adresse"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image src={Marker} alt="location" width={20} height={20} />
      </div>
      {loading && <div className={classes.loading}>{'...'}</div>}
      {addresses && addresses.length > 0 && (
        <div className={classes.addresses}>
          {addresses.map((address: any) => (
            <div
              onClick={() => handleSelect(address)}
              key={address._id || address.address + address.importance}
              className={classes.address}
            >
              <div className={classes.label}>{address?.label}</div>
              <div className={classes.street}>
                {address?.street || address.address}
              </div>
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
