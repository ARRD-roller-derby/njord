import { useEffect } from 'react'
import usePost from '../../_hooks/usePost'

interface Props {
  readonly eventId: string
  readonly setClose: Function
  readonly reSync: Function
}

export default function useEventCancelButton({
  eventId,
  setClose,
  reSync,
}: Props) {
  const { post, loading, data } = usePost('event/cancel')

  useEffect(() => {
    if (data) {
      reSync()
      setClose()
    }
  }, [data])

  return { deleteEvent: () => post({ eventId }),loading }
}
