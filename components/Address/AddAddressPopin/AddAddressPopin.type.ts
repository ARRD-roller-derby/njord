import { addressInterface } from "../../../types/address.interface"

export type Props = {
  reSync:()=>void, 
  closePopin: ()=>void
}

export type useProps = {
  setAddress: (address:addressInterface)=>void
  submit: ()=>void
  loading:boolean
}