import EventPresenceButtonView from "./EventPresenceButtonView";
import useEventPresenceButton from "./useEventPresenceButton";
import { EventInterface } from '../../../types/Event.interface';

interface Props {
  readonly event:EventInterface
  readonly reSync: Function
}
export default function EventPresenceButton(props:Props){
  const useProps = useEventPresenceButton(props)

  return <EventPresenceButtonView {...props} {...useProps}/>
}