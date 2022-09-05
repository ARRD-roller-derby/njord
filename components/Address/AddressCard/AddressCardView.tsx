import classes from './AddressCard.module.css'
import { addressInterface } from '../../../types/address.interface'
import dynamic from 'next/dynamic'

interface props {
  readonly address: addressInterface
  readonly openShutter: Function
}

const MapForCard = dynamic(
  () => import('../../_ui/Map/MapForCard/MapForCard'),
  {
    ssr: false,
  }
)

export default function AddressCardView({ address,openShutter }: props) {
  return (
    <div className={classes.container}>
      <div className={classes.map}>
        <MapForCard lat={address.lat} lon={address.lon} />
      </div>
      <div className={classes.content} onClick={()=>openShutter(address)}>
        <div className={classes.label}>{address.label}</div>
        <div className={classes.address}>{address.street}</div>
        <div className={classes.city}>
          {address.zipcode} - {address.city}
        </div>
      </div>
    </div>
  )
}
