import { useEffect, useState } from 'react'
import { eventTypeSelectData } from './eventTypeSelectData'
import usePost from '../../_hooks/usePost'
import { Props, useProps} from './EventPresenceType.type'

const useEventPresenceType = ({ event,setEvent }: Props):useProps => {
  const [options, setOptions] =
      useState<Array<{ label: string; value: string }>>(),
    { loading, post } = usePost('event/presenceType')

  function onChange(choice: { label: string; value: string }) {
    if (!loading) {
      const newPresence = {...event.presence}
      newPresence.type = choice.value
      setEvent({...event,presence: {...newPresence}})
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

  return { onChange, options,loading }
}

export default useEventPresenceType