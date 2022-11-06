import { EventInterface } from "../../../types/Event.interface";
import useSilentDBSync from "../../_hooks/useSilentDBSync";
import Factory from "../../_layouts/Factory/Factory";
import { EventsNextContext } from "./events-next.context";
import { useEventsNext } from "./events-next.hook";
import { EventsNextResult } from "./events-next.type";
import { EventsNextView } from "./events-next.view";

const EventsNextFactory = Factory<unknown, EventsNextResult>(
  useEventsNext,
  EventsNextView
);

export const EventsNext: React.FC = () => {
  const ctx = useSilentDBSync<EventInterface[]>("events/next", "events");

  return (
    <EventsNextContext.Provider value={ctx}>
      <EventsNextFactory />
    </EventsNextContext.Provider>
  );
};
