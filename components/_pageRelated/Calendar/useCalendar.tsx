import { useState,useEffect } from 'react'
import { EventInterface } from '../../../types/Event.interface'
import useFetch from '../../_hooks/useFetch'

export default function useCalendar() {
  const [between, setBetween] = useState<[Date,Date]>(),
    { data: events, refetch } = useFetch<Array<EventInterface>>('events/events', { between })

  useEffect(()=>{
    if(between) refetch()
  },[between])
  
  return { refetch, events, setBetween }
}
