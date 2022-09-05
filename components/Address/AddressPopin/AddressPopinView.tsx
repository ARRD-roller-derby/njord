import classes from './AddressPopin.module.css'
import ShutterModale from '../../_ui/ShutterModale/ShutterModale'
import { addressInterface } from '../../../types/address.interface'
import dynamic from 'next/dynamic'
import AutoConfirmButton from '../../_ui/AutoConfirmButton/AutoConfirmButton'

const MapForCard = dynamic(
  () => import('../../_ui/Map/MapForCard/MapForCard'),
  {
    ssr: false,
  }
)

interface props {
  readonly address: addressInterface
  readonly setClose: Function
  readonly close: Function
  readonly deleteAddress: Function
  readonly loading: boolean
}

export default function AddressPopinView({
  address,
  close,
  deleteAddress,
  loading
}: props) {
  return (
    <ShutterModale setClose={close} show={!!address}>
      {address && (
        <div className={classes.container}>
          <h1 className={classes.title}>
            <div>{address.label}</div>
          </h1>
          <div className={classes.map}>
            <MapForCard lat={address.lat} lon={address.lon} />
          </div>
          <div className={classes.address}>{address.street}</div>
          <div className={classes.city}>
            {address.zipcode} - {address.city}
          </div>
          <div className={classes.delete}>
            <AutoConfirmButton
              text="supprimer cette adresse"
              textConfirm="êtes-vous sûr de vouloir supprimer cette adresse ?"
              loading={loading}
              onClick={()=>deleteAddress(address)}
            />
          </div>
        </div>
      )}
    </ShutterModale>
  )
}
