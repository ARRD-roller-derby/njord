import { useSession } from 'next-auth/react'
import useFetch from '../../_hooks/useFetch';
import { EventInterface } from '../../../types/Event.interface';

export default function useEvent(id:string) {
  const { data: session } = useSession(),
    { data: event,refetch } = useFetch<EventInterface>('event/event', {id}),
    uri = '/event/updateField'

  return { reSync:refetch, event, uri,user:session?.user }
}
