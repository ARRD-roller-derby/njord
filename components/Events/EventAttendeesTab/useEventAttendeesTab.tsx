import useFetch from '../../_hooks/useFetch';
import { AttendeeInterface } from '../../../types/attendee.interface';
import { useMemo } from 'react';

interface Props {
  readonly eventId:string
  readonly eventType: string
}

export default function useEventAttendeesTab({eventId,eventType}:Props){
  
  const 
    {data:attendees,loading,refetch} = useFetch<Array<AttendeeInterface>>('event/attendees',{eventId}),
    counts = useMemo(()=>{
      if(!attendees) return []
      return attendees.filter(attendee=>attendee.isPresent).reduce((acc,value)=> {
        const isExist = acc.find(old=>old.type === searchType(value))
  
        if(isExist){
          const index = acc.findIndex(old=>old.type === isExist.type)
          acc.splice(index,1,{...isExist,count:isExist.count +1})
        }else {
          acc.push({
            type:searchType(value),
            count:1
          })
        }
        return acc
      },[])
  
    },[attendees])

    function searchType(val:AttendeeInterface):string{
      if(val?.type) return val.type
      if (eventType.match(/training/)) return 'patins'
      if (eventType.match(/scrimmage|match/)) return 'joueur·euse'
      return 'participant.e.s'
    }

  return {attendees:attendees ? attendees.sort((a,b)=> a.name.localeCompare(b.name)):[],loading,refetch,counts}
}