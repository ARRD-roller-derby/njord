import { ItemInterface, ItemLocalizationType } from "../../../types/items.interface"
import useFetch from '../../_hooks/useFetch';
import usePost from '../../_hooks/usePost';
import {useEffect} from 'react';
import { useSession } from 'next-auth/react';

interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose:Function
}

export default function useItemRecoveryButton({item,reSync,setClose}:Props){
  const 
    {data:session}= useSession(),
    {data:inProgress,loading:loadingInProgress}= useFetch<{inProgress: boolean}>('requests/item/pending',{itemId:item._id}),
    {data,loading,post} = usePost('requests/item/send')

  function handleClick(){
    if(session.user._id === item.localization.id && item.localization.type === ItemLocalizationType.user)return
    post({itemId: item._id})
  }

  useEffect(()=>{
    if(data){
      reSync()
      setClose()
    }
  },[data])

  //Si requête en cours, on peut pas. (si ma requête est en cours.)
  return {
    handleClick,
    inProgress:inProgress?.inProgress,
    isPlace: item.localization.type === ItemLocalizationType.place,
    IGotIt: session.user._id === item.localization.id && item.localization.type === ItemLocalizationType.user,
    loading: loadingInProgress || loading
  }
}