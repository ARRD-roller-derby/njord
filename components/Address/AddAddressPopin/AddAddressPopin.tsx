import Factory from '../../_layouts/Factory/Factory';
import { Props,useProps } from './AddAddressPopin.type';
import AddAddressPopinView from './AddAddressPopinView';
import useAddAddressPopin from './useAddAddressPopin';

const AddAddressPopin = Factory<Props,useProps>(useAddAddressPopin,AddAddressPopinView)
export default AddAddressPopin