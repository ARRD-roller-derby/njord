import { EventInterface } from "../../../types/Event.interface";

export type EventCardProps = {
  event: EventInterface;
  reSync: () => void;
};

export type EventCardResult = {
  isMobileDevice?: boolean;
  shutter: EventInterface;
  setShutter: (event: EventInterface) => void;
};
