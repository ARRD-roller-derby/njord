import { useContext, useEffect } from 'react'
import useSilentFetch from './useSilentFetch'
import { SocketContext } from '../../stores/socket.store';

export default function useNotificationWithFetch<T>(type: string, url: string):T {
  const [state] = useContext(SocketContext),
    { data, fetch } = useSilentFetch<T>(url)

  useEffect(() => {
    if(state && type === 'all') fetch()
    if(state && state.type === type )fetch()
  }, [state])

  return data
}
