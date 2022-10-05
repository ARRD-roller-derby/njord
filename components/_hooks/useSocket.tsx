import { useRouter } from 'next/router'
import io  from "socket.io-client";
import {useEffect, useState} from 'react'
import { requestType } from '../../types/requestType.enum'
import { toast } from 'react-toastify'

type Data = {
  type: requestType,
  value: unknown,
  toast?: {message:string,url:string}
}
const useSocket = (channelName: string)=>{
  const 
  router = useRouter(),
  [messages, setMessages] = useState<any>()

useEffect(() => {
  if(channelName){
    const socket = io(process.env.NEXT_PUBLIC_BIFROST_URL)
    socket.on("connect", () => {
      socket.once(channelName + '-notification', (data:Data) => {
        if(data.toast){
          toast.info(data.toast.message,{
            onClick:()=>router.push(data.toast.url),
            toastId: data.toast.message
          })
        }
        setMessages(data)

      });
    });
  }

}, [channelName])

return messages
}

export default useSocket