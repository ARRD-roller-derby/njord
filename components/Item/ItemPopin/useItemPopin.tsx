import { useSession } from 'next-auth/react'
import { ItemInterface, ItemOwnerType } from '../../../types/items.interface'

export default function useItemPopin(item: ItemInterface) {
  const uri = 'item/update',
    { data: session } = useSession()
    
  return {
    user: session.user,
    uri,
    
    isMyItem:
      item?.ownerType === ItemOwnerType.league
        ? session?.user?.profiles.length > 0
        : true,
  }
}
