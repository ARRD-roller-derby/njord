import { addressInterface } from './address.interface'
import { EventType } from './EventType.enum';

export interface EventInterface {
  _id: string
  start: Date
  end: Date
  title?: string
  leagueId: string
  hourStart: string
  hourEnd: string
  description: string
  recurrenceId: string
  visibility: 'league' | 'public'
  cancel: boolean
  guests: Array<string>
  leaguesGuest: Array<string>
  type: EventType
  items: Array<string>
  requirements: Array<string>
  attendees: Array<AttendeesEventInterface>
  address: addressInterface
  events: Array<string>
  updatedAt: Date
  presence?: AttendeesEventInterface
  versus?: [string, string]
}

export interface AttendeesEventInterface {
  userId: string
  type: string
  guestNumber: number
  updatedAt: Date
  isPresent: boolean
}
