import { useEffect, useState } from 'react'
import { Props } from './EventAttendeeCard.type'

const useEventAttendeeCard = ({ user, eventType }: Props) => {

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

  return { user,type }
}

export default useEventAttendeeCard