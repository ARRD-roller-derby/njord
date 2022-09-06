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
  const [options, setOptions] =
      useState<Array<{ label: string; value: string }>>(),
    { loading, data, post } = usePost('event/presenceType')

  function onChange(choice: { label: string; value: string }) {
    if (!loading) {
      post({ type: choice.value, eventId: event._id })
    }
  }

  function handleOptions() {
    setOptions(
      eventTypeSelectData
        .filter((type) => type.types.includes(event.type))
        .map((type) => ({
          label: type.label,
          value: type.label,
        }))
    )
  }

  useEffect(() => {
    handleOptions()
  }, [event])

  useEffect(() => {
    if (data) reSync()
  }, [data])

  return { onChange, options,loading }
}
