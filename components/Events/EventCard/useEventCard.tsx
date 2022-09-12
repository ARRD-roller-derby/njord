import useIsMobileDevice from "../../_hooks/useIsMobileDevice"
import { useEffect, useState } from 'react';
import { EventInterface } from "../../../types/Event.interface";

interface Props {
  readonly event: EventInterface
  readonly reSync: Function
}

export default function useEventCard({event,reSync}:Props){
  const 
    isMobileDevice = useIsMobileDevice(),
    [shutter,setShutter] = useState<EventInterface|null>(null)
    
    useEffect(()=>{
      if(shutter) setShutter(event)
    },[event])

  return {isMobileDevice,shutter,setShutter,event,reSync}
}