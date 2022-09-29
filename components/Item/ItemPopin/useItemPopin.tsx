import { useSession } from 'next-auth/react'
import { ItemOwnerType } from '../../../types/items.interface'
import { useProps } from './ItemPopin.type'
import { useContext } from 'react';
import { ItemPopinContext } from './ItemPopin.context';

const useItemPopin = (): useProps => {
  const 
    [item] = useContext(ItemPopinContext),
    uri = 'item/update',
    { data: session } = useSession()

  return {
    item,
    user: session.user,
    uri,
    isMyItem:
    // Api send me item + league item
      item?.ownerType === ItemOwnerType.league
        ? session?.user?.profiles.length > 0
        : true,
  }
}

export default useItemPopin
