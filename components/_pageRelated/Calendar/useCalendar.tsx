import { useState, useEffect, useContext } from 'react'
import { EventInterface } from '../../../types/Event.interface'
import useFetch from '../../_hooks/useFetch'
import { SocketContext } from '../../../stores/socket.store';

export default function useCalendar() {
  const [between, setBetween] = useState<[Date, Date]>(),
    { data: events, refetch } = useFetch<Array<EventInterface>>('events/events', { between }),
    [triggerRefresh] = useContext(SocketContext);

  useEffect(() => {
    if (between) refetch()
  }, [between])

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'event') {
      refetch()
    }
  }, [triggerRefresh])

  return {
    refetch, events: events?.sort((a: any, b: any) => {
      const
        hourA = parseInt(a.hourStart?.slice(0, 2) ?? 0),
        hourB = parseInt(b.hourStart?.slice(0, 2) ?? 0)
      return hourA - hourB
    }), setBetween
  }
}
