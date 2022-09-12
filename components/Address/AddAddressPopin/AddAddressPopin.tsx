import Factory from '../../_layouts/Factory/Factory';
import AddAddressPopinView from './AddAddressPopinView';
import useAddAddressPopin from './useAddAddressPopin';

interface Props {
  readonly reSync:Function
  readonly closePopin: Function
}

const AddAddressPopin = Factory<Props>(useAddAddressPopin,AddAddressPopinView)
export default AddAddressPopin