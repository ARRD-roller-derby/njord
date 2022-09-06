import { useState,useEffect } from 'react';
import { CalDayInterface } from '../../../types/CalDay.interface';
import { EventInterface } from '../../../types/Event.interface';

export default function useCalendarDayDesktop(day: CalDayInterface){
  const [shutter,setShutter]= useState<undefined|EventInterface>(undefined)

  function open(event:EventInterface){
    setShutter(event)
  }

  function close(){
    setShutter(undefined)
  }

  useEffect(()=>{
    if(shutter && day) setShutter(prevState=>{
      return day.events.find(event=>event._id === prevState._id)
    })
  },[day])

  return {shutter,close,open}
}