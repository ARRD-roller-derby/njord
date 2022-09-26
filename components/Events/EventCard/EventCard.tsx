import Factory from "../../_layouts/Factory/Factory"
import { Props,useProps } from "./EventCard.type"
import EventCardView from "./EventCardView"
import useEventCard from "./useEventCard"

const EventCard = Factory<Props,useProps>(useEventCard,EventCardView)

export default EventCard