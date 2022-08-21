import NotificationBellView from './NotificationBellView'
import useNotificationBell from './useNotificationBell'

export default function NotificationBell() {
  const props = useNotificationBell()

  return <NotificationBellView {...props} />
}
