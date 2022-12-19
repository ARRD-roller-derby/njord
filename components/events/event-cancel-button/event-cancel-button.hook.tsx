import { useEffect } from "react"
import usePost from "../../_hooks/usePost"
import { EventCancelButtonProps, EventCancelButtonResult } from "./event-cancel-button"

export const useEventCancelButton = ({
  eventId,
  setClose
}: EventCancelButtonProps): EventCancelButtonResult => {
  const { post, loading, data } = usePost('event/cancel')

  useEffect(() => {
    if (data) {
      setClose()
    }
  }, [data])

  return { cancelEvent: () => post({ eventId }), loading }
}
