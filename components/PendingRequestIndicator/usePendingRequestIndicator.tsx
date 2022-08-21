import { requestType } from '../../types/requestType.enum'
import useNotificationWithFetch from '../_hooks/useNotificationWithFetch'
import { useEffect } from 'react'

export default function usePendingRequestIndicator(
  setCanIRequest: Function
) {
  const request = useNotificationWithFetch<{
    message: string
    canIRequest: boolean
  }>(requestType.league_join, 'requests/league/pending')

  useEffect(() => {
    if (request) setCanIRequest(request?.canIRequest)
  }, [request])

  return request ? request?.message : undefined
}
