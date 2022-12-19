import { AttendeeInterface } from "../../../../types/attendee.interface";
import Factory from "../../../_layouts/Factory/Factory";
import { useEventAttendeesCard } from "./event-attendees-card.hook";
import { EventAttendeesCardView } from "./event-attendees-card.view";

export interface EventAttendeeCardProps {
  user: AttendeeInterface
  eventType: string
}


export interface EventAttendeeCardResult {
  type?: string
}

export const EventAttendeeCard = Factory<EventAttendeeCardProps, EventAttendeeCardResult>(useEventAttendeesCard, EventAttendeesCardView)