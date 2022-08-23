import { useState } from 'react';
import { EventInterface } from '../../../types/Event.interface';
interface Props {
  readonly onClose: Function
  readonly refetch: Function
}

export default function useEventCreateForm({refetch}:Props){
  const [event,setEvent] = useState<EventInterface>()

  function setStart(hour:string){
    setEvent((prevState)=>({
      ...prevState,
      startHour: hour
    }))
  }

  console.log(event)
  return {event,setStart}
}