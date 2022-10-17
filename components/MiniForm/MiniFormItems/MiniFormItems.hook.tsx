import axios from "axios"
import reactSelectStyle from "../../../styles/reactSelectStyle"
import { ItemInterface, ItemOwnerType } from "../../../types/items.interface"
import useFetch from "../../_hooks/useFetch"
import { Props, useProps } from "./MiniFormItems.type"
import validator from 'validator'
import { useState,useEffect } from 'react'
import usePost from "../../_hooks/usePost"
import { useSession } from 'next-auth/react'

export const useMiniFormItems = ({event}:Props):useProps => {

  const 
  {data:session}= useSession(),
    [items,setItems] = useState<Array<{label:string,value:any}>>(),
    { post } = usePost('/event/updateField'),
    {loading,data}= useFetch<ItemInterface[]>('items/event',{id:event._id})

  async function options(search: string, callback: Function) {
    const { data } = await axios.post(`/api/items/search`,{search})

    if (data) {
      const results = data.map((item: ItemInterface) => ({
        label: `${validator.unescape(item.name)}${item.ownerType === ItemOwnerType.league? ' (league)':''}`,
        value: item._id
      }))
      callback(results)
      return results
    } else {
      callback([])
      return []
    }
  }

  function onChange(select:any){
    setItems(select)
    post({ id:event._id,userId:session.user._id, field:'items', value: select.map((item:{value:string})=>item.value) })

  }

  useEffect(()=>{
    if(data) setItems(data.map((item)=>({label:item.name,value: item._id})))
  },[data])


  return {
    loading: loading || !items,
    options: {
      instanceId: 'ItemSelector',
      isClearable: true,
      cacheOptions: true,
      defaultOptions:true,
      isMulti:true,
      value: items,
      styles: reactSelectStyle,
      noOptionsMessage: () => 'Aucun objet trouvé',
      placeholder: 'objets...',
      loadingMessage:()=>'Chargement',
      onChange,
      loadOptions:options,
    },
  }
}
