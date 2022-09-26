import useIsMobileDevice from '../../_hooks/useIsMobileDevice'
import { useEffect, useState } from 'react'
import { EventInterface } from '../../../types/Event.interface'
import { Props, useProps } from './EventCard.type'

const useEventCard = ({ event }: Props): useProps => {
  const isMobileDevice = useIsMobileDevice(),
    [shutter, setShutter] = useState<EventInterface | null>(null)

  useEffect(() => {
    if (shutter) setShutter(event)
  }, [event])

  return { isMobileDevice, shutter, setShutter }
}

export default useEventCard
