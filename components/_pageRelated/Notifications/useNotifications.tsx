import { NotificationInterface } from '../../../types/notification.interface'
import { RequestInterface } from '../../../types/Request.interface'
import useSilentDBSync from '../../_hooks/useSilentDBSync'

export default function useNotifications(): {
  notifications: Array<NotificationInterface> | undefined
  loading: boolean
  requests: Array<RequestInterface>
  reSync: Function
} {
  const {
      data: notifications,
      loading,
      reSync,
    } = useSilentDBSync<Array<NotificationInterface>>(
      'notifications/notifications',
      'notifications',
      {
        limit: 25,
      }
    ),
    {
      data: requests,
      loading: loadingRequest,
      reSync: reSyncRequest,
    } = useSilentDBSync<Array<RequestInterface>>(
      'requests/requests',
      'requests',
      {
        limit: 25,
      }
    )

  function reSyncAll() {
    reSync()
    reSyncRequest()
  }

  return {
    notifications: Array.isArray(notifications) ? notifications : undefined,
    requests,
    loading: loadingRequest && loading,
    reSync: reSyncAll,
  }
}
