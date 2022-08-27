import StuffView from "./StuffView";
import useStuff from './useStuff';

export default function Stuff(){
  const props = useStuff()
  
  return <StuffView {...props}/>
}