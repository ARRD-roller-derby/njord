import { useState,useEffect } from 'react';
import { EventType } from '../../../types/EventType.enum';
import usePost from '../../_hooks/usePost';
interface Props {
  readonly onClose: Function
  readonly refetch: Function
  readonly defaultDate: string
}

export default function useEventCreateForm({refetch,onClose,defaultDate}:Props){
  const 
  {data,loading,post} = usePost('event/create'),
  [event,setEvent] = useState<any>({
    type:EventType.training,
    startDate: defaultDate,
    endDate: defaultDate,
    visibility:'league',
    items:[]
  })

  function setKey(key:string,value:any){
    setEvent((prevState:any)=>{
      const newState = {...prevState}
      newState[key] = value
      if(key === 'hourStart' && !newState.hourEnd ){
        newState.hourEnd = value
      }
      return newState
    })
  }

  useEffect(()=>{
    if(data){
      refetch()
      onClose()
    }
  },[data])

  return {event,setKey,loading,onSubmit:()=>post(event)}
}