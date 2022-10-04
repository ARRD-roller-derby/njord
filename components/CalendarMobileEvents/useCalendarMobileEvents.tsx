import { useState } from 'react';
import { EventInterface } from '../../types/Event.interface'
export default function useCalendarMobileEvents(){
  const [shutterEvent,setShutterEvent] = useState<EventInterface|null>(null)
  return {shutterEvent,setShutterEvent}
}