import { useState, useContext,useEffect } from 'react';
import { PusherContext } from '../../stores/pusher.store';

export default function useNotifications(type:string){
  const   
    [state] = useContext(PusherContext),
    [notification, setNotification] = useState<any|null>(null)

    useEffect(()=>{
      if(state && state.type === type) setNotification(state.value);
    },[state])

    return notification
}