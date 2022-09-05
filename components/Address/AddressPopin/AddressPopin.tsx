import { addressInterface } from '../../../types/address.interface'
import AddressPopinView from './AddressPopinView'
import useAddressPopin from './useAddressPopin'

interface props {
  readonly address: addressInterface
  readonly setClose: Function
  readonly reSync: Function
  readonly url: string
}

export default function AddressPopin({
  address,
  setClose,
  reSync,
  url,
}: props) {
  const useProps = useAddressPopin(setClose, url, reSync)

  return (
    <AddressPopinView address={address} setClose={setClose} {...useProps} />
  )
}
