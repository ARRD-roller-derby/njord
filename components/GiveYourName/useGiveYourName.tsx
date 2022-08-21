import useSilentFetch from '../_hooks/useSilentFetch';
import { useState, useEffect } from 'react';
import { UserInterface } from '../../types/User.interface';

export default function useGiveYourName(){
  const {data,fetch } = useSilentFetch<UserInterface>('users/me'),
  [open,setOpen] = useState<boolean>(false);

  useEffect(()=>{
    if(data && (!data?.name || !data?.lastname)){
      setOpen(true);
    }

    if(data && (data?.name && data?.lastname)){
      setOpen(false);
    }

  },[data]);

  function close(){
    setOpen(false);
  }

  return {open,close, user:data,fetch}
}