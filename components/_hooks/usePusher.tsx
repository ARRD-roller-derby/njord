import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { requestType } from '../../types/requestType.enum'

export default function usePusher(channelName: string) {
  const 
    router = useRouter(),
    pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: false,
    }),
    [messages, setMessages] = useState<any>()

  useEffect(() => {
    if(channelName){
      
      const channel = pusher.subscribe(channelName)
  
      channel.bind('message', 
      (data: {type:requestType,value:any, toast?: {message:string,url:string}}) => {
        if(data.toast){
          toast.info(data.toast.message,{
            onClick:()=>router.push(data.toast.url),
            toastId: data.toast.message
          })
        }
        
        setMessages(data)
      })
    }

  }, [channelName])

  return messages
}
