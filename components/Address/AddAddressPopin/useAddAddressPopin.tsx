import { useState,useEffect } from "react"
import usePost from "../../_hooks/usePost"
import { Props } from "./AddAddressPopin.type";
import { addressInterface } from '../../../types/address.interface';

const useAddAddressPopin = ({reSync, closePopin}:Props) => {
  const 
    [address,setAddress ] = useState<addressInterface>(),
    {data,post,loading} = usePost('address/add')

  function submit(){
    post(address);
  }

  useEffect(()=>{
    if(data) {
      reSync()
      closePopin()
    }
  },[data])

  return {address,setAddress,submit,loading}
}

export default useAddAddressPopin