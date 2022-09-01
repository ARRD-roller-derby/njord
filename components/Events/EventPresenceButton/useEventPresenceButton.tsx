import { EventInterface } from "../../../types/Event.interface"
import { useState,useEffect } from 'react';
import usePost from "../../_hooks/usePost";
import { useSession } from "next-auth/react";

interface Props {
  readonly event:EventInterface
  readonly reSync: Function
}
export default function useEventPresenceButton({event,reSync}:Props){
  const 
    {data:session} = useSession(),
    {data,loading,post} = usePost('event/presence'),
    [type,setType] = useState<boolean>(false)

  
    function changeType(){
    const myPresence = event.attendees?.find(attendee =>session.user._id === attendee.userId );
    if(myPresence){
      setType(myPresence?.isPresent)
    }else {
      setType(false)
    }
  }

  function handleSubmit(){
    if(!loading){
      post({type: !type, eventId: event._id})
    }
  }

  useEffect(()=>{
    if(event){
      changeType()
    }
  },[event])

  useEffect(()=>{
    if(data){
      reSync()
    }
  },[data])

  return {handleSubmit,type,loading}
}