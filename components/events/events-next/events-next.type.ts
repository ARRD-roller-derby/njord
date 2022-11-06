import { EventInterface } from "../../../types/Event.interface";

export type EventsNextResult = {
  data: EventInterface[];
  loading: boolean;
  reSync: () => void;
  id: string;
  setCurrentType: Function;
  currentType: { label: string; value: string };
  selectByType: Array<{ label: string; value: string }>;
};
