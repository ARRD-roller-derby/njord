import { EventInterface } from "../../../types/Event.interface";
import { UserInterface } from "../../../types/User.interface";

export type EventShutterProps = {
  event: EventInterface;
  setClose: () => void;
  url: string;
  reSync: () => void;
};

export type EventShutterResult = {
  close: () => void;
  uri: string;
  user: UserInterface;
};
