import { NotificationInterface } from '../../../types/notification.interface'
import NotificationMiniCardView from './NotificationMiniCardView'
import useNotificationMiniCard from './useNotificationMiniCard'

interface props {
  readonly reSync: Function
  readonly notification: NotificationInterface
}
export default function NotificationMiniCard({notification,reSync}:props) {
  const 
    useProps = useNotificationMiniCard(notification,reSync),
    props= {notification,...useProps}
  return <NotificationMiniCardView {...props} />
}
