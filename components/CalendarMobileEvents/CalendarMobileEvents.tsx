import { EventInterface } from "../../types/Event.interface";
import CalendarMobileEventsView from "./CalendarMobileEventsView";
import useCalendarMobileEvents from "./useCalendarMobileEvents";

interface Props {
  readonly events:Array<EventInterface>
  readonly close: Function
  readonly setPopin: Function
  readonly refetch:Function
}

export default function CalendarMobileEvents(props:Props){
  const useProps = useCalendarMobileEvents()
  return <CalendarMobileEventsView {...props} {...useProps}/>
}