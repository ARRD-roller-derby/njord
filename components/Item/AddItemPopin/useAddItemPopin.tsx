import { useState,useEffect } from "react"
import { ItemOnwerType } from "../../../types/items.interface";
import usePost from "../../_hooks/usePost"

export default function useAddItemPopin(reSync:Function, closePopin: Function){
  const 
    [type,setType] = useState(ItemOnwerType.user),
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