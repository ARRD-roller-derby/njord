import { EventInterface } from "../../../types/Event.interface";
import { PaginationFetch } from "../../../types/pagination.interface";
import { PaginationProvider } from "../../pagination/pagination.provider";
import useFetch from "../../_hooks/useFetch";
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
  const ctx = useFetch<{
    events: Array<EventInterface>
  } & PaginationFetch>("events/next");

  return (
    <EventsNextContext.Provider value={ctx}>
      <PaginationProvider>
        <EventsNextFactory />
      </PaginationProvider>
    </EventsNextContext.Provider>
  );
};
