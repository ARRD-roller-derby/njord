import { useState } from 'react';
import dayjs from 'dayjs';
import { EventType } from '../../../types/EventType.enum';
interface Props {
  readonly onClose: Function
  readonly refetch: Function
  readonly defaultDate: string
}

export default function useEventCreateForm({refetch,defaultDate}:Props){
  const [event,setEvent] = useState<any>({
    type:EventType.training,
    startDate: defaultDate,
    endDate: defaultDate
  })

  //TODO ATTENTION, le event, contient les labels/values, c'est par un eventTYpe

  //TODO effacer le endDate si pas besoin
  function setKey(key:string,value:any){
    setEvent((prevState)=>{
      const newState = {...prevState}
      newState[key] = value
      if(key === 'hourStart' && !newState.hourEnd ){
        newState.hourEnd = value
      }
      return newState
    })
  }

  console.log(event)
  return {event,setKey}
}