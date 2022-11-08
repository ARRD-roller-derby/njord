import { AttendeeInterface } from "../../../types/attendee.interface";
import useFetch from "../../_hooks/useFetch";
import Factory from "../../_layouts/Factory/Factory";
import { EventAttendeesContext } from "./event-attendees.context";
import { useEventAttendees } from "./event-attendees.hook";
import {
  EventAttendeesResult,
  EventAttendeesProps,
} from "./event-attendees.type";
import { EventAttendeesView } from "./event-attendees.view";

const EventAttendeesFactory = Factory<
  EventAttendeesProps,
  EventAttendeesResult
>(useEventAttendees, EventAttendeesView);

export const EventAttendees: React.FC<EventAttendeesProps> = (props) => {
  const ctx = useFetch<{ attendees: AttendeeInterface[]; IcantSee: boolean }>(
    "event/attendees",
    { eventId: props.event._id }
  );
  return (
    <EventAttendeesContext.Provider value={ctx}>
      <EventAttendeesFactory {...props} />
    </EventAttendeesContext.Provider>
  );
};
