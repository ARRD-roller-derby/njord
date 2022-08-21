import { addressInterface } from "../../../types/address.interface"
import AddressCardView from "./AddressCardView"
import useAddressCard from './useAddressCard';

interface Props {
  readonly address: addressInterface
  readonly openShutter: Function
}

export default function AddressCard(props:Props){
  const useProps = useAddressCard();
  return <AddressCardView {...props} {...useProps}/>
}