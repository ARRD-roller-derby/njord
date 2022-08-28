import { useContext, useEffect } from 'react'
import { PusherContext } from '../../../stores/pusher.store'
import { EventInterface } from '../../../types/Event.interface'
import { EventType } from '../../../types/EventType.enum'
import useSilentDBSync from '../../_hooks/useSilentDBSync'

export default function useEventsNext() {
  const {
      data: events,
      loading,
      reSync,
    } = useSilentDBSync<Array<EventInterface>>('events/next', 'events'),
    [triggerRefresh] = useContext(PusherContext)

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'event') {
      reSync()
    }
  }, [triggerRefresh])

  console.log(events)

  return { events, loading, training: events?.filter((event)=>event.type === EventType.training) }
}
