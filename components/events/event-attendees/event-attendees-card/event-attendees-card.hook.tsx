import { useEffect, useState } from "react"
import { EventAttendeeCardProps, EventAttendeeCardResult } from "./event-attendees-card"

export const useEventAttendeesCard = (
  { user, eventType }: EventAttendeeCardProps): EventAttendeeCardResult => {
  const [type, setType] = useState<string>()

  function paramType() {
    if (!user.isPresent) return
    if (user?.type) return setType(user.type)
    if (eventType.match(/training/)) return setType('patins')
    if (eventType.match(/scrimmage|match/)) return setType('joueur·euse')
  }

  useEffect(() => {
    if (user) paramType()
  }, [user])

  return { user, type }
}