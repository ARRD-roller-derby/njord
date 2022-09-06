import { FeatureInterface } from "../../../types/feature.interface"
import useSilentFetch from "../../_hooks/useSilentFetch"
import usePost from '../../_hooks/usePost';
import { availableFeatures } from "../../../datasources/availableFeatures";
import {useEffect} from 'react';

interface Props {
  readonly reSync:Function
}

export default function useEventAttendessBuy({reSync}:Props){
  const 
    {data:feature,fetch} = useSilentFetch<FeatureInterface|boolean>('feature/attendees'),
    {name, cost} = availableFeatures.find(availableFeature => availableFeature.name === 'attendees_for_day'),
    {data:purchase,loading,post} = usePost('/feature/buy')

  useEffect(()=>{
    if(purchase){
      reSync()
      fetch()
    }
  },[purchase])

  return {feature,buy: ()=>post({name}),cost,loading}
}