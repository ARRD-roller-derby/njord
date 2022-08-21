import { useState,useEffect } from "react"
import usePost from "../../_hooks/usePost"

export default function useAddAddressPopin(reSync:Function, closePopin: Function){
  const 
    [address,setAddress ] = useState(),
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