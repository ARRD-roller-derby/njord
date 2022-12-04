import { NotificationInterface } from "../../../types/notification.interface"
import { RequestInterface } from "../../../types/Request.interface"


  export type NotificationsResults = {
    loading: boolean
    notifications: Array<NotificationInterface>
    reSync: Function
    requests: Array<RequestInterface>
  }