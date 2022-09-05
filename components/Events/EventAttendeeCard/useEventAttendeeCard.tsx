import { AttendeeInterface } from '../../../types/attendee.interface'
import { useEffect, useState } from 'react'

interface Props {
  readonly user: AttendeeInterface
  readonly eventType: string
}

export default function useEventAttendeeCard({ user, eventType }: Props) {
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

  return { type }
}
