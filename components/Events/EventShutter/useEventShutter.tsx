import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { EventInterface } from '../../../types/Event.interface'

interface props {
  readonly setClose: Function
  readonly url: string
  readonly event:EventInterface
}


export default function useEventShutter({event,setClose,url}:props) {
  const 
    {data:session} = useSession(),
    router = useRouter(),
    uri = '/event/updateField'

  function handleClose() {
    router.push( url,url, { shallow: true })
    setClose()
  }

  useEffect(()=>{
    if(event)
    router.push(url, '/event/' + event._id, { shallow: true })
  },[event])
  
  return { close: handleClose, uri,user:session.user }
}
