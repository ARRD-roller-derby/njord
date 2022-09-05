import dayjs from 'dayjs';
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

  function onSubmit(){
    const newEvent:any = {...event},
    endDate = dayjs(event.endDate),
    startDate = dayjs(event.startDate)

    newEvent.start = endDate.diff(startDate,'day') < 0 ? endDate:startDate,
    newEvent.end = endDate.diff(startDate,'day') < 0 ? startDate:endDate
    post(newEvent)
  }

  return {event,setKey,loading,onSubmit}
}