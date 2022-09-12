import { EventInterface } from "../../../types/Event.interface"
import Factory from "../../_layouts/Factory/Factory"
import EventCardView from "./EventCardView"
import useEventCard from "./useEventCard"

interface Props {
  readonly event: EventInterface
  readonly reSync: Function
}

const EventCard = Factory<Props>(useEventCard,EventCardView)
export default EventCard