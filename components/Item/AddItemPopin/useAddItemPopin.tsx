import { useState,useEffect } from "react"
import usePost from "../../_hooks/usePost"
import { ItemOwnerType } from '../../../types/items.interface';

export default function useAddItemPopin(reSync:Function, closePopin: Function){
  const 
    [type,setType] = useState(ItemOwnerType.user),
    [label,setLabel] = useState(),
    {data,post,loading} = usePost('item/add')

  function submit(){
    post({label,type});
  }

  useEffect(()=>{
    if(data) {
      reSync()
      closePopin()
    }
  },[data])

  return {type,setType,label,setLabel ,submit,loading}
}