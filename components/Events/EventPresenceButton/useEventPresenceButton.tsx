import { EventInterface } from '../../../types/Event.interface'
import { useEffect } from 'react'
import usePost from '../../_hooks/usePost'

interface Props {
  readonly event: EventInterface
  readonly reSync: Function
}
export default function useEventPresenceButton({ event, reSync }: Props) {
  const { data, loading, post } = usePost('event/presence')

  function handleSubmit() {
    if (!loading) {
      post({ type: !event?.presence?.isPresent,eventId:event._id })
    }
  }

  useEffect(() => {
    if (data) {
      reSync()
    }
  }, [data])

  return { handleSubmit, loading }
}
