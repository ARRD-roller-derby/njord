import { useSession } from 'next-auth/react'
import useFetch from '../../_hooks/useFetch';
import { EventInterface } from '../../../types/Event.interface';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../../stores/socket.store';

export default function useEvent(id: string) {
  const { data: session } = useSession(),
    { data: event, refetch } = useFetch<EventInterface>('event/event', { id }),
    uri = '/event/updateField',
    [triggerRefresh] = useContext(SocketContext)

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === "event" && triggerRefresh?.eventId === id) {
      refetch();
    }
  }, [triggerRefresh]);

  return { reSync: refetch, event, uri, user: session?.user }
}
