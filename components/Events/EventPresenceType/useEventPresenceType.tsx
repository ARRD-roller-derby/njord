import { EventInterface } from '../../../types/Event.interface'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { eventTypeSelectData } from './eventTypeSelectData'
import usePost from '../../_hooks/usePost'

interface Props {
  readonly event: EventInterface
  readonly reSync: Function
}

export default function useEventPresenceType({ event, reSync }: Props) {
  const { data: session } = useSession(),
    [show, setShow] = useState(false),
    [value, setValue] = useState<{ label: string; value: string }>(),
    [options, setOptions] = useState<Array<{ label: string; value: string }>>(),
    { loading, data, post } = usePost('event/presenceType')

  function onChange(choice: { label: string; value: string }) {
    if (!loading) {
      setValue(choice)
      post({ type: choice.value, eventId:event._id })
    }
  }

  function handleOptions() {
 
    const myPresence = event.attendees?.find(
      (attendee) => session.user._id === attendee.userId
    )


    if (!myPresence || !myPresence.isPresent) return setShow(false)

    if (myPresence?.type)
      setValue({ label: myPresence.type, value: myPresence?.type })
    if (event.type.match(/training/) && !myPresence?.type)
      setValue({ label: 'patins', value: 'patins' })
    if (event.type.match(/scrimmage|match/) && !myPresence?.type)
      setValue({ label: 'joueur·euse', value: 'joueur·euse' })

    setOptions(
      eventTypeSelectData
        .filter((type) => type.types.includes(event.type))
        .map((type) => ({
          label: type.label,
          value: type.label,
        }))
    )

    setShow(true)

    //ici on prépare la value et les options
  }

  useEffect(() => {
    handleOptions()
  }, [event])

  useEffect(() => {
    if (data) reSync()
  }, [data])

  return { onChange, options, show, value, loading }
}
