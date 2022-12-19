import { useRouter } from 'next/router'
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from 'react'
import { requestType } from '../../types/requestType.enum'
import { toast } from 'react-toastify'

type Data = {
  type: requestType,
  value: unknown,
  toast?: { message: string, url: string }
}
const useSocket = (channelName: string) => {
  const
    router = useRouter(),
    [messages, setMessages] = useState<any>()

  const cbSocket = (data: Data) => {
    if (data.toast) {
      toast.info(data.toast.message, {
        onClick: () => router.push(data.toast.url),
        toastId: data.toast.message
      })
    }
    setMessages(data)

    setTimeout(() => setMessages(undefined), 400)
  }
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BIFROST_URL)
    if (channelName) {
      socket.on("connect", () => {
        socket.on(channelName + '-notification', cbSocket);
        socket.on('public-notification', cbSocket);
      })
    }

    return () => {
      socket.disconnect()
    }

  }, [channelName])

  return messages
}

export default useSocket