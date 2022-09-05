import EventAttendeesTabView from "./EventAttendeesTabView";
import useEventAttendeesTab from "./useEventAttendeesTab";

interface Props {
  readonly eventId:string
  readonly eventType: string
}
export default function EventAttendeesTab(props:Props){
  const useProps = useEventAttendeesTab(props)
  
  return <EventAttendeesTabView {...props} {...useProps}/>
}