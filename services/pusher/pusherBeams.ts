import PushNotifications from '@pusher/push-notifications-server'

const pusherBeams = new PushNotifications({
  instanceId: process.env.PUSHER_INSTANCE_ID,
  secretKey: process.env.PUSHER_SECRET_KEY,
})

declare global {
  var pushNotifications: any | undefined
}

export const pushNotifications = global.pushNotifications || pusherBeams
if (process.env.NODE_ENV !== 'production') pushNotifications.pushNotifications = pusherBeams
