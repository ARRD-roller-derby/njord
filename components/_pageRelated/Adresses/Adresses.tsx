import CalendarView from "./AdressesView";
import useAdresses from "./useAdresses";

export default function Adresses(){
  const props = useAdresses()
  
  return <CalendarView {...props}/>
}