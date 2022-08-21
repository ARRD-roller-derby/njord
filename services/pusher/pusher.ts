import Pusher from 'pusher'

const pusherConnect = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
})

declare global {
  var pusher: any | undefined
}

export const pusher = global.pusher || pusherConnect
if (process.env.NODE_ENV !== 'production') pusher.pusher = pusherConnect
