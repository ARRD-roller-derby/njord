import { NotificationInterface } from '../../../types/notification.interface'
import usePost from '../../_hooks/usePost'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useNotificationMiniCard(
  notification: NotificationInterface,
  reSync: Function
) {
  const { data: dataRead, post: read } = usePost('notifications/changeState'),
    { data: dataDel, post: delNotif, loading } = usePost('notifications/delete'),
    router = useRouter()

  function seePage() {
    read({ id: notification._id, state: 'read' })
    window.location.pathname = notification.url
  }

  function del() {
    if (!loading) {
      delNotif({ id: notification._id })
    }
  }

  useEffect(() => {
    if (dataDel || dataRead) {
      reSync()
    }
  }, [dataDel, dataRead])

  return { del, seePage, loading }
}
