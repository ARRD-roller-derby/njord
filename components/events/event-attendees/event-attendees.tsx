import useSilentDBSync from "../../_hooks/useSilentDBSync";
import Factory from "../../_layouts/Factory/Factory";
import { EventsAttendeesContext } from "./event-attendees.context";
import { useEventAttendees } from "./event-attendees.hook";
import {
  EventAttendeesResult,
  EventAttendeesProps,
} from "./event-attendees.type";
import { EventAttendeesView } from "./event-attendees.view";

const EventAttendeesFactory = Factory<EventAttendeesProps, unknown>(
  useEventAttendees,
  EventAttendeesView
);

export const EventAttendees: React.FC<EventAttendeesProps> = (props) => {
  //TODO silent ?
  const ctx = useSilentDBSync<
    Pick<EventAttendeesResult, "attendees" | "canISee" | "cost">
  >("events/attendees", "events");

  return (
    <EventsAttendeesContext.Provider value={ctx}>
      <EventAttendeesFactory {...props} />
    </EventsAttendeesContext.Provider>
  );
};
