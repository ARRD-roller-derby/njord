import { useState,useEffect, useMemo } from 'react';
import { RecurrenceSelectorTypes } from "./RecurrenceSelectorTypes"

interface Props {
  readonly setValue:Function
}

export default function useRecurrenceSelector({setValue}:Props){
  const 
  [show,setShow]= useState<boolean>(false),
  [num,setNum] = useState<number>(0),
  [type,setType]= useState(RecurrenceSelectorTypes.at(0)),
  words = useMemo(()=>{
    if(type.value === 'week' ) return 'Toutes les'
    return 'Tous les'
  },[type])

  useEffect(()=>{
    setValue({type: type.value,num})
  },[type,num])

  return {num,setNum,setType,show,setShow,words}
}