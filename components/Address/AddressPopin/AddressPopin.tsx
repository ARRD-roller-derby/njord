import { addressInterface } from '../../../types/address.interface'
import Factory from '../../_layouts/Factory/Factory'
import AddressPopinView from './AddressPopinView'
import useAddressPopin from './useAddressPopin'

interface Props {
  readonly address: addressInterface
  readonly setClose: Function
  readonly reSync: Function
  readonly url: string
}

const AddressPopin = Factory<Props>(useAddressPopin,AddressPopinView)
export default AddressPopin
