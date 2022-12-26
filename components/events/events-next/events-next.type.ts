import { EventInterface } from "../../../types/Event.interface";

export type EventsNextResult = {
  data: {
    events: EventInterface[],
    totalPage: number
  };
  loading: boolean;
  reSync: () => void
};
