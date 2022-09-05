import { useState } from 'react';
import { EventInterface } from '../../../types/Event.interface';

export default function useCalendarDayDesktop(){
  const [shutter,setShutter]= useState<undefined|EventInterface>(undefined)

  function open(event:EventInterface){
    setShutter(event)
  }

  function close(){
    setShutter(undefined)
  }


  return {shutter,close,open}
}