import { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../stores/socket.store'

export default function useNotifications(type: string) {
  const
    [state] = useContext(SocketContext),
    [notification, setNotification] = useState<any | null>(null)

  useEffect(() => {
    if (state && state.type === type) setNotification(state.value);
  }, [state])

  return notification
}