import { useRouter } from 'next/router'
import usePost from '../../_hooks/usePost';
import {useEffect} from 'react';
import { Props, useProps } from './AddressPopin.type';
import { addressInterface } from '../../../types/address.interface';

export default function useAddressPopin({setClose,url='/users',reSync}:Props):useProps {
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

  return { close: handleClose,deleteAddress:(address:addressInterface)=>post(address) ,loading}
}
