import useIsMobileDevice from "../../_hooks/useIsMobileDevice"
import { useState } from 'react';
import { EventInterface } from "../../../types/Event.interface";

export default function useEventCard(){
  const 
    isMobileDevice = useIsMobileDevice(),
    [shutter,setShutter] = useState<EventInterface|null>(null)
    
  return {isMobileDevice,shutter,setShutter}
}