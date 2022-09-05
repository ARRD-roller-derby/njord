import { useRouter } from 'next/router'
import usePost from '../../_hooks/usePost';
import {useEffect} from 'react';

export default function useAddressPopin(setClose: Function,url:string='/users',reSync:Function) {
  const router = useRouter(),
  {data,loading,post}= usePost('/address/delete')

  function handleClose() {
    router.push(url, url, { shallow: true })
    setClose()
  }

  useEffect(()=>{
    if(data) {
      reSync()
      setClose()
    }
  },[data])

  return { close: handleClose,deleteAddress:(address:any)=>post(address) ,loading}
}
