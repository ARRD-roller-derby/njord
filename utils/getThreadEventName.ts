import dayjs from "dayjs";
import { EventInterface } from "../types/Event.interface";
import eventTitleRender from "./eventTitleRender";

export function getThreadEventName(event: EventInterface) {
  return `${eventTitleRender(event)} | ${dayjs(
    dayjs(event.start).format("YYYY-MM-DD") +
    "T" +
    event.hourStart +
    ":00.000"
  ).format('lll')
    }`
}