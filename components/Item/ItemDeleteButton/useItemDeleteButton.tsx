import { ItemInterface } from '../../../types/items.interface'
import usePost from '../../_hooks/usePost'
import { useEffect } from 'react'

interface Props {
  readonly item: ItemInterface
  readonly reSync: Function
  readonly setClose: Function
}

export default function useItemDeleteButton({ item, reSync, setClose }: Props) {
  const { data,loading, post } = usePost('item/delete')

  useEffect(() => {
    if (data) {
      reSync()
      setClose()
    }
  }, [data])

  return {
    deleteItem: () => post(item),
    loading
  }
}
