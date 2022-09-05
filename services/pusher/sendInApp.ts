import { pusher } from './pusher'

// if change service, just change that.
export default function sendInApp(channel: string, payload: Object): void {
  pusher.trigger(channel, 'message', payload)
}
