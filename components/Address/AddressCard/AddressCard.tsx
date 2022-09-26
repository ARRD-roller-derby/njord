import { addressInterface } from "../../../types/address.interface"
import Factory from "../../_layouts/Factory/Factory";
import { Props } from "./AddressCard.type";
import AddressCardView from "./AddressCardView"
import useAddressCard from './useAddressCard';


const AddressCard = Factory<Props,unknown>(useAddressCard,AddressCardView)
export default AddressCard