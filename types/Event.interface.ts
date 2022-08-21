import { addressInterface } from './address.interface'

export interface EventInterface {
  _id: string
  start: Date
  end: Date
  hourStart: string
  hourEnd: string
  description: string
  recurrenceId: string
  visibility: 'league' | 'public'
  cancel: boolean
  guests: Array<string>
  leaguesGuest: Array<string>
  type: string
  items: Array<string>
  requirements: Array<string>
  attendees: Array<AttendeesEventInterface>
  address: addressInterface
  events: Array<string>
  updatedAt: Date
}

export interface AttendeesEventInterface {
  id: string
  type: string
  updatedAt: Date
  isPresent: boolean
}
