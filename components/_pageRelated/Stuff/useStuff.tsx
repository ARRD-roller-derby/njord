import useSilentDBSync from '../../_hooks/useSilentDBSync'
import { useContext, useEffect, useState } from 'react'
import { ItemInterface } from '../../../types/items.interface'
import { PusherContext } from '../../../stores/pusher.store'

export default function useStuff() {
  const {
      data: items,
      loading,
      reSync,
    } = useSilentDBSync<Array<ItemInterface>>(
      'items/items',
      'items',
      {
        limit: 100,
      }
    ),
    [itemForPopin, setItemForPopin] = useState<
      ItemInterface | undefined
    >(),
    [triggerRefresh] = useContext(PusherContext)

  useEffect(() => {
    if (triggerRefresh && triggerRefresh?.type === 'item') {
      reSync()
    }
  }, [triggerRefresh])
    
  return {
    items,
    loading,
    reSync,
    openPopin: setItemForPopin,
    closePopin: () => setItemForPopin(undefined),
    itemForPopin,
  }
}
