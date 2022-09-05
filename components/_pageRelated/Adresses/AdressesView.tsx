import classes from './Adresses.module.css'
import { addressInterface } from '../../../types/address.interface'
import AddAddressButton from '../../Address/AddAddressButton/AddAddressButton'
import AuthentificatedLayout from '../../_layouts/Authentificated/Authentificated'
import PageActions from '../../_ui/PageActions/PageActions'
import LoaderWheel from '../../_ui/LoaderWheel/LoaderWheel'
import AddressCard from '../../Address/AddressCard/AddressCard'
import AddressPopin from '../../Address/AddressPopin/AddressPopin'

interface props {
  readonly addresses: Array<addressInterface>
  readonly addressForPopin: addressInterface
  readonly loading: boolean
  readonly reSync: Function
  readonly closePopin: Function
  readonly openPopin: Function
}
export default function AdressesView({
  addresses,
  loading,
  reSync,
  addressForPopin,
  closePopin,
  openPopin,
}: props) {
  return (
    <AuthentificatedLayout>
      <AddressPopin
        address={addressForPopin}
        reSync={reSync}
        setClose={closePopin}
        url="adresses"
      />
      <PageActions>
        <AddAddressButton reSync={reSync} />
      </PageActions>
      <div className={classes.container}>
        {loading && <LoaderWheel />}
        <div className={classes.addresses}>
          {addresses &&
            addresses.map((address) => (
              <AddressCard
                address={address}
                key={address._id}
                openShutter={openPopin}
              />
            ))}
          {addresses && addresses.length === 0 && <div>Aucune adresse.</div>}
        </div>
      </div>
    </AuthentificatedLayout>
  )
}
