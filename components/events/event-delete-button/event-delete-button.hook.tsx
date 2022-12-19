import { useEffect } from "react"
import usePost from "../../_hooks/usePost"
import { EventDeleteButtonProps, EventDeleteButtonResult } from "./event-delete-button"

export const useEventDeleteButton = (
  {
    eventId,
    setClose,
  }: EventDeleteButtonProps): EventDeleteButtonResult => {

  const { post, loading, data } = usePost('event/delete')

  useEffect(() => {
    if (data) {
      setClose()
    }
  }, [data])

  return {
    deleteEvent: () => post({ eventId }),
    loading
  }
}