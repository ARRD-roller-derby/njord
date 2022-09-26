import { addressInterface } from '../../../types/address.interface';

export type useProps  = {
  close: ()=>void
  deleteAddress: (address: addressInterface)=>void
  loading: boolean
}

export type Props = {
  address: addressInterface
  setClose: ()=>void,
  url:string,
  reSync:()=>void
}