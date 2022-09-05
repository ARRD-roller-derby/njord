import useNotificationWithFetch from '../../_hooks/useNotificationWithFetch'
import NotificationIndicatorView from './NotificationIndicatorView';

export default function NotificationIndicator() {
  const  numOfNotif = useNotificationWithFetch<string>('all','notifications/count')

  return <NotificationIndicatorView numOfNotif={numOfNotif}/>
}
