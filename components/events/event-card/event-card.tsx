import Factory from "../../_layouts/Factory/Factory";
import { useEventCard } from "./event-card.hook";
import { EventCardProps, EventCardResult } from "./event-card.type";
import { EventCardView } from "./event-card.view";

export const EventCard = Factory<EventCardProps, EventCardResult>(
  useEventCard,
  EventCardView
);
