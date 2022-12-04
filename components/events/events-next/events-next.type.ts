import { EventInterface } from "../../../types/Event.interface";

export type EventsNextResult = {
  data: {
    events: EventInterface[],
    totalPage:number
  };
  loading: boolean;
  reSync: () => void;
  id: string;
  setCurrentType: Function;
  currentType: { label: string; value: string };
  selectByType: Array<{ label: string; value: string }>;
};
