import useSilentDBSync from '../../_hooks/useSilentDBSync'
import { useState } from 'react'
import { ItemInterface } from '../../../types/items.interface'

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
    >()
    
  return {
    items,
    loading,
    reSync,
    openPopin: setItemForPopin,
    closePopin: () => setItemForPopin(undefined),
    itemForPopin,
  }
}