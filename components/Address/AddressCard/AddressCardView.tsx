import classes from './AddressCard.module.css'
import dynamic from 'next/dynamic'
import { Props } from './AddressCard.type'

const MapForCard = dynamic(
  () => import('../../_ui/Map/MapForCard/MapForCard'),
  {
    ssr: false,
  }
)

const AddressCardView = ({ address,openShutter }: Props) => {
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

export default AddressCardView
