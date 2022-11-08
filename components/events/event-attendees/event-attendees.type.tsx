import { EventInterface } from "../../../types/Event.interface";
import { AttendeeInterface } from "../../../types/attendee.interface";

export type EventAttendeesProps = {
  event: EventInterface;
};

export type EventAttendeesResult = {
  IcantSee: boolean;
  loading: boolean;
  attendees: AttendeeInterface[];
  counts: EventAttendeesCountProps[];
  refetch: () => void;
};

export type EventAttendeesCountProps = { type: string; count: number };
