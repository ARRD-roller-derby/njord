import { useContext, useEffect } from 'react'
import { PusherContext } from '../../stores/pusher.store'
import useSilentFetch from './useSilentFetch'

export default function useNotificationWithFetch<T>(type: string, url: string):T {
  const [state] = useContext(PusherContext),
    { data, fetch } = useSilentFetch<T>(url)

  useEffect(() => {
    if(state && type === 'all') fetch()
    if(state && state.type === type )fetch()
  }, [state])

  return data
}
