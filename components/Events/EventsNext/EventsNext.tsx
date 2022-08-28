import EventsNextView from "./EventsNextView"
import useEventsNext from "./useEventsNext"

export default function EventsNext(){
  const useProps = useEventsNext()
  return <EventsNextView {...useProps}/>
 }