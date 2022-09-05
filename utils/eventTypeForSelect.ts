import { EventType } from "../types/EventType.enum";

export const eventTypeForSelect = [
  {
    label: 'entraînement',
    value: EventType.training
  },
  {
    label: 'scrimmage',
    value: EventType.scrimmage
  },
  {
    label: 'AG',
    value: EventType.generalAssembly
  },
  {
    label: 'bootcamp',
    value: EventType.bootcamp
  },
  {
    label: 'match',
    value: EventType.match
  },
  {
    label: 'événement',
    value: EventType.event
  },
  {
    label: 'en ligne',
    value: EventType.online
  },
  {
    label: 'autre',
    value: EventType.other
  },
]