import { AttendeeInterface } from '../types/attendee.interface'

export default function searchTypeOfPresence(
  val: AttendeeInterface,
  eventType: string
): string {
  if (val?.type) return val.type
  if (eventType.match(/training/)) return 'patins'
  if (eventType.match(/scrimmage|match/)) return 'joueur·euse'
  return 'participant.e.s'
}
