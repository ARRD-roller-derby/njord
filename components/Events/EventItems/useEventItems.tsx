import { useState } from 'react'
import { ItemWithHereInterface } from '../../../types/items.interface'
import useFetch from '../../_hooks/useFetch'

interface Props {
  readonly eventId: string
}

export default function useEventItems({ eventId }: Props) {
  const [itemForPopin, setItemForPopin] = useState<
      ItemWithHereInterface | undefined
    >(),
    {
      data: items,
      loading,
      refetch,
    } = useFetch<Array<ItemWithHereInterface>>('items/event', { id: eventId })

  return {
    reSync: refetch,
    openPopin: setItemForPopin,
    closePopin: () => setItemForPopin(undefined),
    itemForPopin,
    items,
    loading,
  }
}
