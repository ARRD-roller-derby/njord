import Factory from "../../_layouts/Factory/Factory";
import { useEventDeleteButton } from "./event-delete-button.hook";
import { EventDeleteButtonView } from "./event-delete-button.view";

export interface EventDeleteButtonProps {
  eventId: string
  setClose: () => void
}

export interface EventDeleteButtonResult {
  deleteEvent: () => void
  loading: boolean
}

export const EventDeleteButton = Factory<
  EventDeleteButtonProps, EventDeleteButtonResult>(useEventDeleteButton, EventDeleteButtonView)