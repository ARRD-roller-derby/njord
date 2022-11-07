import { EventInterface } from "../../../types/Event.interface";
import { UserInterface } from "../../../types/User.interface";

export type EventAttendeesProps = {
  event: EventInterface;
};

export type EventAttendeesResult = {
  canISee: boolean;
  cost: number;
  attendees: UserInterface[];
};
