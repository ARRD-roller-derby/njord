import { addressInterface } from "../../../types/address.interface"
import Factory from "../../_layouts/Factory/Factory";
import AddressCardView from "./AddressCardView"
import useAddressCard from './useAddressCard';

interface Props {
  readonly address: addressInterface
  readonly openShutter: Function
}

const AddressCard = Factory<Props>(useAddressCard,AddressCardView)
export default AddressCard