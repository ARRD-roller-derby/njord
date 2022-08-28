import { EventInterface } from '../types/Event.interface'
import { EventType } from '../types/EventType.enum'

export default function eventTitleRender(event: EventInterface):string {
  if (event.title) return event.title

  if (event.type === EventType.training) return 'entraînement'
  if (event.type === EventType.generalAssembly) return 'AG'
  if (event.type === EventType.other) return 'autre'
  if (event.type === EventType.online) return 'en ligne'

  return 'événement'
}
