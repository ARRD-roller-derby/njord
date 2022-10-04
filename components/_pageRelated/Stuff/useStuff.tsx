import useSilentDBSync from '../../_hooks/useSilentDBSync'
import { useContext, useEffect, useState } from 'react'
import { ItemInterface, ItemWithHereInterface } from '../../../types/items.interface'
import { SocketContext } from '../../../stores/socket.store'

export default function useStuff() {
  const {
      data: items,
      loading,
      reSync,
    } = useSilentDBSync<Array<ItemWithHereInterface>>(
      'items/items',
      'items',
      {
        limit: 100,
      }
    ),
    [itemForPopin, setItemForPopin] = useState<
      ItemInterface | undefined
    >(),
    [triggerRefresh] = useContext(SocketContext)

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
