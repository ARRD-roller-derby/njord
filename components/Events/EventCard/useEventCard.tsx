import useIsMobileDevice from "../../_hooks/useIsMobileDevice"
import { useEffect, useState } from 'react';
import { EventInterface } from "../../../types/Event.interface";

export default function useEventCard(event:EventInterface){
  const 
    isMobileDevice = useIsMobileDevice(),
    [shutter,setShutter] = useState<EventInterface|null>(null)
    
    useEffect(()=>{
      if(shutter) setShutter(event)
    },[event])

  return {isMobileDevice,shutter,setShutter}
}