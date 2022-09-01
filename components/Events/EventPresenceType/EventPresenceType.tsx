import { EventInterface } from "../../../types/Event.interface";
import EventPresenceTypeView from "./EventPresenceTypeView";
import useEventPresenceType from './useEventPresenceType';

interface Props {
  readonly event:EventInterface
  readonly reSync:Function
}
export default function EventPresenceType(props:Props){
  const useProps = useEventPresenceType(props)

  return <EventPresenceTypeView {...useProps}/>
}