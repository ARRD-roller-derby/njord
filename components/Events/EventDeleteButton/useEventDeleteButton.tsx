import { useEffect } from 'react'
import usePost from '../../_hooks/usePost'

interface Props {
  readonly eventId: string
  readonly setClose: Function
  readonly reSync: Function
}

export default function useEventDeleteButton({
  eventId,
  setClose,
  reSync,
}: Props) {
  const { post, loading, data } = usePost('event/delete')

  useEffect(() => {
    if (data) {
      reSync()
      setClose()
    }
  }, [data])

  return { deleteEvent: () => post({ eventId }),loading }
}
