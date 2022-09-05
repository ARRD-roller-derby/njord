import { EventInterface } from './Event.interface'

export interface CalDayInterface {
  date: any
  month: number
  day: number
  events: Array<EventInterface>
}
