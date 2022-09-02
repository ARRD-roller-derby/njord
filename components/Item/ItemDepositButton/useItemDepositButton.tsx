import { ItemInterface, ItemLocalizationType } from "../../../types/items.interface"
import useFetch from '../../_hooks/useFetch';
import usePost from '../../_hooks/usePost';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose:Function
}

export default function useItemDepositButton({item,reSync,setClose}:Props){
  const 
    [show,setShow] = useState<boolean>(false),
    [address,setAddress] = useState<string>(),
    {data:session}= useSession(),
    {data:inProgress,loading:loadingInProgress}= useFetch<{inProgress: boolean}>('requests/item/pending',{itemId:item._id}),
    {data,loading,post} = usePost('item/deposit')

  function handleClick(){
    post({itemId: item._id,address})
  }

  useEffect(()=>{
    if(data){
      reSync()
      setClose()
    }
  },[data])


  function addressToString(addr:{street?:string,address?:string,zipcode:string,city:string}){
    setAddress(`${addr.street || addr.address || ''}, ${addr.zipcode} ${addr.city}`)
  }

  //Si requête en cours, on peut pas. (si ma requête est en cours.)
  return {
    handleClick,
    address,
    addressToString,
    inProgress:inProgress?.inProgress,
    IGotIt: session.user._id === item.localization.id || item.localization.type === ItemLocalizationType.place,
    loading: loadingInProgress || loading,
    show,setShow
  }
}