import Factory from '../../_layouts/Factory/Factory'
import { useProps,Props } from './AddressPopin.type'
import AddressPopinView from './AddressPopinView'
import useAddressPopin from './useAddressPopin'

const AddressPopin = Factory<Props,useProps>(useAddressPopin,AddressPopinView)

export default AddressPopin
