import NotificationsView from "./NotificationsView";
import useNotifications from "./useNotifications";

export default function Notifications(){
  const props = useNotifications()

  return <NotificationsView {...props}/>
}