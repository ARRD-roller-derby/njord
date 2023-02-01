import { createContext } from "react";
import { EventInterface } from "../../../types/Event.interface";
import { Fetch } from "../../../types/fetch.interface";
export const EventsNextContext = createContext<Fetch<{ events: EventInterface[], page: number, totalPage: number }>>(null);
