import AdressesView from "./AdressesView";
import useAdresses from "./useAdresses";

export default function Adresses(){
  const props = useAdresses()
  
  return <AdressesView {...props}/>
}