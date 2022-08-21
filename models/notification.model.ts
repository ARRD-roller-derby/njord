import { Schema, model, models } from 'mongoose'
import { NotificationInterface } from '../types/notification.interface'

const notificationSchema = new Schema<NotificationInterface>({
    userId: String,
    type: String,
    text: String,
    url: Object,
    state: String,
    updatedAt: Date,
  }),
  Notification =
    models.notifications || model('notifications', notificationSchema)

notificationSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  next()
})

export default Notification
