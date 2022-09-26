import { addressInterface } from '../../../types/address.interface';

export type Props =  {
  address: addressInterface
  openShutter: (address:addressInterface)=>void
}