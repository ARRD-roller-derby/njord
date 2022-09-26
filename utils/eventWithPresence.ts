import { AttendeeInterface } from '../types/attendee.interface'
import { EventInterface } from '../types/Event.interface'
import searchTypeOfPresence from './searchTypeOfPresence'

export default function eventWithPresence(
  userId: string,
  event: any
): EventInterface {
  const newEvent = { ...event._doc }
  const myPresence = newEvent.attendees.find(
    (attendee: AttendeeInterface) => attendee.userId === userId
  )
  if (myPresence) {
    newEvent.presence = {
      ...myPresence._doc,
      type: searchTypeOfPresence(myPresence, event.type),
    }
  } else {
    newEvent.presence = {
      isPresent: false,
    }
  }
  
  delete newEvent.attendees

  return newEvent
}
