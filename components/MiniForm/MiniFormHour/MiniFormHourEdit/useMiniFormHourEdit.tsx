import dayjs from 'dayjs';
import { useState,useEffect} from 'react';

interface props {
  readonly value?: string
  readonly setValue?: Function
}

//TODO doit parser l'heure 
export default function useMiniFormHourEdit({value, setValue}:props){
  const optionsHours = ():Array<{label:string;value:string}>=> {
    const hours = []
    for(let i=0;i<24;i++){
      hours.push({
        label:`${i < 10 ? "0":''}${i}`,
        value:`${i < 10 ? "0":''}${i}`
      })
    }
    return hours
  },
  optionsMinutes = ['00','15','30','45'].map((minute)=>({label:minute,value:minute})),
  defaultHour = value ? value.split(':').at(0): dayjs().format('HH'),
  defaultMinute = value ? value.split(':').at(0): '00',
  [hour,setHour]= useState({label: defaultHour,value:defaultHour}),
  [minute,setMinute]= useState({label: defaultMinute,value:defaultMinute})

  useEffect(()=>{
    if(hour?.value,minute?.value) setValue(hour.value +':' + minute.value)
  },[hour,minute])
  
  return {optionsHours:optionsHours() ,optionsMinutes,hour,minute,setMinute,setHour}
}