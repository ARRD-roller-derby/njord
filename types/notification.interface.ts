import { NotificationType } from "./notificationType.enum"

export interface NotificationInterface {
  _id: string
  text:string
  url:string
  type:NotificationType
  userId:string
  state:NotificationState,
  updatedAt: Date
}

enum NotificationState {
  read='read',
  unread='unread',
  pending='pending',
}