import useFetch from '../../_hooks/useFetch';
import { AttendeeInterface } from '../../../types/attendee.interface';
import { useMemo } from 'react';
import searchTypeOfPresence from '../../../utils/searchTypeOfPresence';

interface Props {
  readonly eventId:string
  readonly eventType: string
}

export default function useEventAttendeesTab({eventId,eventType}:Props){
  
  const 
    {data,loading,refetch} = useFetch<{attendees:AttendeeInterface[],IcantSee:boolean}>('event/attendees',{eventId}),
    counts = useMemo(()=>{
      if(!data || !data?.attendees) return []
      return data.attendees.filter(attendee=>attendee.isPresent).reduce((acc,value)=> {
        const isExist = acc.find(old=>old.type === searchTypeOfPresence(value,eventType))
  
        if(isExist){
          const index = acc.findIndex(old=>old.type === isExist.type)
          acc.splice(index,1,{...isExist,count:isExist.count +1})
        }else {
          acc.push({
            type:searchTypeOfPresence(value,eventType),
            count:1
          })
        }
        return acc
      },[])
  
    },[data])

  return {attendees:data?.attendees ? data?.attendees.sort((a,b)=> a.name.localeCompare(b.name)):[],loading,refetch,counts,IcantSee: data?.IcantSee}
}