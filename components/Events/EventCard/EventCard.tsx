import { EventInterface } from "../../../types/Event.interface"
import EventCardView from "./EventCardView"
import useEventCard from "./useEventCard"

interface Props {
  readonly event: EventInterface
  readonly reSync: Function
}

export default function EventCard(props:Props){
  const useProps = useEventCard()

  return <EventCardView {...props} {...useProps}/>

}