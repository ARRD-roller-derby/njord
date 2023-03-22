import User from '../models/user.model'
import { AttendeeInterface } from '../types/attendee.interface'
import { EventInterface } from '../types/Event.interface'
import searchTypeOfPresence from './searchTypeOfPresence'

export default async function eventWithPresence(
  userId: string,
  event: any,
): Promise<EventInterface> {
  const newEvent = { ...event._doc }
  const myPresence = newEvent.attendees.find(
    (attendee: AttendeeInterface) => attendee.userId === userId
  )

  if (myPresence) {
    newEvent.presence = {
      ...myPresence?._doc,
      type: searchTypeOfPresence(myPresence, event.type),
    }
  } else {
    newEvent.presence = {
      isPresent: false,
    }
  }

  if (newEvent.type.match(/training|match|scrimmage/)) {
    const coachPresence = newEvent.attendees.find(
      (attendee: AttendeeInterface) => attendee.type === 'coach' && attendee.isPresent
    )


    if (coachPresence) {
      newEvent.coach = await User.findOne({ _id: coachPresence.userId }).select('email name lastname derbyName numRoster')
    }

  }
  delete newEvent.attendees
  return newEvent
}
