import { useEffect } from 'react'
import usePost from '../../_hooks/usePost'
import { Props, useProps } from './EventCancelButton.type'

export default function useEventCancelButton({
  eventId,
  setClose,
  reSync,
}: Props):useProps {
  const { post, loading, data } = usePost('event/cancel')

  useEffect(() => {
    if (data) {
      reSync()
      setClose()
    }
  }, [data])

  return { cancelEvent: () => post({ eventId }),loading }
}
