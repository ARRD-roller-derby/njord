import Factory from "../../_layouts/Factory/Factory";
import { useEventCancelButton } from "./event-cancel-button.hook";
import { EventCancelButtonView } from "./event-cancel-button.view";


export interface EventCancelButtonProps {
  eventId: string;
  setClose: () => void;
  isCancel: boolean;
};

export interface EventCancelButtonResult {
  cancelEvent: Function;
  loading: boolean;
};

export const EventCancelButton = Factory<
  EventCancelButtonProps, EventCancelButtonResult>(useEventCancelButton, EventCancelButtonView)