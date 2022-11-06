import { EventInterface } from "../types/Event.interface";
import { EventType } from "../types/EventType.enum";
import validator from "validator";

export default function eventTitleRender(event: EventInterface): string {
  if (event.title) return validator.unescape(event.title);

  if (event.type === EventType.training) return "entraînement";
  if (event.type === EventType.scrimmage) return "scrimmage";
  if (event.type === EventType.match) return "match";
  if (event.type === EventType.bootcamp) return "bootcamp";
  if (event.type === EventType.generalAssembly) return "AG";
  if (event.type === EventType.other) return "autre";
  if (event.type === EventType.online) return "en ligne";

  return "événement";
}
